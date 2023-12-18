// 유저정보를 저장할 배열
const users = [];

// 유저를 추가하는 함수
export const addUser = ({ id, username, room }) => {
  username = username.trim();

  if (!username) {
    return {
      err: "유저네임에 문제있슴",
    };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

// 메시지 구축하는 함수
export const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

// 유저 퇴장 시 배열에서 삭제 함수
export const disConnectUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// 유저 찾는 함수
export const getUser = (id) => {
  return users.find((user) => user.id === id);
};
