<script lang="ts">
	const seoValues = {
		title: 'Deno Package Registry',
		description: 'Use GitHub and GitLab as package registry for Deno',
		creator: 'denopkg.dev'
	};
</script>

<svelte:head>
	<title>Deno Package Registry</title>
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<meta name="title" content={seoValues.title} />
	<meta name="description" content={seoValues.description} />
	<meta property="og:url" content="https://denopkg.dev/" />
	<meta property="og:title" content={seoValues.title} />
	<meta property="og:description" content={seoValues.description} />
	<meta property="og:image" content="/assets/thumbnail.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content={seoValues.title} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content={seoValues.creator} />
	<meta name="twitter:description" content={seoValues.description} />
</svelte:head>
