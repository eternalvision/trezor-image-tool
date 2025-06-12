const canvas = document.getElementById("trezorCanvas");
const ctx = canvas.getContext("2d");

const textInput = document.getElementById("textInput");
const fontSizeInput = document.getElementById("fontSizeInput");
const posXInput = document.getElementById("posXInput");
const posYInput = document.getElementById("posYInput");
const link = document.getElementById("downloadLink");

const renderCanvas = () => {
  const text = textInput.value || ":)";
  const fontSize = parseInt(fontSizeInput.value, 10) || 45;
  const posX = parseInt(posXInput.value, 10) || canvas.width / 2;
  const posY = parseInt(posYInput.value, 10) || canvas.height / 2;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, posX, posY);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const bw = avg > 127 ? 255 : 0;
    data[i] = data[i + 1] = data[i + 2] = bw;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  const url = canvas.toDataURL("image/png");
  link.href = url;
  link.download = "trezor-image.png";
};

[textInput, fontSizeInput, posXInput, posYInput].forEach((el) => {
  el.addEventListener("input", renderCanvas);
});

renderCanvas();
