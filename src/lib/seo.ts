export const SITE_URL = "https://msd-tracker.debu.games";
export const SITE_NAME = "Mongil: Star Dive Tracker";

export const PUBLIC_PAGE_TITLES = {
	CHECKLIST: `Checklist - ${SITE_NAME}`,
	CHARACTERS: `Characters - ${SITE_NAME}`,
	MONSTERLINGS: `Monsterlings - ${SITE_NAME}`,
	MONSTER_CODEX: `Monster Codex - ${SITE_NAME}`,
	LOADOUTS: `Loadouts - ${SITE_NAME}`,
};

export type SeoPage = {
	title: string;
	description: string;
	path: string;
};

export const createSeoHead = ({ title, description, path }: SeoPage) => {
	const url = new URL(path, SITE_URL).toString();

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ name: "robots", content: "index, follow" },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
		],
		links: [{ rel: "canonical", href: url }],
	};
};

export const noIndexHead = () => ({
	meta: [{ name: "robots", content: "noindex, nofollow" }],
});
