import { useEffect, useState } from "react";

export const useChecklistNow = () => {
	const [now, setNow] = useState<number | null>(null);
	useEffect(() => {
		let timer: number;
		const update = () => {
			const currentTime = Date.now();
			setNow(currentTime);
			timer = window.setTimeout(update, 60_000 - (currentTime % 60_000));
		};
		update();
		return () => window.clearTimeout(timer);
	}, []);
	return now;
};
