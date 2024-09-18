const sentenceInput = document.querySelector("#sentenceInput");
const sentenceSendButton = document.querySelector("#sentenceSendButton");
const wordMeansList = document.querySelector("#wordMeansList");
const messageBlock = document.querySelector("#messageBlock");
const generateImageButton = document.querySelector("#generateImageButton");
const tokiponaFontText = document.querySelector("#tokiponaFontText");
const tokiponaImage = document.querySelector("#tokiponaImage");

const e2i = new Elem2Img();

const listSequence = ["spell", "kana", "subject", "verb", "adjective", "other"];

sentenceInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sentenceSendButton.dispatchEvent(new PointerEvent("click"));
    e.preventDefault();
  }
  return false;
});

sentenceSendButton.onclick = async () => {
  const sentence = sentenceInput.value;
  wordMeansList.innerHTML = "";
  const response = await fetch("/api/get-mean-sentence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "sentence": sentence,
    }),
  });
  if (response.status === 200) {
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);
    // 単語の意味をリスト化して表示
    responseObj["sentenceMeans"].forEach((means) => {
      const elementWordMeansList = document.createElement("tr");
      listSequence.forEach((ele) => {
        const tmp = document.createElement("td");
        tmp.innerText = means[ele];
        elementWordMeansList.appendChild(tmp);
      });
      wordMeansList.appendChild(elementWordMeansList);
    });
    // メッセージブロックと画像を初期化
    messageBlock.innerText = "";
    // トキポナフォントで文を表示
    tokiponaFontText.innerText = sentence.replaceAll(".", String.fromCodePoint(0xF199C)).replaceAll(":", String.fromCodePoint(0xF199D));
  } else if (response.status === 400) {
    console.log(messageBlock);
    const errorJson = await response.text();
    const errorObj = JSON.parse(errorJson);
    messageBlock.innerText = errorObj["message"];
    tokiponaFont.innerText = "";
  }
  tokiponaImage.src = "";
  switchGenerateImageButton();
};

generateImageButton.onclick = async () => {
  await e2i.get_png((imageData) => {
    tokiponaImage.src = imageData;
  }, tokiponaFontText);
  tokiponaFontText.innerText = "";
  switchGenerateImageButton();
}

function switchGenerateImageButton(){
  generateImageButton.disabled = (tokiponaFontText.innerText === "");
}

