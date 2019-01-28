let requestURLRepos = 'https://api.github.com/users/modestfake/repos';
let requestURLFollow = 'https://api.github.com/users/modestfake/followers';

let listRepos = document.getElementById("listRepos");
let buttonRepos = document.getElementById("buttonRepos");
let listFollowers = document.getElementById("listFollowers");
let buttonFollowers = document.getElementById("buttonFollowers");



let get = (url) => {
    return fetch(url, {
      method: 'get'
    });
}
let getJSON = (url, addRequestToApiGitHub) => {
    return get(url).then((response) => {
            if (!response.ok) {
        throw Error(response.statusText ? response.statusText : 'Unknown network error');
      }

      return response.json();
    })
    .then((response) => {
       addRequestToApiGitHub(response);
        console.log(response);
    })
    .catch((err) => {
        console.log('Error');
    });
}

buttonRepos.addEventListener("click", (event) => {
          event.preventDefault();
          getJSON(requestURLRepos, renderRepos)}
);

buttonFollowers.addEventListener("click", (event) => {
          event.preventDefault();
          getJSON(requestURLFollow, renderFollow)}
);

let countRepos = 0; 

let renderRepos = (objJson) => {
  
   objJson.forEach(elemReros => { 

      let myList = document.createElement('ul');
      let myRepos = document.createElement('li');
      
      myRepos.textContent = `Repository name:  ${elemReros.name} Link:  ${elemReros['html_url']} Amount of stars: ${elemReros['stargazers_count']}`; 

      if (countRepos === 0) {
        myList.appendChild(myRepos);
        listRepos.appendChild(myList);
      } else {
        myList.replaceChild(myRepos, myRepos);
        listRepos.replaceChild(myList, myList);
      } 
   })

   countRepos++
}

let countFollow = 0;

let renderFollow = (objJson) => { 
  
   objJson.forEach(elemFollows => { 

      let myFollowList = document.createElement('ul');
      let myFollow = document.createElement('li');
      
      myFollow.textContent = `User name: ${elemFollows.login} Link:  ${elemFollows['html_url']}`;
      
      if (countFollow === 0) {
        myFollowList.appendChild(myFollow);
        listFollowers.appendChild(myFollowList);
      } else {
        myFollowList.replaceChild(myFollow, myFollow);
        listFollowers.replaceChild(myFollowList, myFollowList);
      }    
   })

   countFollow++
}