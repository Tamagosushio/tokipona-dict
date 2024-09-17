import { python } from "https://deno.land/x/python/mod.ts";

/* pythonモジュールのインポート */
const Image = python.import("PIL.Image");
const ImageDraw = python.import("PIL.ImageDraw");
const ImageFont = python.import("PIL.ImageFont");
const math = python.import("math");
const base64 = python.import("base64");
const io = python.import("io");

const ttfFontPath: string = "./server/utils/FairfaxPonaHD.ttf";
const fontSize: number = 64;
const font = ImageFont.truetype(ttfFontPath, fontSize);

const backgroundColor = "white";
const textColor = "black";

export default function makeImageBase64(text: string): string {
  // 記号を置き換える
  text.replaceAll(".", String.fromCharCode(0xF199C));
  text.replaceAll(":", String.fromCharCode(0xF199D));
  // 画像生成
  const canvasSize = [
    fontSize * text.split(" ").length + math.floor(fontSize / 2),
    math.floor(fontSize * 1.5),
  ];
  const img = Image.new("RGB", canvasSize, backgroundColor);
  const draw = ImageDraw.Draw(img);
  const textCenter = [canvasSize[0] / 2, canvasSize[1] / 2];
  draw.text(textCenter, text, textColor, font, "mm");
  // 画像をバッファに移し、BASE64化
  const buffer = io.BytesIO();
  img.save(buffer, "png");
  const imgBase64 = base64.b64encode(buffer.getvalue()).decode("ascii");
  return imgBase64;
}
