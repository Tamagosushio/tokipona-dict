import { helpers, RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { serveFile } from "https://deno.land/std@0.202.0/http/file_server.ts";
import Tokipona from "./../models/tokipona.ts";
import { Route } from "https://deno.land/x/oak@v17.0.0/mod.ts";

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
    // 単語ごとにその意味を配列に詰める
    sentence.split(" ").forEach((word, index, array) => {
      // 最後の単語が"."で終わっている場合にはそれを取り除く
      if(index === array.length-1 && word.endsWith(".")){
        word = word.slice(0,-1);
      }
      meanList.push(Tokipona.getMeanDict(word));
    });
    // 対応しない単語があればエラー処理
    if (meanList.includes(undefined)) {
      ctx.response.status = 400;
      ctx.response.body = { message: "includes not existing word" };
    } else {
      const responseJson = {};
      responseJson["sentenceMeans"] = meanList;
      ctx.response.body = JSON.stringify(responseJson, null, 2);
    }
  },

  async getSentenceImage(ctx: RouterContext){
    const requestJson = await ctx.request.body.json();
    const sentence: string = requestJson["sentence"];
  }
};
