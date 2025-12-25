import siteConfig from "./src/utils/config";

const config = siteConfig({
	title: "Sean's Blog",
	prologue: "A place where you can speak freely and discover new things",
	author: {
		name: "Sean",
		email: "i@ssean.cn",
		link: "https://blog.ssean.cn"
	},
	description: "A place to share my ideas and experiences.",
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
