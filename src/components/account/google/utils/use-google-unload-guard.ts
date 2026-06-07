import { useEffect } from "react";
import { useStore } from "@/stores/app-store";

export function useGoogleUnloadGuard() {
	const syncInProgress = useStore((s) => s.syncInProgress);

	useEffect(() => {
		const handler = (e: BeforeUnloadEvent) => {
			if (!syncInProgress) return;

			e.preventDefault();
			e.returnValue = "";
		};

		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [syncInProgress]);
}
