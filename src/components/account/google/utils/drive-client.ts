import { G_ACCESS_TOKEN_SESSION } from "@/constants";

export async function driveFetch(input: RequestInfo, init?: RequestInit) {
	const token = sessionStorage.getItem(G_ACCESS_TOKEN_SESSION);

	if (!token) throw new Error("No token");

	return fetch(input, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			...(init?.headers || {}),
		},
	});
}
