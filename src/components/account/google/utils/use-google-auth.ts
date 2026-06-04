import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { initSync } from "@/components/account/google/utils/drive-sync";
import {
	G_ACCESS_TOKEN_SESSION,
	G_LOCAL_EMAIL,
	GOOGLE_LOCAL_DESTROY,
} from "@/constants";

type UseGoogleAuthProps = {
	syncOnLoad?: boolean;
};

export function useGoogleAuth(props?: UseGoogleAuthProps) {
	const [status, setStatus] = useState<"loading" | "in" | "out">("out");
	const [email, setEmail] = useState("");
	const { syncOnLoad } = props || {};

	const login = useGoogleLogin({
		flow: "auth-code",

		onSuccess: async (tokenResponse) => {
			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ code: tokenResponse.code }),
			});

			if (!res.ok) {
				setStatus("out");
				return;
			}

			const tokens = await res.json();

			const response = await fetch(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${tokens.access_token}`,
						Accept: "application/json",
					},
				},
			);

			sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, tokens.access_token);

			if (!response.ok) {
				throw new Error("Failed to fetch user info");
			}

			const data = await response.json();
			localStorage.setItem(G_LOCAL_EMAIL, data.email);
			setEmail(data.email);

			setStatus("in");

			initSync();
		},

		onError: () => setStatus("out"),

		scope: "email profile https://www.googleapis.com/auth/drive.appdata",
	});

	const logout = async () => {
		googleLogout();

		await fetch("/api/auth/google-logout", {
			method: "GET",
		});

		GOOGLE_LOCAL_DESTROY.forEach((key) => {
			localStorage.removeItem(key);
		});

		sessionStorage.clear();

		setEmail("");

		setStatus("out");
	};

	const checkSession = async () => {
		let sessionStatus = status;
		console.log("Checking session");
		try {
			const res = await fetch("/api/auth/google-session", {
				method: "GET",
			});

			if (res.ok) {
				setStatus("in");
				sessionStatus = "in";

				const tokens = await res.json();

				sessionStorage.setItem(G_ACCESS_TOKEN_SESSION, tokens.access_token);

				const email = localStorage.getItem(G_LOCAL_EMAIL);
				setEmail(email as string);

				if (syncOnLoad) {
					initSync();
				}
			} else {
				setStatus("out");
				sessionStatus = "out";
			}
		} catch {
			setStatus("out");
			sessionStatus = "out";
		}

		console.log("Done checking session. Status:", sessionStatus);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: adding checkSession to dep has another error
	useEffect(() => {
		// this will be called twice, but if i only call this once
		// the status state is not updated properly
		checkSession();
	}, []);

	return { login, logout, status, email };
}
