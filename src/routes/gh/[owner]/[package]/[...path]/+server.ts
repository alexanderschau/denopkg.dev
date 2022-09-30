import { serveHeaders, defaultHeaders } from '$lib/defaultHeader';
import type { RequestHandler } from './$types';

type ParamsType = {
	owner: string;
	package: string;
	tag: string;
	path: string;
};

const getLatestVersion = async (owner: string, repo: string, headers: Headers) => {
	const latestTag =
		((
			await (
				await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
					headers: {
						Authorization: headers.get('authorization') || ''
					}
				})
			).json()
		).tag_name as string) || null;
	return latestTag || 'master';
};

const handler: RequestHandler = async (req) => {
	const params: ParamsType = {
		owner: req.params.owner || '',
		package: (req.params.package || '').split('@')[0],
		tag: (req.params.package || '').split('@')[1] || '',
		path: req.params.path || ''
	};

	// check if all required paramters are given
	if (params.tag == '' || params.path == '') {
		return new Response('', {
			status: 302,
			headers: {
				...defaultHeaders,
				Location: `${req.url.origin}/gh/${params.owner}/${params.package}@${
					params.tag == ''
						? await getLatestVersion(params.owner, params.package, req.request.headers)
						: params.tag
				}/${params.path == '' ? 'mod.ts' : params.path}`
			}
		});
	}

	const resp = await fetch(
		`https://raw.githubusercontent.com/${params.owner}/${params.package}/${params.tag}/${params.path}`,
		{
			headers: {
				authorization: req.request.headers.get('authorization') || ''
			}
		}
	);

	if (resp.status >= 400) {
		return new Response('', {
			status: resp.status,
			headers: {
				...defaultHeaders
			}
		});
	}

	return new Response(await resp.text(), {
		status: resp.status,
		headers: {
			...resp.headers,
			...serveHeaders
		}
	});
};

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
