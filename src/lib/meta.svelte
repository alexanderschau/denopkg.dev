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
	<meta name="title" content={seoValues.title} key="title" />
	<meta name="description" content={seoValues.description} key="description" />
	<meta property="og:url" content="https://denopkg.dev/" key="og-url" />
	<meta property="og:title" content={seoValues.title} key="og-title" />
	<meta property="og:description" content={seoValues.description} key="og-description" />
	<meta property="og:image" content="/assets/thumbnail.png" />
	<meta property="og:type" content="website" key="og-type" />
	<meta name="twitter:title" content={seoValues.title} key="twitter-title" />
	<meta name="twitter:card" content="summary_large_image" key="twitter-card" />
	<meta name="twitter:creator" content={seoValues.creator} key="twitter-creator" />
	<meta name="twitter:description" content={seoValues.description} key="twitter-description" />
</svelte:head>
