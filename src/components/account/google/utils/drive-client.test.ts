// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	driveFetch,
	refreshGoogleAccessToken,
} from "@/components/account/google/utils/drive-client";
import { G_ACCESS_TOKEN_SESSION } from "@/constants";

afterEach(() => {
	vi.unstubAllGlobals();
	sessionStorage.removeItem(G_ACCESS_TOKEN_SESSION);
});

describe("Drive access token recovery", () => {
	it("refreshes before a request when the token is missing", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({
				ok: true,
				status: 200,
				json: async () => ({ access_token: "new" }),
			})
			.mockResolvedValueOnce({ ok: true, status: 200 });
		vi.stubGlobal("fetch", fetchMock);

		await driveFetch("/drive");

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(fetchMock.mock.calls[1][1].headers.Authorization).toBe("Bearer new");
	});

	it("replays one request after a 401", async () => {
		sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, "expired");
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({ ok: false, status: 401 })
			.mockResolvedValueOnce({
				ok: true,
				status: 200,
				json: async () => ({ access_token: "new" }),
			})
			.mockResolvedValueOnce({ ok: true, status: 200 });
		vi.stubGlobal("fetch", fetchMock);

		await driveFetch("/drive");

		expect(fetchMock).toHaveBeenCalledTimes(3);
		expect(fetchMock.mock.calls[2][1].headers.Authorization).toBe("Bearer new");
	});

	it("does not replay a second 401", async () => {
		sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, "expired");
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({ ok: false, status: 401 })
			.mockResolvedValueOnce({
				ok: true,
				status: 200,
				json: async () => ({ access_token: "new" }),
			})
			.mockResolvedValueOnce({ ok: false, status: 401 });
		vi.stubGlobal("fetch", fetchMock);

		const response = await driveFetch("/drive");

		expect(response.status).toBe(401);
		expect(fetchMock).toHaveBeenCalledTimes(3);
	});

	it("rejects a refresh response without an access token", async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({}),
		});
		vi.stubGlobal("fetch", fetchMock);

		await expect(refreshGoogleAccessToken("manual-retry")).rejects.toThrow(
			"no token",
		);
		expect(fetchMock).toHaveBeenCalledOnce();
	});

	it("does not store a token after an aborted refresh", async () => {
		const controller = new AbortController();
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ access_token: "late" }),
		});
		vi.stubGlobal("fetch", fetchMock);
		controller.abort();

		await expect(
			driveFetch("/drive", { signal: controller.signal }),
		).rejects.toMatchObject({ name: "AbortError" });
		expect(sessionStorage.getItem(G_ACCESS_TOKEN_SESSION)).toBeNull();
	});
});
