import { createContext } from "react";
import { initialState } from "@/components/themes/initialState";
import type { ThemeProviderState } from "@/components/themes/theme-provider";

export const ThemeProviderContext =
	createContext<ThemeProviderState>(initialState);
