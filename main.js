import { getComments } from "./api.js";
import { renderComments } from "./render.js";
const addFormElement = document.getElementById("add-form-name");
const buttonElement = document.getElementById("add-form-button")
const addFormTextElement = document.getElementById("add-form-text");

const containerElement = document.getElementById("container-comments");

let comments = [];


const plusZero = (str) => {
  return str < 10 ? `0${str}` : str;
};
const now = (currentDate) => {
  let date = plusZero(currentDate.getDate());
  let month = plusZero(currentDate.getMonth() + 1);
  let hours = plusZero(currentDate.getHours());
  let mins = plusZero(currentDate.getMinutes());
  return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
}

containerElement.textContent = "Подождите идет загрузка сайта";
export const fetchPromise = () => {
  getComments().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: now(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        activeLike: false,
        isLoading: false,
      };
    })
    comments = appComments;
    containerElement.textContent = "";
    renderComents();
  });
};

fetchPromise();
const initEventListeners = () => {
  const likesButton = document.querySelectorAll(".like-button");
  for (const likeButton of likesButton) {
    likeButton.classList.add('-loading-like');
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      function delay(interval = 300) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, interval);
        });
      };
      delay(2000).then(() => {

        const comment = comments[likeButton.dataset.index];
        comment.likes = comment.isLiked
          ? comment.likes - 1
          : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        renderComents();
      })
    })
  }
}
const replyToComment = () => {
  const commentsBody = document.querySelectorAll(".comment");
  for (const commentBody of commentsBody) {
    commentBody.addEventListener('click', () => {
      const oldComment = commentBody.dataset.text;
      const oldName = commentBody.dataset.name;
      addFormTextElement.value += `${oldComment}\n${oldName}:\n `;
      document.querySelector(".add-form-text").focus();

    })
  }
}
export const renderComents = () => {
  renderComments({ comments });
  initEventListeners();
  replyToComment();

}
renderComents();





  


console.log("It works!");


