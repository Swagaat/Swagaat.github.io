<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Email settings
    $to = "andrewxtha22@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Message";
    $body = "You have received a new message from your contact form:\n\n" .
            "Name: $name\n" .
            "Email: $email\n\n" .
            "Message:\n$message";
    $headers = "From: $email";

    // Attempt to send the email
    if (mail($to, $subject, $body, $headers)) {
        // Success response
        echo "<h1>Message Sent Successfully!</h1>";
        echo "<p>Thank you for contacting me, $name. I will get back to you shortly.</p>";
    } else {
        // Failure response
        echo "<h1>Message Failed</h1>";
        echo "<p>Sorry, your message could not be sent. Please try again later.</p>";
    }
} else {
    // Invalid request
    echo "<h1>Invalid Request</h1>";
    echo "<p>This page is only accessible via the contact form submission.</p>";
}
?>
