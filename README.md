# Denopkg.dev

![hero image](./hero.png)

Denopkg.dev is a free and open source deno package proxy for GitHub and GitLab
repositories as well as packages from the official Deno Registry.

Denopkg.dev makes use of Cloudflares distributed serverless platform
[Workers](https://workers.cloudflare.com/) as well as their
[global CDN](https://www.cloudflare.com/cdn/) to enable fast requests directly
from the edge. The website is hosted on their JAMstack platform
[Pages](https://pages.cloudflare.com/).

_Thanks for these amazing services at this point :)_

## Usage

If you're to lazy to read the following section you can also use our step by
step URL Generator at [https://denopkg.dev](https://denopkg.dev/).

### GitHub Repository

```ts
import {} from "https://denopkg.dev/gh/<username>/<repository-name>@<tag name>/path/to/file.ts";
```

or

```ts
import {} from "https://gh.denopkg.dev/<username>/<repository-name>@<tag name>/path/to/file.ts";
```

_(this domain is only a redirect to the one above)_

### GitLab Repository

```ts
import {} from "https://denopkg.dev/gl/<username>/<project-name>@<tag name>/path/to/file.ts";
```

or

```ts
import {} from "https://gl.denopkg.dev/<username>/<project-name>@<tag name>/path/to/file.ts";
```

_(this domain is only a redirect to the one above)_

## Development

If you have some great ideas for new features feel free to add them on your own.
To spin up a development environment you can of course create a new GitHub
codespace with the "Code" button above. Alternatively use the `.devcontainer`
folder and your local docker installation to spin it up in a container or use
the plain old method and install [NodeJS (latest LTS)](https://nodejs.org/en/),
yarn (`npm i -g yarn`) and
[wrangler](https://developers.cloudflare.com/workers/#installing-the-workers-cli)
by hand. _Good luck 😊_
