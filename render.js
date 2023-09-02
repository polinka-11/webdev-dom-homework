const listElement = document.getElementById("comments");
export function renderComments({comments}) {
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
    
   listElement.innerHTML = commentsHTML;
  
            }
        
  
 
 
  
  
//}