import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	createSeoHead,
	noIndexHead,
	PUBLIC_PAGE_TITLES,
	SITE_NAME,
	SITE_URL,
} from "./seo";

describe("SEO metadata", () => {
	it("shares consistently formatted public page titles", () => {
		expect(PUBLIC_PAGE_TITLES).toEqual({
			CHECKLIST: `Checklist - ${SITE_NAME}`,
			CHARACTERS: `Characters - ${SITE_NAME}`,
			MONSTERLINGS: `Monsterlings - ${SITE_NAME}`,
			LINK_CHAINS: `Link Chains - ${SITE_NAME}`,
			MONSTER_CODEX: `Monster Codex - ${SITE_NAME}`,
			LOADOUTS: `Loadouts - ${SITE_NAME}`,
			LOADOUT_SNAPSHOTS: `Loadout Snapshots - ${SITE_NAME}`,
			ARTIFACTS: `Artifacts - ${SITE_NAME}`,
			ARTIFACT_CATALOG: `Artifact Catalog - ${SITE_NAME}`,
			CHARACTER_CATALOG: `Character Catalog - ${SITE_NAME}`,
			EQUIPMENT: `Equipment - ${SITE_NAME}`,
		});
	});

	it("creates canonical and social metadata for a page", () => {
		const head = createSeoHead({
			title: PUBLIC_PAGE_TITLES.CHARACTER_CATALOG,
			description: "Description",
			path: "/character-catalog",
		});

		expect(head.links).toEqual([
			{ rel: "canonical", href: `${SITE_URL}/character-catalog` },
		]);
		expect(head.meta).toContainEqual({
			title: `Character Catalog - ${SITE_NAME}`,
		});
		expect(head.meta).toContainEqual({
			name: "description",
			content: "Description",
		});
		expect(head.meta).toContainEqual({
			property: "og:url",
			content: `${SITE_URL}/character-catalog`,
		});
	});

	it("marks private routes as noindex", () => {
		expect(noIndexHead().meta).toEqual([
			{ name: "robots", content: "noindex, nofollow" },
		]);
	});

	it("publishes the asset catalogs in the sitemap", () => {
		expect(readFileSync(resolve("public/sitemap.xml"), "utf8")).toContain(
			`${SITE_URL}/artifact-catalog`,
		);
		expect(readFileSync(resolve("public/sitemap.xml"), "utf8")).toContain(
			`${SITE_URL}/character-catalog`,
		);
	});
});
