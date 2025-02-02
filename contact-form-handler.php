<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $firstname = trim($_POST['firstname']);
    $lastname = trim($_POST['lastname']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $phone = trim($_POST['phone']);
    $address = trim($_POST['address']);
    $postcode = trim($_POST['postcode']);
    $service = trim($_POST['service']);
    $industry = trim($_POST['industry']);
    $message = trim($_POST['message']);

    // Check if email is valid
    if (!$email) {
        echo json_encode(["success" => false, "message" => "Invalid email address."]);
        exit;
    }

        // Decode HTML entities if they exist in the message
    $message = html_entity_decode($message);


    // Email settings
    $to = "info@kooka.co.uk"; // Replace with your email address
    $subject = "$firstname $lastname - $postcode";

    // Build email body
    $body = "Kooka Website Enquiry\n\n".
            "First Name: $firstname\n".
            "Last Name: $lastname\n".
            "Email: $email\n".
            "Phone: $phone\n".
            "Address: $address\n".
            "Postcode: $postcode\n".
            "Type of Service: $service\n".
            "Type of Sector: $industry\n".
            "Message: $message\n\n\n\n".
            "END";

    // Set the email headers
    $headers = "From: noreply@kooka.co.uk\r\n";
    $headers .= "Reply-To: $email\r\n"; // This is fine as long as $email is not a freemail like Gmail.    
    $headers .= "Return-Path: no-reply@kooka.co.uk\r\n"; // Bounce handling email
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    

    // Send the email using the mail function
    if (mail($to, $subject, $body, $headers)) {
        // Email sent successfully
        echo json_encode(["success" => true, "message" => "Your message has been sent successfully!"]);
    } else {
        // Email sending failed
        echo json_encode(["success" => false, "message" => "There was an error sending your message. Please try again later."]);
    }
}
?>
