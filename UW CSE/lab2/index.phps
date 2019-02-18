/*
  Copyright © 2018 Uday Mahajan, Anupam Gupta & Kushal Jhunjhunwalla.
  All rights reserved.  Permission is hereby granted to staff registered 
  for University of Washington CSE 484 for use solely during Autumn Quarter 2018
  for purposes of the course.  No other use, copying, distribution, or modification
  is permitted without prior written consent. Copyrights for
 third-party components of this work must be honored.
 */



<?php
error_reporting(E_ALL);
if(isset($_GET['cookie'])) {
	    echo " Cookie written: ";
        echo $_GET['cookie'];
        file_put_contents('cookie.txt', $_GET['cookie']);
		
		echo "<br>";
	    echo "<br>";

} else {
	
	 echo "<br>";
	 echo "<br>";
	 echo "<br>";
	 echo "<br>";
	 
	 echo " No Cookie found!";
	
	echo "<br>";
	 echo "<br>";
}

	
       echo " Copyright © 2018 Uday Mahajan, Anupam Gupta & Kushal Jhunjhunwalla.
  All rights reserved.";
?>