export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/doroshenko-polina/comments", {
    method: "GET"
  })
 .then((response) => {
    return response.json();
  })
}

export function postComment({name ,text}) {
   return fetch("https://wedev-api.sky.pro/api/v1/doroshenko-polina/comments", {
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
          forceError: true,
        })
       })    
}
 