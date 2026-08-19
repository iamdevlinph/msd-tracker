import { type KeyboardEvent, useRef } from "react";
import { Input } from "@/components/ui/input";

const CLEAR_TIME_SEGMENTS = [
	[0, 2],
	[3, 5],
	[6, 8],
] as const;

const formatClearTime = (raw: string): string => {
	const digits = raw.replace(/\D/g, "").slice(0, 6).padEnd(6, "0");
	return `${digits.slice(0, 2)}:${digits.slice(2, 4)}.${digits.slice(4)}`;
};

type LoadoutSnapshotClearTimeInputProps = {
	value: string;
	onChange: (value: string) => void;
	error?: string;
};

export const LoadoutSnapshotClearTimeInput = ({
	value,
	onChange,
	error,
}: LoadoutSnapshotClearTimeInputProps) => {
	const segment = useRef(0);
	const digit = useRef(0);
	const selectSegment = (
		input: HTMLInputElement,
		segmentIndex: number,
		defer = false,
	) => {
		segment.current = segmentIndex;
		digit.current = 0;
		const [start, end] = CLEAR_TIME_SEGMENTS[segmentIndex];
		const select = () => input.setSelectionRange(start, end);
		if (defer) requestAnimationFrame(select);
		else select();
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const input = event.currentTarget;
		if (/^\d$/.test(event.key)) {
			event.preventDefault();
			const segmentIndex = segment.current;
			const digitIndex = digit.current;
			const position = CLEAR_TIME_SEGMENTS[segmentIndex][0] + digitIndex;
			const characters = value.split("");
			characters[position] = event.key;
			onChange(characters.join(""));
			if (digitIndex === 1) {
				selectSegment(
					input,
					Math.min(segmentIndex + 1, CLEAR_TIME_SEGMENTS.length - 1),
					true,
				);
			} else {
				digit.current = 1;
				input.setSelectionRange(position + 1, position + 2);
			}
			return;
		}
		if (event.key === "Backspace" || event.key === "Delete") {
			event.preventDefault();
			const [start, end] = CLEAR_TIME_SEGMENTS[segment.current];
			onChange(`${value.slice(0, start)}00${value.slice(end)}`);
			selectSegment(input, segment.current, true);
		}
	};
	return (
		<label
			htmlFor="snapshot-clear-time"
			className="grid gap-2 text-sm font-medium"
		>
			Clear time
			<Input
				id="snapshot-clear-time"
				inputMode="numeric"
				placeholder="MM:SS.cc"
				value={value}
				onFocus={(event) => selectSegment(event.currentTarget, 0)}
				onClick={(event) => selectSegment(event.currentTarget, 0)}
				onKeyDown={handleKeyDown}
				onChange={(event) =>
					onChange(formatClearTime(event.currentTarget.value))
				}
				onPaste={(event) => {
					event.preventDefault();
					onChange(formatClearTime(event.clipboardData.getData("text")));
					selectSegment(event.currentTarget, 2, true);
				}}
			/>
			{error && <span className="text-xs text-destructive">{error}</span>}
		</label>
	);
};
