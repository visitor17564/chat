const socket = io();

const form = document.getElementById("form");
console.log(form);
const input = document.getElementById("input");
console.log(input);

const messages = document.getElementById("chat");
console.log(messages);

form.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg, userId) => {
  let sendUserClass = "you";
  if (userId === socket.id) {
    sendUserClass = "me";
  }
  const item = document.createElement("li");
  item.className = `${sendUserClass}`;
  item.innerHTML = `          
    <div class="entete">
      <h3>10:12AM, Today</h3>
      <h2>정창일</h2>
      <span class="status blue"></span>
      </div>
        <div class="triangle"></div>
        <div class="message">
          ${msg}
      </div>`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
