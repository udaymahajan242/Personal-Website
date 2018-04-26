<?php
    // Start the session
    ob_start();
    session_start();

    // Check to see if actually logged in. If not, redirect to login page
    if (!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] == false) {
        header("Location: index.php");
    }
	
?>


<!DOCTYPE html>


<!--LEGAL NOTICE: 

The content of this blog and all associated program 
code are protected under the Digital Millennium Copyright Act. 
Intentionally circumventing this code may constitute a violation of the DMCA. 

Blog site template is inspired by Debhargaya Das's(Deedy's) Blog - "Writes"
Views are my own.


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



<html>

<head>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="images/favicon16.png" sizes="16x16">
    <link rel="shortcut icon" type="image/png" href="images/favicon16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="images/favicon.png" sizes="32x32">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png" sizes="32x32">
	
   


    
      <meta property="og:title" content="Blog by Uday Mahajan" />
      <meta property="title" content="Blog by Uday Mahajan" />
     
      <meta name="description" content="This is Uday's blog, Writes. He writes about tech, data and the various other things.">
      <meta property="og:description" content="This is Uday's blog, Writes. He writes about tech, data and the various other things." />

      <meta property="og:type" content="article" />
      <meta property="og:image" content="images/logo-small.png" />
      <meta property="twitter:image" content="images/logo-small.png" />
      <link rel="image_src" href="images/logo-small.png">
      <meta property="og:url" content="../writes.html" />
    
    <span itemprop="author" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="Uday Mahajan">
    </span>
    <span itemprop="publisher" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="Uday Mahajan">
    </span>
    <meta name="author" content="Uday Mahajan">
    <meta property="article:author" content="https://www.facebook.com/udaymahajan242" />
    <meta property="article:publisher" content="https://www.facebook.com/udaymahajan242" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">


    <title>Notes... | The Uday Mahajan's Blog | UW CSE.</title>

    <meta name="viewport" content="width=device-width">
    <link rel="canonical" href="index.html" >
    <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
    <link rel="author" href="https://plus.google.com/104102199152571251200">


    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/main.css">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="css/materialize.css">
   <link rel="stylesheet" href="css/default.css">
	<link rel="stylesheet" href="css/layout.css">
	

    <!-- Compiled and minified JavaScript -->
    <script src="js/code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="js/materialize.min.js"></script>

	
	<script>
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
</script>

    
    <body oncontextmenu="return false;">

    <header class="site-header">

  <div class="wrap">
    <a class="site-title cursive-title" href="./">
    <div class="title-icon" style="float:left; margin-top:10px; ">
    <svg version="1.1" id="writes" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               width="40px" height="40px" viewBox="0 0 35.738 35.738" >
      <path fill="#C2C2C2" d="M0,35.667c0,0,11.596-37.07,35.738-35.55c0,0-2.994,4.849-10.551,6.416c0,0,3.518,0.429,6.369-0.522
        c0,0-1.711,5.515-11.025,6.273c0,0,5.133,1.331,7.414,0.57c0,0-0.619,4.111-10.102,6.154c-0.562,0.12-4.347,1.067-1.306,1.448
        c0,0,4.371,0.763,5.514,0.381c0,0-3.744,5.607-12.928,5.132c-0.903-0.047-1.332,0-1.332,0L0,35.667z"/>
    </svg>
    </div>


     The Notes...
    </a>
   
       
        <span class="site-title site-subtitle">- by Uday Mahajan</span>

    <nav class="site-nav">
      <a href="#" class="menu-icon">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 18 15" enable-background="new 0 0 18 15" xml:space="preserve">
          <path fill="#505050" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0
            h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"/>
          <path fill="#505050" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484
            h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"/>
          <path fill="#505050" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0
            c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"/>
        </svg>
      </a>
	  
	  <form method="post" action="logout.php">
      <div class="trigger">
	  
    <a class="site-title site-subtitle"><img class="profile-pic"  onmousedown="return false;" src="images/avatar.jpg" alt="Uday Mahajan | UW CSE" /></a>
      <a class="page-link" href="../"> <i class="fas fa-home"></i> Home Page</a>
		<a class="page-link" href="../index.html#contact">Contact</a>
	   <button class="page-link" type="submit" value="Logout ">Logout</i></button>
		 
      </div>
	  	</form>
	  
    </nav>
  </div>

</header>


    <div class="page-content">
      <div class="wrap">
      <div class="home">


  <ul class="posts">
    
      
      <li>
        <b><a class="post-link" href="comingSoon">Blogs .....Coming Soon</a></b>
        <span class="post-date">Date • 15 min read</span>
        <span class="post-excerpt"> Posts Coming Soon.</a>
        
      </li>
	  

	  
      <li>
        <b><a class="post-link" href="comingSoon">Currently Under Construction.</a></b>
        <span class="post-date">Date • 15 min read</span>
        <span class="post-excerpt"> Coming in April 2018.</a>
        
      </li>
	  
	   
	  
    
     
     
    
  </ul>

</div>


      </div>
    </div>

 <!-- footer
   ================================================== -->
   <footer>

      <div class="row">

         <div class="twelve columns">

            <ul class="social-links"  >
                <li><a title="Add on Facebook" class="icon" href="http://www.facebook.com/addfriend.php?id=udaymahajan242" target="_blank" data-original-title="Facebook"><i class="fab fa-facebook"></i></a></li>
               <li><a title="Follow on Twitter" class="icon" href="https://www.twitter.com/udaymahajan242" target="_blank" data-original-title="Twitter"><i class="fab fa-twitter"></i></a></li>
               <li><a title="Follow on Instagram" class="icon" href="https://www.instagram.com/udaymahajan242" target="_blank" data-original-title="Instagram"><i class="fab fa-instagram"></i></a></li>
			   <li><a title="Add on Snapchat" class="icon" href="https://www.snapchat.com/add/udaymahajan242" target="_blank" data-original-title="Snapchat"><i class="fab fa-snapchat-ghost"></i></a></li>
			   <li><a title="Connect on LinkedIn" class="icon" href="http://www.linkedin.com/in/udaymahajan242" target="_blank" data-original-title="LinkedIn"> <i class="fab fa-linkedin"></i> </a></li>
			   <li><a title="View on GitHub" class="icon" href="https://github.com/udaymahajan242" target="_blank" data-original-title="Github"> <i class="fab fa-github"></i> </a></li>
			   <li><a title="View on GitLab" class="icon" href="https://gitlab.cs.washington.edu/udaym242" target="_blank" data-original-title="Gitlab UW CSE"> <i class="fab fa-gitlab"></i> </a></li>
           	   <li><a title="Add via Skype" class="icon" href="skype:udaymahajan242?add" target="_blank" data-original-title="Skype"><i class="fab fa-skype"></i></a></li>
			   <li><a title="Follow on Saavn" class="icon" href="https://www.saavn.com/u/e6fae8ab3a7962e3b6a24b66ac015ca9" target="_blank" data-original-title="Saavn"><i class="fa fa-music"></i></a></li>
			   <li><a title="Follow on Spotify" class="icon" href="https://www.saavn.com/u/e6fae8ab3a7962e3b6a24b66ac015ca9https://open.spotify.com/user/udaymahajan242" target="_blank" data-original-title="Spotify"><i class="fab fa-spotify"></i></a></li>
			   <li><a title="Add to Google + circle" class="icon" href="https://plus.google.com/u/0/+UdayMahajan242" target="_blank" data-original-title="Google Plus"><i class="fab fa-google-plus"></i></a></li>
  			   <li><a title="E-mail Uday" class="icon" href="../index.html#contact"  data-original-title="E-mail"><i class="fa fa-envelope-square"></i></a></li>
			   <li><a title="Message on Messenger" class="icon" href="http://m.me/udaymahajan242" target="_blank" data-original-title="Messenger"><i class="fab fa-facebook-messenger"></i></a></li>

		  </ul>

           
         </div>

         <div  id="go-top"><a onclick="topFunction()" id="myBtn" title="Go to top" title="Back to Top" href="#home"><i class="icon-up-open"></i></a></div>

      </div>
	  
	  <ul id="copyright" class="copyright" oncontextmenu="return false;">
	  
	            <li><span style="color:white"> 
			   <title="Made with ❤ by Uday Mahajan">Made with <img src="images/love.gif" style="height: 40px; width: 40px; margin-bottom: -15px;"> by Uday Mahajan.
			   </span></li>  <br>  
               <li><span style="color:white"> <title="© Copyright Uday Mahajan"> © Copyright 2018 - Uday Mahajan. All Rights Reserved.</span></li>
             
			 
            </ul>
			
			
   </footer> <!-- Footer End-->


    </body>

</html>



