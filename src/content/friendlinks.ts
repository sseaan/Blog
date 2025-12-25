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
				"name": "L1nsn0w",
				"url": "https://vaaat.com/",
				"avatar": "https://vaaat.com/Assets/images/avatar.png",
				"description": "Stay tuned for exciting projects and developments!"
			}
		]
	},
	{
		category: "推荐网站",
		links: [
			{
				name: "Anthony Fu",
				url: "https://antfu.me/",
				avatar: "https://avatars.githubusercontent.com/u/11247099?v=4",
				description: "Dreaming up cool ideas and making them come true is where my passion lies."
			}
		]
	}
];
export type { IFriendLink, IFriendCategory };
export { friendlinks };
