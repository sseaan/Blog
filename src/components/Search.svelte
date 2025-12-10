<script lang="ts">
import { getRelativeLocaleUrl } from "astro:i18n";
import { onMount, type Snippet } from "svelte";
import { monolocale } from "$config";
import Time from "$utils/time";
import i18nit from "$i18n";

let {
	locale,
	notes,
	jottings,
	search: searchIcon,
	note: noteIcon,
	jotting: jottingIcon,
	top: topIcon,
	sensitive: sensitiveIcon
}: {
	locale: string;
	notes: any[];
	jottings: any[];
} & { [key: string]: Snippet } = $props();

const t = i18nit(locale);

let searchQuery = $state("");
let searchResults = $derived.by(() => {
	if (!searchQuery.trim()) return [];

	const query = searchQuery.toLowerCase().trim();
	const results: any[] = [];

	console.log("搜索关键词:", query);
	console.log("笔记数量:", notes.length);
	console.log("随笔数量:", jottings.length);

	// 搜索笔记
	notes.forEach(note => {
		const titleMatch = note.data.title.toLowerCase().includes(query);
		const tagsMatch = note.data.tags?.some((tag: string) => tag.toLowerCase().includes(query));
		const seriesMatch = note.data.series?.toLowerCase().includes(query);

		if (titleMatch || tagsMatch || seriesMatch) {
			console.log("找到笔记:", note.data.title);
			results.push({
				...note,
				type: "note",
				relevance: titleMatch ? 3 : tagsMatch ? 2 : 1
			});
		}
	});

	// 搜索随笔
	jottings.forEach(jotting => {
		const titleMatch = jotting.data.title.toLowerCase().includes(query);
		const tagsMatch = jotting.data.tags?.some((tag: string) => tag.toLowerCase().includes(query));

		if (titleMatch || tagsMatch) {
			console.log("找到随笔:", jotting.data.title);
			results.push({
				...jotting,
				type: "jotting",
				relevance: titleMatch ? 3 : 2
			});
		}
	});

	console.log("搜索结果总数:", results.length);

	// 按相关性和时间排序
	return results.sort((a, b) => {
		if (b.relevance !== a.relevance) return b.relevance - a.relevance;
		return b.data.timestamp.getTime() - a.data.timestamp.getTime();
	});
});

let searchInput: HTMLInputElement;

onMount(() => {
	// 自动聚焦搜索框
	searchInput?.focus();
});
</script>

<main class="flex flex-col gap-6 grow">
	<div class="flex flex-col gap-4">
		<div class="relative">
			<div class="absolute left-3 top-1/2 -translate-y-1/2 c-secondary">
				{@render searchIcon()}
			</div>
			<input
				bind:this={searchInput}
				bind:value={searchQuery}
				type="text"
				placeholder={t("search.placeholder")}
				class="w-full py-3 pl-10 pr-4 b-2 b-solid b-primary rd-2 bg-background c-primary text-lg outline-none focus:b-secondary transition-border-color"
			/>
		</div>
		{#if searchQuery.trim()}
			<p class="c-remark text-sm">
				{t("search.found", { count: searchResults.length })}
			</p>
		{/if}
	</div>

	<section class="flex flex-col gap-4">
		{#if !searchQuery.trim()}
			<div class="flex flex-col items-center justify-center gap-4 py-20 c-weak">
				<div class="text-6xl">{@render searchIcon()}</div>
				<p class="text-lg">{t("search.hint")}</p>
			</div>
		{:else if searchResults.length === 0}
			<div class="flex flex-col items-center justify-center gap-4 py-20 c-weak">
				<p class="text-lg">{t("search.empty")}</p>
			</div>
		{:else}
			{#each searchResults as item (item.id)}
				<article class="flex flex-col gap-2 p-4 b-1 b-solid b-secondary rd-2 hover:bg-block transition-background-color">
					<div class="flex items-center gap-2">
						<span class="inline-flex c-secondary">
							{#if item.type === "note"}
                                {@render noteIcon()}
                            {:else if item.type === "jotting"}
                                {@render jottingIcon()}
                            {/if}
						</span>
						<span class="text-xs c-remark font-mono uppercase">{item.type}</span>
						{#if item.data.top > 0}
							<span class="inline-flex">{@render topIcon()}</span>
						{/if}
						{#if item.data.sensitive}
							<span class="inline-flex">{@render sensitiveIcon()}</span>
						{/if}
					</div>

					<a
						href={getRelativeLocaleUrl(
							locale,
							`/${item.type}/${monolocale ? item.id : item.id.split("/").slice(1).join("/")}`
						)}
						class="text-xl font-bold link"
					>
						{#if item.data.series}
							<span class="c-secondary">{item.data.series} | </span>
						{/if}
						{item.data.title}
					</a>

					<div class="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
						<time datetime={item.data.timestamp.toISOString()} class="text-xs c-remark font-mono">
							{Time(item.data.timestamp)}
						</time>
						{#if item.data.tags?.length}
							<div class="flex gap-2 flex-wrap">
								{#each item.data.tags as tag}
									<span class="text-xs c-remark">#{tag}</span>
								{/each}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		{/if}
	</section>
</main>

<style lang="less">
	input::placeholder {
		color: var(--weak-color);
	}
</style>