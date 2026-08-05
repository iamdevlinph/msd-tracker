import { type PointerEvent, type RefObject, useRef, useState } from "react";
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
	onSelectMonsterling,
	scrollContainerRef,
}: MutationFamilyTreeProps) => {
	const { positionById, width, height } = getMutationFamilyLayout(family);
	const panRef = useRef<MutationTreePan | null>(null);
	const [isDragging, setIsDragging] = useState(false);

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
					{family.recipes.flatMap((recipe) => {
						const result = positionById.get(recipe.result_id);
						const ingredients = recipe.ingredient_ids.map((id) =>
							positionById.get(id),
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
									key={`${recipe.result_id}-${recipe.ingredient_ids[ingredientIndex]}`}
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
								key={`${recipe.result_id}-bus`}
								x1={busStartX}
								y1={junctionY}
								x2={busEndX}
								y2={junctionY}
								stroke="currentColor"
								className="text-border"
								strokeWidth="2"
							/>,
							<line
								key={`${recipe.result_id}-result`}
								x1={resultCenterX}
								y1={result.y + MUTATION_NODE_HEIGHT}
								x2={resultCenterX}
								y2={junctionY}
								stroke="currentColor"
								className="text-primary/70"
								strokeWidth="2"
							/>,
							<circle
								key={`${recipe.result_id}-junction`}
								cx={combinationX}
								cy={junctionY}
								r="10"
								className="fill-background stroke-primary"
								strokeWidth="2"
							/>,
							<text
								key={`${recipe.result_id}-plus`}
								x={combinationX}
								y={junctionY + 4}
								textAnchor="middle"
								className="fill-foreground text-xs"
							>
								+
							</text>,
						];
					})}
				</svg>

				{family.monsterlingIds.map((monsterlingId) => {
					const monsterling = MONSTERLINGS_DATA[monsterlingId];
					const position = positionById.get(monsterlingId);
					if (!monsterling || !position) return null;
					return (
						<button
							key={monsterlingId}
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
