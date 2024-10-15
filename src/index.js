// declare global constants

const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')


// helper functions
function addToys(toy) {
  const card = document.createElement('div')
  const nameTag = document.createElement('h2')
  const toyImg = document.createElement('img')
  const toyLikes = document.createElement('p')
  const likeButton = document.createElement('button')
  card.className = "card"
  likeButton.className = "like-btn"
  likeButton.textContent = "LIKE"
  likeButton.id = toy.id
  toyLikes.textContent = `${toy.likes} LIKES`
  nameTag.textContent = toy.name
  toyImg.className = "toy-avatar"
  toyImg.src = toy.image
  toyCollection.append(card)
  card.appendChild(toyImg)
  card.appendChild(nameTag)
  card.appendChild(likeButton)
  card.appendChild(toyLikes)

  likeButton.addEventListener("click", () => addLikes(toy, toyLikes))
}

async function addLikes(toy, toyLikes) {
  toy.likes++

  const response = await fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type' : 'application/json'},
    body: JSON.stringify( { likes: toy.likes } )
  })

  toyLikes.textContent = `${toy.likes} LIKES`
}

async function submitNewToy(event) {
    event.preventDefault()
    const toyForm = document.querySelectorAll('input')
    const toyFormOne = toyForm[0]
    const toyFormTwo = toyForm[1]
    const userNameInput = toyFormOne.value
    const userImgInput = toyFormTwo.value
      const response = await fetch('http://localhost:3000/toys',{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify( { name: userNameInput, image: userImgInput, likes: 0} )
      })
      const data = await response.json()
      addToys(data)


}



// fetch on load // 
async function getToys() {
const response = await fetch('http://localhost:3000/toys')
const toys = await response.json()
console.log(toys)

  toys.forEach(addToys)

}

getToys()



// event listeners
toyForm.addEventListener("submit", submitNewToy)










// preloaded code

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
