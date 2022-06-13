const url = "https://randomuser.me/api";
// const awesomeIcons = ["fa-route", "fa-map", "fa-clock", "fa-calendar"];

// const ul = document.querySelector('ul');
// const lis = ul.querySelectorAll('li');

// const newlis = [...lis].forEach((li, idx) => {
//   const i = document.createElement('i');
//   i.className = "fa " + awesomeIcons[idx];
//   ul.insertBefore(i, li);
// });


fetch(url)
  .then( function(data) { 
    return data.json() 
  })
  .then(function(res) {
    console.log(res.results);
    return buildUsers(res.results);
  })
  .then(function(users) {
    users.forEach( (user) => {  
      document.querySelector("#user").appendChild(user);
      document.querySelectorAll("#user ul li").forEach( (li) => applyHover(li) );
    })
  });



function buildUsers(users) {
  if(!users.length) return null;
  let usersArr = [];
  for(let i = 0; i < users.length; i++) {
    usersArr.push( buildProfile(users[i]) );
  }
  return usersArr;
}

function buildProfile(user) {
  
  let formatName = capitalizeFirst(user.name.first) + " " + user.name.last[0].toUpperCase();
  let formatLoc = capitalizeFirst(user.location.city) + ", " + capitalizeFirst(user.location.state);
  let formatDOB = dateFormat(user.dob.date);
  
  let newDiv = document.createElement("div");
  
  newDiv.innerHTML = `
    <img src="${ user.picture.large }" alt="${ formatName }">
    <h1 id="active">My name is ${ formatName }<span></span></h1>
    
    <hr/>
    <ul>
      <li  class="fas fa-info-circle fa-lg">
        <p>My username is ${ user.login.username }</p>
      </li>
      <li class="far fa-envelope fa-lg">
        <p>My email is ${ user.email }</p>
      </li>
      <li class="fas fa-phone fa-lg">
        <p>My phone number is ${ user.phone }</p>
      </li>
      <li class="fas fa-map-marked-alt fa-lg">
        <p>My location is ${ formatLoc }</p>
      </li>
      <li class="far fa-calendar-alt fa-lg">
        <p>My Date of Birth is ${ formatDOB }</p>
      </li>
    </ul>
  `;
 
  return newDiv;
}

function capitalizeFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function changeActive(e) {
  console.log(e)
  document.querySelector("#active::after").style.content = e.target.children[0].textContent;
}

function applyHover(li) {
  li.addEventListener("mouseenter", function(e) {
    document.querySelector("#user > div h1").style= "transform: translateX(-100%);";
    document.querySelector("#user > div h1 span").textContent = e.target.children[0].textContent;
  })
  li.addEventListener("mouseleave", function(e) {
    document.querySelector("#user > div h1").style = "";
    document.querySelector("#user > div h1 span").textContent = "";
  })
}

function dateFormat(time) {
  let date = time.split("-");
  return `${ date[1] }/${ date[2].split("T")[0] }/${ date[0] }`;
}