// 兼容性:
// 1.各用各的方法
// 2.用一些支持的方法来模拟它。

 // getClass(Classname) 获取指定类名的函数。
 // Classname 指定要获取元素的classname
 //            指定元素的范围range,具体的DOM对象。
//思路:1.判断浏览器
//       document.getElementsByClassName
//     2.获取所有的元素
//     3.元素的类名是否等于指定的类名
//     4.符合条件存储到数组中
//     5.返回数组
 function getClass(classname,range){
 	      range=range||document;
 	   // range=range?range:document;
 	   // range=range===undefined?document:range;
 	   if (document.getElementsByClassName) {//判断浏览器
 	   	return  range.getElementsByClassName(classname);
 	   }else{//如果是可以用Classname,不可以则通过标签名获取大范围
 	   	    var arr=[];
 	   	    var all=range.getElementsByTagName("*")
 	   	    for(var i=0;i<all.length;i++){//遍历集合
 	   	    	//当前元素的classname是否包含指定的classname
 	   	    	  if (checkClass(all[i].className,classname)){
 	   	    	  	//判断集合里的每一个==classname
 	   	    	  	arr.push(arr[i])
 	   	    	  	//找到后保存新数组
 	   	    	  }
 	   	    }
 	   	    return arr;//返回新数组
 	   }
 }
 //checkClass(classStr,classname)
 //classStr是否包含classname;
 //<div class="one two three"></div>,多类名
    function checkClass(classStr,classname){
    	var arr=classStr.split(" ");//字符串转换为数组
    	for(var i=0;i<arr.length;i++){//遍历数组
    		  if (arr[i]==classname) {
    		  	return true;
    		  	//条件为真，表示找到了，返回这个真的
    		  };
    	}
    	   return false;
    	   //所有元素比较后，都没有找到，返回假的。
}
    
  // $(selecter,range)获取的元素
  // $(".one")获取指定的类名
  // $("#one")获取指定的Id
  //  $("div")获取指定的标签
  ///思路:
  //1.初始化参数range
  //2.selecter 去空字符串。str.trim();
  //3.判断第一个字符
  //4.获取元素
// function $(val,obj){
//      obj=obj||document;
//      val=val.replace(/^\s*|\s*$/g,"");
//      if (val.charAt(0)=="#") {
//       return document.getElementById(val.substring(1));
//      }else if(val.charAt(0)=="."){
//       return getClass(val.substring(1),obj);
//      }else if (/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(val)){
//       return obj.getElementsByTagName(val);
//      }
// }



  function $(selecter,range){
    if (typeof selecter=="function") {
      window.onload=function(){
        selecter();
      }
    } else if(typeof selecter=="string"){
       range=range||document;
        selecter=selecter.replace(/^\s*|\s*$/g,"");
       // selecter=selecter.trim();
       if (selecter.charAt(0)=="."){ 
        return getClass(selecter.substring(1),range)
       }else if(selecter.charAt(0)=="#"){
        return range.getElementById(selecter.substring(1));
       }else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selecter)){
            return range.getElementsByTagName(selecter);
       }else if (/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(selecter)) {
        return document.createElement(selecter.slice(1,-1));
       }
    }
  	   
  }

/*
get Content(obj,value)
获取或设置obj的文本
obj指定的对象
value 颜色设置的文本
1.判断获取,设置。
  参数个数
  value
2.获取。
  判断浏览器是否支持属性。
  return obj.innerText,
  return obj.innerContent;
3.设置  
  判断浏览器是否支持属性
  obj.innerText=value,
  obj.textContent=value;


*/

function getContent(obj,value){
	if (value) {
		
		if (obj.innerText) {
           obj.innerText=value;
		
		}else{
			  obj.textContent=value;
		}
	
}else{
      if (obj.innerText) {
          return obj.innerText;
		
      }else{
      	  return obj.textContent;
      }
}
 } 
 
/*
     getStyle(obj,attr) 获取指定元素的样式
     obj 指定对象
     attr 样式属性。

1.判断浏览器是否支持属性。
2.返回属性值
*/
function getStyle(obj,attr){
	   if (getComputedStyle){
	   	 return getComputedStyle(obj,null)[attr];
	   }else{
	   	   return obj.currentStyle[attr]; 
	   }
}
/*
   getChilds(obj,type) 获取指令对象的子元素集合
   obj 指定的元素
   type 指定获取子元素节点的类型。
     true 元素节点
     fals 元素节点和有意义的文本 
   1.获取所有的子元素
   2.节点的类型1.

*/

function getChilds(obj,type){
  var arr=[];
   type=type===undefined?true:type;
    var childs=obj.childNodes;
  if (type){
      for(var i=0;i<childs.length;i++){
        if (childs[i].nodeType==1) {
          arr.push(childs[i]);
        }
        
      }
      
    }
      else{
      for(var i=0;i<childs.length;i++){
    if(childs[i].nodeType==1||(childs[i].nodeValue==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))) {
          arr.push(childs[i]);
    }
  }

}
     return arr;
}

function firstChild(obj){
  return getChilds(obj)[0];
}
function lastChild(obj){ 
  return getChilds(obj)[getChilds(obj).length-1]; 
}
function randomChild(obj,num){
    var childs=getChilds(obj);
    return childs[num];
}
/*getNext(obj)获取obj的元素节点。
  1.先获取兄弟节点 next
  如果没有,false;
  2.有
     判断兄弟节点 nodetype!=1
     next=next.nextsibling;
     next==null false;
     重复 步骤2
     nodeType==1 返回next


*/

function getNext(obj,type){
    type=type==undefined?true:type;
    if (type) {
    var next=obj.nextSibling;
   if (next==null) {
    return false;
   }
   while(next.nodeType==3||next.nodeType==8){
     next=next.nextSibling;
     if (next==null) {
      return false;
     }
   }
   return next;
}else if (type==false) {
  var next=obj.nextSibling;
   if (next==null) {
    return false;
   };
   while((!next.nodeType==1||(next.nodeValue==3&&next.nodeValue.replace(/^\s*|\s*$/g,"")))){
       next=next.nextSibling;
     if (next==null) {
      return false;
     };
   }
   return next;
};
}
/*
  inertAfter(newobj,obj,type)
  将newobj插入到obj的后面。
  newobj 要插入的元素。
  obj 插入的位置
  type 类型
       true 元素节点
       false元素节点和有意义的文本
  1.获取obj的下一个兄弟元素next
  2.获取obj的父元素 parent
  3.next false
    parent.appendChild(newobj)
  4.parent.inertBefore(newobj,next);
*/

function insertAfter(newobj,obj,type){
  var next=getNext(obj,type);
  var parent=obj.parentNode;
  if (next) {
    parent.insertBefore(newobj,next)
  }else{
      parent.appendChild(newobj)
  }
}
/*添加或者删除函数*/
function addEvent(obj,event,fun){
        if (obj.attachEvent) {
          obj.attachEvent("on"+event,fun);
        }else{
          obj.addEventListener(event,fun,false)
        }
}
function removeEvent(obj,event,fun){
  if (obj.attachEvent) {
          obj.detachEvent("on"+event,fun);
        }else{
          obj.removeEventListener(event,fun,false)
        }
}


/*滚轮事件*/
function mousewheel(obj,down,up){
    if (obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFun);

    }else{
      obj.addEventListener("mousewheel",scrollFun,false);/*谷歌浏览器*/
      obj.addEventListener("DOMMouseScroll",scrollFun.false);
      /*火狐浏览器*/
    }
    function scrollFun(e){
       var e=e||window.event;
       var nub=e.wheelDelta||e.detail;
       /*获取滚轮滚动的方向，兼容性*/
       if (nub==120||nub==-3) {/*火狐向上滚动为3，向下为-3,谷歌,IE向上为120，向下为-120*/
        up.call(obj);
       }else if (nub==-120||nub==3){
        down.call(obj);
       }
    }

}
    //hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
  if(parent.contains){
    return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
  if(getEvent(e).type=="mouseover"){
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
      !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
  }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
      !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
  }
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
  if(overfun){
    obj.onmouseover=function  (e) {
      if(checkHover(e,obj)){
        overfun.call(obj,[e]);
      }
    }
  }
  if(outfun){
    obj.onmouseout=function  (e) {
      if(checkHover(e,obj)){
        outfun.call(obj,[e]);
      }
    }
  }
}
function getEvent (e) {
  return e||window.event;
}

//设置cookie
function setCookie(attr,value,time){
    if(time==undefined){
        document.cookie=attr+"="+value;
    }else{
        var now=new Date();
        now.setTime(now.getTime()+time*1000);
        document.cookie=attr+"="+value+";expires="+now.toGMTString();
    }
}
//获取cookie
function getCookie(val){
    var str=document.cookie;
    var arr=str.split("; ");
    for(var i=0;i<arr.length;i++){
        var arrValue=arr[i].split("=");
        if(val==arrValue[0]){
            return arrValue[1];
        }
    }
    return false;
}
//删除cookie
function delCookie(attr){
    var now=new Date();
    now.setTime(now.getTime()-1);
    document.cookie=attr+"=rfdf"+";expires="+now.toGMTString();
}
