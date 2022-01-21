<script>
	import { copyToClipboard } from './fn';

	let url = '';
	let type = '';
	let owner = '';
	let repo = '';
	let tag = '';
	let path = '';

	const updateData = () => {
		const checkGitHub = /github\.com\/(.*?)\/([^?# \/]+?)(?:\.git.*|[?# \/].*|)$/;
		const checkGitLab =
			/gitlab\.com\/(.*?)\/([^?# \/]+?)(?:\/-\/[^\/]*\/([^\/]*)(?:\/([^?#]+))?)?(?:\.git.*|[?# \/].*|)$/;
		console.log(url);
		const checkGh = url.match(checkGitHub);
		if (checkGh) {
			type = 'gh';
			owner = checkGh[1] || '';
			repo = checkGh[2] || '';
		}
		const checkGl = url.match(checkGitLab);
		if (checkGl) {
			type = 'gl';
			owner = checkGl[1] || '';
			repo = checkGl[2] || '';
			tag = checkGl[3] || '';
			path = checkGl[4] || '';
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
{#if false}
	Import the following URL in Deno:
	<div
		class="my-3 py-2 px-4 text-left rounded-lg bg-primary bg-opacity-2 dark:bg-primary-dark dark:bg-opacity-2 flex w-full"
	>
		<div class="flex-1 overflow-auto opacity-70 py-3 px-3">
			{'finalUrl'}
		</div>
		<div class="my-auto ml-3 cursor-pointer opacity-50 hover:opacity-100">
			<svg
				on:click={() => {
					copyToClipboard('finalUrl');
				}}
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
				/>
				<path
					d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
				/>
			</svg>
		</div>
	</div>
{/if}
<div class="text-left whitespace-normal">
	<span>https://denopkg.dev/</span><span class="microbox">{type || 'type'}</span>/<span
		class="microbox">{owner || 'user'}</span
	>/<span class="microbox">{repo || 'repo'}</span>@<span class="microbox"
		>{tag || 'tag or branch'}</span
	>/<span class="microbox">{path || 'path/to/file'}</span>
</div>
