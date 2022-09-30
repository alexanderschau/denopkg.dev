<script lang="ts">
	import { copyToClipboard } from '$lib/fn';
	import type { PageData } from './$types';

	export let data: PageData;

	const splitURL = (url: string): [string, string] => {
		if (data.type == 'gh') {
			const matches = url.match(/^(.*?\/.*?)(\/.*)?$/);
			if (!matches) return ['', ''];
			return [matches[1] || '', matches[2] || ''];
		}
		return [url, ''];
	};
	let [p1, p2] = splitURL(data.url);
</script>

<div
	class="absolute top-0 left-0 h-full w-full text-center bg-secondary dark:bg-secondary-dark text-primary dark:text-primary-dark flex flex-col justify-center items-center"
>
	<svg
		class="mx-auto fill-current"
		height="5rem"
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M0 6V0H64V6H0Z" />
		<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10V64H64V10H0ZM48 16V48H32V16H48Z" />
	</svg>
	<div class="text-3xl font-bold max-w-4xl text-center break-words my-5">
		<span class="opacity-50">import * as</span> access_token
		<span class="opacity-50">from “https://denopkg.dev/{data.type}/</span>{p1}<span
			class="opacity-50">{p2}”</span
		>
	</div>
	<button
		on:click={() => {
			copyToClipboard(`import * from "https://denopkg.dev/${data.type}/${data.url}"`);
		}}
		class=" border-2 border-primary dark:border-primary-dark my-3 py-3 px-8 hover:bg-primary dark:hover:bg-primary-dark hover:text-secondary dark:hover:text-secondary-dark rounded-2xl font-bold"
		>Copy to clipboard</button
	>
</div>
