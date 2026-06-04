import { useContext } from "react";
import { AppProviderContext } from "@/context/app-provider-context";

export const useApp = () => {
	const context = useContext(AppProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within an AppProvider");

	return context;
};
