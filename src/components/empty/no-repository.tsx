import { ManageGithubAccess } from "@/components/account/manage-github-access";
import { EmptySection } from "@/components/empty/empty-section";

export const NoRepository = () => {
	return (
		<EmptySection
			title="No Repositories"
			description="You don't have accessible repositories."
		>
			<ManageGithubAccess />
		</EmptySection>
	);
};
