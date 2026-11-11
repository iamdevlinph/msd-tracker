// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ArtifactCard } from "@/components/artifacts/components/artifact-card";
import CharacterCard from "@/components/characters/components/character-card";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { ENTITY_CARD_SIZE } from "@/components/shared/entity-card-constants";

vi.mock("@/data/monsterlings/MONSTERLINGS_DATA", () => ({
	MONSTERLINGS_DATA: {
		1: {
			id: 1,
			name: "A Very Long Monsterling Name",
			image: "/monsterling.webp",
			linkChain: { name: "Test Chain" },
		},
	},
}));

describe("reusable entity card dimensions", () => {
	afterEach(cleanup);

	it("keeps Character portraits, captions, and badges inside a 120px card", () => {
		render(
			<CharacterCard
				class_id={1}
				tier_id={5}
				portraitImage="/character.webp"
				name="A Very Long Character Name"
				element_id={2}
				variant="Summer Dive!"
				awakening={5}
			/>,
		);
		const portrait = screen.getByAltText("A Very Long Character Name portrait");
		const card = portrait.parentElement?.parentElement as HTMLElement;
		expect(card.style.width).toBe(String(ENTITY_CARD_SIZE) + "px");
		expect(card.style.height).toBe(String(ENTITY_CARD_SIZE) + "px");
		expect(portrait.getAttribute("width")).toBe("120");
		expect(screen.getByText("Summer Dive!")).toBeTruthy();
		expect(screen.getByText("A5")).toBeTruthy();
		expect(screen.getByText("A Very Long Character Name").className).toContain(
			"truncate",
		);
	});

	it("keeps Artifact portraits, fusion badges, and captions in a 120px card", () => {
		render(
			<ArtifactCard
				artifact={{
					id: 1,
					name: "A Very Long Artifact Name",
					image: "/artifact.webp",
					tier_id: 5,
					class_id: 1,
				}}
				fusionLevel={3}
			/>,
		);
		const portrait = screen.getByAltText("A Very Long Artifact Name portrait");
		const card = portrait.parentElement as HTMLElement;
		expect(card.style.width).toBe(String(ENTITY_CARD_SIZE) + "px");
		expect(card.style.height).toBe(String(ENTITY_CARD_SIZE) + "px");
		expect(portrait.getAttribute("width")).toBe("120");
		expect(screen.getByAltText("Fusion level 3")).toBeTruthy();
		expect(screen.getByText("A Very Long Artifact Name").className).toContain(
			"truncate",
		);
	});

	it("keeps full and compact Monsterling trait cards 120px tall", () => {
		const props = {
			monsterling_id: 1,
			tier_id: 5 as const,
			linkChainLevel: 1 as const,
			traits: [
				{ stat_id: 7 as const, tier_id: 5 as const },
				{ stat_id: 8 as const, tier_id: 4 as const },
			],
		};
		const { container, rerender } = render(<MonsterlingCard {...props} />);
		const card = container.querySelector(".monsterling-card") as HTMLElement;
		expect(card.style.width).toBe("330px");
		expect(card.style.height).toBe(String(ENTITY_CARD_SIZE) + "px");
		expect(card.style.gridTemplateColumns).toBe("120px minmax(0, 1fr)");
		expect(
			screen
				.getByAltText("A Very Long Monsterling Name portrait")
				.getAttribute("width"),
		).toBe("120");
		expect(screen.getByAltText("Link Chain Level 1")).toBeTruthy();
		expect(screen.getAllByAltText(/Tier [45] trait img/)).toHaveLength(2);
		rerender(<MonsterlingCard {...props} compactStats />);
		expect(card.style.width).toBe("162px");
		expect(card.style.height).toBe(String(ENTITY_CARD_SIZE) + "px");
		expect(card.style.gridTemplateColumns).toBe("120px 48px");
		expect(screen.getAllByAltText(/Tier [45] trait img/)).toHaveLength(2);
	});
});
