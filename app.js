// JavaScript code to make the application interactive

document.addEventListener('DOMContentLoaded', () => {
    // Function to search properties
    function searchProperties() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const properties = document.querySelectorAll('#propertyList .property');
        
        properties.forEach(property => {
            const title = property.querySelector('.title').textContent.toLowerCase();
            const location = property.querySelector('.location').textContent.toLowerCase();
            const description = property.querySelector('.description').textContent.toLowerCase();
            const price = property.querySelector('.price').textContent.toLowerCase();
            
            if (title.includes(searchInput) || location.includes(searchInput) || description.includes(searchInput) || price.includes(searchInput)) {
                property.style.display = '';
            } else {
                property.style.display = 'none';
            }
        });
    }
    
    // Event listener for search button
    document.querySelector('#search section button').addEventListener('click', searchProperties);
    
    // Form submission handler for adding a listing
    document.getElementById('add-listing-form').addEventListener('submit', event => {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        
        const propertyList = document.getElementById('propertyList');
        const property = document.createElement('div');
        property.classList.add('property');
        
        property.innerHTML = `
            <h3 class="title">${title}</h3>
            <p class="description">${description}</p>
            <p class="location">${location}</p>
            <p class="price">${price} per month</p>
        `;
        
        propertyList.appendChild(property);
        
        // Clear form inputs
        document.getElementById('add-listing-form').reset();
    });
    
    // Chat form submission handler
    document.getElementById('chat-form').addEventListener('submit', event => {
        event.preventDefault();
        
        const message = document.getElementById('chat-message').value;
        const chatMessages = document.getElementById('chat-messages');
        
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        
        chatMessages.appendChild(newMessage);
        
        // Clear chat input
        document.getElementById('chat-message').value = '';
        
        // Scroll to the bottom of chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    
    // Register form submission handler
    document.getElementById('register-form').addEventListener('submit', event => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const fullName = document.getElementById('full_name').value;
        
        alert(`Registered with username: ${username}, email: ${email}, full name: ${fullName}`);
        
        // Clear form inputs
        document.getElementById('register-form').reset();
    });
    
    // Login form submission handler
    document.getElementById('login-form').addEventListener('submit', event => {
        event.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        alert(`Logged in as: ${username}`);
        
        // Clear form inputs
        document.getElementById('login-form').reset();
    });
    
    // Logout form submission handler
    document.getElementById('logout-form').addEventListener('submit', event => {
        event.preventDefault();
        
        alert('Logged out');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Load listings on page load
    fetchListings();

    // Function to search properties
    function searchProperties() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const properties = document.querySelectorAll('#propertyList .property');
        
        properties.forEach(property => {
            const title = property.querySelector('.title').textContent.toLowerCase();
            const location = property.querySelector('.location').textContent.toLowerCase();
            const description = property.querySelector('.description').textContent.toLowerCase();
            const price = property.querySelector('.price').textContent.toLowerCase();
            
            if (title.includes(searchInput) || location.includes(searchInput) || description.includes(searchInput) || price.includes(searchInput)) {
                property.style.display = '';
            } else {
                property.style.display = 'none';
            }
        });
    }
    
    // Event listener for search button
    document.querySelector('#search section button').addEventListener('click', searchProperties);
    
    // Form submission handler for adding a listing
    document.getElementById('add-listing-form').addEventListener('submit', event => {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        
        fetch('/api/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, location, price })
        })
        .then(response => response.json())
        .then(data => {
            displayListing(data);
            document.getElementById('add-listing-form').reset();
        })
        .catch(error => console.error('Error:', error));
    });
    
    // Chat form submission handler
    document.getElementById('chat-form').addEventListener('submit', event => {
        event.preventDefault();
        
        const message = document.getElementById('chat-message').value;
        const chatMessages = document.getElementById('chat-messages');
        
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        
        chatMessages.appendChild(newMessage);
        
        // Clear chat input
        document.getElementById('chat-message').value = '';
        
        // Scroll to the bottom of chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    
    // Function to fetch and display listings
    function fetchListings() {
        fetch('/api/listings')
        .then(response => response.json())
        .then(data => {
            data.forEach(displayListing);
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to display a listing
    function displayListing(listing) {
        const propertyList = document.getElementById('propertyList');
        const property = document.createElement('div');
        property.classList.add('property');
        
        property.innerHTML = `
            <h3 class="title">${listing.title}</h3>
            <p class="description">${listing.description}</p>
            <p class="location">${listing.location}</p>
            <p class="price">${listing.price} per month</p>
        `;
        
        propertyList.appendChild(property);
    }
});