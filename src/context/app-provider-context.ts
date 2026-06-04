import { createContext } from "react";
import { appInitialState } from "@/context/app-initial-state";
import type { AppProviderState } from "@/context/app-provider";

export const AppProviderContext =
	createContext<AppProviderState>(appInitialState);
