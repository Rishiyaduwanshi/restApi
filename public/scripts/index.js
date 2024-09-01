function copyToClipboard(elementId) {
  const copyText = document.getElementById(elementId).innerText;
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      alert("Copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
