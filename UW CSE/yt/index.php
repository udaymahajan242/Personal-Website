<!DOCTYPE HTML>

<!--LEGAL NOTICE: 

The content of this website and all associated program 
code are protected under the Digital Millennium Copyright Act. 
Intentionally circumventing this code may constitute a violation of the DMCA. 
© Copyright Uday Mahajan 2018. All Rights Reserved. -->



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
 
 © Copyright Uday Mahajan 2018
                                                              															  
-->


<?php
    // Start the session
    session_start();
    
   

    // Defines username and password. Retrieve however you like,
   
    $password = "pass";
       
    // Error message
    $error = "";
    
    $id = "";
    
    
     $url = urldecode(rawurldecode($_POST['yt-url'])) ;
     parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
     $id = $my_array_of_vars['v'];   
     
    
     
  // Output: C4kxS1ksqtw
   
   
 
	

  // Checks to see if the username and password have been entered.
    // If so and are equal to the username and password defined above, log them in.
    if (isset($_POST['yt-url'])) {
        if ($id == "") {
            $_SESSION['loggedIn'] = false;
            $error = "Please enter a valid Youtube URL. Example: https://www.youtube.com/watch?v=jNQXAC9IVRw";
        } else {
            $_SESSION['loggedIn'] = true;
             header('Location: https://api.unblockvideos.com/youtube_downloader?id='.$id.'&selector=mp4&redirect=true');
            
        }
    }
?>



<html>
<head>
    <title> YouTube Streaming Link Generator. </title>
    <link rel="stylesheet" type="text/css" href="style.css">   
    <script src='https://www.google.com/recaptcha/api.js'></script>
    
    <script type = "text/javascript">
        function enableBtn(){
    document.getElementById("btn").disabled = false;
   }
     </script>
</head>
    <body onload = "document.getElementById('btn').disabled = true;">
	  <!-- Output error message if any -->
     
    <div class="login-box">
   
    <img src="avatar.png" class="avatar">
     <br>
     <br>
        <h1>YouTube Direct Stream by Uday M.</h1>
		   <?php echo $error; ?>
            <form method="post" action="index.php">
            <p>YouTube URL</p>
            <input for="yt-url" type="text" name="yt-url" placeholder="https://www.youtube.com/watch?v=jNQXAC9IVRw">
            <!-- <p>Password</p>
            <input for="password" type="password" name="password" placeholder="Enter Password"> -->
            <p title="Fill out reCAPTCHA"> Identify as a Human* <br> <br></p>
            <div class= "gr">   <div class="g-recaptcha" data-sitekey="6LcG70wUAAAAAIG6sXxSqeeHpJ4chrr36YBpFhUB" data-callback="enableBtn"></div></div>
              <br>   <br>    <br>
            <input id="btn" type="submit" name="submit" value="Stream Video.">
           
            
              
           
            </form>
        
        
        </div>
    
    </body>
</html>
