import { readableColor } from "common-utils-pkg";

type IssueLabelProps = {
	label: string;
	color: string;
};

export function IssueLabel({ label, color }: IssueLabelProps) {
	const bg = `#${color}`;

	const text = readableColor(color);

	return (
		<div
			className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border"
			style={{
				backgroundColor: bg,

				color: text,

				borderColor: "rgba(0,0,0,0.1)",
			}}
		>
			{label}
		</div>
	);
}
