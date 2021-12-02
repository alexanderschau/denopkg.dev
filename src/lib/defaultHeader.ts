export const defaultHeaders = {
	server: 'denopkg',
	'access-control-allow-origin': '*'
};

export const serveHeaders = {
	...defaultHeaders,
	'cache-control': 'public, max-age=31536000'
};
