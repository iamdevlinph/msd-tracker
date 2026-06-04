import { createServerFn } from "@tanstack/react-start";
import { destroySession } from "@/actions/session.server";
import { GITHUB_COOKIE_NAME } from "@/constants";

export const logoutServerFn = createServerFn({
	method: "POST",
}).handler(async () => {
	const cookie = destroySession(GITHUB_COOKIE_NAME);

	return new Response(null, {
		status: 200,

		headers: {
			"Set-Cookie": cookie,
		},
	});
});
