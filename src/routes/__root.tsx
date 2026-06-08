import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useGoogleUnloadGuard } from "@/components/account/google/utils/use-google-unload-guard";
import { SyncConflictDialog } from "@/components/sync/sync-alert-dialog";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { GC_TIME, STALE_TIME } from "@/constants";
import { AppProvider } from "@/context/app-provider";
import Header from "../components/header";
import appCss from "../styles.css?url";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: STALE_TIME,
			gcTime: GC_TIME,
		},
	},
});

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Mongil: Star Dive Tracker",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
		scripts: [
			// {
			// 	src: "",
			// },
		],
	}),
	shellComponent: RootDocument,
});

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage,
});

export type Sidebar = {
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function RootDocument({ children }: { children: React.ReactNode }) {
	useGoogleUnloadGuard();

	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)] min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
				<ThemeProvider defaultTheme="dark" storageKey="theme">
					<AppProvider>
						<GoogleOAuthProvider
							clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
						>
							<PersistQueryClientProvider
								client={queryClient}
								persistOptions={{ persister: asyncStoragePersister }}
							>
								<SyncConflictDialog />

								<div className="flex h-screen bg-background overflow-hidden">
									<Header
										sidebarOpen={sidebarOpen}
										setSidebarOpen={setSidebarOpen}
									/>

									<main className="flex-1 overflow-y-auto bg-background w-full">
										<div className="lg:hidden sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-end">
											<button
												type="button"
												onClick={() => setSidebarOpen(true)}
												className="text-muted-foreground hover:text-foreground p-2"
											>
												<Menu className="size-6" />
											</button>
										</div>

										<div className="my-5 mx-5 mb-30">{children}</div>
									</main>
								</div>

								<Toaster />

								<TanStackDevtools
									config={{
										position: "bottom-right",
									}}
									plugins={[
										{
											name: "Tanstack Router",
											render: <TanStackRouterDevtoolsPanel />,
										},
										{
											name: "TanStack Query",
											render: <ReactQueryDevtoolsPanel />,
										},
									]}
								/>
							</PersistQueryClientProvider>
						</GoogleOAuthProvider>
					</AppProvider>
				</ThemeProvider>

				<Scripts />
			</body>
		</html>
	);
}
