/** Returns a timestamp that always advances for durable store mutations. */
export function nextBackupUpdatedAt(previous: number) {
	return Math.max(Date.now(), previous + 1);
}
