export const run = async (req: Request) => {
  const url = new URL(req.url)
  const path = url.pathname.slice(1)
  const type = path.split('/')[0]
  const pkgPath = path.slice(path.indexOf('/') + 1)

  switch (type) {
    case 'dl': {
      // official deno.land/x/ package registry
      const data = getParams.withSinglePid(pkgPath)
      if (!data) return send.error()

      const pathCheck = redirectPath(data.path, req.url)
      if (pathCheck) return pathCheck

      const resp = await fetch(
        `https://deno.land/x/${data.repo}${
          data.version != '' ? '@' + data.version : ''
        }${data.path}`,
      )
      if (resp.status >= 400) return send.error(resp.status)
      return send.file(await resp.blob())
    }
    case 'gh': {
      // GitHub
      const data = getParams.withOwnerRepo(pkgPath)
      if (!data) return send.error()

      const pathCheck = redirectPath(data.path, req.url)
      if (pathCheck) return pathCheck

      // check for version
      if (data.version == '') {
        const latestTag = (await (
          await fetch(
            `https://api.github.com/repos/${data.owner}/${data.repo}/releases/latest`,
            req,
          )
        ).json()) as any['tag_name']
        if (!latestTag) {
          // fallback to master
          return send.redirect(
            new URL(
              `/gh/${data.owner}/${data.repo}@master${data.path}`,
              req.url,
            ).toString(),
          )
        }
        // redirect to latest version
        return send.redirect(
          new URL(
            `/gh/${data.owner}/${data.repo}@${latestTag}${data.path}`,
            req.url,
          ).toString(),
        )
      }

      const resp = await fetch(
        `https://raw.githubusercontent.com/${data.owner}/${data.repo}/${
          data.version != '' ? data.version : 'master'
        }${data.path}`,
        req,
      )

      if (resp.status >= 400) return send.error(resp.status)
      return send.file(await resp.blob())
    }
    case 'gl': {
      // GitLab
      const data = getParams.withOwnerRepo(pkgPath)
      if (!data) return send.error()

      const pathCheck = redirectPath(data.path, req.url)
      if (pathCheck) return pathCheck

      if (!data.version) {
        const defaultBranch = (
          await (
            await fetch(
              `https://gitlab.com/${data.owner}/${data.repo}/-/branches`,
              req,
            )
          ).text()
        ).match(/data-default-branch="([^"]+)"/)
        if (defaultBranch) data.version = defaultBranch[1]
      }

      const resp = await fetch(
        `https://gitlab.com/${data.owner}/${data.repo}/-/raw/${
          data.version != '' ? data.version : 'master'
        }${data.path}`,
        req,
      )

      if (resp.status >= 400) return send.error(resp.status)
      return send.file(await resp.blob())
    }

    default:
      break
  }

  return send.website(req)
}

const getParams = {
  withOwnerRepo: (pkgPath: string) => {
    const exp = /^([^/@~]+)\/([^@/]+)(?:@([^/]+))?(\/?.*)$/
    const data = pkgPath.match(exp)
    if (!data) return null
    const [_, owner, repo, version, path] = data
    return {
      owner: owner || '',
      repo: repo || '',
      version: version || '',
      path: path || '',
    }
  },
  withSinglePid: (pkgPath: string) => {
    const exp = /([^@/]+)(?:@([^/]+))?(\/?.*)$/
    const data = pkgPath.match(exp)
    if (!data) return null
    const [_, repo, version, path] = data
    return {
      repo: repo || '',
      version: version || '',
      path: path || '',
    }
  },
}

const redirectPath = (path: string, reqUrl: string) => {
  if (path != '' && path != '/') return null
  return send.redirect(
    new URL(
      './mod.ts',
      reqUrl + (reqUrl.slice(-1) != '/' ? '/' : ''),
    ).toString(),
  )
}

// responses
const defaultHeaders: { [key: string]: string } = {
  server: 'denopkg',
  'access-control-allow-origin': '*',
}

const send = {
  error: (status?: number) =>
    new Response('err', {
      status: status || 404,
      headers: defaultHeaders,
    }),
  redirect: (to: string) =>
    new Response(null, {
      status: 302,
      headers: {
        location: to,
        ...defaultHeaders,
      },
    }),
  file: (data: string | Blob) =>
    new Response(data, {
      headers: {
        'cache-control': 'public, max-age=31536000',
        ...defaultHeaders,
      },
    }),
  website: async (req: Request) => {
    const url = new URL(req.url)
    let resp = await fetch(
      'https://denopkg.pages.dev/' + url.pathname + url.search,
      req,
    )
    resp = new Response(resp.body, resp)
    Object.keys(defaultHeaders).forEach((header) => {
      resp.headers.set(header, defaultHeaders[header])
    })
    resp.headers.set('cache-control', 'public, max-age=31536000')
    return resp
  },
}
