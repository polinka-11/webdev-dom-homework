import { renderComents, fetchPromise } from './main.js';
import { postComment, login, token, setToken, UserName, setUserName, UserRegistration } from './api.js';

export function renderComments({ comments }) {
  let commentsElement = document.getElementById("comments");
  const commentsHTML = comments.map((comment, index) => {
    return `<ul class="comments">
        <li class="comment" id="comment" data-text="${comment.text}" data-name="${comment.name}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="${comment.likes ? 'like-button -active-like' : 'like-button'}"></button>
            </div>
          </div>
          </li>
          </ul>`;
  })
    .join("");

  commentsElement.innerHTML = commentsHTML;

}
let addElement = document.getElementById("add");

const appForm = `
  <div class="add-form" id="add-form">
    <input 
      id="add-form-name" 
      type="text" 
      class="add-form-name" 
      readonly="readonly"
      placeholder="Введите ваше имя" 
    />
    <textarea 
      id="add-form-text" 
      type="textarea" 
      class="add-form-text " 
      placeholder="Введите ваш коментарий"
      rows="4">
    </textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="add-form-button">Написать</button>
    </div>
  </div>`;

addElement.innerHTML = appForm;
addElement.classList.add('add-none');

const buttonElement = document.getElementById("add-form-button");
const addFormElement = document.getElementById("add-form-name");
const addFormTextElement = document.getElementById("add-form-text");
//const loadingForm = document.getElementById("loadingForm");
const formAddElement = document.getElementById("add-form");
// if (!navigator.onLine) { /реализация при отсутсвии интернета 2 вариант
// alert("Отсутствует подключение к интернету");
//return;
//}
const addNewComment = () => {
  addElement.disabled = true;
  // addElement.classList.add('add-none');
  // addElement.textContent = "Комментарий добавляется ...";
  const postTask = (text) => {
    postComment({
      name: addFormElement.value,
      text: addFormTextElement.value
    }).then(() => {
      return fetchPromise();
    })
      .then(() => {
        console.log('1212');
        // addElement.textContent = "";
        addElement.classList.remove('add-none');
        addFormElement.value = "";
        addFormTextElement.value = "";
      })
      .catch((error) => {
        if (error.message === "Сервер упал") {
          //addElement.textContent = "";
          //formAddElement.classList.remove('add-none');
          postTask(text);
        };
        if (window.navigator.onLine === false) {
          alert("Отсутствует подключение к интернету");
        }
        addElement.textContent = '';
        addElement.classList.remove('add-none');
      })
  }

  postTask();
  renderComents();
}
//window.addEventListener('offline', function (e) { /продолжение реализации задачи с интернетом 2 вариант
///alert("Отсутствует подключение к интернету");
//});

buttonElement.addEventListener("click", addNewComment);

const authorization = document.getElementById('authorization');
const registration = document.getElementById('registration');
const goAuthorizationButton = document.getElementById("go-authorization-button");


const addAutorization = `    
    <div class="authorization-form" id="authorization-form">
    <div class="authorization-form-title">Форма входа</div>
    <input id="authorization-form-login" type="text" class="authorization-form-login" placeholder="Введите логин" />
    <input id="authorization-form-password" type="text" class="authorization-form-password"
      placeholder="Введите пароль" />
    <div class="authorization-form-row">
      <button class="authorization-form-button" id="authorization-form-button">Войти</button>
      <button class="authorization-form-button2" id="authorization-form-button2">Зарегистрироваться</button>
    </div>
  </div>`;
authorization.innerHTML = addAutorization;
authorization.classList.add('add-none');

const addRegistration = `
  <div class="registration-form" id="registration-form">
  <div class="registration-form-title">Форма входа</div>
  <input id="registration-form-login" type="text" class="registration-form-login" placeholder="Введите логин" />
  <input id="registration-form-name" type="text" class="registration-form-name" placeholder="Введите имя" />
  <input id="registration-form-password" type="text" class="registration-form-password"
    placeholder="Введите пароль" />
  <div class="registration-form-row">
    <button class="registration-form-button" id="registration-form-button">Зарегистрироваться</button>
    <button class="registration-form-button2" id="registration-form-button2">Войти</button>
  </div>
  </div>
  `;

registration.innerHTML = addRegistration;
registration.classList.add('add-none');

const autor = () => {

  const authorizationFormButton2 = document.getElementById('authorization-form-button2');
  const registrationFormButton2 = document.getElementById('registration-form-button2');
  const authorizationFormButton = document.getElementById('authorization-form-button');
  const registrationFormButton = document.getElementById('registration-form-button');
  const authorizationFormLogin = document.getElementById('authorization-form-login');
  const authorizationFormPassword = document.getElementById('authorization-form-password');
  const registrationFormLogin = document.getElementById('registration-form-login');
  const registrationFormName = document.getElementById('registration-form-name');
  const registrationFormPassword = document.getElementById('registration-form-password');


  authorizationFormButton.addEventListener("click", () => {
    login({
      login: authorizationFormLogin.value,
      password: authorizationFormPassword.value,
    }).then((responseData) => {
      console.log(responseData.user.token);
      setToken(responseData.user.token);
      setUserName(responseData.user.name)
      addFormElement.value = UserName;
      console.log(UserName);
      authorization.classList.add('add-none');
      commentsElement.classList.remove('add-none');
      addElement.classList.remove('add-none');
    }).catch((error) => {
      if (error.message === "Не верный логин или пароль") {
        alert("Введен не верный логин или пароль")
        return;
      }
    });
  });

  authorizationFormButton2.addEventListener("click", () => {
    console.log('g');
    registration.classList.remove('add-none');
    authorization.classList.add('add-none');

    registrationFormButton2.addEventListener("click", () => {
      authorization.classList.remove('add-none');
      registration.classList.add('add-none');
      console.log('i');
    });

    registrationFormButton.addEventListener("click", () => {
      UserRegistration({
        login: registrationFormLogin.value,
        name: registrationFormName.value,
        password: registrationFormPassword.value,
      }).then((responseData) => {
        setToken(responseData.user.token)
        setUserName(responseData.user.name)
        addFormElement.value = UserName;
        registration.classList.add('add-none');
        commentsElement.classList.remove('add-none');
        addElement.classList.remove('add-none');
      }).catch((error) => {
        if (error.message === "Повторяется имя") {
          alert("Имя уже есть, введиь=те новое")
          return;
        }
      })
    });
  })
}
let commentsElement = document.getElementById("comments");

goAuthorizationButton.addEventListener("click", () => {
  const goAuthorizationText = document.getElementById('go-authorization-text');
  goAuthorizationText.classList.add('add-none');
  commentsElement.classList.add('add-none');
  authorization.classList.remove('add-none');
  autor();
})
buttonElement.addEventListener("click", () => {

  addFormElement.classList.remove("error");
  if (addFormElement.value === "") {
    addFormElement.classList.add("error");
    return;
  }
  addFormTextElement.classList.remove("error");
  if (addFormTextElement.value === "") {
    addFormTextElement.classList.add("error");
    return;
  }


  })