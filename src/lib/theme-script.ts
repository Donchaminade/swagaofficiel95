/** Inline blocking script — applique dark/light avant paint (anti-flash). */
export const themeInitScript = `(function(){try{var k='swaga-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`;
