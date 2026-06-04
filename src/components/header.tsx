import { GitPullRequest, Menu } from "lucide-react";
import { useGoogleAuth } from "@/components/account/google/utils/use-google-auth";
import { Nav } from "@/components/navigation";
import { ModeToggleBtn } from "@/components/themes/mode-toggle-btn";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
	useGoogleAuth({ syncOnLoad: true });

	return (
		<header className="border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950">
			<div className="px-6 py-4 flex items-center justify-between">
				<div className="flex items-center gap-8">
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger>
								<Menu />
							</SheetTrigger>
							<SheetContent showCloseButton={false}>
								<SheetTitle className="sr-only">menu</SheetTitle>
								<Nav isMobile />
							</SheetContent>
						</Sheet>
					</div>

					<div className="hidden md:flex items-center gap-3">
						<GitPullRequest className="w-6 h-6" />
						<h1 className="text-xl font-semibold">GitHub Issues Tracker</h1>
						<Nav />
					</div>
				</div>
				<ModeToggleBtn />
			</div>
		</header>
	);
}
