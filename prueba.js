const fileSelector = document.getElementById('file_selector');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  console.log("./Music/"+fileList[0].name);
});