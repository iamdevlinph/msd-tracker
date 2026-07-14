export const EmptyCodex = ({ favoriteOnly }: { favoriteOnly: boolean }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
			<h2 className="font-semibold">
				{favoriteOnly ? "No favorite monsterlings yet" : "No monsterling found"}
			</h2>
			{favoriteOnly && (
				<p className="text-sm text-muted-foreground">
					Select All, then use the heart on a card to add favorites.
				</p>
			)}
		</div>
	);
};
