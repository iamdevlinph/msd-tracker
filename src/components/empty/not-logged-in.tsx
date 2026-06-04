import { Link } from "@tanstack/react-router";
import { EmptySection } from "@/components/empty/empty-section";
import { Button } from "@/components/ui/button";

export const NotLoggedIn = () => {
	return (
		<EmptySection
			title="Not Logged In"
			description="You are currently not logged in."
		>
			<Link to="/account">
				<Button variant="outline">Account</Button>
			</Link>
		</EmptySection>
	);
};
