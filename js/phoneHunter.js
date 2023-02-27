const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    // clear previous result 
    phonesContainer.innerText = '';
    // display fix quantity phone & show all btn 
const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // if phone not found 
    const notFound = document.getElementById('no-phone-found-message');
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else{
        notFound.classList.add('d-none')
    }

    // append child 
    phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="card h-100 p-3">
        <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name: ${phone.phone_name}</h5>
            <p class="card-text">Phone Description: This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Show Details
            </button>
            
        </div>
    </div>
    `;
phonesContainer.appendChild(phoneDiv)
    })

    // toggleSpinner stop 
    toggleSpinner(false);

}


const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
     
    processSearch(12);
   

})

//use Enter Button
document.getElementById('search-field').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
    processSearch(12);

    }
})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('show-all-btn').addEventListener('click', function() {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
displayPhoneDetails(data.data)

}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerText~ = `${phone.releaseDate ? phone.releaseDate : 'No release Date found'}`
}

loadPhone('iPhone');
 
