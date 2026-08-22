import crypto from "node:crypto";
import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "assets/images-source");
const outputRoot = path.join(root, "public/images");
const manifestPath = path.join(root, "assets/images-manifest.json");
const settings = { format: "webp", quality: 85, alphaQuality: 100 };
const execFileAsync = promisify(execFile);

async function filesIn(dir, extension) {
	const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
	const files = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...(await filesIn(full, extension)));
		else if (!extension || entry.name.toLowerCase().endsWith(extension)) files.push(full);
	}
	return files;
}

async function sourceFiles() {
	const discovered = await filesIn(sourceRoot, ".png");
	try {
		const { stdout } = await execFileAsync("git", ["ls-files", "-z", "--", "assets/images-source"]);
		const tracked = stdout
			.split("\0")
			.filter((file) => file.toLowerCase().endsWith(".png"))
			.map((file) => path.join(root, file));
		return [...new Set([...discovered, ...tracked])];
	} catch {
		return discovered;
	}
}

async function hashFile(file) {
	return crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex");
}

async function readManifest() {
	try {
		return JSON.parse(await fs.readFile(manifestPath, "utf8"));
	} catch {
		return { version: 1, settings, files: {} };
	}
}

async function convert() {
	const manifest = await readManifest();
	const sources = (await sourceFiles()).sort();
	const nextFiles = {};
	let converted = 0;
	let skipped = 0;
	for (const source of sources) {
		const relative = path.relative(sourceRoot, source).split(path.sep).join("/");
		const outputRelative = relative.replace(/\.png$/i, ".webp");
		const output = path.join(outputRoot, outputRelative);
		const hash = await hashFile(source);
		nextFiles[relative] = hash;
		const unchanged = manifest.settings?.quality === settings.quality && manifest.settings?.alphaQuality === settings.alphaQuality && manifest.files?.[relative] === hash;
		if (unchanged && await fs.stat(output).then(() => true).catch(() => false)) {
			skipped++;
			continue;
		}
		await fs.mkdir(path.dirname(output), { recursive: true });
		const temporary = `${output}.tmp-${process.pid}`;
		await sharp(source).webp({ quality: settings.quality, alphaQuality: settings.alphaQuality }).toFile(temporary);
		await fs.rename(temporary, output);
		converted++;
	}
	for (const relative of Object.keys(manifest.files ?? {})) {
		if (nextFiles[relative]) continue;
		const output = path.join(outputRoot, relative.replace(/\.png$/i, ".webp"));
		await fs.rm(output, { force: true });
	}
	const nextManifest = { version: 1, settings, files: Object.fromEntries(Object.entries(nextFiles).sort(([a], [b]) => a.localeCompare(b))) };
	await fs.writeFile(manifestPath, `${JSON.stringify(nextManifest, null, "\t")}\n`);
	console.log(`images: converted ${converted}, skipped ${skipped}, removed ${Object.keys(manifest.files ?? {}).filter((key) => !nextFiles[key]).length}`);
}

async function check() {
	const manifest = await readManifest();
	const sources = (await sourceFiles()).sort();
	const problems = [];
	if (manifest.version !== 1 || JSON.stringify(manifest.settings) !== JSON.stringify(settings)) problems.push("manifest version/settings mismatch");
	const sourceSet = new Set();
	for (const source of sources) {
		const relative = path.relative(sourceRoot, source).split(path.sep).join("/");
		sourceSet.add(relative);
		const output = path.join(outputRoot, relative.replace(/\.png$/i, ".webp"));
		if (manifest.files?.[relative] !== await hashFile(source)) problems.push(`stale manifest: ${relative}`);
		if (!await fs.stat(output).then(() => true).catch(() => false)) problems.push(`missing output: ${relative}`);
		else {
			const [sourceMeta, outputMeta] = await Promise.all([sharp(source).metadata(), sharp(output).metadata()]);
			if (
				sourceMeta.width !== outputMeta.width ||
				sourceMeta.height !== outputMeta.height ||
				outputMeta.format !== "webp" ||
				sourceMeta.hasAlpha !== outputMeta.hasAlpha
			)
				problems.push(`metadata mismatch: ${relative}`);
		}
	}
	for (const relative of Object.keys(manifest.files ?? {})) if (!sourceSet.has(relative)) problems.push(`manifest source missing: ${relative}`);
	const productionFiles = await filesIn(path.join(root, "src"));
	for (const file of productionFiles.filter((file) => /\.(ts|tsx|js|jsx)$/.test(file) && !/(\.test\.|\.spec\.)/.test(file))) {
		const text = await fs.readFile(file, "utf8");
		if (/\/images\/[^"'`\s]*\.png/.test(text)) problems.push(`PNG reference: ${path.relative(root, file)}`);
	}
	if (problems.length) {
		console.error(problems.join("\n"));
		process.exitCode = 1;
	} else console.log(`images:check passed (${sources.length} source images)`);
}

if (process.argv.includes("--check")) await check();
else await convert();
