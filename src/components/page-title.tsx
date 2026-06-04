import type React from "react";

type PageTitleProps = {
	title: string;
	description: string;
	aside?: React.ReactNode;
};

export const PageTitle = ({
	title,
	description,
	aside = null,
}: PageTitleProps) => {
	return (
		<div className="mb-8 flex items-start justify-between">
			<div>
				<h2 className="text-2xl font-semibold mb-2">{title}</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{description}
				</p>
			</div>
			<div>{aside}</div>
		</div>
	);
};
