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
			CHARACTERS: `${SITE_NAME} - Characters`,
			MONSTERLINGS: `${SITE_NAME} - Monsterlings`,
			MONSTER_CODEX: `${SITE_NAME} - Monster Codex`,
			LOADOUTS: `${SITE_NAME} - Loadouts`,
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
			title: `${SITE_NAME} - Characters`,
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
