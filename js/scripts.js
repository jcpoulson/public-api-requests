// Global Variables
const url = "https://randomuser.me/api/?results=12&nat=us";
const gallery = document.querySelector('#gallery');
const modalWindow = document.querySelector('.modal-info-container');


// Helper function for closing the modal window
const closeModal = () => {
    document.querySelector('.modal-container').style.display = "none";
}


/* 
    This is the main function that requests data and handles much of the page display. This function uses async/await 
    to request 12 users and with that data it dynamically writes a user card and displays it on the page. This function also
    writes markup code for a modal window for each user and stores it in array, then displays that modal if the user selects that
    users code or selects next or previous user
*/
const requestData = async () => {
    const data = await fetch(url);
    const results = await data.json();
    const users = results.results;
    

    for (let i = 0; i < users.length; i++) {
        // Create the user card and add it to the document
        let userCard = document.createElement("DIV");
        gallery.appendChild(userCard);
        userCard.className = `card ${i}`;

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

    
    // Generate modals for each user and store the markup code in an array
    let userModals = []
    for (let i = 0; i < users.length; i++) {
        userModals.push( 
            `
                <img class="modal-img" src="${users[i].picture.large}" alt="profile picture" id="${i}">
                <h3 id="name" class="modal-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                <p class="modal-text">${users[i].email}</p>
                <p class="modal-text cap">${users[i].location.city}</p>
                <hr>
                <p class="modal-text">${users[i].cell}</p>
                <p class="modal-text">${users[i].location.street.number} ${users[i].location.street.name} ${users[i].location.city}, ${users[i].location.state} ${users[i].location.postcode}</p>
                <p class="modal-text">Birthday: ${users[i].dob.date.substring(0,10)}</p>
            `)
    }

    // adds an event listener to each card that fills the modal window data with the selected user and displays the data
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            modalWindow.innerHTML = userModals[i];
            document.querySelector('.modal-container').style.display = "";
        })
    }

    // Next/Prev Buttons. these event listeners grab the current user id and display the next or previous one in the userModals array
    const nextButton = document.querySelector('.modal-next');
    const prevButton = document.querySelector('.modal-prev');
    
    nextButton.addEventListener('click', function() {
        const currentUser = document.querySelector('.modal-img').id
        if (currentUser == "11") {
            modalWindow.innerHTML = userModals[0];
        } else {
            modalWindow.innerHTML = userModals[parseInt(currentUser) + 1];
        }
    })

    prevButton.addEventListener('click', function() {
        const currentUser = document.querySelector('.modal-img').id
        if (currentUser == "0") {
            modalWindow.innerHTML = userModals[11];
        } else {
            modalWindow.innerHTML = userModals[parseInt(currentUser) - 1];
        }
    })

    

    

    // Search Bar functionality
    const searchbar = document.querySelector('.search-input');
    searchbar.addEventListener('keyup', function() {
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i].childNodes[2].firstElementChild.textContent)
            
            
            if (cards[i].childNodes[2].firstElementChild.textContent.toLowerCase().includes(searchbar.value.toLowerCase())) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }
        }
    })

}



requestData();