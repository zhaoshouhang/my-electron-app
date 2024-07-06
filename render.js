const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");

setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.api.setTitle(title);
});
