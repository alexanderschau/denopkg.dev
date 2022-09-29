type HeaderType = Record<string, string>;

export const defaultHeaders: HeaderType = {
	server: 'denopkg',
	'access-control-allow-origin': '*'
};

export const serveHeaders: Record<string, string> = {
	...defaultHeaders,
	'cache-control': 'public, max-age=31536000'
};
