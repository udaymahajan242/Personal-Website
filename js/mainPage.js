

$(document).ready(function(){
        $('audio,video').mediaelementplayer();
     });
    

   
    $(document).ready(function($){
               <!-- Terminal About script display-->
        $("#typed").typed({
            strings: ["I am an undergraduate student at Paul G. Allen School of Computer Science &amp; Engineering.", "I plan to graduate in December 2019" ,  "I am looking for Software Development Internships.", "I am pursuing Computer Engineering." ,"I love to listen to music",
            "I love running and working out", "I was born in the Repubic of India.", "Scroll down to learn more about me."],
            typeSpeed: 50,


        });

    });

 $(document).ready(function($){

      <!-- Hello in different world languages -->
        $("#typed1").typed({
       strings: [ "Hello.", "Olá", " नमस्ते. " , "你好",  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ.",  "Kumusta po.", "Salve", "xin chào." , "ഹലോ" , "హలో.", "Hola." , "Hello.", "வணக்கம்.", "Ciao.",  "হ্যালো." , "こんにちは.", " नमस्ते. " , "Përshëndetje", "હેલ્લો.", "Здравствуйте." , "Hello.", "ಹಲೋ.", "Bonjour." , " नमस्ते. " ,"مرحبا ", "ഹലോ.", "हॅलो.", "여보세요.", "سلام", "Hallo.", "Hello.", "Χαίρετε." , " नमस्ते. " ,"ہیلو", "ሰላም", "Բարեւ","Kaixo", "добры дзень", " नमस्ते. " ,"ဟယ်လို", "buna" ],
            typeSpeed: 50,
             backSpeed: 50

        });

    });


  function shift(){
      $(".head-wrap").addClass("shift-text");
      terminalHeight();
  }

  function terminalHeight(){
      var termHeight = $(".terminal-height");
      var value = termHeight.text();
      value = parseInt(value);
      setTimeout(function(){
          if (value > 10){
              value = value-1;
              this.txtValue = value.toString();
              termHeight.text(this.txtValue);
              self.terminalHeight();
          }
          else{
              clearTimeout();
          }
      }, 10);
  }
    

   
     

         var html5_audiotypes=
         { //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
           "mp3": "audio/mpeg",
           "mp4": "audio/mp4",
           "ogg": "audio/ogg",
           "wav": "audio/wav"
         };

         function createsoundbite(sound) {
             "use strict";
             var html5audio=document.createElement('audio');
             if (html5audio.canPlayType) {
                 for (var i=0; i<arguments.length; i++) {
                     var sourceel=document.createElement('source');
                     sourceel.setAttribute('src', arguments[i]);
                     if (arguments[i].match(/\.(\w+)$/i))
                     {sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);}
                     html5audio.appendChild(sourceel);
                 }
                 html5audio.load();
                 html5audio.playclip=function() {
                     html5audio.pause();
                     html5audio.currentTime=0;
                     html5audio.play();
                 };
                 return html5audio;
             }
             else {
                 return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio unfortunately");}};
             }
         }

         var clicksound=createsoundbite("name.mp3", "name.wav", "name.html");
        

       
            function contactMessage() {
                alert("Please contact Uday to request his phone number.");
            }
        

       
        function enableBtn(){
    document.getElementById("btn").disabled = false;
   }
     
    
     
     document.onkeydown = function(e) {
       // Disable Saving, Pasting, Copying, Viewing the source code.
        if ((e.ctrlKey && 
            (e.keyCode === 67 ||
             e.keyCode === 73 || 
             e.keyCode === 80 ||      
             e.keyCode === 83 ||             
             e.keyCode === 86 || 
             e.keyCode === 85 || 
             e.keyCode === 123 || 
             e.keyCode === 117))) {
            alert('Access Denied: © Copyright Uday Mahajan | 2019');
            return false;
        } else if (e.keyCode === 123) {
         alert('Access Denied: © Copyright Uday Mahajan | 2019');
            return false;
        } else {
            return true;
        }
        
        
    };
      
    
      
       
       var timer = setInterval(nextImage, 4000);
        var curImage = 0;
        var numImages = 31;

        function nextImage() {
            var e;
            // remove showMe class from current image
            e = document.getElementById("slideimg" + curImage);
            removeClass(e, "showMe");

            // compute next image
            curImage++;
            if (curImage > numImages - 1) {
                curImage = 0;
            }

            // add showMe class to next image
            e = document.getElementById("slideimg" + curImage);
            addClass(e, "showMe");
        }

        function addClass(elem, name) {
            var c = elem.className;
            if (c) c += " ";  // if not blank, add a space separator
            c += name;
            elem.className = c;
        }

        function removeClass(elem, name) {
            var c = elem.className;
            elem.className = c.replace(name, "").replace(/   /g, " ").replace(/^ | $/g, "");  // remove name and extra blanks
        }
       
    
       
        $(document).ready(function() {
        
         new jBox('Modal', {
              attach: '#Modal-pc',
              width: 500,
              height: 350,
              blockScroll: false,
              animation: 'zoomIn',
              draggable: 'title',
              closeButton: true,
              content: $('#pc'),
              title: '© Pierce College | UNITED STATES',
              overlay: false,
              reposition: false,
              repositionOnOpen: false
                });
 
            new jBox('Modal', {
              attach: '#Modal-pgs',
              width: 500,
              height: 350,
              blockScroll: false,
              animation: 'zoomIn',
              draggable: 'title',
              closeButton: true,
              content: $('#pgs'),
              title: '© Pinegrove School | INDIA',
              overlay: false,
              reposition: false,
              repositionOnOpen: false
                });
                
                
                 new jBox('Modal', {
              attach: '#Modal-india-today',
              width: 500,
              height: 350,
              blockScroll: false,
              animation: 'zoomIn',
              draggable: 'title',
              closeButton: true,
              content: $('#india-today'),
              title: '© The India Today Group | INDIA',
              overlay: false,
              reposition: false,
              repositionOnOpen: false
                });
 
                
              new jBox('Modal', {
              attach: '#Modal-uw',
              width: 500,
              height: 350,
              blockScroll: false,
              animation: 'zoomIn',
              draggable: 'title',
              closeButton: true,
              content: $('#uw'),
              title: '© University of Washington | UNITED STATES',
              overlay: false,
              reposition: false,
              repositionOnOpen: false
                });
                
                
                new jBox('Modal', {
              attach: '#Modal-why-uw',
              width: 500,
              height: 350,
              blockScroll: false,
              animation: 'zoomIn',
              draggable: 'title',
              closeButton: true,
              content: $('#why-uw'),
              title: '© Adam Gresch | UNITED STATES',
              overlay: false,
              reposition: false,
              repositionOnOpen: false
                });

       
              new jBox('Modal', {
              attach: '#Modal-be-boundless',
              width: 500,
              height: 350,
              blockScroll: false,
              animation: 'zoomIn',
              draggable: 'title',
              closeButton: true,
              content: $('#be-boundless'),
              title: '© University of Washington | UNITED STATES',
              overlay: false,
              reposition: false,
              repositionOnOpen: false
                });

       });