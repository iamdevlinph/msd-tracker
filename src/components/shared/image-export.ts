const waitForImages = async (node: HTMLElement) => {
	await document.fonts?.ready;
	await Promise.all(
		Array.from(node.querySelectorAll("img")).map(async (image) => {
			if (!image.complete) {
				await new Promise<void>((resolve) => {
					image.addEventListener("load", () => resolve(), { once: true });
					image.addEventListener("error", () => resolve(), { once: true });
				});
			}
			await image.decode?.().catch(() => undefined);
		}),
	);
};

type ImageExportOptions = {
	backgroundColor: string;
	width?: number;
	exportProperties?: readonly (readonly [string, string])[];
};

export const renderElementToPngBlob = async (
	node: HTMLElement | null,
	{ backgroundColor, width, exportProperties = [] }: ImageExportOptions,
) => {
	if (!node) throw new Error("Export preview is not ready.");
	await waitForImages(node);
	const { toBlob } = await import("html-to-image");
	const previousProperties = exportProperties.map(([property]) => ({
		property,
		value: node.style.getPropertyValue(property),
		priority: node.style.getPropertyPriority(property),
	}));
	for (const [property, value] of exportProperties)
		node.style.setProperty(property, value);
	try {
		const blob = await toBlob(node, {
			pixelRatio: 2,
			cacheBust: true,
			backgroundColor,
			width,
		});
		if (!blob) throw new Error("Could not render the image.");
		return blob;
	} finally {
		for (const { property, value, priority } of previousProperties) {
			if (value) node.style.setProperty(property, value, priority);
			else node.style.removeProperty(property);
		}
	}
};
