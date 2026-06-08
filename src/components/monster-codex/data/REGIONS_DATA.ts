import type { MonsterCodexRegionData } from "@/components/monster-codex/store/monster-codex-constants";

export const REGION_ALL = 0;
export const REGION_ELENDOR = 1;
export const REGION_VARHINE = 2;
export const REGION_SERENIA = 3;
export const REGION_SURAH = 4;
export const REGION_NAMRYUNG = 5;
export const REGION_MUWON = 6;

export const REGIONS_DATA: MonsterCodexRegionData = {
	0: {
		id: REGION_ALL,
		region: "all",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780957658/msd/Maps/map-icon-all.png",
	},
	1: {
		id: REGION_ELENDOR,
		region: "elendor",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-elendor.png",
	},
	2: {
		id: REGION_VARHINE,
		region: "varhine",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-varhine.png",
	},
	3: {
		id: REGION_SERENIA,
		region: "serenia",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-serenia.png",
	},
	4: {
		id: 4,
		region: "surah",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-surah.png",
	},
	5: {
		id: REGION_NAMRYUNG,
		region: "namryung",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-namryung.png",
	},
	6: {
		id: REGION_MUWON,
		region: "muwon",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-muwon.png",
	},
};
