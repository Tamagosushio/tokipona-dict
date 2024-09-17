const sentenceInput = document.querySelector("#sentenceInput");
const sentenceSendButton = document.querySelector("#sentenceSendButton");
const wordMeansList = document.querySelector("#wordMeansList");
const messageBlock = document.querySelector("#messageBlock");
const generateImageButton = document.querySelector("#generateImageButton");
const imageBlock = document.querySelector("#imageBlock");

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
    responseObj["sentenceMeans"].forEach((means) => {
      const elementWordMeansList = document.createElement("tr");
      listSequence.forEach((ele) => {
        const tmp = document.createElement("td");
        tmp.innerText = means[ele];
        elementWordMeansList.appendChild(tmp);
      });
      wordMeansList.appendChild(elementWordMeansList);
    });
    messageBlock.innerText = "";
  } else if (response.status === 400) {
    console.log(messageBlock);
    const errorJson = await response.text();
    const errorObj = JSON.parse(errorJson);
    messageBlock.innerText = errorObj["message"];
  }
};

generateImageButton.onclick = async () => {
  const sentence = sentenceInput.value;
  imageBlock.innerHTML = "";
  const response = await fetch("/api/get-sentence-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "sentence": sentence,
    }),
  });
  if (response.status === 200) {
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);
    const elementImage = document.createElement("img");
    elementImage.src = "data:image/png;base64," + responseObj["image"];
    imageBlock.appendChild(elementImage);
  } else if (response.status === 400) {
    console.log(messageBlock);
    const errorJson = await response.text();
    const errorObj = JSON.parse(errorJson);
    messageBlock.innerText = errorObj["message"];
  }
};
