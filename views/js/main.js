const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("chat");
const join = document.getElementById("join");

// 메시지 전송 함수
function sendMessage(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
}

// send가 클릭되거나 엔터카 쳐졌을 때 작동
form.addEventListener("click", (e) => {
  sendMessage(e);
});
input.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  if (e.keyCode === 13 || e.which === 13) {
    sendMessage(e);
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
