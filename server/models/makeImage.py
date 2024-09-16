import PIL.Image
import PIL.ImageDraw
import PIL.ImageFont

import math
import sys

import base64
from io import BytesIO

# 使うフォント，サイズ，描くテキストの設定
ttfontname = "./../utils/FairfaxPonaHD.ttf"
fontsize = 64

# 画像化するテキストをコマンドライン引数で受け取る
text = sys.argv[1]

# 記号を置き換え
text = text.replace(".", chr(0xF199C))
text = text.replace(":", chr(0xF199D))

# 画像サイズ，背景色，フォントの色を設定
canvasSize    = (fontsize*len(text.split(" ")) + fontsize//2, math.floor(fontsize*1.5))
backgroundRGB = (255, 255, 255)
textRGB       = (0, 0, 0)


# 文字を描く画像の作成
img  = PIL.Image.new('RGB', canvasSize, backgroundRGB)
draw = PIL.ImageDraw.Draw(img)

# 用意した画像に文字列を描く
font = PIL.ImageFont.truetype(ttfontname, fontsize)
textCenter = (canvasSize[0]/2, canvasSize[1]/2)
draw.text(textCenter, text, fill=textRGB, font=font, anchor="mm")

buffer = BytesIO()
img.save(buffer, "png")
img_str = base64.b64encode(buffer.getvalue()).decode("ascii")
print(
    base64.b64encode(buffer.getvalue()).decode("ascii")
)

