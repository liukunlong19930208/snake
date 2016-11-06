$(function(){
	//创建表格
	var box=$(".box")[0];
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			var div=$("<div>");
			div.id=i+"-"+j;
			box.appendChild(div);
		}
	}
  var stop=$("#stop");
  var start=$("#start");
  var gameWay=$("gameWay");
  var scoreNum=0;
  start.onclick=function(){
    snake.value='2';
    t=setInterval(run,300);
  }
  stop.onclick=function(){
   clearInterval(t);
  }

	//画蛇
	var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	for(var i=0;i<snake.length;i++){
		var obj=$("#"+snake[i].x+"-"+snake[i].y);
		obj.className="snake";
	}
	//获得食物
	function getFood(){
		do{
			  var x=Math.floor(Math.random()*20);
		    var y=Math.floor(Math.random()*20);

		 }while(panduan(x,y));
		  var fobj=$("#"+x+"-"+y);
		  fobj.className="food";
		  return {x:x,y:y};

	}
	//判断食物位置是否在蛇身上
	function panduan(a,b){
		for(var i=0;i<snake.length;i++){
			if(snake[i].x==a&&snake[i].y==b){

				return true;
			}	
		}
		return false;
	}
	var food=getFood();
  var direction="you";
	var a;
	var b;
  var div=$("div");
  var input=$("input");
	function run(){
		var jiutou=snake[snake.length-1];
      if(direction=="you"){
        var xintou=$("#"+jiutou.x+"-"+(jiutou.y+1));
        if(xintou==null||panduan(jiutou.x,jiutou.y+1)){
        	alert("game over");
        	clearInterval(t);
        	return;
         
        }
        a=jiutou.x;
        b=jiutou.y+1;
        xintou.className="snake";
        snake.push({x:jiutou.x,y:jiutou.y+1});
      }
      else if(direction=="zuo"){
      	var xintou=$("#"+jiutou.x+"-"+(jiutou.y-1));
        if(xintou==null||panduan(jiutou.x,jiutou.y-1)){
        	alert("game over");
        	clearInterval(t);
        	return;
        }
        a=jiutou.x;
        b=jiutou.y-1;
        xintou.className="snake";
        snake.push({x:jiutou.x,y:jiutou.y-1});
      }
      else if(direction=="shang"){
      	var xintou=$("#"+(jiutou.x-1)+"-"+jiutou.y);
        if(xintou==null||panduan(jiutou.x-1,jiutou.y)){
        	alert("game over");
        	clearInterval(t);
        	return;
        }
        a=jiutou.x-1;
        b=jiutou.y;
        xintou.className="snake";
        snake.push({x:jiutou.x-1,y:jiutou.y});
      }
      else if(direction=="xia"){
      	var xintou=$("#"+(jiutou.x+1)+"-"+jiutou.y);
        if(xintou==null||panduan(jiutou.x+1,jiutou.y)){
        	alert("game over");
        	clearInterval(t);
        	return;
        }
        a=jiutou.x+1;
        b=jiutou.y;
        xintou.className="snake";
        snake.push({x:jiutou.x+1,y:jiutou.y});
      }

      if(food.x==a&&food.y==b){
        var scoreId=$("score");
        scoreNum++;
        $("p")[0].innerText=""
        $("p")[0].innerText=scoreNum;
      	food=getFood();

      }else{
      	var shewei=$("#"+snake[0].x+"-"+snake[0].y);
      	shewei.className="";
      	snake.shift();
      }

	}
	var t=setInterval(run,300);
	document.onkeydown=function(e){
       var e=e||window.event;
       var num=e.keyCode;
       if(num==37){
       	if(direction=="you"){
       		return;
       	}
       	direction="zuo";
       }
       else if(num==38){
       	if(direction=="xia"){
       		return;
       	}
        direction="shang";
       }
       else if(num==39){
       	if(direction=="zuo"){
       		return;
       	}
        direction="you";
       }
       else if(num==40){
       	if(direction=="shang"){
       		return;
       	}
        direction="xia";
       }
	}
     var divSize=600;
     input[0].onclick=function(){
        var first=snake[0];
        var foodLeft=parseInt(food.style.left);
        var foodTop=parseInt(food.style.top);
        var firstLeft=parseInt(first.style.left);
        var firstTop=parseInt(first.style.top);
        if(!(firstLeft==-snakeWidth||firstLeft==divSize||firstTop==-snakeWidth||firstTop==divSize)){
        clearInterval(t);
        t=setInterval(move,600);
        for(var i=0;i<input.length;i++){
          input[i].style.background='';
        }
        this.style.background="#ae5";
      } 
  }
})