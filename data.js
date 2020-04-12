let socket = new WebSocket("ws://127.0.1:8765");

socket.onopen = function (e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("John");
};
