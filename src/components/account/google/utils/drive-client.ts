import { G_ACCESS_TOKEN_SESSION } from "@/constants";

export const DRIVE_REFRESH_REASONS = [
	"drive-401",
	"missing-token",
	"manual-retry",
] as const;

export type DriveRefreshReason = (typeof DRIVE_REFRESH_REASONS)[number];

export async function refreshGoogleAccessToken(
	reason: DriveRefreshReason,
	signal?: AbortSignal,
) {
	const response = await fetch(
		`/api/auth/google-session?reason=${encodeURIComponent(reason)}`,
		{ cache: "no-store", signal },
	);
	if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
	if (!response.ok) {
		const error = new Error("Google access token refresh failed") as Error & {
			status?: number;
		};
		error.status = response.status;
		throw error;
	}

	const tokens = (await response.json()) as { access_token?: unknown };
	if (typeof tokens.access_token !== "string" || !tokens.access_token) {
		throw new Error("Google access token refresh returned no token");
	}

	if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
	sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, tokens.access_token);
	return tokens.access_token;
}

function withToken(init: RequestInit | undefined, token: string) {
	return {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			...(init?.headers || {}),
		},
	};
}

export async function driveFetch(
	input: RequestInfo,
	init?: RequestInit,
	refreshReason?: DriveRefreshReason,
) {
	let token = sessionStorage.getItem(G_ACCESS_TOKEN_SESSION);

	if (refreshReason) {
		token = await refreshGoogleAccessToken(
			refreshReason,
			init?.signal ?? undefined,
		);
	} else if (!token) {
		token = await refreshGoogleAccessToken(
			"missing-token",
			init?.signal ?? undefined,
		);
	}

	const response = await fetch(input, withToken(init, token));
	if (response.status !== 401 || refreshReason === "drive-401") return response;

	const refreshedToken = await refreshGoogleAccessToken(
		"drive-401",
		init?.signal ?? undefined,
	);
	return fetch(input, withToken(init, refreshedToken));
}
