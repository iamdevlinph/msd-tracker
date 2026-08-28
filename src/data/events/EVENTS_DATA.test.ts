import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/events/EVENTS_DATA";

describe("EVENTS_DATA", () => {
	it("does not retain retired official event records", () => {
		expect(EVENTS_DATA.map(({ id }) => id)).not.toEqual(
			expect.arrayContaining([
				"100-day-launch-anniversary-check-in",
				"20260807-CAT-DAY",
				"monsterling-trait-change-support",
				"legendary-monster-reginula-power-up-support",
				"inquisitors-day-off-event-stage-inquisition",
				"arbiters-divine-indulgence",
				"inquisitor-mabel-7-day-gifts",
				"special-missions-with-mabel",
				"mabel-invitation-to-break-the-ice",
				"anomaly-blue-shadow",
				"mabel-character-trivia-discord",
				"forum.netmarble.com/stardive_gl/view/6/521-10-day-check-in",
				"forum.netmarble.com/stardive_gl/view/6/531-bonus-time-event",
				"inquisitors-day-off-shop-story-missions",
				"equipment-crafting-mission",
				"brisshell-screenshot-event-discord",
			]),
		);
		expect(EVENTS_DATA).toHaveLength(10);
	});

	it("imports the Brisshell notice periods and published recurrence metadata", () => {
		const brisshellEvents = EVENTS_DATA.filter(
			({ noticeUrl }) =>
				noticeUrl?.includes("/548#:~:text=") ||
				noticeUrl?.includes("/556#:~:text="),
		);
		expect(brisshellEvents).toHaveLength(8);
		expect(brisshellEvents.filter((event) => event.noticeUrl)).toHaveLength(8);
		expect(
			brisshellEvents.filter((event) =>
				event.noticeUrl?.includes("/548#:~:text="),
			),
		).toHaveLength(8);
		expect(
			brisshellEvents.filter((event) =>
				event.noticeUrl?.includes("/556#:~:text="),
			),
		).toHaveLength(0);
		const expectedNoticeUrls = {
			"tons-of-recruitment-tickets-check-in-streak-gift":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Tons%20of%20Recruitment%20Tickets!%20Check-In%20Streak%20Gift",
			"girl-from-the-void-event-stage-brisshells-link-rush":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Girl%20from%20the%20Void%20%E2%80%94%20Event%20Stage%2FBrisshell%E2%80%99s%20Link%20Rush",
			"girl-from-the-void-shop-story-missions":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Girl%20from%20the%20Void%20%E2%80%94%20Shop%2FStory%2FMissions",
			"th-this-is-for-being-my-friend":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Th-this%20is%20for%20being%20my%20friend...",
			"brisshells-7-day-gifts":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Brisshell%E2%80%99s%207-Day%20Gifts",
			"special-missions-with-brisshell":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Special%20Missions%20with%20Brisshell",
			"anomaly-el-dorado-guardian":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Anomaly%3A%20El%20Dorado%20Guardian",
			"brisshell-an-invitation-to-break-the-ice":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=An%20Invitation%20to%20Break%20the%20Ice",
		} as const;
		for (const [id, noticeUrl] of Object.entries(expectedNoticeUrls)) {
			expect(EVENTS_DATA.find((event) => event.id === id)).toMatchObject({
				id,
				noticeUrl,
			});
		}
		expect(brisshellEvents.map(({ noticeTitle }) => noticeTitle)).toEqual([
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
		]);

		const expectedEvents = {
			"tons-of-recruitment-tickets-check-in-streak-gift": [
				"2026-08-19T05:30:00.000Z",
				"2026-09-02T05:30:00.000Z",
				"daily",
			],
			"girl-from-the-void-event-stage-brisshells-link-rush": [
				"2026-08-19T05:30:00.000Z",
				"2026-09-08T23:59:00.000Z",
				"none",
			],
			"girl-from-the-void-shop-story-missions": [
				"2026-08-19T05:30:00.000Z",
				"2026-09-15T23:59:00.000Z",
				"none",
			],
			"th-this-is-for-being-my-friend": [
				"2026-08-19T05:30:00.000Z",
				"2026-09-08T23:59:00.000Z",
				"none",
			],
			"brisshells-7-day-gifts": [
				"2026-08-19T05:30:00.000Z",
				"2026-09-08T23:59:00.000Z",
				"daily",
			],
			"special-missions-with-brisshell": [
				"2026-08-19T05:30:00.000Z",
				"2026-09-08T23:59:00.000Z",
				"none",
			],
			"anomaly-el-dorado-guardian": [
				"2026-08-26T00:00:00.000Z",
				"2026-09-08T23:59:00.000Z",
				"daily",
			],
			"brisshell-an-invitation-to-break-the-ice": [
				"2026-09-02T00:00:00.000Z",
				"2026-09-08T23:59:00.000Z",
				"none",
			],
		} as const;

		for (const [id, [startAt, endAt, recurrence]] of Object.entries(
			expectedEvents,
		)) {
			expect(EVENTS_DATA.find((event) => event.id === id)).toMatchObject({
				id,
				startAt,
				endAt,
				recurrence,
			});
		}

		for (const id of [
			"tons-of-recruitment-tickets-check-in-streak-gift",
			"brisshells-7-day-gifts",
			"anomaly-el-dorado-guardian",
		]) {
			expect(EVENTS_DATA.find((event) => event.id === id)).not.toHaveProperty(
				"recurrenceStartAt",
			);
		}
	});

	it("imports the August 26 notice periods and published recurrence metadata", () => {
		const expectedEvents = {
			"combine-monsterlings-missions": {
				noticeUrl:
					"https://forum.netmarble.com/stardive_gl/view/6/565#:~:text=Combine%20Monsterlings%20Missions",
				startAt: "2026-08-26T00:00:00.000Z",
				endAt: "2026-09-01T23:59:00.000Z",
				recurrence: "none",
			},
			"10-day-check-in-mission": {
				noticeUrl:
					"https://forum.netmarble.com/stardive_gl/view/6/565#:~:text=10-Day%20Check-In%20Mission",
				startAt: "2026-08-26T00:00:00.000Z",
				endAt: "2026-09-08T23:59:00.000Z",
				recurrence: "daily",
			},
		} as const;

		for (const [id, expectedEvent] of Object.entries(expectedEvents)) {
			expect(EVENTS_DATA.find((event) => event.id === id)).toMatchObject({
				id,
				noticeTitle: "8/26 (Wed) Event Notice",
				...expectedEvent,
			});
		}
		expect(
			EVENTS_DATA.find((event) => event.id === "10-day-check-in-mission"),
		).not.toHaveProperty("recurrenceStartAt");
	});

	it("defines unique, valid UTC event periods and optional reset anchors", () => {
		expect(new Set(EVENTS_DATA.map(({ id }) => id)).size).toBe(
			EVENTS_DATA.length,
		);

		for (const event of EVENTS_DATA) {
			expect(event.startAt).toMatch(/Z$/);
			expect(event.endAt).toMatch(/Z$/);
			expect(Date.parse(event.startAt)).toBeLessThan(Date.parse(event.endAt));
			if (event.recurrenceStartAt) {
				expect(event.recurrenceStartAt).toMatch(/Z$/);
				expect(Date.parse(event.recurrenceStartAt)).not.toBeNaN();
			}
		}
	});
});
