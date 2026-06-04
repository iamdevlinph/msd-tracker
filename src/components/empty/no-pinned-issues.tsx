import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { EmptySection } from "@/components/empty/empty-section";
import { Button } from "@/components/ui/button";

export const NoPinnedIssues = () => {
	return (
		<EmptySection
			title="No Pinned Issues"
			description="You don't have any pinned issues yet."
			icon={<Star />}
		>
			<Link to="/issues">
				<Button variant="outline">All Issues</Button>
			</Link>
		</EmptySection>
	);
};
