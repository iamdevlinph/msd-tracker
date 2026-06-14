export const DialogBackdrop = () => {
	return (
		<div
			data-state={"open"}
			data-slot="dialog-overlay"
			className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
			data-aria-hidden="open"
			aria-hidden={false}
		/>
	);
};
