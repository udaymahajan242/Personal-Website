<?php
    // Start the session
    ob_start();
    session_start();

    // Check to see if actually logged in. If not, redirect to login page
    if (!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] == false) {
        header("Location: index.php");
    }
	
?>



<html>
<head>
    <title> Welcome. </title>
    <link rel="stylesheet" type="text/css" href="style.css">   
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
</head>
    <body style="background: white;" oncontextmenu="return false;">
	
<br>
<h1>Welcome, please download the desired files and Logout
</div>
</h1>


<div class="component">
				<ul class="align">
					<li>
						<figure class='book'>

							<!-- Front -->

							<ul class='hardcover_front'>
								<li>
									<div class="coverDesign blue">
										<h1>CSE 351 </h1>
										<p>BOOK</p>
									</div>
								</li>
								<li></li>
							</ul>

							<!-- Pages -->

							<ul class='page'>
								<li></li>
								<li>
									<a class="btn" href="http://www.5z8.info/snufffilms_ihmg" download="./files/harsh/book3.pdf"><i class="fas fa-download"></i> Download </a>
								</li>
								<li></li>
								<li></li>
								<li></li>
							</ul>

							<!-- Back -->

							<ul class='hardcover_back'>
								<li></li>
								<li></li>
							</ul>
							<ul class='book_spine'>
								<li></li>
								<li></li>
							</ul>
							<figcaption>
								<h1>Shared with Harsh Verma</h1>
								


								<h1><span> <i class="far fa-file-pdf"></i>

                                 Computer Systems: A Programmer's Perspective, 3/E (CS:APP3e)</span></h1>
										<div class="container">
	 
										  <a href="http://www.5z8.info/snufffilms_ihmg" download="./files/harsh/book3.pdf" class="button button-green" oncontextmenu="return false;"> <i class="fas fa-download"></i> Download 3rd Edition</a>
										 <a href="http://www.5z8.info/peepshow_chth" download="./files/harsh/book2.pdf" class="button button-gray" oncontextmenu="return false;"> <i class="fas fa-download"></i> Download 2nd Edition </a>
										 <a href="../" class="button button-blue"> <i class="fas fa-home"></i> Navigate to Home. </a>

										<form method="post" action="logout.php">
										<input class="button button-red" type="submit" value="Logout">
										</form>

									</div>
							</figcaption>
						</figure>
					</li>
				</ul>
			</div>
	

<br>



  
  
	 
 

  
   

 

    
    </body>
</html>


