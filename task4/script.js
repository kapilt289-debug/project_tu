// Initialize Email.js
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your Email.js public key
})();

// Services data
const services = [
    { name: "Wash and Fold", price: 10 },
    { name: "Dry Cleaning", price: 20 },
    { name: "Ironing", price: 5 },
    { name: "Stain Removal", price: 15 }
];

let cart = [];
let total = 0;

// Load services
document.addEventListener("DOMContentLoaded", () => {
    const servicesList = document.getElementById("services-list");
    services.forEach((service, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${service.name} - $${service.price}</p>
            <button onclick="addToCart(${index})">Add Item</button>
            <button onclick="removeFromCart(${index})">Remove Item</button>
        `;
        servicesList.appendChild(div);
    });
});

// Add to cart
function addToCart(index) {
    const service = services[index];
    cart.push(service);
    total += service.price;
    updateCart();
}

// Remove from cart
function removeFromCart(index) {
    const service = services[index];
    const itemIndex = cart.findIndex(item => item.name === service.name);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        total -= service.price;
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById("total").textContent = total;
}

// Scroll to booking on button click
document.getElementById("book-btn").addEventListener("click", () => {
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
});

// Book Now with Email.js
document.getElementById("book-now-btn").addEventListener("click", () => {
    const name = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const servicesList = cart.map(item => item.name).join(", ");
    const totalAmount = total;

    if (!name || !email || !phone || cart.length === 0) {
        alert("Please fill all fields and add services to cart.");
        return;
    }

    // Send email
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        name: name,
        email: email,
        phone: phone,
        services: servicesList,
        total: totalAmount
    }).then(() => {
        document.getElementById("confirmation-msg").style.display = "block";
        // Reset form and cart
        cart = [];
        total = 0;
        updateCart();
        document.getElementById("full-name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
    }).catch((error) => {
        alert("Error sending email: " + error.text);
    });
});

// Newsletter subscribe
document.getElementById("subscribe-btn").addEventListener("click", () => {
    const name = document.getElementById("newsletter-name").value;
    const email = document.getElementById("newsletter-email").value;
    if (name && email) {
        alert("Subscribed successfully!");
        document.getElementById("newsletter-name").value = "";
        document.getElementById("newsletter-email").value = "";
    } else {
        alert("Please fill all fields.");
    }
});