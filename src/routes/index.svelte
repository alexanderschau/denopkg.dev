<script lang="ts">
	import Tool from '$lib/tool.svelte';
</script>

<div
	class="absolute top-0 left-0 h-full w-full text-center bg-secondary dark:bg-secondary-dark text-primary dark:text-primary-dark"
>
	<div class="max-w-2xl mx-auto my-10 px-2">
		<svg
			class="mx-auto fill-current"
			width="4rem"
			height="4rem"
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M0 6V0H64V6H0Z" />
			<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10V64H64V10H0ZM48 16V48H32V16H48Z" />
		</svg>

		<div class="font-bold text-3xl my-5">Deno Package Registry</div>
		<Tool />
		<div class="opacity-30 my-3">
			made by <a class="underline" target="_blank" href="https://alexanderschau.com"
				>@alexanderschau</a
			>
			|
			<a class="underline" target="_blank" href="https://github.com/alexanderschau/denopkg.dev"
				>GitHub repo</a
			>
		</div>
	</div>
</div>
