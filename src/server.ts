let cachedFetch:
	| ((req: Request, env: unknown, ctx: unknown) => Promise<Response>)
	| null = null;

async function getFetch() {
	if (cachedFetch) return cachedFetch;
	const mod = await import("@tanstack/react-start/server");
	cachedFetch = mod.createStartHandler(mod.defaultStreamHandler) as (
		req: Request,
		env: unknown,
		ctx: unknown,
	) => Promise<Response>;
	return cachedFetch;
}

if (import.meta.hot) {
	import.meta.hot.accept(() => {
		cachedFetch = null;
	});
}

export default {
	async fetch(request: Request, env: unknown, ctx: unknown) {
		const fn = await getFetch();
		return await fn(request, env, ctx);
	},
};
