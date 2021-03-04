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
    session_start();
    $_SESSION['loggedIn'] = false;
    header("Location: index.php");
?>