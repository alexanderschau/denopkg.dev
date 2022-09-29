import { serveHeaders, defaultHeaders } from '$lib/defaultHeader';
import type { RequestHandler } from './$types';

type ParamsType = {
	owner: string;
	package: string;
	tag: string;
	path: string;
};

const getDefaultBranch = async (owner: string, repo: string, headers: Headers) => {
	const respData = await (
		await fetch(`https://gitlab.com/${owner}/${repo}/-/branches`, {
			headers: {
				'user-agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
				Authorization: headers.get('authorization') || ''
			}
		})
	).text();
	const defaultBranch = respData.match(/data-default-branch="([^"]+)"/);
	return defaultBranch ? defaultBranch[1] : 'main';
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
				Location: `${req.url.origin}/gl/${params.owner}/${params.package}@${
					params.tag == ''
						? await getDefaultBranch(params.owner, params.package, req.request.headers)
						: params.tag
				}/${params.path == '' ? 'mod.ts' : params.path}`
			}
		});
	}

	const resp = await fetch(
		`https://gitlab.com/${params.owner}/${params.package}/-/raw/${params.tag}/${params.path}`,
		{
			headers: {
				Authorization: req.request.headers.get('authorization') || ''
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

	return new Response(resp.body, {
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
