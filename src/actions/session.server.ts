import { parse, serialize } from "cookie";

export function setSession(cookie: string, token: string) {
	return serialize(cookie, token, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
	});
}

export function getSession(cookie: string, request: Request) {
	const cookies = parse(request.headers.get("cookie") || "");

	return cookies[cookie];
}

export function destroySession(cookie: string) {
	return serialize(cookie, "", {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
		path: "/",
		expires: new Date(0),
	});
}
