import { createFileRoute } from "@tanstack/react-router";
import { destroySession } from "@/actions/session.server";
import { GOOGLE_COOKIES_DESTROY } from "@/constants";

export const Route = createFileRoute("/api/auth/google-logout")({
	server: {
		handlers: {
			GET: async () => {
				try {
					const headers = new Headers();

					GOOGLE_COOKIES_DESTROY.forEach((key) => {
						const cookie = destroySession(key);

						headers.append("Set-Cookie", cookie);
					});

					return new Response("Google related cookies destroyed", {
						status: 200,

						headers,
					});
				} catch (e) {
					const msg = "Something went wrong when trying to logout with Google";
					console.log(msg, e);
					return new Response(msg, {
						status: 500,
					});
				}
			},
		},
	},
});
