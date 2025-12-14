interface IFriendLink {
	name: string;
	url: string;
	avatar: string;
	description: string;
}
interface IFriendCategory {
	category: string;
	links: IFriendLink[];
}
const friendlinks: IFriendCategory[] = [
	{
		category: "朋友们",
		links: [
			{
				name: "TATEN",
				url: "https://taten.xyz",
				avatar: "https://s1.imagehub.cc/images/2025/11/08/939d0319d47029a228029721d34ed816.png",
				description: "一群热爱编程的学生，致力于探索技术的无限可能。"
			},
			{
				name: "LINMOHAN",
				url: "https://home.linmohan.fun",
				avatar: "https://s1.imagehub.cc/images/2025/10/18/99d5d57c7013acb6c92305314cc66374.png",
				description: "代码重构世界，逻辑解构真理"
			},
			{
				name: "HHYYYY",
				url: "https://hhyyyy.cn/",
				avatar: "https://s1.imagehub.cc/images/2025/07/31/1fe122170bc941cc696119b9aaca6ead.jpg",
				description: "用科技之眼探索世界，用光影之笔记录瞬间"
			},
			{
				name: "LGCM",
				url: "http://www.LGCM.xyz",
				avatar: "https://s1.imagehub.cc/images/2025/07/30/75fb3a7a7532703f2e7f0c095dc417f1.jpg",
				description: "半个软件工程师"
			},
			{
				name: "Errorsia",
				url: "http://errorsia.com",
				avatar: "https://s1.imagehub.cc/images/2025/07/30/86668972c5b3fb5e440c6e1bba1f69db.png",
				description: "N/A"
			},
			{
				name: "HungryHenry",
				url: "https://hungryhenry.cn",
				avatar: "https://s1.imagehub.cc/images/2025/07/31/4b1f583c02e682ac790c6bfa7a52ec0b.jpg",
				description: "不是在写bug，就是在debug🐛"
			},
			{
				name: "Ruibin_Ningh",
				url: "https://www.ruibin-ningh.top/",
				avatar: "https://s1.imagehub.cc/images/2025/07/31/b2e402249619e45fd0a227d7f5161d5a.jpg",
				description: "不争于表象，只专于底层"
			},
			{
				name: "Zyx_2012",
				url: "https://blog.zyx-2012.cn",
				avatar: "https://s1.imagehub.cc/images/2025/10/04/f050ec2c07c14fd976af48b78609acc7.png",
				description: "专注于笔记、分享的博客"
			},
			{
				name: "GuYang17",
				url: "https://guyang17.github.io/",
				avatar: "https://avatars.githubusercontent.com/u/196782409?v=4",
				description: "编程爱好者 | Minecraft玩家"
			}
		]
	},
	{
		category: "推荐网站",
		links: [
			{
				name: "June's Blog",
				url: "https://blog.june-pj.cn/",
				avatar: "https://gitlab.com/June_PJ/PicGo-PJ/raw/main/img/avatar.webp",
				description: "遇事不决，可问春风"
			},
			{
				name: "枫叶",
				url: "https://blog.aqcoder.cn",
				avatar: "https://blog.aqcoder.cn/img/avatar.png",
				description: "分享知识，认识世界"
			},
			{
				name: "s1rius' blog",
				url: "https://s1rius.space/",
				avatar: "https://s1rius.space/img/custom/avatar.webp",
				description: "这里有网络安全和其他技术文章"
			},
			{
				name: "彬红茶日记",
				url: "https://note.redcha.cn/",
				avatar: "https://note.redcha.cn/upload/favicon-256x256.png",
				description: "我的个人笔记"
			},
			{
				name: "星河避难所",
				url: "https://hejunjie.life",
				avatar: "https://cdn.hejunjie.life/avatar.jpg",
				description: "写代码，也写自己"
			}
		]
	},
	{
		category: "加入的 Blog 组织",
		links: [
			{
				name: "Blogsclub",
				url: "https://www.blogsclub.org/",
				avatar: "https://s1.imagehub.cc/images/2025/12/15/1b58ee608f57401387d2ef4e40b91559.jpg",
				description: "Blogsclub 博客俱乐部"
			},
			{
				name: "BlogFinder",
				url: "https://bf.zzxworld.com/",
				avatar: "https://bf.zzxworld.com/images/favicon.png",
				description: "每个博客都是一座宝藏"
			}
		]
	}
];
export type { IFriendLink, IFriendCategory };
export { friendlinks };
