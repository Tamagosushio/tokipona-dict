import { assert } from "https://deno.land/std@0.84.0/_util/assert.ts";

class Word {
  // [スペル,読み,名詞,動詞,形容詞,その他]の長さ6リスト
  private mean:string[];

  constructor(list: string[]) {
    assert(
      list.length === 6,
      "puのコンストラクタ引数のリスト長が6でありません",
    );
    this.mean = list;
    return this;
  }
  getAllList(){
    return this.mean;
  }
  getAllDict(){
    const dict:{[key:string]:string} = {};
    dict.spell = this.mean[0];
    dict.kana = this.mean[1];
    dict.subject = this.mean[2];
    dict.verb = this.mean[3];
    dict.adjective = this.mean[4];
    dict.other = this.mean[5];
    return dict;
  }
}

export default class Tokipona {
  /* field */
  private static pu:{[key:string]:Word} = {};

  /* private */

  /* public */
  static async init() {
    const fileText:string = await Deno.readTextFile("./server/utils/pu.tsv");
    const pu2dArray:string[][] = fileText.split("\n").map((line) => {
      const lineList:string[] = line.replaceAll("\r", "").split("\t");
      return lineList;
    });
    pu2dArray.forEach((list) => {
      this.pu[list[0]] = new Word(list);
    });
  };
  static getMeanList(word:string):string[] {
    return this.pu[word]?.getAllList();
  }
  static getMeanDict(word:string):{[key:string]:string} {
    return this.pu[word]?.getAllDict();
  }
}


