<?php
var_dump($_POST);
var_dump($_SESSION);

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Connect to MySQL database
$servername = "localhost";
$username = "scarves";
$password = "bWW.12@jk";
$dbname = "data";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from localStorage
$products = json_decode($_POST["products"], true);

// Retrieve data from form
$FIRSTNAME = isset($_POST["FIRSTNAME"]) ? $_POST["FIRSTNAME"] : "";
$LASTNAME = isset($_POST["LASTNAME"]) ? $_POST["LASTNAME"] : "";
$PHONENUMBER = isset($_POST["PHONENUMBER"]) && !empty($_POST["PHONENUMBER"]) ? $_POST["PHONENUMBER"] : null;
$EMAIL = isset($_POST["EMAIL"]) ? $_POST["EMAIL"] : "";
$ADDRESS = isset($_POST["ADDRESS"]) ? $_POST["ADDRESS"] : "";
$COUNTRY = isset($_POST["COUNTRY"]) ? $_POST["COUNTRY"] : "";
$STATE = isset($_POST["STATE"]) ? $_POST["STATE"] : "";
$ZIPCODE = isset($_POST["ZIPCODE"]) && is_numeric($_POST["ZIPCODE"]) ? intval($_POST["ZIPCODE"]) : null;
$CITY = isset($_POST["CITY"]) ? $_POST["CITY"] : "";

// Insert shipping details into MySQL database
$stmt = $conn->prepare("INSERT INTO shipping_details (shipping_firstname, shipping_lastname, shipping_phonenumber, shipping_email, shipping_address, shipping_country, shipping_state, shipping_zipcode, shipping_city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssi", $FIRSTNAME, $LASTNAME, $PHONENUMBER, $EMAIL, $ADDRESS, $COUNTRY, $STATE, $ZIPCODE, $CITY);

if (!$stmt->execute()) {
    echo "Error inserting shipping record: " . $stmt->error;
} else {
    $shipping_id = $conn->insert_id; // Get the auto-generated ID of the inserted shipping record

    // Insert product details into MySQL database
    $stmt = $conn->prepare("INSERT INTO products (pid, product_name, quantity, shipping_details_id) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssii", $pid, $name, $quantity, $shipping_id);
    
    foreach ($products as $product) {
        $pid = $product["pid"];
        $name = $product["name"];
        $quantity = $product["inCart"];
        if (!empty($name)) {
            $stmt->bind_param("ssii", $pid, $name, $quantity, $shipping_id);
            if (!$stmt->execute()) {
                echo "Error inserting product record: " . $stmt->error;
            }
        }
    }
    
}

// Close database connection
$stmt->close();
$conn->close();

?>
