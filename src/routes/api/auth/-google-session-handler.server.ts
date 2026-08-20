import { getSession, setSession } from "@/actions/session.server";
import { G_REFRESH_TOKEN_COOKIE } from "@/constants";

const DRIVE_SYNC_LOG_MARKER = "MSD_GOOGLE_DRIVE_SYNC";
const REFRESH_REASONS = ["drive-401", "missing-token", "manual-retry"] as const;
type RefreshReason = (typeof REFRESH_REASONS)[number];

type GoogleSessionConfig = {
	clientId: string;
	clientSecret: string;
};

function logRefresh(reason: RefreshReason, status: number | null) {
	console.info(DRIVE_SYNC_LOG_MARKER, { reason, status });
}

export async function handleGoogleSession(
	request: Request,
	config: GoogleSessionConfig,
) {
	const reasonParam = new URL(request.url).searchParams.get("reason");
	if (
		reasonParam &&
		!(REFRESH_REASONS as readonly string[]).includes(reasonParam)
	) {
		return new Response(JSON.stringify({ error: "Invalid refresh reason" }), {
			status: 400,
		});
	}
	const reason = (reasonParam as RefreshReason | null) ?? "missing-token";
	logRefresh(reason, null);
	const refreshToken = getSession(G_REFRESH_TOKEN_COOKIE, request);

	if (!refreshToken) {
		logRefresh(reason, 401);
		return new Response(JSON.stringify({ authenticatedGoogle: false }), {
			status: 401,
		});
	}

	let response: Response;
	try {
		response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				client_id: config.clientId,
				client_secret: config.clientSecret,
				refresh_token: refreshToken,
				grant_type: "refresh_token",
			}),
		});
	} catch {
		logRefresh(reason, 502);
		return new Response(JSON.stringify({ error: "Google refresh failed" }), {
			status: 502,
		});
	}

	if (!response.ok) {
		logRefresh(reason, response.status);
		return new Response(JSON.stringify({ error: "Google refresh failed" }), {
			status: 502,
		});
	}

	let parsedTokens: unknown;
	try {
		parsedTokens = await response.json();
	} catch {
		logRefresh(reason, response.status);
		return new Response(JSON.stringify({ error: "Google refresh failed" }), {
			status: 502,
		});
	}
	if (
		!parsedTokens ||
		typeof parsedTokens !== "object" ||
		Array.isArray(parsedTokens)
	) {
		logRefresh(reason, response.status);
		return new Response(JSON.stringify({ error: "Google refresh failed" }), {
			status: 502,
		});
	}

	const { access_token: accessToken, refresh_token: nextRefreshToken } =
		parsedTokens as { access_token?: unknown; refresh_token?: unknown };
	if (typeof accessToken !== "string" || !accessToken) {
		logRefresh(reason, response.status);
		return new Response(JSON.stringify({ error: "Google refresh failed" }), {
			status: 502,
		});
	}

	const headers = new Headers();
	if (typeof nextRefreshToken === "string" && nextRefreshToken) {
		headers.append(
			"Set-Cookie",
			setSession(G_REFRESH_TOKEN_COOKIE, nextRefreshToken),
		);
	}
	logRefresh(reason, response.status);
	return new Response(JSON.stringify({ access_token: accessToken }), {
		status: 200,
		headers,
	});
}
