// Global Variables
const url = "https://randomuser.me/api/?results=12&nat=us";
const gallery = document.querySelector('#gallery');
const modalWindow = document.querySelector('.modal-container');

// Helper function for closing the modal window
const closeModal = () => {
    modalWindow.style.display = "none";
}

const nextModal = () => {
    // Remember that you have access to the users array and data inside the request data async function
}


// Main asynchronous data fetching function
const requestData = async () => {
    const data = await fetch(url);
    const results = await data.json();
    const users = results.results;
    console.log(users);
    

    for (let i = 0; i < users.length; i++) {
        // Create the user card and add it to the document
        let userCard = document.createElement("DIV");
        gallery.appendChild(userCard);
        userCard.className = "card";

        // Dynamically write the card content
        userCard.innerHTML = 
            `<div class="card-img-container">
                <img class="card-img" src="${users[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                <p class="card-text">${users[i].email}</p>
                <p class="card-text cap">${users[i].location.city}, ${users[i].location.state}</p>
            </div>`
    }

    // Dynamically write modal window content
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            modalWindow.innerHTML = 
                `<div class="modal">
                <button onClick="closeModal()" type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${users[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                    <p class="modal-text">${users[i].email}</p>
                    <p class="modal-text cap">${users[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${users[i].cell}</p>
                    <p class="modal-text">${users[i].location.street.number} ${users[i].location.street.name} ${users[i].location.city}, ${users[i].location.state} ${users[i].location.postcode}</p>
                    <p class="modal-text">Birthday: ${users[i].dob.date}</p>
                </div>
                
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>`
            modalWindow.style.display = "";
        })
    }

}



requestData();