import { type ReactNode, useState } from "react";
import { AppProviderContext } from "@/context/app-provider-context";

export type AppProviderState = {
	selectedRepo: string;
	setSelectedRepo: React.Dispatch<React.SetStateAction<string>>;
};

type AppProviderProps = {
	children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
	const [selectedRepo, setSelectedRepo] = useState("");
	return (
		<AppProviderContext value={{ selectedRepo, setSelectedRepo }}>
			{children}
		</AppProviderContext>
	);
}
