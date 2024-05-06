
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var intervalId;
    var paddlex;
    var paddleh;
    var paddlew;
    var rightDown = false;
    var leftDown = false;
    var canvasMinX;
    var canvasMaxX;
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    var tocke;
    var sekunde;
    var sekundeI;
    var minuteI;
    var intTimer;
    var izpisTimer;
    var aCount=0;
    floor=new Image();
    floor.src='images/paddle_floor.png';
	brick=new Image();
	brick.src='images/coin.png';
    var sonic = new Array();
				sonic[0] = new Image();
				sonic[0].src = 'images/sonic1.png';
				sonic[1] = new Image();
				sonic[1].src = 'images/sonic2.png';
				sonic[2] = new Image();
				sonic[2].src = 'images/sonic3.png';
				sonic[3] = new Image();
				sonic[3].src = 'images/sonic4.png';
				sonic[4] = new Image();
				sonic[4].src = 'images/sonic5.png';
				sonic[5] = new Image();
				sonic[5].src = 'images/sonic6.png';
				sonic[6] = new Image();
				sonic[6].src = 'images/sonic7.png';
				sonic[7] = new Image();
				sonic[7].src = 'images/sonic8.png';
        sonic[8] = new Image();
				sonic[8].src = 'images/sonic9.png';
    function stop(){
            document.getElementById("start").disabled = false;
            clearInterval(intervalId);
            izpisTimer = "00:00";
            $("#cas").html(izpisTimer);
            clearInterval(intTimer);
            intervalId=0;
    }
    function drawIt() {
        document.getElementById("start").disabled = true;
        var x = 400;
        var y = 600;
        var dx = 0;
        var dy = 4;
        var WIDTH;
        var HEIGHT;
        var r=15;
        var ctx;
        init();
        
        function init() {
           ctx = $('#canvas')[0].getContext("2d");
           WIDTH = $("#canvas").width();
           HEIGHT = $("#canvas").height();
           // tocke = 0000;
           $("#tocke").html(tocke);
           sekunde = 0;
           izpisTimer = "00:00";
           animationInter=setInterval(anim,50);
           intTimer = setInterval(timer, 1000);
          return intervalId=setInterval(draw, 10);
        }        
        function circle(x,y,r) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fill();
          
        }
        function anim(){
          aCount++;
        }
        function rect(x,y,w,h) {
          ctx.beginPath();
          ctx.rect(x,y,w,h);
          ctx.closePath();
          ctx.fill();
        }
        
        function clear() {
            ctx.clearRect(0,0,WIDTH,HEIGHT);
        }
        //END LIBRARY CODE
        

        //nastavljanje leve in desne tipke
         

        function draw() {
          clear();
          if(aCount>8){
            aCount=0;
          }
          ctx.drawImage(sonic[aCount],x-r, y-r, 2*r,2*r);
          
          // circle(x, y, 10);
          //premik ploščice levo in desno
          if(rightDown){
        if((paddlex+paddlew) < WIDTH){
        paddlex += 5;
        }else{
        paddlex = WIDTH-paddlew;
        }
        }
        else if(leftDown){
        if(paddlex>0){
        paddlex -=5;
        }else{
        paddlex=0;
        }
        }
        // rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
        ctx.drawImage(floor,paddlex, HEIGHT-paddleh, paddlew, paddleh);
        
        // riši opeke
          for (i=0; i < NROWS; i++) {
            for (j=0; j < NCOLS; j++) {
              if (bricks[i][j] == 1) {
                ctx.drawImage(brick,(j * (BRICKWIDTH + PADDING)) + PADDING,
                    (i * (BRICKHEIGHT + PADDING) + PADDING),
                    BRICKWIDTH, BRICKHEIGHT);
              }
            }
          }
        
          rowheight = BRICKHEIGHT + PADDING ; //Smo zadeli opeko?
          colwidth = BRICKWIDTH + PADDING ;
          row = Math.floor(y/rowheight);
          col = Math.floor(x/colwidth);
          //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
          if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy; bricks[row][col] = 0;
            tocke += 100;
            $("#tocke").html(tocke);
          }
          if (x + dx > WIDTH -r || x + dx < 0+r)
            dx = -dx;
          if (y + dy < 0+r)
            dy = -dy;
          else if (y + dy > HEIGHT -2*r) {
            if ((x > paddlex||x+2*r>paddlex) && x-r < paddlex + paddlew){
              dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
              dy = -dy;
            }
            else if (y + dy > HEIGHT-r){
              clearInterval(intervalId);
              clearInterval(intTimer);
            }

          }
          
          x += dx;
          y += dy;
        }
        init_paddle();


      function init_paddle() {
        paddleh = 20;
        paddlew = 120;
        paddlex = WIDTH / 2-paddlew/2;
      }
      function init_mouse() {
        //canvasMinX = $("#canvas").offset().left;
      canvasMinX = $("canvas").offset().left;
        canvasMaxX = canvasMinX + WIDTH;
      }
      
      function onKeyDown(evt) {
        if (evt.keyCode == 39)
      rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
      }

      function onKeyUp(evt) {
        if (evt.keyCode == 39)
      rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
      }
      $(document).keydown(onKeyDown);
      $(document).keyup(onKeyUp);
      // function onMouseMove(evt) {
      //   if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
      //     paddlex = evt.pageX - canvasMinX-paddlew/2;
      //   }
      // }
      // $(document).mousemove(onMouseMove);
      // init_mouse();
      function initbricks() { //inicializacija opek - polnjenje v tabelo
        NROWS = 5;
        NCOLS = 10;
		BRICKWIDTH = 50;
        PADDING = WIDTH/NCOLS-BRICKWIDTH-3;
        BRICKHEIGHT = 50;
        bricks = new Array(NROWS);
        for (i=0; i < NROWS; i++) {
          bricks[i] = new Array(NCOLS);
          for (j=0; j < NCOLS; j++) {
            bricks[i][j] = 1;
          }
        }
      }
      
      function timer(){
        sekunde++;
        
        sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
        minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
        izpisTimer = minuteI + ":" + sekundeI;
        
        $("#cas").html(izpisTimer);
        }
        initbricks();
    }