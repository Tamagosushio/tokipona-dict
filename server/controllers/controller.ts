import { helpers, RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";

import Tokipona from "./../models/tokipona.ts"
Tokipona.init();

export const controller = {
  // async getMean(ctx: RouterContext) {
  //   const requestJson = await ctx.request.body.json();
  //   console.log(requestJson.word);
  // },
  async getMean(ctx:RouterContext){
    const { word } = helpers.getQuery(ctx, {mergeParams: true});
    const means:{[key:string]:string} = Tokipona.getMeanDict(word);
    if(!means){
      ctx.response.status = 404
      ctx.response.body = { message: "Not found." }
    }else{
      ctx.response.body = JSON.stringify(means, null, 2); 
    }
  }
};
