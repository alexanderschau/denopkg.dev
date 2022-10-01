import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => ({
	type: params.type,
	url: params.url
});
