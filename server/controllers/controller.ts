import { helpers, RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { serveFile } from "https://deno.land/std@0.202.0/http/file_server.ts";
import Tokipona from "./../models/tokipona.ts";

Tokipona.init();

export const controller = {
  getMean(ctx: RouterContext) {
    const { word } = helpers.getQuery(ctx, { mergeParams: true });
    const means: { [key: string]: string } = Tokipona.getMeanDict(word);
    if (!means) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Not found." };
    } else {
      ctx.response.body = JSON.stringify(means, null, 2);
    }
  },

  async getMeanSentence(ctx: RouterContext) {
    const requestJson = await ctx.request.body.json();
    const sentence: string = requestJson["sentence"];
    const meanList: { [key: string]: string }[] = [];
    sentence.split(" ").forEach((word) => {
      meanList.push(Tokipona.getMeanDict(word));
    });
    if (meanList.includes(undefined)) {
      ctx.response.status = 400;
      ctx.response.body = { message: "includes not existing word" };
    } else {
      const responseJson = {};
      responseJson["sentenceMeans"] = meanList;
      ctx.response.body = JSON.stringify(responseJson, null, 2);
    }
  },
};
