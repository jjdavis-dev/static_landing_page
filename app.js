function saveContactData() {
    let userName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userMessage = document.getElementById("message").value;

    let contactInfo = {
        name: userName,
        email: userEmail,
        message: userMessage
    };

    console.log(contactInfo);
}
