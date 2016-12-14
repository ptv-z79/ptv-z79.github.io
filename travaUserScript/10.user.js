// ==UserScript==
// @name        ptv-z79
// @namespace   https://ptv-z79.github.io/travaUserScript
// @author      Taras P.
// @description Пробная версия min-script для вставки координат на рынке

// @include     http://*.travian.*/*
// @include     https://*.travian.*/*
// @include     http://*.travian.*/*
// @include     http://travian.*/index.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/manual.php*

// @version     0.4 beta

// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant	      GM_deleteValue
// @grant       GM_xmlhttpRequest

// ==/UserScript==


// https://ptv-z79.github.io/travaUserScript/10.user.js
var ptv_version='v.0.4 beta / 2016-12-14'; // начал писать 2016-12-10

// альянс
var href = 'http://travian.ping-timeout.de/travissimo/allianzen.php?aid=4&domain=ts2.travian.co.uk'
// игрок
//var href = 'http://travian.ping-timeout.de/travissimo/travissimo.php?uid=10944&domain=ts2.travian.co.uk'
//var href = 'http://travian.ping-timeout.de/travissimo/dorf.php?d=340759&domain=ts2.travian.co.uk'; // деревня
//var href = 'http://travian.ping-timeout.de/index.php?m=scriptentwickler&lang=english'
//var href = 'http://ts2.travian.co.uk/dorf2.php'
//var href = 'http://travian.ping-timeout.de/index.php?m=spielersuche&uid=141&w=ukts2'


GM_xmlhttpRequest({
  method: "GET",
  url: href,
  onload: function(response) {
    //alert(response.responseText);
    
    var strLen = response.responseText.length;
    //alert('Длина строки HTML: '+strLen);
    
    //get values from xml
			//		var parser = new DOMParser();
			//	  var doc = parser.parseFromString(response.responseText, "text/xml");
			//		var stats = doc.getElementsByTagName('stats')[0];
    
    //alert(doc);
    //alert(stats);
    
    
  }
});




//alert(xy2id(-68, -28));
function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

//http://caniuse.com/#feat=mutationobserver
/*  ts2.travian.co.uk/build.php?gid=0&category=3   --> вкладка [Resources,,]


/build.php?gid=0 --> автоматически будет строить в деревне (dorf2) на случайном свободном id (если, например, id 20, 22, 23 - заняты зданиями, то построит на меньшем по значению свободном id, например, на 18 или 19)

*/

// http://t4.answers.travian.ru/?view=answers&action=answer&aid=213
// /build.php?gid=1    - 
// /build.php?gid=2    - 
// /build.php?gid=3    - 
// /build.php?gid=4    - 
// /build.php?gid=5    - 
// /build.php?gid=6    - 
// /build.php?gid=7    - 
// /build.php?gid=8    - 
// /build.php?gid=9    - 
// /build.php?gid=10   - 
// /build.php?gid=11   - 
// /build.php?gid=12   - 
// /build.php?gid=13   - 
// /build.php?gid=14   - 
// /build.php?gid=15   - 
// /build.php?gid=16   - 
// /build.php?gid=17   - 
// /build.php?gid=18   - 
// /build.php?gid=19   - 
// /build.php?gid=20   - 
// /build.php?gid=21   - 
// /build.php?gid=22   - 
// /build.php?gid=23   - 
// /build.php?gid=24   - 
// /build.php?gid=25   - 
// /build.php?gid=26   - 
// /build.php?gid=27   - 
// /build.php?gid=28   - 
// /build.php?gid=29   - 
// /build.php?gid=30   - 
// /build.php?gid=31   - 
// /build.php?gid=32   - 
// /build.php?gid=33   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 
// /build.php?gid=1   - 













// цифра = код Unicode
// - = 45
// 0 = 48
// 1 = 49
// 2 = 50
// 3 = 51
// 4 = 52
// 5 = 53
// 6 = 54
// 7 = 55
// 8 = 56
// 9 = 57
// alert( '9'.charCodeAt(0) );


var server = location.hostname; // ts2.travian.co.uk
var urlPath = location.pathname; //   /dorf1.php
//alert(urlPath);

//http://travian.ping-timeout.de/travissimo/travissimo.php?domain=ts2.travian.co.uk&uid=69881
//http://travian.ping-timeout.de/travissimo/dorf.php?d=69881&domain=ts2.travian.co.uk
//http://travianstats.de/index.php?m=village_info&did=BL_BENETRATOR

// GM_setValue("nameAuthor", "Taras");
// alert( GM_getValue("nameAuthor") );







var co = document.getElementById('travianBirthdayRibbon').getBoundingClientRect();
var coX1 = Math.round(co.left);
var coY1 = Math.round(co.top);
var coX2 = Math.round(co.right);
var coY2 = Math.round(co.bottom);
var coW = coX2 - coX1
var coH = coY2 - coY1

var rec = document.createElement('div');
  var s=rec.style
  s.position='absolute';
  s.left=coX1+'px';
  s.top=coY1+'px';
  s.width=coW+'px';
	s.height=coH+'px';
	s.background='yellow';
  s.zIndex='999999';
  
	document.body.appendChild(rec);

var zInd = getStyle ( "travianBirthdayRibbon" , "z-index" );

// --- функция возвращает свойства (параметры) элемента;   например: узнать какой у элемента zIndex (для Firefox = z-index)
// пример вызова: var zInd = getStyle ( "normaldiv1" , "zIndex" ); alert ( zInd );
// стырил отсюда:   http://stackoverflow.com/questions/1388007/getting-the-z-index-of-a-div-in-javascript
function getStyle(el,styleProp)
{
    var x = document.getElementById(el);
    if (window.getComputedStyle)
    {
        var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp); 
    }  
    else if (x.currentStyle)
    {
        var y = x.currentStyle[styleProp];
    }                     

    return y;
}








var doc = document || window.document;  

// получаем исходник HTML
var ptv_html = doc.body.innerHTML;



ptv_html = ptv_html.replace(new RegExp('&quot;','g'),'"');
dorf2area = ptv_html.indexOf('<area ', 0);
idd = ptv_html.substr(dorf2area, 1000);
//alert(idd);









// ищем в строке  ptv_html
var target = '<a href="?newdid='; // цель поиска
var aTag = ''; // сюда будем писать тело DIV (ссылки, таблицы и т.д.)
var pos = -1;
while ((pos = ptv_html.indexOf(target, pos + 1)) != -1) {
  
  // парсим ID деревни
  var sTmp = ptv_html.substr(pos+17, 10); // в этой строке где-то есть id деревни
  var VilID = '';
  for (var dl = 0; dl <= sTmp.length; dl++ ){
    var code = sTmp.charCodeAt(dl); // получаем Unicode символа
    for (var i = 48; i <= 57; i++) { // проверяем строку только на цифры
      if (code == i){        
        VilID += String.fromCharCode(code);
        break;
      }
    }
  }
  // тут найденный ID надо либо записывать в массив либо в кукисы, хз , пока не знаю как ...
  // alert(VilID);
  
  // --- парсим имя деревни ---
  var str = ptv_html.substr(pos, 1000);
  var strInN = str.indexOf('<div class="name">', 0);
  sTmp = str.substr(strInN + 18, 20 + 6); // max кол-во символов названии деревни = 20
  var EndOfStringName = sTmp.indexOf('</div>', 0);
  var VilName = sTmp.substr(0, EndOfStringName);
  // alert(VilName);
  
  // --- парсим координату X ---
  var str = ptv_html.substr(pos + strInN, 500);
  var strInX = str.indexOf('coordinateX">(', 0);
  var sTmp = str.substr(strInX + 14, 4 + 15);
  var EndOfStringX = sTmp.indexOf('</span>', 0);
  var VilX = sTmp.substr(0, EndOfStringX);
  // в VilX входят ёбаные неизвестные символы, их надо обрезать и оставить только числа!
  var VilTmp = '';
  for (var dl = 0; dl <= VilX.length; dl++ ){
    var code = VilX.charCodeAt(dl); // получаем Unicode символа
    for (var i = 48; i <= 57; i++) { // проверяем строку только на цифры
      if (code == i || code == 45) {        
        VilTmp += String.fromCharCode(code);
        break;
      }
    }
  }
  VilX = VilTmp;
  // alert(VilX);
  
  // --- парсим координату Y ---
  var str = ptv_html.substr(pos + strInN + strInX, 500);
  var strInY = str.indexOf('coordinateY">', 0);
  var sTmp = str.substr(strInY + 13, 4 + 15);
  var EndOfStringY = sTmp.indexOf(')</span>', 0);
  var VilY = sTmp.substr(0, EndOfStringY);
  var VilTmp = '';
  for (var dl = 0; dl <= VilY.length; dl++ ){
    var code = VilY.charCodeAt(dl); // получаем Unicode символа
    for (var i = 48; i <= 57; i++) { // проверяем строку только на цифры
      if (code == i || code == 45) {        
        VilTmp += String.fromCharCode(code);
        break;
      }
    }
  }
  VilY = VilTmp;  
  // alert(VilY);
  
  aTag += '<tr><td width="1px"><a class="ptv_aN" href="?newdid='+VilID+'&">'+VilName+'</a></td><td width="1px"><a class="ptv_aXY" href="#" onclick="document.getElementById(\'xCoordInput\').value='+VilX+';document.getElementById(\'yCoordInput\').value='+VilY+';">('+VilX+'|'+VilY+')</a></td><td width="1px"><a class="ptv_aR" href="#" onclick="location.href=\'\/build.php?newdid='+VilID+'&t=5&gid=17\';"><img src="img/x.gif" class="imgR"></a></td><td></td></tr>'
}

// --- создаём DIV, в которм всё ---


var ptv_verrr = '<div class="ptv_zag" onmousedown="ptvDrag()";>'+ptv_version+'</div>';






SetDiv()
function SetDiv(){
  var d=document.createElement('div');


  d.innerHTML=ptv_verrr+'<table id="tbl_ptv_Village">'+aTag+'</table>';
  
  d.id='ptv_divMain';
  var s=d.style
  s.position='absolute';
  s.border='1px solid #cccccc';
  s.left=(coX1-16)+'px';
  s.top=(coY1+120)+'px';
  d.style.width='201px';
	s.padding='0px 2px 2px 2px';
  d.style.background='rgba(241,224,90,0.99)';
  s.zIndex='99999999';

  // d.addEventListener('mousedown', ptvDrag); // таким образом функция в теле UserScript и работает из DOM!!!
	document.body.appendChild(d);
  
	
}


  // вешаем событие на элемент по ID
  //document.getElementById('heroImageButton').addEventListener('mousedown', ptvDrag);
// вешаем событие на всю страницу
//document.addEventListener('mousedown',ptvDrag);








var cnt = 0;
var loadMap = document.getElementById('mapContainer');
if(loadMap){document.body.addEventListener("DOMNodeInserted",ptvLoadMap);}

function ptvLoadMap(){
  var evMap = $g('tileDetails');
  if (evMap) {
    cnt = cnt+1
    document.getElementById('stockBarFreeCrop').innerHTML=cnt; // alert('окно: '+evMap);
    // снимаем обработчик
    // document.body.removeEventListener("DOMNodeInserted",ptvLoadMap);
 }
  
  
  //if ( doDOMContentLoaded );
}


//<a href="spieler.php">BL_BENETRATOR</a>


function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};

function ptvMapXY(){

 
  alert($g('tileDetails'));
  
  
}


  


// создаём elem STYLE в котором стили для всех наших элементов
var ptv_st = document.createElement('style');
  ptv_st.innerHTML =
    '#tbl_ptv_Village {'+
      'margin:0px;'+
      'padding:0px !important;'+
    'border-collapse:collapse !important;'+
    'line-height: 0px;'+
    'width: 100%;'+
    'empty-cells: show;'+
    
    'display: '+
      '}'+
    
    
    '#tbl_ptv_Village td{'+
      'margin:0px;padding:0px;border:1px solid #cccccc;'+
      '}'+
    
    
    
    '.ptv_aN{width:100px;}'+
    '.ptv_aXY{width:56px;text-align:center;}'+
    '.ptv_aR{width:16px;}'+
    
    '.imgR{background-image:url(http://gpack.travian.com/e2ee5537/img/a/carry.gif); margin:4px 0px 0px 1px; padding:0;border:0;width:13px;height:12px;background-position: 0 0px;}'+
    
    
    '.ptv_aN,.ptv_aXY,.ptv_aR { '+
      'font-family:Tahoma,sans-serif;'+
      'font-size:8pt;'+
      'font-weight:normal;'+
      'line-height:21px;'+
      'color:#000000 !important;'+
      'display:block;'+
      
      'height:22px;'+
      'border:1px solid transparent;'+  // #cccccc;'+
      'background-color:rgba(242,249,252,0.001);'+
      'margin:0px !important;'+
      'padding-left:3px;padding-right:3px;'+
      'text-decoration:none;'+
      'white-space:nowrap;'+
      'overflow:hidden;'+
      'text-overflow:ellipsis;'+
      'cursor: default;'+
      'outline:none;}'+
   
   '.ptv_aN:hover,.ptv_aXY:hover,.ptv_aR:hover{'+
      'background-color:rgba(226,238,249,0.9);'+
      'border:1px solid transparent;'+   // rgba(186,198,211,0.9)'+
      '}'+
   '.ptv_aN:active,.ptv_aXY:active,.ptv_aR:active{'+
      'background-color:rgba(198,224,250,0.999);'+
      'border:1px solid transparent;'+   // rgba(186,198,211,0.9)'+
      '}'+
    
    
    
    
    
  '.ptv_zag{'+
     'font-family:Tahoma,sans-serif;'+
     'font-size:8pt;'+
     'padding:2px 4px 3px 0px;'+
     'text-align:right;}'+
  
  
  
  
  
  // окошко с нападениями (из игры стиль - изм.)
  'div.village1 div.movements{'+  
    'left:-381px;'+
    'top:-56px;'+
  '}';

  document.body.appendChild(ptv_st);




    



// --- реальные ширина(Width) и высота(Height) вместе с прокруткой web-страницы --->  https://gist.github.com/tit
function RealWHtmlPage(){var rw = Math.max(document.body.clientWidth, document.body.offsetWidth, document.body.scrollWidth); return rw;}
function RealHHtmlPage(){var rh = Math.max(document.body.clientHeight, document.body.offsetHeight, document.body.scrollHeight); return rh;}