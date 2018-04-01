<!DOCTYPE HTML>

<?php

    // Start the session
    session_start();

    // Defines username and password. Retrieve however you like,
    $username = "harsh";
    $password = "cse351";
    
    // Error message
    $error = "";

    // Checks to see if the user is already logged in. If so, refirect to correct page.
    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
        $error = "Success";
        header('Location: success.php');
		
		
    }

	

    // Checks to see if the username and password have been entered.
    // If so and are equal to the username and password defined above, log them in.
    if (isset($_POST['username']) && isset($_POST['password'])) {
        if ($_POST['username'] == $username && $_POST['password'] == $password) {
            $_SESSION['loggedIn'] = true;
            header('Location: success.php');
        } else {
            $_SESSION['loggedIn'] = false;
            $error = "Invalid username and password!";
        }
    }
?>


<html>
<head>
    <title> Login to View Uday's Vault. </title>
    <link rel="stylesheet" type="text/css" href="style.css">   
</head>
    <body>
	  <!-- Output error message if any -->
        <?php echo $error; ?>
    <div class="login-box">
    <img src="avatar.png" class="avatar">
        <h1>Login Here</h1>
            <form method="post" action="index.php">
            <p>Username</p>
            <input for="username" type="text" name="username" placeholder="Enter Username">
            <p>Password</p>
            <input for="password" type="password" name="password" placeholder="Enter Password">
            <input type="submit" name="submit" value="Log In!">
            <a href="../index.html#contact">Forgot Password</a>    
            </form>
        
        
        </div>
    
    </body>
</html>
