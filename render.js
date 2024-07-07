const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");

setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.api.setTitle(title);
});

const openButton = document.getElementById("btn1");
const filePathElement = document.getElementById("filePath");

openButton.addEventListener("click", async () => {
  const filePath = await window.api.openFile();
  filePathElement.innerText = filePath;
});
