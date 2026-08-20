import { afterEach, describe, expect, it, vi } from "vitest";
import { handleGoogleSession } from "./-google-session-handler.server";

const request = (reason?: string, cookie = "G_REFRESH_TOKEN_COOKIE=refresh") =>
	new Request(
		`https://example.com/api/auth/google-session${reason ? `?reason=${reason}` : ""}`,
		{ headers: { cookie } },
	);
const config = { clientId: "client", clientSecret: "secret" };

afterEach(() => vi.unstubAllGlobals());

describe("Google session refresh handler", () => {
	it.each([
		["null", null],
		["array", []],
	])("rejects a successful %s Google response", async (_name, body) => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				json: async () => body,
			}),
		);

		expect(
			(await handleGoogleSession(request("manual-retry"), config)).status,
		).toBe(502);
	});

	it("rejects invalid reasons and missing refresh cookies", async () => {
		expect((await handleGoogleSession(request("other"), config)).status).toBe(
			400,
		);
		expect(
			(await handleGoogleSession(request(undefined, ""), config)).status,
		).toBe(401);
	});

	it("rejects an upstream failure without exposing its response", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({ ok: false, status: 401 }),
		);

		const response = await handleGoogleSession(request(), config);
		expect(response.status).toBe(502);
		expect(await response.json()).toEqual({ error: "Google refresh failed" });
	});

	it("returns a refreshed token for a valid Google response", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				json: async () => ({ access_token: "access" }),
			}),
		);

		const response = await handleGoogleSession(request("drive-401"), config);
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ access_token: "access" });
	});

	it("logs only the marker, reason, and status", async () => {
		const log = vi.spyOn(console, "info").mockImplementation(() => undefined);
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({ ok: false, status: 401 }),
		);

		await handleGoogleSession(request("manual-retry"), config);

		for (const call of log.mock.calls) {
			expect(call[0]).toBe("MSD_GOOGLE_DRIVE_SYNC");
			expect(call[1]).toEqual(
				expect.objectContaining({ reason: "manual-retry" }),
			);
			expect(Object.keys(call[1] as object)).toEqual(["reason", "status"]);
		}
	});
});
