type Theme = "dark" | "light" | "system";

export function getThemeScript(storageKey: string, defaultTheme: Theme) {
	const key = JSON.stringify(storageKey).replace(/</g, "\\u003c");
	const fallback = JSON.stringify(defaultTheme).replace(/</g, "\\u003c");

	return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
}
