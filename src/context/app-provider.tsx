import type { ReactNode } from "react";
import { AppProviderContext } from "@/context/app-provider-context";

export type AppProviderState = {};

type AppProviderProps = {
	children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
	return <AppProviderContext value={{}}>{children}</AppProviderContext>;
}
