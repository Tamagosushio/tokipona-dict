import { helpers, RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import Tokipona from "./../models/tokipona.ts";

Tokipona.init();

const deleteCharsReg = [/\{/g, /\}/g, /\[/g, /\]/g, /\(/g, /\)/g, /\./g, /\:/g];
const changeSpaceCharsReg = [/\-/g];

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
    let sentence: string = requestJson["sentence"];
    deleteCharsReg.forEach((reg) => {
      sentence = sentence.replaceAll(reg, "");
    });
    changeSpaceCharsReg.forEach((reg) => {
      sentence = sentence.replaceAll(reg, " ");
    });
    console.log(sentence);
    const meanList: { [key: string]: string }[] = [];
    // 単語ごとにその意味を配列に詰める
    sentence.split(" ").forEach((word) => {
      if(word === "") return;
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
  }
};
