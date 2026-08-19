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
			]),
		);
		expect(EVENTS_DATA).toHaveLength(11);
		expect(EVENTS_DATA.map(({ id }) => id)).toContain(
			"inquisitors-day-off-shop-story-missions",
		);
	});

	it("imports the Brisshell notice periods and published recurrence metadata", () => {
		const brisshellEvents = EVENTS_DATA.filter(
			({ id }) => id !== "inquisitors-day-off-shop-story-missions",
		);
		expect(brisshellEvents).toHaveLength(10);
		expect(brisshellEvents.filter((event) => event.noticeUrl)).toHaveLength(10);
		expect(
			brisshellEvents.filter((event) =>
				event.noticeUrl?.includes("/548#:~:text="),
			),
		).toHaveLength(9);
		expect(
			brisshellEvents.filter((event) =>
				event.noticeUrl?.includes("/556#:~:text="),
			),
		).toHaveLength(1);
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
			"equipment-crafting-mission":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Equipment%20Crafting%20Mission",
			"anomaly-el-dorado-guardian":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=Anomaly%3A%20El%20Dorado%20Guardian",
			"brisshell-an-invitation-to-break-the-ice":
				"https://forum.netmarble.com/stardive_gl/view/6/548#:~:text=An%20Invitation%20to%20Break%20the%20Ice",
			"brisshell-screenshot-event-discord":
				"https://forum.netmarble.com/stardive_gl/view/6/556#:~:text=Brisshell%20Screenshot%20Event",
		} as const;
		for (const [id, noticeUrl] of Object.entries(expectedNoticeUrls)) {
			expect(EVENTS_DATA.find((event) => event.id === id)).toMatchObject({
				id,
				noticeUrl,
			});
		}
		expect(
			brisshellEvents.find(
				(event) => event.id === "brisshell-screenshot-event-discord",
			),
		).toMatchObject({
			noticeTitle:
				"8/19 (Wed) 「The Girl from the Void」Brisshell Screenshot Event Notice",
			noticeUrl:
				"https://forum.netmarble.com/stardive_gl/view/6/556#:~:text=Brisshell%20Screenshot%20Event",
			startAt: "2026-08-19T05:25:23.088Z",
		});
		expect(brisshellEvents.map(({ noticeTitle }) => noticeTitle)).toEqual([
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/18 (Tue) [Girl from the Void] Event Notice",
			"8/19 (Wed) 「The Girl from the Void」Brisshell Screenshot Event Notice",
		]);
		expect(
			EVENTS_DATA.find(
				(event) => event.id === "inquisitors-day-off-shop-story-missions",
			),
		).not.toHaveProperty("noticeUrl");

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
			"equipment-crafting-mission": [
				"2026-08-19T05:30:00.000Z",
				"2026-08-25T23:59:00.000Z",
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
			"brisshell-screenshot-event-discord": [
				"2026-08-19T05:25:23.088Z",
				"2026-08-26T01:00:00.000Z",
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

		expect(
			EVENTS_DATA.find(
				(event) => event.id === "brisshell-screenshot-event-discord",
			),
		).toMatchObject({ participation: "discord" });
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
