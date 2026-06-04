import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function useGoogleUnloadGuard() {
	const syncInProgress = useAuthStore((s) => s.syncInProgress);

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
