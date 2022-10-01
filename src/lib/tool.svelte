<script lang="ts">
	import { copyToClipboard } from './fn';

	let url = '';
	let type = '';
	let server: string | null = null;
	let owner = '';
	let repo = '';
	let tag = '';
	let path = '';

	const updateData = () => {
		const checkGitHub =
			/github\.com\/(.*?)\/([^?# \/]+?)(?:\/[^\/]*\/([^\/]*)(?:\/([^?#]+))?)?(?:\.git.*|[?# \/].*|)$/;
		const checkGitLab =
			/gitlab\.com\/(.*?)\/([^?# \/]+?)(?:\/-\/[^\/]*\/([^\/]*)(?:\/([^?#]+))?)?(?:\.git.*|[?# \/].*|)$/;
		const checkCustomGitLab =
			/(?:https:\/\/)?([^/]+)\/(.*?)\/([^?# \/]+?)(?:\/-\/[^\/]*\/([^\/]*)(?:\/([^?#]+))?)?(?:\.git.*|[?# \/].*|)$/;
		console.log(url);
		const checkGh = url.match(checkGitHub);
		if (checkGh) {
			type = 'gh';
			server = null;
			owner = checkGh[1] || '';
			repo = checkGh[2] || '';
			tag = checkGh[3] || '';
			path = checkGh[4] || '';
		}
		const checkGl = url.match(checkGitLab);
		if (checkGl) {
			type = 'gl';
			server = null;
			owner = checkGl[1] || '';
			repo = checkGl[2] || '';
			tag = checkGl[3] || '';
			path = checkGl[4] || '';
		}
		const checkCustomGl = url.match(checkCustomGitLab);
		if (checkCustomGl) {
			type = 'gl';
			server = checkCustomGl[1] || '';
			owner = checkCustomGl[2] || '';
			repo = checkCustomGl[3] || '';
			tag = checkCustomGl[4] || '';
			path = checkCustomGl[5] || '';
		}
	};
	$: url, updateData();
</script>

<div class="flex">
	<input
		on:input={() => {
			console.log('input');
		}}
		bind:value={url}
		type="text"
		placeholder="Enter any GitHub or GitLab URL"
		class="input flex-14"
	/>
	<div class="my-auto mx-3">@</div>
	<input bind:value={tag} type="text" placeholder="Tag Name" class="input flex-5" />
</div>
<input
	bind:value={path}
	type="text"
	placeholder="File Path (default: /mod.ts)"
	class="input flex-5"
/>
<p class="my-5">Import the following URL in Deno:</p>
<div class="text-left whitespace-normal">
	<span>https://denopkg.dev/</span><span class="microbox">{type || 'type'}</span>
	{#if server !== null}
		/ <span class="microbox">@{server || 'example.com'}</span>
	{/if}/<span class="microbox">{owner || 'user'}</span>/<span class="microbox"
		>{repo || 'repo'}</span
	>@<span class="microbox">{tag || 'tag or branch'}</span>/<span class="microbox"
		>{path || 'path/to/file'}</span
	>
</div>
<a
	on:click={(e) => {
		e.preventDefault();
		copyToClipboard(
			`https://denopkg.dev/${type || 'type'}${server !== null ? '/@' + server : ''}/${
				owner || 'user'
			}/${repo || 'repo'}@${tag || 'tag or branch'}/${path || 'path/to/file'}`
		);
	}}
	href="/"
	class="underline underline-offset-2 my-5 mx-2 block hover:opacity-50"
>
	Copy to clipboard
</a>

<hr />
<div class="text-xl font-bold my-3">Add a badge to your README.md</div>
<div class="flex my-5 max-w-md mx-auto">
	<a
		class=""
		target="_blank"
		href={`/import/${type || 'type'}${server !== null ? '/@' + server : ''}/${owner || 'user'}/${
			repo || 'repo'
		}@${tag || 'tag or branch'}/${path || 'path/to/file'}`}
	>
		<img src="/badge.svg" alt="badge" />
	</a>
	<a
		on:click={(e) => {
			e.preventDefault();
			copyToClipboard(
				`[![denopkg.dev badge](https://denopkg.dev/badge.svg)](https://denopkg.dev/${
					type || 'type'
				}${server !== null ? '/@' + server : ''}/${owner || 'user'}/${repo || 'repo'}@${
					tag || 'tag or branch'
				}/${path || 'path/to/file'})`
			);
		}}
		href="/"
		class="underline underline-offset-2 mx-2 block hover:opacity-50 flex-1 text-right"
	>
		Copy badge
	</a>
</div>
