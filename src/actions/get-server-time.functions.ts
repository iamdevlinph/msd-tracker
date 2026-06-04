import { createServerFn } from "@tanstack/react-start";

export const getServerTime = createServerFn().handler(async () => {
	// This runs only on the server
	return new Date().toISOString();
});
