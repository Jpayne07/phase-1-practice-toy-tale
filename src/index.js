let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  //toyName()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function getToys() {
  fetch("http://localhost:3000/toys/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received:", data);
      createDiv(data);
      //gettingNewToy()
    });
  }


function createDiv(objectArray) {
  objectArray.forEach((obj) => {
    console.log(obj.id);
    const toy = document.createElement('div');
    toy.classList.add('card');
    toy.setAttribute('id', obj.name);
    const toyCollection = document.getElementById('toy-collection');
    //name
    toyCollection.appendChild(toy);
    const toyTitle = document.createElement('h2');
    toyTitle.textContent = obj.name; // Use the assignment operator to set the textContent
    const toyDiv = document.getElementById(obj.name); // Use obj.name as the id
    toyDiv.appendChild(toyTitle);
    //image
    const toyImg = document.createElement('img');
    toyImg.setAttribute('src', obj.image)
    toyImg.classList.add('toy-avatar');
    toyDiv.appendChild(toyImg);
      //likcount 
      const likeCount = document.createElement('h3');
      likeCount.setAttribute('id', obj.id)
      likeCount.textContent = (`${obj.likes}  likes`);
      toyDiv.appendChild(likeCount)
    //like button
    const button = document.createElement('button');
    button.classList.add('like-btn');
    button.setAttribute('id', obj.id)
    button.textContent = ('Like ❤️') // Use the assignment operator to set the textContent
    toyDiv.appendChild(button)

    button.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      liked(e)
    })
  
    
  });
}

const addBtn = document.querySelector('.add-toy-form')

addBtn.addEventListener("submit", (e)=> {
  e.preventDefault();
  let nameInput = addBtn.querySelector('input[name="name"]');
  let imageInput = addBtn.querySelector('input[name="image"]');
    newToy={
    name:nameInput.value,
    image:imageInput.value,
    likes:0

  }
  addToys(newToy)

})

function addToys(newToy) {
  fetch('http://localhost:3000/toys/',{
    method:"POST",
     headers: {
      "Content-Type": "application/json",
      'Content-Type': 'application/x-www-form-urlencoded',
  },

  body: JSON.stringify(newToy),
   

  })
.then(res => res.json())
.then(newToy => console.log(data.length))
}

function updateLike(objectArray){
  const timeoutDuration = 1000; 
  objectArray.forEach((obj) =>{
  likeCount = (obj.likes);
  id = obj.id

  })
}



function liked(e) {
  let likesText = e.target.previousElementSibling.textContent; // Get the text content
  let likesCount = parseInt(likesText.split(' ')[0]); // Extract the number of likes
  let plusOne = likesCount + 1;
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "likes": plusOne
    }),
  })
    .then(response => response.json())
    .then((data => {
      e.target.previousElementSibling.innerText = `${plusOne} likes`;
    }))
    .catch(error => {
      console.error(error); // Handle errors
    });
}