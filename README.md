Steps to reproduce:

`yarn nx build`
`bun run dist/angular-universal-hono/server/server.mjs`
Go to `localhost:4000`

If you change `bun-hono-server.ts` to `hono-server.ts` in `project.json` and rerun the steps above (just with node instead of bun then it should work right)
