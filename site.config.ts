import siteConfig from "./src/utils/config";

const config = siteConfig({
	title: "Yaten-Z's Blog",
	prologue: "It's just finding words to match words,\none person thinking with another.\n But in this process, it seems we can do something.",
	author: {
		name: "Yaten-Z",
		email: "Yaten-Z@outlook.com",
		link: "https://blog.yaten.xyz"
	},
	description: "世界多变而永恒，文字孤独却自由",
	copyright: {
		type: "CC BY-NC-ND 4.0",
		year: "2025"
	},
	i18n: {
		locales: ["zh-cn", "en"],
		defaultLocale: "zh-cn"
	},
	feed: {
		section: "*",
		limit: 20
	},
	latest: "*"
});

export const monolocale = Number(config.i18n.locales.length) === 1;

export default config;
