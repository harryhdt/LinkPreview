import { Hono } from "hono";
import linkPreview from "./linkPreview";

const app = new Hono();

app.get("/", async (c) => {
  let { link } = c.req.query();
  if (!link) link = "harryhdt.dev";
  const result = await linkPreview(link);
  return c.json({
    time: new Date(),
    link,
    result,
  });
});

export default app;
