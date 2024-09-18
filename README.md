# tokipona-dict
## Website
[この Deno Deploy サーバー](https://tokipona-dict.deno.dev)　から使うことができます。

## Overview
- トキポナの単語を日本語に訳す
- 文章をシテレンポナで画像化する

## Usage
- 表示されているテキストボックスにトキポナをアルファベットで入力
  - (入力形式はページのフッターを参照)
- 送信ボタンをクリック、または入力中にEnterでサーバーに文章を送信
  - 成功
    - シテレンポナ表示
    - 日本語訳表示
    - 画像化ボタンを押せるようになり、押すとシテレンポナが画像に置き換わる
  - 失敗
    - テキストボックス上位に失敗の原因を表示

## Reference
- トキポナを表示しているフォント: [Fairfax Pona HD](https://www.kreativekorp.com/software/fonts/fairfaxponahd/)
- CSSフレームワーク: [Bulma](https://bulma.io)
- 画像化する際に使用しているJavaScriptライブラリ: [elem2img](https://www.kakun.jp/web/elem2img-20240425/)

## Author
Tamagosshio
