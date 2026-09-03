import { ScriptOnce } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeProviderContext } from "@/components/themes/theme-provider-context";
import { getThemeScript } from "@/components/themes/theme-script";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

export type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.classList.remove("light", "dark");

	const resolved =
		theme === "system"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
			: theme;

	root.classList.add(resolved);
	root.style.colorScheme = resolved;
}

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "theme",
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(defaultTheme);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(storageKey);
		setThemeState(
			stored === "light" || stored === "dark" || stored === "system"
				? stored
				: defaultTheme,
		);
		setMounted(true);
	}, [defaultTheme, storageKey]);

	useEffect(() => {
		if (!mounted) return;
		applyTheme(theme);
	}, [theme, mounted]);

	useEffect(() => {
		if (!mounted || theme !== "system") return;

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme("system");
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [theme, mounted]);

	const setTheme = (next: Theme) => {
		localStorage.setItem(storageKey, next);
		setThemeState(next);
	};

	return (
		<ThemeProviderContext value={{ theme, setTheme }}>
			<ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
			{children}
		</ThemeProviderContext>
	);
}
