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
