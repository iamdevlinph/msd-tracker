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
		});
	});

	it("creates canonical and social metadata for a page", () => {
		const head = createSeoHead({
			title: PUBLIC_PAGE_TITLES.CHARACTERS,
			description: "Description",
			path: "/characters",
		});

		expect(head.links).toEqual([
			{ rel: "canonical", href: `${SITE_URL}/characters` },
		]);
		expect(head.meta).toContainEqual({
			title: `Characters - ${SITE_NAME}`,
		});
		expect(head.meta).toContainEqual({
			name: "description",
			content: "Description",
		});
		expect(head.meta).toContainEqual({
			property: "og:url",
			content: `${SITE_URL}/characters`,
		});
	});

	it("marks private routes as noindex", () => {
		expect(noIndexHead().meta).toEqual([
			{ name: "robots", content: "noindex, nofollow" },
		]);
	});
});
