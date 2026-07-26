import { describe, expect, it } from "vitest";
import { EVENTS_DATA } from "@/data/EVENTS_DATA";
import {
	formatCountdown,
	getChecklistStatus,
	getOccurrence,
	occurrenceKey,
} from "@/lib/checklist";

const SUMMER_DIVE_NOTICE_TITLE =
	"7/7 (Tue)「An Unforgettable First Summer Dive!」Event Notice";
const DAY = 86_400_000;
const checkInEvent = EVENTS_DATA[0];

const expectedSummerEvents = [
	[
		"grand-summer-festival-missions",
		"Grand Summer Festival Missions",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-07-28T23:59:00.000Z",
		"none",
	],
	[
		"unforgettable-first-summer-dive-event-stage",
		"An Unforgettable First Summer Dive! — Event Stage/Summer Bounce",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-07-28T23:59:00.000Z",
		"none",
	],
	[
		"unforgettable-first-summer-dive-shop-story-missions",
		"An Unforgettable First Summer Dive! — Shop/Story/Missions",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-08-04T23:59:00.000Z",
		"none",
	],
	[
		"slicing-through-the-summer-days",
		"Slicing Through the Summer Days",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-07-28T23:59:00.000Z",
		"none",
	],
	[
		"embracing-even-the-summer-heat",
		"Embracing Even the Summer Heat",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-07-28T23:59:00.000Z",
		"none",
	],
	[
		"summer-special-7-day-gifts",
		"Summer Special 7-Day Gifts",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-07-28T23:59:00.000Z",
		"daily",
	],
	[
		"monsterling-trait-change-support",
		"Monsterling Trait Change Support",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-08-18T23:59:00.000Z",
		"none",
	],
	[
		"legendary-monster-reginula-power-up-support",
		"Legendary Monster Reginula Power Up Support",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-07T00:00:00.000Z",
		"2026-08-18T23:59:00.000Z",
		"none",
	],
	[
		"invitation-to-break-the-ice",
		"An Invitation to Break the Ice",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-22T00:00:00.000Z",
		"2026-07-28T23:59:00.000Z",
		"none",
	],
	[
		"anomaly-gulgak",
		"Anomaly: Gulgak",
		SUMMER_DIVE_NOTICE_TITLE,
		"2026-07-15T00:00:00.000Z",
		"2026-07-28T23:59:00.000Z",
		"daily",
	],
	[
		"cool-summer-vacation-login-reward",
		"Cool Summer Vacation! Login Reward Event",
		"7/15 (Wed) Cool Summer Vacation! Login Reward Event",
		"2026-07-15T10:00:00.000Z",
		"2026-07-22T09:59:00.000Z",
		"none",
	],
] as const;

describe("checklist UTC scheduling", () => {
	it("records the published anniversary events with exact UTC timestamps", () => {
		expect(EVENTS_DATA.slice(0, 2)).toEqual([
			{
				id: "100-day-launch-anniversary-check-in",
				title: "100 Day Launch Anniversary 14-Day Check-In Pass",
				noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
				kind: "event",
				startAt: "2026-07-22T00:00:00.000Z",
				endAt: "2026-08-11T23:59:00.000Z",
				recurrence: "daily",
			},
			{
				id: "100-day-anniversary-bonus-time",
				title: "Bonus Time Event",
				noticeTitle: "MONGIL: STAR DIVE 100-Day Anniversary Events Notice",
				kind: "event",
				startAt: "2026-07-22T00:00:00.000Z",
				endAt: "2026-07-28T23:59:00.000Z",
				recurrence: "daily",
			},
		]);
	});

	it.each(
		expectedSummerEvents,
	)("records %s with its published UTC period", (id, title, noticeTitle, startAt, endAt, recurrence) => {
		expect(EVENTS_DATA.find((event) => event.id === id)).toEqual({
			id,
			title,
			noticeTitle,
			kind: "event",
			startAt,
			endAt,
			recurrence,
		});
	});

	it.each(
		EVENTS_DATA.filter((event) => event.recurrence === "daily"),
	)("refreshes $title completion keys at 00:00 UTC", (event) => {
		const start = Date.parse(event.startAt);
		const before = getOccurrence(event, start + DAY - 60_000);
		const after = getOccurrence(event, start + DAY + 60_000);

		expect(before.startAt).toBe(start);
		expect(after.startAt).toBe(start + DAY);
		expect(occurrenceKey(event, before.startAt)).not.toBe(
			occurrenceKey(event, after.startAt),
		);
	});

	it("refreshes weekly completion keys on Monday at 00:00 UTC", () => {
		const weekly = {
			...checkInEvent,
			id: "weekly-shop",
			recurrence: "weekly" as const,
			startAt: "2026-07-27T00:00:00.000Z",
		};
		const before = getOccurrence(
			weekly,
			Date.parse("2026-08-02T23:59:00.000Z"),
		);
		const after = getOccurrence(weekly, Date.parse("2026-08-03T00:01:00.000Z"));

		expect(before.startAt).toBe(Date.parse("2026-07-27T00:00:00.000Z"));
		expect(after.startAt).toBe(Date.parse("2026-08-03T00:00:00.000Z"));
		expect(occurrenceKey(weekly, before.startAt)).not.toBe(
			occurrenceKey(weekly, after.startAt),
		);
	});

	it("keeps elapsed time and expiry independent of display timezone", () => {
		expect(formatCountdown(8 * 60 * 60_000)).toBe("8h 0m");
		for (const event of EVENTS_DATA) {
			const end = Date.parse(event.endAt);
			expect(getChecklistStatus(event, getOccurrence(event, end), end)).toBe(
				"expired",
			);
		}
	});
});
