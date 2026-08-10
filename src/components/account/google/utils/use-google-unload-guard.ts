import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";

export function useGoogleUnloadGuard() {
	const syncStatus = useAppStore((s) => s.syncStatus);

	useEffect(() => {
		const handler = (e: BeforeUnloadEvent) => {
			if (syncStatus === "idle") return;

			e.preventDefault();
			e.returnValue = "";
		};

		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [syncStatus]);
}
