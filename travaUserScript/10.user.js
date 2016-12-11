// ==UserScript==
// @name        ptv-z79
// @namespace   https://ptv-z79.github.io/travaUserScript
// @author      Taras P.
// @description Пробная версия min-script для вставки координат на рынке
// @description ver.1.0.0.2 2016-12-10 07:57:23

// @include     http://*.travian.*/*
// @include     https://*.travian.*/*
// @include     http://*.travian.*/*
// @include     http://travian.*/index.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/manual.php*

// @version     1.0.0.2 

// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant	      GM_deleteValue
// @grant       GM_xmlhttpRequest

// ==/UserScript==



var ptv_version='v.0.0.0.1 2016-12-10';

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

var ptv_html = doc.body.innerHTML;
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
  
  aTag += '<a class="ptv_a" href="#" onclick="document.getElementById(\'xCoordInput\').value=' + VilX + ';document.getElementById(\'yCoordInput\').value=' + VilY + ';" >' + VilName + '</a>'
}

// --- создаём DIV, в которм всё ---


var ptv_verrr = '<div id="zagolovok" onmousedown="ptvDrag()";>'+ptv_version+'</div>';








SetDiv()
function SetDiv(){
  var d=document.createElement('div');


  d.innerHTML=ptv_verrr + aTag;
  
  d.id='ptv_divMain';
  var s=d.style
  s.position='absolute';
  s.border='1px solid #cccccc';
  s.left=(coX1-16)+'px';
  s.top=(coY1+120)+'px';
  d.style.width='193px';
	s.paddingBottom='2px';
  d.style.background='white';
  s.zIndex='99999999';

  // d.addEventListener('mousedown', ptvDrag); // таким образом функция в теле UserScript и работает из DOM!!!
	document.body.appendChild(d);
  
	
}


  
  document.getElementById('heroImageButton').addEventListener('mousedown', ptvDrag);

function ptvDrag(){
  alert('!!!-!!!');
}
  


// создаём elem STYLE в котором стили для всех наших элементов
var ptv_st = document.createElement('style');
  ptv_st.innerHTML =
   '.ptv_a { '+
      'font-family:Verdana,sans-serif;'+
      'font-size:11px;'+
      'font-weight:normal;'+
      'line-height:21px;'+
      'color:#000000 !important;'+
      'display:block;'+
      'width:182px;'+
      'height:22px;'+
      'border:1px solid #cccccc;'+
      'margin:1px;'+
      'padding-left:7px;'+
      'text-decoration:none;'+
      'cursor: pointer;'+
      'outline:none;}'+
   
   '.ptv_a:hover{'+
      'background-color:rgba(152,209,232,0.4);'+
      '}';

  document.body.appendChild(ptv_st);




    




