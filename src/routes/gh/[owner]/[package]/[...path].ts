import type { RequestHandler } from '@sveltejs/kit';
import { serveHeaders, defaultHeaders } from '$lib/defaultHeader';

type ParamsType = {
	owner: string;
	package: string;
	tag: string;
	path: string;
};

const getLatestVersion = async (owner: string, repo: string, headers: Record<string, string>) => {
	const latestTag =
		((
			await (
				await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
					headers: {
						Authorization: headers.authorization
					}
				})
			).json()
		).tag_name as string) || null;
	return latestTag || 'master';
};

export const get: RequestHandler = async (req) => {
	const params: ParamsType = {
		owner: req.params.owner,
		package: req.params.package.split('@')[0],
		tag: req.params.package.split('@')[1] || '',
		path: req.params.path
	};

	// check if all required paramters are given
	if (params.tag == '' || params.path == '') {
		return {
			status: 302,
			headers: {
				...defaultHeaders,
				Location: `https://denopkg.dev/gh/${params.owner}/${params.package}@${
					params.tag == ''
						? await getLatestVersion(params.owner, params.package, req.headers)
						: params.tag
				}/${params.path == '' ? 'mod.ts' : params.path}`
			}
		};
	}

	const resp = await fetch(
		`https://raw.githubusercontent.com/${params.owner}/${params.package}/${params.tag}/${params.path}`,
		{
			headers: {
				Authorization: req.headers.authorization
			}
		}
	);

	if (resp.status >= 400) {
		return {
			status: resp.status,
			headers: {
				...defaultHeaders
			}
		};
	}

	return {
		status: resp.status,
		headers: {
			...resp.headers,
			...serveHeaders
		},
		body: await resp.text()
	};
};