import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/themes/use-theme";

export function ModeToggleBtn() {
	const { setTheme, theme } = useTheme();

	const darkMode = theme === "dark";

	return (
		<button
			onClick={() => {
				setTheme(darkMode ? "light" : "dark");
			}}
			className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
			aria-label="Toggle dark mode"
			type="button"
		>
			{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
		</button>
	);
}
