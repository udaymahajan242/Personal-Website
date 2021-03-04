<!DOCTYPE HTML>

<!--LEGAL NOTICE: 

The content of this website and all associated program 
code are protected under the Digital Millennium Copyright Act. 
Intentionally circumventing this code may constitute a violation of the DMCA. 
© Copyright Uday Mahajan 2019. All Rights Reserved. -->



<!--
___         __        __      __   __   __   __        __           
 |  |__| | /__`    | /__`    |__) |__) /  \ |__)  /\  |__) |    \ / 
 |  |  | | .__/    | .__/    |    |  \ \__/ |__) /~~\ |__) |___  |  
                                                                    
         __  ___    ___       ___     __             __   ___       
   |\ | /  \  |      |  |__| |__     |__) |     /\  /  ` |__        
   | \| \__/  |      |  |  | |___    |    |___ /~~\ \__, |___       
                                                                    
     __           __        __             __      __   ___         
\ / /  \ |  |    /__` |__| /  \ |  | |    |  \    |__) |__          
 |  \__/ \__/    .__/ |  | \__/ \__/ |___ |__/    |__) |___ .....

 
  ██████╗  ██████╗     ████████╗ ██████╗     ██╗  ██╗ ██████╗ ███╗   ███╗███████╗   
██╔════╝ ██╔═══██╗    ╚══██╔══╝██╔═══██╗    ██║  ██║██╔═══██╗████╗ ████║██╔════╝   
██║  ███╗██║   ██║       ██║   ██║   ██║    ███████║██║   ██║██╔████╔██║█████╗     
██║   ██║██║   ██║       ██║   ██║   ██║    ██╔══██║██║   ██║██║╚██╔╝██║██╔══╝     
╚██████╔╝╚██████╔╝       ██║   ╚██████╔╝    ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██╗
 ╚═════╝  ╚═════╝        ╚═╝    ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝
 
 © Copyright Uday Mahajan 2019
                                                                                                                                                    


																  
-->



<?php

    // Start the session
    session_start();
	
	$userinfo = array(
                'user1'=>'password1',
                'user2'=>'password2'
                );

      
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
			
	    }else if($userinfo[$_POST['username']] == $_POST['password']) {
			$_SESSION['username'] = $_POST['username'];
			 $_SESSION['loggedIn'] = true;
			  header('Location: success.php');
        } else {
            $_SESSION['loggedIn'] = false;
            $error = '<i class="fa fa-exclamation-triangle"></i>' . " Error: Invalid Username or Password! ";
        }
    }
	
	
	

	

?>


<html>
<head>
    <title> Login to View Uday's Blog. </title>
    <link rel="stylesheet" type="text/css" href="style.css">   
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main-login.css">
<!--===============================================================================================-->
</head>
    <body oncontextmenu="return false;">

		<div class="limiter">		
		<div class="container-login100" style="background-image: url('images/bg-01.jpg');">
    <div class="wrap-login100">
    <img onmousedown="return false;" class="login100-form-logo" src="./images/ra.png" class="center" >
       <span class="login100-form-title p-b-34 p-t-27">
						Restricted Area
					</span>
						<p style="color:white;"> If you are authorized to veiw this blog, please enter the username and password assigned to you, otherwise you may <a style="color:#004d00;" href="../#contact" title="Contact Uday M."  > <i class="fa fa-address-card" aria-hidden="true"></i> Contact Uday</a>  to request one.</p>
				
					
						  <!-- Output error message if any -->
						  
						  <?php echo "<font color='#800000'>   $error</font>" ; ?>
       
			<br> <br>
            <form class="login100-form validate-form" method="post" action="index.php">
			
			<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input for="username" class="input100" type="text" name="username" placeholder="Username">
						<span class="focus-input100" data-placeholder="&#xf207;"></span>
					</div>
					
					
					<div class="wrap-input100 validate-input" data-validate="Enter password" >
						  <input for="password" class="input100" type="password" name="password" placeholder="Enter Password">
						<span class="focus-input100" data-placeholder="&#xf191;"></span>
					</div>
          
          
          <div class="container-login100-form-btn">
						<button  type="submit" name="submit" title="Login" class="login100-form-btn">
							<i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Login
						</button>
						&nbsp; &nbsp;
						<a href="../" title="Home" class="login100-form-btn">
							<i class="fa fa-home"></i> &nbsp; Home Page
						</a>
									
					</div>
					
					
			
		
        
        
        </div>
		
		
		
		
	
		
	</div>
    
	</div>
	
	
		
<!--===============================================================================================-->
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="js/main.js"></script>

	
    </body>
</html>