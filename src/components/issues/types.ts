export type Issue = {
	id: number;
	title: string;
	repository: string;
	number: number;
	state: "open" | "closed";
	comments: number;
	createdAt: string;
	labels: string[];
	url: string;
};
