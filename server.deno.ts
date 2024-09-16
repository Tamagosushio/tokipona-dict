import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./server/router.ts";
import { send } from "https://deno.land/x/oak@v17.0.0/send.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ??
        "localhost"
    }:${port}`,
  );
});

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
  const filePath = context.request.url.pathname;
  try {
    if (filePath.startsWith("/api")) {
      await next();
    } else {
      await send(context, filePath, {
        root: "./public",
        index: "index.html",
      });
    }
  } catch {
    context.response.status = 404;
    context.response.body = "404 - file not found";
  }
});

app.listen({ port: 8000 });
