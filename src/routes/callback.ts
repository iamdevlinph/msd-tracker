import { createFileRoute } from "@tanstack/react-router";
import { accessToken } from "@/actions/access-token.server";
import { getInstallations } from "@/actions/get-installations.server";
import { oauthOctokit } from "@/actions/github-oauth.server";
import { setSession } from "@/actions/session.server";
import { GITHUB_COOKIE_NAME } from "@/constants";

export const Route = createFileRoute("/callback")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				try {
					const url = request.url;

					const params = new URL(url).searchParams;
					const code = params.get("code");

					if (!code) {
						return new Response("No code provided");
					}

					// Step 1 - get access_token from user login code after authentication
					const access_token = await accessToken(code);
					const token = access_token.access_token;

					// Step 2
					const oauth = oauthOctokit(token);

					// Step 3
					const user = await oauth.rest.users.getAuthenticated();

					// Step 4
					const installations = await getInstallations(token);

					// Step 5
					if (installations.installations.length === 0) {
						const installUrl = `https://github.com/apps/${import.meta.env.VITE_APP_NAME}/installations/new`;

						return Response.redirect(installUrl, 302);
					}

					const installationId = installations.installations[0].id;

					// Step 6 - if already has installation or repositories selected

					const redirectUrl =
						`/account` +
						`?login=${user.data.login}` +
						`&installationId=${installationId}`;

					return new Response(null, {
						status: 302,
						headers: {
							Location: redirectUrl,
							"Set-Cookie": setSession(GITHUB_COOKIE_NAME, token),
						},
					});
				} catch (e) {
					console.error("Something went wrong with callback", e as Error);

					return new Response(`Something went wrong`, {
						status: 500,
					});
				}
			},
		},
	},
});
