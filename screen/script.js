const video = document.querySelector("video");
const fullScreenButton = document.querySelector("button");

fullScreenButton.onclick = () => {
  document.body.style.cursor = "none";
  document.body.requestFullscreen().then(() => fullScreenButton.remove());
};

const setVideo = (source, size, border) => {
  video.src = "videos/" + source + ".mp4";

  let circle = source === "bruce";
  let styles = {
    width: circle ? size : "initial",
    height: size,
    display: "block",
    borderRadius: circle ? "50%" : "0",
    borderStyle: border ? "solid" : "none",
  };

  Object.assign(video.style, styles);
};

let socket = io("http://localhost:8000");

socket.on("message", ({ command, data }) => {
  if (command === "setVideo") {
    setVideo(data.source, data.size, data.border);
  } else if (command === "setTime") {
    video.currentTime = data;
  } else if (command === "setPlaying") {
    if (data) video.play();
    else video.pause();
  }
});

setInterval(() => {
  socket.emit("message", {
    command: "time",
    data: video.currentTime,
  });
}, 1000);
