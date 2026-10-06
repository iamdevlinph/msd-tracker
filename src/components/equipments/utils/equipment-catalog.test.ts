import { describe, expect, it } from "vitest";
import {
	EQUIPMENT_CATALOG_SORTS,
	emptyEquipmentCatalogFilters,
	getEquipmentSetRows,
} from "./equipment-catalog";

const equipment = [
	{
		id: 1,
		name: "Gooey Shoes",
		image: "/shoes.webp",
		tier_id: 4,
		part_type: "footwear",
		set_name: "Sticky Gorger",
	},
	{
		id: 2,
		name: "Gooey Gloves",
		image: "/gloves.webp",
		tier_id: 4,
		part_type: "gloves",
		set_name: "Sticky Gorger",
	},
	{
		id: 3,
		name: "Abyss Crown",
		image: "/crown.webp",
		tier_id: 5,
		part_type: "headgear",
		set_name: "Abyss",
	},
	{
		id: 4,
		name: "Abyss Boots",
		image: "/boots.webp",
		tier_id: 5,
		part_type: "footwear",
		set_name: "Abyss",
	},
	{
		id: 5,
		name: "Arbiter Helm",
		image: "/arbiter.webp",
		tier_id: 5,
		part_type: "headgear",
		set_name: "Arbiter",
	},
] as const;

describe("getEquipmentSetRows", () => {
	it("groups full sets and applies catalog search, tier, and sort controls", () => {
		const filters = emptyEquipmentCatalogFilters();
		const rows = getEquipmentSetRows(equipment, filters);

		expect(rows.map((row) => row.name)).toEqual([
			"Abyss",
			"Arbiter",
			"Sticky Gorger",
		]);
		expect(rows[2].equipment.map((piece) => piece.name)).toEqual([
			"Gooey Gloves",
			"Gooey Shoes",
		]);
		expect(
			getEquipmentSetRows(equipment, { ...filters, search: "shoes" })[0]
				.equipment,
		).toHaveLength(2);
		expect(
			getEquipmentSetRows(equipment, { ...filters, search: "sticky" }).map(
				(row) => row.name,
			),
		).toEqual(["Sticky Gorger"]);
		expect(
			getEquipmentSetRows(equipment, { ...filters, search: "footwear" }),
		).toEqual([]);
		expect(
			getEquipmentSetRows(equipment, { ...filters, search: "ATK +3%" }),
		).toEqual([]);
		expect(
			getEquipmentSetRows(equipment, {
				...filters,
				selectedTiers: [4],
			}).map((row) => row.name),
		).toEqual(["Sticky Gorger"]);
		expect(
			getEquipmentSetRows(equipment, {
				...filters,
				sort: EQUIPMENT_CATALOG_SORTS.SET_DESC,
			}).map((row) => row.name),
		).toEqual(["Sticky Gorger", "Arbiter", "Abyss"]);
		expect(
			getEquipmentSetRows(equipment, {
				...filters,
				sort: EQUIPMENT_CATALOG_SORTS.TIER_ASC,
			}).map((row) => row.name),
		).toEqual(["Sticky Gorger", "Abyss", "Arbiter"]);
		expect(
			getEquipmentSetRows(equipment, {
				...filters,
				sort: EQUIPMENT_CATALOG_SORTS.TIER_DESC,
			}).map((row) => row.name),
		).toEqual(["Abyss", "Arbiter", "Sticky Gorger"]);
	});
});
