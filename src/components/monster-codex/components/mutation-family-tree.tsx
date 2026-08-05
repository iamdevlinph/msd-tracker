import {
	type PointerEvent,
	type RefObject,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type { MonsterlingMutationFamily } from "@/components/monster-codex/utils/mutation-family";
import {
	getMutationFamilyLayout,
	MUTATION_NODE_HEIGHT,
	MUTATION_NODE_WIDTH,
	MUTATION_ROW_GAP,
} from "@/components/monster-codex/utils/mutation-family-layout";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";

type MutationFamilyTreeProps = {
	family: MonsterlingMutationFamily;
	selectedMonsterlingId: number;
	shouldAutoFrame: boolean;
	onSelectMonsterling: (monsterlingId: number) => void;
	scrollContainerRef: RefObject<HTMLElement | null>;
};

type MutationTreePan = {
	pointerId: number;
	startX: number;
	startY: number;
	scrollLeft: number;
	scrollTop: number;
};

export const MutationFamilyTree = ({
	family,
	selectedMonsterlingId,
	shouldAutoFrame,
	onSelectMonsterling,
	scrollContainerRef,
}: MutationFamilyTreeProps) => {
	const { occurrences, recipeConnections, width, height } = useMemo(
		() => getMutationFamilyLayout(family),
		[family],
	);
	const panRef = useRef<MutationTreePan | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	useLayoutEffect(() => {
		if (!shouldAutoFrame) return;
		const occurrence = occurrences.find(
			(candidate) => candidate.monsterlingId === selectedMonsterlingId,
		);
		if (!occurrence) return;
		const container = scrollContainerRef.current;
		if (!container || container.clientWidth <= 0 || container.clientHeight <= 0)
			return;
		const directIngredientKeys =
			recipeConnections.find(
				(connection) => connection.resultKey === occurrence.key,
			)?.ingredientKeys ?? [];
		const targets = [
			occurrence,
			...directIngredientKeys.map((key) =>
				occurrences.find((candidate) => candidate.key === key),
			),
		].filter((candidate): candidate is typeof occurrence => Boolean(candidate));
		const minX = Math.min(...targets.map(({ x }) => x));
		const maxX = Math.max(...targets.map(({ x }) => x + MUTATION_NODE_WIDTH));
		const minY = Math.min(...targets.map(({ y }) => y));
		const maxY = Math.max(...targets.map(({ y }) => y + MUTATION_NODE_HEIGHT));
		const fullyVisible =
			minX >= container.scrollLeft &&
			maxX <= container.scrollLeft + container.clientWidth &&
			minY >= container.scrollTop &&
			maxY <= container.scrollTop + container.clientHeight;
		if (fullyVisible) return;
		container.scrollLeft = Math.min(
			Math.max(0, minX - (container.clientWidth - (maxX - minX)) / 2),
			Math.max(0, width - container.clientWidth),
		);
		container.scrollTop = Math.min(
			Math.max(0, minY - (container.clientHeight - (maxY - minY)) / 2),
			Math.max(0, height - container.clientHeight),
		);
	}, [
		height,
		occurrences,
		recipeConnections,
		scrollContainerRef,
		selectedMonsterlingId,
		shouldAutoFrame,
		width,
	]);

	const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
		if (
			event.button !== 0 ||
			(event.target as HTMLElement).closest("button") !== null
		) {
			return;
		}
		panRef.current = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			scrollLeft: event.currentTarget.scrollLeft,
			scrollTop: event.currentTarget.scrollTop,
		};
		event.currentTarget.setPointerCapture?.(event.pointerId);
		setIsDragging(true);
	};

	const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
		const pan = panRef.current;
		if (!pan || pan.pointerId !== event.pointerId) return;
		event.preventDefault();
		event.currentTarget.scrollLeft =
			pan.scrollLeft - (event.clientX - pan.startX);
		event.currentTarget.scrollTop =
			pan.scrollTop - (event.clientY - pan.startY);
	};

	const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
		if (panRef.current?.pointerId !== event.pointerId) return;
		if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
		panRef.current = null;
		setIsDragging(false);
	};

	return (
		<section
			ref={scrollContainerRef}
			className={cn(
				"max-h-[56vh] w-full min-w-0 max-w-full touch-none overflow-auto overscroll-contain rounded-lg border bg-muted/20 select-none",
				isDragging ? "cursor-grabbing" : "cursor-grab",
			)}
			aria-label="Mutation family diagram"
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerEnd}
			onPointerCancel={handlePointerEnd}
		>
			<div className="relative" style={{ width, height }}>
				<svg
					className="pointer-events-none absolute inset-0"
					width={width}
					height={height}
					aria-hidden="true"
				>
					{recipeConnections.flatMap((connection) => {
						const result = occurrences.find(
							({ key }) => key === connection.resultKey,
						);
						const ingredients = connection.ingredientKeys.map((key) =>
							occurrences.find((occurrence) => occurrence.key === key),
						);
						if (!result || ingredients.some((position) => !position)) return [];
						const ingredientCenters = ingredients.map(
							(position) => (position?.x ?? 0) + MUTATION_NODE_WIDTH / 2,
						);
						const resultCenterX = result.x + MUTATION_NODE_WIDTH / 2;
						const junctionY =
							result.y + MUTATION_NODE_HEIGHT + MUTATION_ROW_GAP / 2;
						const busStartX = Math.min(...ingredientCenters, resultCenterX);
						const busEndX = Math.max(...ingredientCenters, resultCenterX);
						const combinationX =
							ingredientCenters.reduce((sum, centerX) => sum + centerX, 0) /
							ingredientCenters.length;
						return [
							...ingredients.map((position, ingredientIndex) => (
								<line
									key={`${connection.resultKey}-${connection.ingredientKeys[ingredientIndex]}`}
									x1={(position?.x ?? 0) + MUTATION_NODE_WIDTH / 2}
									y1={position?.y ?? 0}
									x2={(position?.x ?? 0) + MUTATION_NODE_WIDTH / 2}
									y2={junctionY}
									stroke="currentColor"
									className="text-border"
									strokeWidth="2"
								/>
							)),
							<line
								key={`${connection.resultKey}-bus`}
								x1={busStartX}
								y1={junctionY}
								x2={busEndX}
								y2={junctionY}
								stroke="currentColor"
								className="text-border"
								strokeWidth="2"
							/>,
							<line
								key={`${connection.resultKey}-result`}
								data-result-monsterling-id={result.monsterlingId}
								x1={resultCenterX}
								y1={result.y + MUTATION_NODE_HEIGHT}
								x2={resultCenterX}
								y2={junctionY}
								stroke="currentColor"
								className={
									result.monsterlingId === selectedMonsterlingId
										? "text-primary/70"
										: "text-border"
								}
								strokeWidth="2"
							/>,
							<circle
								key={`${connection.resultKey}-junction`}
								data-junction-monsterling-id={result.monsterlingId}
								cx={combinationX}
								cy={junctionY}
								r="10"
								className={cn(
									"fill-background",
									result.monsterlingId === selectedMonsterlingId
										? "stroke-primary"
										: "stroke-border",
								)}
								strokeWidth="2"
							/>,
							<text
								key={`${connection.resultKey}-plus`}
								data-plus-monsterling-id={result.monsterlingId}
								x={combinationX}
								y={junctionY + 4}
								textAnchor="middle"
								className={cn(
									"text-xs",
									result.monsterlingId === selectedMonsterlingId
										? "fill-foreground"
										: "fill-muted-foreground",
								)}
							>
								+
							</text>,
						];
					})}
				</svg>

				{occurrences.map((occurrence) => {
					const { monsterlingId } = occurrence;
					const monsterling = MONSTERLINGS_DATA[monsterlingId];
					const position = occurrence;
					if (!monsterling || !position) return null;
					return (
						<button
							key={occurrence.key}
							type="button"
							className={cn(
								"absolute flex flex-col items-center justify-center gap-1 rounded-lg border bg-card p-2 text-center text-xs shadow-sm transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								monsterlingId === selectedMonsterlingId &&
									"border-primary bg-primary/10 ring-2 ring-primary/30",
							)}
							style={{
								left: position.x,
								top: position.y,
								width: MUTATION_NODE_WIDTH,
								height: MUTATION_NODE_HEIGHT,
							}}
							onClick={() => onSelectMonsterling(monsterlingId)}
							aria-current={
								monsterlingId === selectedMonsterlingId ? "true" : undefined
							}
						>
							<img
								src={monsterling.image}
								alt=""
								width="52"
								height="52"
								className="size-13 object-contain"
							/>
							<span className="line-clamp-2 font-medium">
								{monsterling.name}
							</span>
						</button>
					);
				})}
			</div>
		</section>
	);
};
