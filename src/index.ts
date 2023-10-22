import { Hono } from "hono";
import linkPreview from "./linkPreview";

const app = new Hono();

app.get("/", async (c) => {
  let { link } = c.req.query();
  if (link === undefined) {
    return c.html(indexHTML);
  }
  if (!link) link = "harryhdt.dev";
  const result = await linkPreview(link);
  return c.json({
    time: new Date(),
    link,
    result,
  });
});

const indexHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LinkPreview | Harry H</title>
  </head>
  <body>
    <div id="app" style="font-family:monospace;background:black;color:#ccc;position:fixed;top:0;right:0;bottom:0;left:0;padding:16px;font-size:4vw;display:flex;align-items:center;justify-content:center;flex-direction:column">
      <div style="font-size:16px;">
        <span>
          Part of
        </span>
        <a href="https://harryhdt.dev" target="_blank" style="color:#00CC00">
          harryhdt.dev
        </a>
      </div>
      <div style="margin-top:auto">
        Link Preview
      </div>
      <div style="margin-top:16px">
        Usage <a href="?link=harryhdt.dev" style="color:#ccc;text-decoration:none;background:#222;border:1px solid #00CC00">?link=url.com</a>
      </div>
      <marquee behavior="alternate" style="margin-top:auto">
        <a href="https://github.com/harryhdt/LinkPreview" target="_blank" style="margin-top:auto;display:inline-flex;align-items:center;font-size:16px;color:#aaa">
          <svg xmlns="http://www.w3.org/2000/svg" style="width:20px;margin-right:1vw" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65c-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></g></svg>
          <span>Github</span>
        </a>
      </marquee>
    </div>
  </body>
</html>`;

export default app;
