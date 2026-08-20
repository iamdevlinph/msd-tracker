import { createFileRoute } from "@tanstack/react-router";
import { handleGoogleSession } from "./-google-session-handler.server";

export const Route = createFileRoute("/api/auth/google-session")({
	server: {
		handlers: {
			GET: ({ request }) =>
				handleGoogleSession(request, {
					clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
				}),
		},
	},
});
