type MonsterCodexRegion =
	| "all"
	| "elendor"
	| "muwon"
	| "namryung"
	| "serenia"
	| "surah"
	| "varhine"
	| "legendary monsters"
	| "events";
type MonsterCodexRegionData = Record<
	RegionId,
	{ id: RegionId; region: MonsterCodexRegion; image: string }
>;

export const REGION_ID_BY_REGION = {
	ALL: 0,
	ELENDOR: 1,
	MUWON: 2,
	NAMRYUNG: 3,
	SERENIA: 4,
	SURAH: 5,
	VARHINE: 6,
	LEGENDARY: 7,
	EVENTS: 8,
} as const;
export type RegionId =
	(typeof REGION_ID_BY_REGION)[keyof typeof REGION_ID_BY_REGION];

export const REGIONS_DATA: MonsterCodexRegionData = {
	0: {
		id: REGION_ID_BY_REGION.ALL,
		region: "all",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780957658/msd/Maps/map-icon-all.png",
		image: "/images/Maps/map-icon-all.webp",
	},
	1: {
		id: REGION_ID_BY_REGION.ELENDOR,
		region: "elendor",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-elendor.png",
		image: "/images/Maps/map-icon-elendor.webp",
	},
	2: {
		id: REGION_ID_BY_REGION.VARHINE,
		region: "varhine",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-varhine.png",
		image: "/images/Maps/map-icon-varhine.webp",
	},
	3: {
		id: REGION_ID_BY_REGION.SERENIA,
		region: "serenia",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-serenia.png",
		image: "/images/Maps/map-icon-serenia.webp",
	},
	4: {
		id: REGION_ID_BY_REGION.SURAH,
		region: "surah",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-surah.png",
		image: "/images/Maps/map-icon-surah.webp",
	},
	5: {
		id: REGION_ID_BY_REGION.NAMRYUNG,
		region: "namryung",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-namryung.png",
		image: "/images/Maps/map-icon-namryung.webp",
	},
	6: {
		id: REGION_ID_BY_REGION.MUWON,
		region: "muwon",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780904899/msd/Maps/map-icon-muwon.png",
		image: "/images/Maps/map-icon-muwon.webp",
	},
	7: {
		id: REGION_ID_BY_REGION.LEGENDARY,
		region: "legendary monsters",
		image: "/images/Maps/map-icon-legendary.webp",
	},
	8: {
		id: REGION_ID_BY_REGION.EVENTS,
		region: "events",
		image: "/images/Maps/map-icon-event.webp",
	},
};
