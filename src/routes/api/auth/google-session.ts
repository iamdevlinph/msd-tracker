import { createFileRoute } from "@tanstack/react-router";
import { getSession, setSession } from "@/actions/session.server";
import { G_REFRESH_TOKEN_COOKIE } from "@/constants";

export const Route = createFileRoute("/api/auth/google-session")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const hasRefresh = getSession(G_REFRESH_TOKEN_COOKIE, request);

				if (!hasRefresh) {
					return new Response(JSON.stringify({ authenticatedGoogle: false }), {
						status: 401,
					});
				}

				const headers = new Headers();

				// Will always ask for a new access_token using refresh_token
				// Since we're not storing the access_token long term anymore
				const res = await fetch("https://oauth2.googleapis.com/token", {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
						client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
						refresh_token: hasRefresh as string,
						grant_type: "refresh_token",
					}),
				});

				const tokens = await res.json();

				const { refresh_token, access_token } = tokens;

				// for some reason the refresh_token is not returned after multiple refreshes
				// which cuases it to be undefined in the cookie
				if (refresh_token) {
					headers.append(
						"Set-Cookie",
						setSession(G_REFRESH_TOKEN_COOKIE, refresh_token),
					);
				}

				return new Response(
					JSON.stringify({
						// authenticatedGoogle: true,
						access_token: access_token,
					}),
					{
						status: 200,
						headers,
					},
				);
			},
		},
	},
});
