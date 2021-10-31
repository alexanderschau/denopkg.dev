<script>
  let registry = "";
  let tag = "";
  let path = "";
  let repoPath = "";
  $: repoPath = getRepoData(registry);
  const checkGitHub = /github\.com\/(.*?)\/((?:(?!\.git).)*)/;
  const checkGitLab = /gitlab\.com\/(.*?)\/((?:(?!\.git).)*)/;
  const getRepoData = (url) => {
    const checkGh = url.match(checkGitHub);
    if (checkGh) {
      return `gh/${checkGh[1]}/${checkGh[2]}`;
    }
    const checkGl = url.match(checkGitLab);
    if (checkGl) {
      return `gl/${checkGl[1]}/${checkGl[2]}`;
    }
  };
  const copyToClipboard = (str) => {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(str);
    }
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };
  let finalUrl = ""
  $: finalUrl = `https://denopkg.dev/${repoPath}${tag != "" ? "@" + tag : ""}${path != "" && path[0] != "/" ? "/" + path : path}`
</script>

<div
  class="absolute top-0 left-0 h-full w-full text-center bg-secondary dark:bg-secondary-dark text-primary dark:text-primary-dark"
>
  <div class="max-w-xl mx-auto my-10 px-2">
    <svg
      class="mx-auto fill-current"
      width="4rem"
      height="4rem"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 6V0H64V6H0Z" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 10V64H64V10H0ZM48 16V48H32V16H48Z"
      />
    </svg>

    <div class="font-bold text-3xl my-5">Deno Package Registry</div>
    <div class="flex">
      <input
        bind:value={registry}
        type="text"
        placeholder="Repository URL"
        class="input flex-14"
      />
      <div class="my-auto mx-3">@</div>
      <input
        bind:value={tag}
        type="text"
        placeholder="Tag Name"
        class="input flex-5"
      />
    </div>
    <input
      bind:value={path}
      type="text"
      placeholder="File Path (default: /mod.ts)"
      class="input flex-5"
    />
    {#if repoPath}
      Import the following URL in Deno:
      <div
        class="my-3 py-2 px-4 text-left rounded-lg bg-primary bg-opacity-2 dark:bg-primary-dark dark:bg-opacity-2 flex w-full"
      >
        <div class="flex-1 overflow-auto opacity-70 py-3 px-3">
          {finalUrl}
        </div>
        <div class="my-auto ml-3 cursor-pointer opacity-50 hover:opacity-100">
          <svg
            on:click={() => {
              copyToClipboard(finalUrl);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
            />
            <path
              d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
            />
          </svg>
        </div>
      </div>
    {/if}
    <div class="italic opacity-30 my-3">
      made by <a class="underline" target="_blank" href="https://alexander.sbs"
        >@alexanderschau</a
      >
      |
      <a
        class="underline"
        target="_blank"
        href="https://github.com/alexanderschau/denopkg.dev">GitHub repo</a
      >
    </div>
  </div>
</div>
