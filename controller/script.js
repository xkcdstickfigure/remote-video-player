let socket = io("http://localhost:8000");

const sendMessage = (command, data) =>
  socket.emit("message", { command, data });

updateButton.onclick = () => {
  let source = document.querySelector("input[name=source]:checked").value;
  let size = Number(sizeInput.value);
  let border = borderCheckbox.checked;
  sendMessage("setVideo", { source, size, border });
};

playButton.onclick = () => sendMessage("setPlaying", true);
pauseButton.onclick = () => sendMessage("setPlaying", false);
jumpButton.onclick = () => sendMessage("setTime", Number(timeInput.value));

socket.on("message", ({ command, data }) => {
  if (command === "time") {
    remoteTimeValue.innerText = Math.floor(data);
  }
});
