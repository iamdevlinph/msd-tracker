import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fmt = (ts: number) => new Date(ts).toLocaleString();

export function createZodEnumFromObject<
	T extends Record<string, string | number>,
>(obj: T) {
	const values = Object.values(obj) as T[keyof T][];

	return z.union(
		values.map((v) => z.literal(v)) as [
			z.ZodLiteral<T[keyof T]>,
			...z.ZodLiteral<T[keyof T]>[],
		],
	);
}
