import {
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import type { EquippedCharacter } from "@/components/loadouts/utils/equipped-character-usage";
import { cn } from "@/lib/utils";

type EquippedCharacterBadgeProps = {
	characters?: EquippedCharacter[];
	className?: string;
};

type TooltipPosition = {
	left: number;
	top: number;
	maxHeight: number;
};

const VIEWPORT_MARGIN = 8;
const TOOLTIP_GAP = 4;

/** Informational, noninteractive overlay for an owned inventory card. */
export const EquippedCharacterBadge = ({
	characters = [],
	className,
}: EquippedCharacterBadgeProps) => {
	const badgeRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const hoverCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const tooltipId = useId();
	const [isHovered, setIsHovered] = useState(false);
	const [isTooltipHovered, setIsTooltipHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [tooltipPosition, setTooltipPosition] =
		useState<TooltipPosition | null>(null);
	const hasCharacters = characters.length > 0;
	const isTooltipOpen =
		hasCharacters && (isHovered || isTooltipHovered || isFocused);
	const updateTooltipPosition = useCallback(() => {
		const badge = badgeRef.current;
		const tooltip = tooltipRef.current;
		if (!badge || !tooltip) return;
		const badgeBounds = badge.getBoundingClientRect();
		const tooltipBounds = tooltip.getBoundingClientRect();
		const intrinsicTooltipHeight = tooltip.scrollHeight;
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const availableBelow =
			viewportHeight - VIEWPORT_MARGIN - badgeBounds.bottom - TOOLTIP_GAP;
		const availableAbove = badgeBounds.top - TOOLTIP_GAP - VIEWPORT_MARGIN;
		const shouldPlaceAbove =
			intrinsicTooltipHeight > availableBelow &&
			availableAbove > availableBelow;
		const maxHeight = Math.max(
			0,
			shouldPlaceAbove ? availableAbove : availableBelow,
		);
		const visibleHeight = Math.min(intrinsicTooltipHeight, maxHeight);
		const unclampedLeft = badgeBounds.right - tooltipBounds.width;
		const maxLeft = Math.max(
			VIEWPORT_MARGIN,
			viewportWidth - VIEWPORT_MARGIN - tooltipBounds.width,
		);
		setTooltipPosition({
			left: Math.min(Math.max(VIEWPORT_MARGIN, unclampedLeft), maxLeft),
			top: shouldPlaceAbove
				? Math.max(
						VIEWPORT_MARGIN,
						badgeBounds.top - TOOLTIP_GAP - visibleHeight,
					)
				: badgeBounds.bottom + TOOLTIP_GAP,
			maxHeight,
		});
	}, []);

	useEffect(() => {
		if (!hasCharacters) return;
		const badge = badgeRef.current;
		const cardButton = badge?.closest("button");
		if (!badge || !cardButton) return;
		const handleMouseEnter = () => {
			if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
			setIsHovered(true);
		};
		const handleMouseLeave = () => {
			hoverCloseTimerRef.current = setTimeout(() => setIsHovered(false), 100);
		};
		const handleFocus = () => setIsFocused(true);
		const handleBlur = () => setIsFocused(false);
		badge.addEventListener("mouseenter", handleMouseEnter);
		badge.addEventListener("mouseleave", handleMouseLeave);
		cardButton.addEventListener("focus", handleFocus);
		cardButton.addEventListener("blur", handleBlur);
		cardButton.setAttribute("aria-describedby", tooltipId);
		return () => {
			badge.removeEventListener("mouseenter", handleMouseEnter);
			badge.removeEventListener("mouseleave", handleMouseLeave);
			cardButton.removeEventListener("focus", handleFocus);
			cardButton.removeEventListener("blur", handleBlur);
			if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
			cardButton.removeAttribute("aria-describedby");
		};
	}, [hasCharacters, tooltipId]);

	useLayoutEffect(() => {
		if (!isTooltipOpen) {
			setTooltipPosition(null);
			return;
		}
		updateTooltipPosition();
	}, [isTooltipOpen, updateTooltipPosition]);

	useEffect(() => {
		if (!isTooltipOpen) return;
		window.addEventListener("resize", updateTooltipPosition);
		window.addEventListener("scroll", updateTooltipPosition, true);
		return () => {
			window.removeEventListener("resize", updateTooltipPosition);
			window.removeEventListener("scroll", updateTooltipPosition, true);
		};
	}, [isTooltipOpen, updateTooltipPosition]);

	if (!hasCharacters) return null;
	const visibleCharacters = characters.slice(0, 3);
	const remainingCount = characters.length - visibleCharacters.length;
	const description = characters
		.map((character) =>
			character.variant
				? `${character.name} (${character.variant})`
				: character.name,
		)
		.join(", ");

	return (
		<div
			ref={badgeRef}
			className={cn("absolute right-1 top-1 z-20", className)}
			role="img"
			aria-label={`Equipped by ${description}`}
			title={`Equipped by ${description}`}
		>
			<div className="flex items-center justify-end">
				{visibleCharacters.map((character, index) => (
					<img
						key={character.id}
						src={character.portraitImage}
						alt={`${character.name} portrait`}
						width={24}
						height={24}
						className={cn(
							"relative size-6 rounded-full border border-white/80 bg-background object-cover shadow-md",
							index > 0 && "-ml-2",
						)}
					/>
				))}
				{remainingCount > 0 && (
					<span className="relative -ml-2 grid size-6 place-items-center rounded-full border border-white/80 bg-black/75 text-[10px] font-bold text-white shadow-md">
						+{remainingCount}
					</span>
				)}
			</div>
			{isTooltipOpen &&
				createPortal(
					<div
						ref={tooltipRef}
						id={tooltipId}
						role="tooltip"
						className="fixed z-50 w-max max-w-[calc(100vw-1rem)] overflow-y-auto rounded-md border bg-popover p-2 text-popover-foreground shadow-lg"
						onMouseEnter={() => {
							if (hoverCloseTimerRef.current)
								clearTimeout(hoverCloseTimerRef.current);
							setIsHovered(false);
							setIsTooltipHovered(true);
						}}
						onMouseLeave={() => setIsTooltipHovered(false)}
						onPointerDown={(event) => event.stopPropagation()}
						onClick={(event) => event.stopPropagation()}
						onKeyDown={(event) => event.stopPropagation()}
						style={
							tooltipPosition ?? {
								left: VIEWPORT_MARGIN,
								top: VIEWPORT_MARGIN,
								maxHeight: `calc(100vh - ${VIEWPORT_MARGIN * 2}px)`,
								visibility: "hidden",
							}
						}
					>
						<div className="grid gap-1.5">
							{characters.map((character) => (
								<div
									key={character.id}
									className="flex items-center gap-2 text-xs whitespace-nowrap"
								>
									<img
										src={character.portraitImage}
										alt=""
										width={24}
										height={24}
										className="size-6 rounded-full object-cover"
									/>
									<span>
										{character.variant
											? `${character.name} (${character.variant})`
											: character.name}
									</span>
								</div>
							))}
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
};
