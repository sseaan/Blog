import siteConfig from "./src/utils/config";

const config = siteConfig({
	title: "Sean's Blog",
	prologue: "This jungle of words chronicles \nmy attempts and imaginations \nPerhaps it may also bring a gentle breeze  to you.",
	author: {
		name: "Sean",
		email: "i@ssean.cn",
		link: "https://blog.ssean.cn"
	},
	description: "A place to share my ideas, experiences, and thought",
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
