let socket = new WebSocket("ws://localhost:8765/sub");

socket.onopen = function (e) {
  console.log("Connected to game socket.");
};

socket.onmessage = function (event) {
  console.log(`Data received from server: ${event.data}`);
};
