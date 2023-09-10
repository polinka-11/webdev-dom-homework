export let token;

export const setToken = (newToken) => {
  token = newToken;
}

export let UserName;

export const setUserName = (newUserName) => {
  UserName = newUserName;
}

export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v2/doroshenko-polina/comments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
 .then((response) => {
    return response.json();
  })
}
const addFormElement = document.getElementById("add-form-name");
const addFormTextElement = document.getElementById("add-form-text");
export function postComment({name ,text}) {
   return fetch("https://wedev-api.sky.pro/api/v2/doroshenko-polina/comments", {
        method: "POST",
        body: JSON.stringify({
          name: name
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
          text: text
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        }), 
          headers: {
            Authorization: `Bearer ${token}`,
          }
         // forceError: true,
        })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else if (!navigator.onLine) {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
            return Promise.reject(new Error("Проблемы с интернетом"));
          } else if (response.status === 400) {
            alert("Имя и комментарий должны быть не короче 3 символов");
            if (addFormTextElement.value.length < 3 || addFormElement.value.lenght < 3) {
              addFormElement.classList.add("color");
              addFormTextElement.classList.add("color");
            }
            return Promise.reject(new Error("Не верный пользовательский ввод"));
          } else {
            return Promise.reject(new Error("Ошибка сервера"));
          }
        })
        
}
export function login({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Не верный логин или пароль");
      };
      return response.json();
    })
}

export function UserRegistration({ login, name, password }) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Повторяется имя");
      };
      return response.json();
    })
}

 