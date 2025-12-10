/***************************************************
 *  SAVE CONTACT FORM DATA  (my original function)
 ***************************************************/
async function saveContactData() {
    let userName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userMessage = document.getElementById("message").value;

    // Build object for Supabase
    let contactInfo = {
        name: userName,
        email: userEmail,
        message: userMessage
    };

    console.log("Sending lead:", contactInfo);

    // ---- SUPABASE CONFIG ----
    const SUPABASE_URL = "https://zqncprsxfqtgorrjiezl.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbmNwcnN4ZnF0Z29ycmppZXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTM2ODUsImV4cCI6MjA4MDM2OTY4NX0.BxlNQqxPPI3XnrLL-HLBRDC03JWFKIEcPFZ05xQ3GAI";

    // ---- SEND DATA TO SUPABASE ----
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(contactInfo)
    });

    if (response.ok) {
        alert("Lead successfully saved to Supabase!");
        console.log("Success:", await response.json());
    } else {
        alert("There was an error submitting the lead.");
        console.error("Error:", await response.text());
    }
}



/***************************************************
 *  NEW SECTION: FETCH SERVICES FROM SUPABASE
 ***************************************************/

// ---- Supabase credentials ----
const SERVICE_URL = "https://zqncprsxfqtgorrjiezl.supabase.co/rest/v1/service";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbmNwcnN4ZnF0Z29ycmppZXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTM2ODUsImV4cCI6MjA4MDM2OTY4NX0.BxlNQqxPPI3XnrLL-HLBRDC03JWFKIEcPFZ05xQ3GAI";


// STEP 2 — fetch service records
async function getServices() {
    try {
        const response = await fetch(`${SERVICE_URL}?select=*`, {
            method: "GET",
            headers: {
                apikey: ANON_KEY,
                Authorization: `Bearer ${ANON_KEY}`
            }
        });

        const services = await response.json();
        console.log("Retrieved services:", services);
        renderServices(services);

    } catch (error) {
        console.error("Error fetching services:", error);
    }
}



// STEP 3 — dynamically render service cards
function renderServices(services) {
    const container = document.getElementById("services-list");
    container.innerHTML = ""; // Clear old values

    services.forEach(service => {
        // Create card element
        const card = document.createElement("div");
        card.classList.add("card", "wood-card", "m-3");
        card.style.width = "18rem";

        card.innerHTML = `
            <img src="${service.image_url}" class="card-img-top" alt="${service.name}">
            <div class="card-body">
                <h3 class="card-title">${service.name}</h3>
                <p class="card-text">${service.description}</p>
                <p class="quote"><strong>Quote:</strong> ${service.quote}</p>
            </div>
        `;

        container.appendChild(card);
    });
}



// STEP 4 — Load services automatically when page loads
document.addEventListener("DOMContentLoaded", () => {
    getServices();
});
