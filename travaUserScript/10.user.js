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

// @version     0.0.64 beta

// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant	      GM_deleteValue
// @grant       GM_xmlhttpRequest

// @grant       unsafeWindow

// ==/UserScript==


var oJSO = window.wrappedJSObject;
console.info( unsafeWindow.SERVERLINK);
//unsafeWindow.SERVERLINK

var bbbb = oJSO.Travian.Game.Map.Container;
console.info('::: ' + oJSO.Travian.Game.Map.Container);
console.info('::: ' + oJSO.Travian.Game.Map.Options.Default.mapMarks.player.layers.alliance.dialog.html);


var G_HREFUPDATE = 'https://ptv-z79.github.io/travaUserScript/10.user.js';
var ptv_version='v.0.0.64 beta / 2016-12-27'; // начал писать 2016-12-10


// получаем значения переменных со страницы
//alert(window.wrappedJSObject.ajaxToken);


console.info(window.wrappedJSObject.stockBarWarehouse.textContent.length);
console.info(window.wrappedJSObject.stockBarWarehouse.innerHTML.length);
console.info(window.wrappedJSObject.stockBarWarehouse.innerText.length);

var oResProd = window.wrappedJSObject.resources.production;
console.info(oResProd['l1']);

var jso = window.wrappedJSObject;
var ResStor = jso.resources.storage;
console.log('storage: ' + window.wrappedJSObject.resources);








// альянс
//var href = 'http://travian.ping-timeout.de/travissimo/allianzen.php?aid=4&domain=ts2.travian.co.uk'
// игрок
//var href = 'http://travian.ping-timeout.de/travissimo/travissimo.php?uid=10944&domain=ts2.travian.co.uk'
//var href = 'http://travian.ping-timeout.de/travissimo/dorf.php?d=340759&domain=ts2.travian.co.uk'; // деревня
//var href = 'http://travian.ping-timeout.de/index.php?m=scriptentwickler&lang=english'
//var href = 'http://ts2.travian.co.uk/dorf2.php'
//var href = 'http://travian.ping-timeout.de/index.php?m=spielersuche&uid=141&w=ukts2'

/*
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
*/


// --- переменные --------------------------------------------------


var G_MAPWIDTH = RealWHtmlPage() - 25;
var G_MAPHEIGHT = document.documentElement.clientHeight - 20;

var G_MAPBOXWIDTH; // ширина загружаемого фрагмента карты
if(window.screen.width<=1024)G_MAPBOXWIDTH=2400;
var G_MAPBOXHEIGHT; // высота загружаемого фрагмента карты
if(window.screen.height<=768)G_MAPBOXHEIGHT=2400;

console.info(G_MAPBOXWIDTH);
console.info(G_MAPBOXHEIGHT);



// расчитываем расстояние от левого края по X до карты, чтобы разместить её впритык по Х=0
var G_MAPLEFT;
var mapTmp=getPosElem('sidebarBeforeContent','1', false);
mapTmp=mapTmp[3];
G_MAPLEFT=mapTmp-17;




//alert(xy2id(-68, -28));
function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

//http://caniuse.com/#feat=mutationobserver
/*  ts2.travian.co.uk/build.php?gid=0&category=3   --> вкладка [Resources,,]


/build.php?gid=0 --> автоматически будет строить в деревне (dorf2) на случайном свободном id (если, например, id 20, 22, 23 - заняты зданиями, то построит на меньшем по значению свободном id, например, на 18 или 19)

*/

// http://t4.answers.travian.ru/?view=answers&action=answer&aid=213



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

var G_HREF = location.href;     // http://ts6.travian.co.uk/berichte.php?t=4
var G_PROT = location.protocol; // http:
var G_HOST = location.hostname; // ts6.travian.co.uk
var G_PATH = location.pathname; // /berichte.php
var G_ORIG = location.origin;   // http://ts6.travian.co.uk
var G_SRCH = location.search;   // ?t=4
var G_PORT = location.port;     // ""



/*
console.info('Href: ' + G_HREF);
console.info('Protocol: ' + G_PROT);
console.info('Host: ' + G_HOST);
console.info('Path: ' + G_PATH);
console.info('Длина Path: ' + G_PATH.length)
*/



// -------------------------------------------
// --- добавим производство ресурсов в час ---
// -------------------------------------------

ПроизводствоВЧас('#stockBarResource1','l1'); // дерево
ПроизводствоВЧас('#stockBarResource2','l2'); // глина
ПроизводствоВЧас('#stockBarResource3','l3'); // камень
ПроизводствоВЧас('#stockBarResource4','l4'); // зерно


function ПроизводствоВЧас(a,b){
  var d=document.createElement('div');
  d.innerHTML=oJSO.resources.production[b];
  
  d.style.border='1px solid #ccc';
  d.style.backgroundColor='white';
  d.style.position='absolute';
  d.style.left='1px';
  d.style.top='25px';
  d.style.width='72px';
  d.style.height='16px';
  d.style.textAlign='right';
  d.style.fontFamily='Tahoma, sans-serif';
  d.style.fontSize='8pt';
  d.style.fontWeight='bold';
  var цветТекста=oJSO.resources.production[b]<=0?'red':'green';
  d.style.color=цветТекста;
  d.style.paddingRight='4px';
  d.style.lineHeight='15px';
  var z=(G_PATH === '/karte.php')?'0':'6009';
  d.style.zIndex=z;

  var place=document.querySelector(a); // после этого элемента вставим наш
  place.appendChild(d); // добавим наш
  
  // -----------------------------------------------
  
  var d2=document.createElement('div');
  d2.innerHTML=parseInt( oJSO.resources.maxStorage[b]-oJSO.resources.storage[b]);
  
  d2.style.border='1px solid #ccc';
  d2.style.backgroundColor='white';
  d2.style.position='absolute';
  d2.style.left='-1px';
  d2.style.top='16px';
  d2.style.width='72px';
  d2.style.height='16px';
  d2.style.textAlign='right';
  d2.style.fontFamily='Tahoma, sans-serif';
  d2.style.fontSize='8pt';
  d2.style.fontWeight='bold';
  var цветТекста=oJSO.resources.production[b]<=0?'#959595':'#959595';
  d2.style.color=цветТекста;
  d2.style.paddingRight='4px';
  d2.style.lineHeight='15px';
  d2.style.zIndex=z;

  // var place=document.querySelector(a); // после этого элемента вставим наш
  d.appendChild(d2); // добавим наш
  
  
  
}

























// добавляем свою кнопку 'Delete|Удалить' в отчётах вверху-слева, возле 'mark all|отметить всё' для удобства  :)
if(G_PATH == '/berichte.php'){
  var u=G_PROT+'//'+G_HOST+G_PATH;
  u=G_HREF.replace(u,'');
  if(u.length<=4 && u!='?t=6' || u.substring(0,4)=='?n1='){
    var d=document.createElement('span');
    d.innerHTML='Удалить';
    d.setAttribute('class', 'ptv_bDelBerichte');
    var btn=document.querySelector('button#del'); // на этот элемент будем клацать программно
    var place=document.querySelector('div#markAll'); // после этого элемента вставим наш SPAN (псевдо-кнопку DELETE)
    place.appendChild(d); // добавим наш SPAN после элемента place
    d.addEventListener('mouseup', btnClickMarkAll); //
     function btnClickMarkAll(){
       var evt = document.createEvent("MouseEvents");
       evt.initEvent("click", true, true);
       btn.dispatchEvent(evt);
       //el.dispatchEvent(evt);
   }}}




if(G_PATH=='/karte.php'){
  console.info('Карта');
  
  document.body.style.overflow = 'hidden'; // запрещаем прокрутку страницы
  
  var stKarte=''+
      
      'div#header, #footer {display: none;}'+
      'body.map, #headerBar{background-image:none !important;background-color:white;}'+
      'div#background {background-image: none !important;}'+
    
      'div#mapContainer {'+
        'position: absolute;'+
        'left: -'+G_MAPLEFT+'px !important;'+
        'top: 0px;'+
        'width: '+G_MAPWIDTH+'px;'+ // 983px;'+
        'height: '+G_MAPHEIGHT+'px;'+ // 647px;'+
        'cursor: auto;'+
        'z-index: 1000;}'+
  
      'div#mapContainer div.ruler.x {width: '+G_MAPWIDTH+'px !important;}'+
      //'div#mapContainer div.ruler.x > div {width: '+G_MAPBOXWIDTH+'px !important;}'+
  
      'div#mapContainer div.ruler.y {height: '+G_MAPHEIGHT+'px !important;}'+
      //'div#mapContainer div.ruler.y > div {height: '+G_MAPBOXHEIGHT+'px !important;}'+
       
      // при наведении и нажатии на кнопку  Close  - выход с карты
      '.mapClose:hover{background-color:rgba(255,255,255,0.5) !important; color:black !important}'+
      '.mapClose:active{background-color:rgba(255,255,255,0.7) !important; color:black !important;}'+
    
      
      
      
      // убираем моё меню с карты
      '#ptv_divMain{display:none;}'+
      '';
  
  var d=document.createElement('div');
  var stA='display:block;background-color:rgba(255,255,255,0.15);width:46px;height:25px;font-family:Tahoma,sans-serif;font-size:8pt;font-weight:normal;color:white;text-decoration:none;text-align:center;line-height:22px;';
  // PLUS не включен || PLUS включен
  var el = document.querySelector('#iconFullscreen') || document.querySelector('div.contents div.iconButton.viewFull');
  if(el.id==''){ // PLUS - включен
    d.style.width='46px';
    d.style.height='25px';
    d.style.border='1px solid black';
    d.style.backgroundColor='rgba(0,0,0,0.8)';
    d.style.zIndex='99999';
    d.style.position='absolute';
    d.style.left='158px';
    d.style.top='-6px';
  } else { // PLUS - не включен
    d.style.width='46px';
    d.style.height='25px';
    d.style.border='1px solid black';
    d.style.backgroundColor='rgba(0,0,0,0.8)';
    d.style.zIndex='99999';
    d.style.position='absolute';
    d.style.left='160px';
    d.style.top='-1px';
    
  }
  
  d.innerHTML='<a href="dorf1.php" class="mapClose" style="'+stA+'" alt="Закрыть карту">Close</a>';
  
  el.appendChild(d);
}













//alert(urlPath);

//http://travian.ping-timeout.de/travissimo/travissimo.php?domain=ts2.travian.co.uk&uid=69881
//http://travian.ping-timeout.de/travissimo/dorf.php?d=69881&domain=ts2.travian.co.uk
//http://travianstats.de/index.php?m=village_info&did=BL_BENETRATOR

// GM_setValue("nameAuthor", "Taras");
// alert( GM_getValue("nameAuthor") );




var coElem = getPosElem('outOfGame','6008', false)


  
var zInd = getStyle ( "travianBirthdayRibbon" , "z-index" )

// --- функция возвращает свойства (параметры) элемента;   например: узнать какой у элемента zIndex (для Firefox = z-index)
// пример вызова: var zInd = getStyle ( "normaldiv1" , "zIndex" ); alert ( zInd );
// стырил отсюда:   http://stackoverflow.com/questions/1388007/getting-the-z-index-of-a-div-in-javascript
function getStyle(el,styleProp)
{
  var x = document.getElementById(el);
  if(x==null)return null; // т.к. в начале игры нет такого элемента, то возвращаем   null
  
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


// заменяем символы
ptv_html = ptv_html.replace(new RegExp('&quot;','g'),'"');

dorf2area = ptv_html.indexOf('<area ', 0);
idd = ptv_html.substr(dorf2area, 1000);
//console.info(idd);







// ищем в строке  ptv_html
var target = '<a href="?newdid='; // цель поиска
var aTag = ''; // сюда будем писать тело DIV (ссылки, таблицы и т.д.)


var G_AVN = ''; // имя активной деревни
var pos = -1;
while ((pos = ptv_html.indexOf(target, pos + 1)) != -1) {
  
 
  // парсим активную деревню
  var sTmp=ptv_html.substr(pos, 100);
  sTmp=sTmp.indexOf('class="active"', 0)
  var ptvActive='';
  ptvActive=(sTmp>0)?' ptv_active':'';
  
  
  
  // парсим ссылку деревни
  var sTmp = ptv_html.substr(pos+9, 200);
  var VilHref = '';
  for (var hr=1;hr<=200;hr++){
    var code = sTmp.charCodeAt(hr); // получаем Unicode символа
    if (code == 34){
      VilHref=sTmp.substr(0, hr);
      break;
    }
  }
  //console.info('VilHref='+VilHref);
  
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
  if(ptvActive==' ptv_active')G_AVN=VilName;
  
  
  
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
  
  




  
  
  
  aTag += '<tr><td width="1px"><a class="ptv_aN'+ptvActive+'" href="'+VilHref+'">'+VilName+'</a></td><td width="1px"><a class="ptv_aXY'+ptvActive+'" href="#" onclick="document.getElementById(\'xCoordInput\').value='+VilX+';document.getElementById(\'yCoordInput\').value='+VilY+';">('+VilX+'|'+VilY+')</a></td><td width="1px"><a class="ptv_aR'+ptvActive+'"  href="build.php?newdid='+VilID+'&gid=17&t=5"><img src="img/x.gif" class="imgR"></a></td><td></td></tr>'
}



console.info('ИМЯ АКТИВНОЙ ДЕРЕВНИ: '+G_AVN);






// --- создаём DIV, в которм всё ---




var vilLoy=document.querySelector('div.expansionSlotInfo').outerHTML;
console.info(vilLoy);
var vilLoy=document.querySelector('div.expansionSlotInfo').textContent;
console.info(vilLoy);
var vilLoy=document.querySelector('div.expansionSlotInfo').title;
console.info(vilLoy);
var vilLoy=document.querySelector('div.expansionSlotInfo div.bar').style.width;
console.info(vilLoy);


//innerText





var btnQuest=document.querySelector('form > div.questAchievementContainer > button');


//function btnClick(el){
function btnClick(){
  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", true, true);
  btnQuest.dispatchEvent(evt);
  //el.dispatchEvent(evt);
}













var ptv_verrr = '<table id="tbl_ptv_UpVer"><tr><td><a class="aUpDate" href="'+G_HREFUPDATE+'" target="_blank">Update</a></td><td><div class="ptv_zag">'+ptv_version+'</div></td></tr></table>';






SetDiv()



function SetDiv(){
  var d=document.createElement('div');

  d.innerHTML=ptv_verrr+'<table id="tbl_ptv_Village">'+aTag+'</table>';
  
  d.id='ptv_divMain';
  var s=d.style
  s.position='absolute';
  s.border='1px solid #cccccc';
  s.left=(coElem[1]-65)+'px';
  s.top=198 +'px';  // (coY1+120)+'px';
  d.style.width='201px';
	s.padding='0px 2px 2px 2px';
  d.style.background='rgba(241,224,90,0.99)';
  s.zIndex='6009';

	document.body.appendChild(d);
  
  var b=document.createElement('div');
  b.innerHTML='Ежедневные Бонусы';
  b.setAttribute('class', 'ptv_bQuest');
  d.appendChild(b);
  b.addEventListener('mouseup', btnClick);
  
  
  
	
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
    'TABLE#tbl_ptv_UpVer, #tbl_ptv_Village {'+
      'margin:0px;'+
      'padding:0px !important;'+
      'border-collapse:collapse !important;'+
      'line-height: 0px;'+
      'width: 100%;'+
      'empty-cells: show;'+
      
      '}'+
    
    'TABLE#tbl_ptv_UpVer{background-color:rgba(241,224,90,0.99);margin:2px 0 3px 0;}'+
    
    '#tbl_ptv_UpVer td{margin:0px;padding:0px;border:1px solid transparent;background-color:rgba(241,224,90,0.99);}'+
    '#tbl_ptv_Village td{margin:0px;padding:0px;border:1px solid #cccccc;}'+
    
    
    

    '.aUpDate{font-family:Tahoma,sans-serif;font-size:8pt;font-weight:normal;display:block;margin:0px;height:20px;line-height:19px;text-align:center;border:1px solid white;background-color:rgba(255,255,255,0.6);cursor:pointer;color:black !important;padding:0px 3px 0px 3px;}'+
    '.aUpDate:hover{background-color:rgba(93,242,137,0.5);} .aUpDate:active{background-color:rgba(93,242,137,0.9);}'+    
    
    
    
    
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
      'cursor: pointer;'+
      'outline:none;}'+
   
   '.ptv_aN:hover,.ptv_aXY:hover,.ptv_aR:hover{background-color:rgba(226,238,249,0.9);border:1px solid white;}'+
   '.ptv_aN:active,.ptv_aXY:active,.ptv_aR:active{background-color:rgba(198,224,250,0.999);border:1px solid transparent;}'+
   '.ptv_active{background-color:rgba(93,211,240,0.4)}'+
    
  '.ptv_zag,.ptv_bQuest{font-family:Tahoma,sans-serif;font-size:8pt;}'+  
  '.ptv_zag{padding:2px 4px 3px 0px;text-align:right;border:1px solid transparent;}'+
  
  '.ptv_bQuest{padding:2px 0px 4px 0px;margin-top:4px;text-align:center;border:1px solid white;background-color:rgba(255,255,255,0.6);cursor:pointer;}'+
  '.ptv_bQuest:hover{background-color:rgba(93,242,137,0.5)} .ptv_bQuest:active{background-color:rgba(93,242,137,0.9)}'+
  
  
  
  // --- стиль изменений оригинальной страницы нужно ставить ДО началы работы скоипта ---
  // левое меню ---
  
  //'div#sidebarBeforeContent{width:200px;}'+
    
  // скрываем блок  id=sidebarBoxInfobox
  'div#sidebarBoxInfobox{display:none;}'+
  // скрываем блок  id=sidebarBoxLinklist
  'div#sidebarBoxLinklist{display:none;}'+
    
    
    
  
  // правое меню --- ресурсы
  // убираем кнопку +25 за голд
    'div.boxes.villageList.production > div.boxes-contents.cf > div {display:none;}'+
  // перемещаем окошко с производством в час
  // 'div.boxes.villageList.production{left:-21px;top:0px;width:180px;}'+
  // скрываем окошко с производством ресурсов в час
  'div.boxes.villageList.production{display:none;}'+
  // перемещаем окошко с нападениями
  // 'div.village1 div.movements{left:0px;top:0px;}'+
  // скрываем окошко "Ежедневные задания"
  'div#sidebarBoxQuestachievements{visibility:hidden;}'+
  
  
  // стиль для своей кнопки 'Delete|Удалить' в отчётах вверху-слева, возле 'mark all|отметить всё' для удобства  :)
  '.ptv_bDelBerichte{'+
    'position:absolute;'+
    'padding:3px 17px 5px 17px;'+
    'margin:-6px 0px 0px 20px !important;'+
    'background-color:hsla(173,56%,63%,1);'+
    'color:black;'+
    'border:1px solid #cccccc;'+
    'font-family:Verdana,sans-serif;'+
    'font-size:11px;'+
    'font-weight:normal;'+
    '-moz-user-select: none;'+
    'cursor:pointer;}'+
  '.ptv_bDelBerichte:hover{background-color:hsla(173,66%,73%,0.7);} .ptv_bDelBerichte:active{background-color:hsla(173,56%,53%,1);}'+
    
    // стиль дописываем только для карты (karte.php) и для кнопки  Close
    stKarte+
    
    
    '';

  document.body.appendChild(ptv_st);




    



// --- реальные ширина(Width) и высота(Height) вместе с прокруткой web-страницы --->  https://gist.github.com/tit
function RealWHtmlPage(){var rw = Math.max(document.body.clientWidth, document.body.offsetWidth, document.body.scrollWidth); return rw;}
function RealHHtmlPage(){var rh = Math.max(document.body.clientHeight, document.body.offsetHeight, document.body.scrollHeight); return rh;}



// ---------------------------------------------------------------------------------------------------------------
// ---------------------------  Функции для парсинга html-кода  --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------


// определяем позицию элемента на странице по ID и сверху накладываем DIV для наглядности
// getPosElem('id=строка','zIndex=строка', true|false=рисовать DIV повер элемента|не рисовать DIV поверх элемента) 
function getPosElem(id,zInd,bool){
  var co = document.getElementById(id).getBoundingClientRect();
  var coX1 = Math.round(co.left);
  var coY1 = Math.round(co.top);
  var coX2 = Math.round(co.right);
  var coY2 = Math.round(co.bottom);
  var coW = coX2 - coX1
  var coH = coY2 - coY1
  
  //console.info(bool);
  if(bool){
    var d = document.createElement('div');
    var s=d.style
    s.position='absolute';
    s.left=coX1+'px';
    s.top=coY1+'px';
    s.width=coW+'px';
	  s.height=coH+'px';
	  s.backgroundColor='rgba(228,75,35,0.49)';
    s.zIndex=zInd;
    document.body.appendChild(d);
  }
  
  var co=['',coX1,coY1,coX2,coY2];
  return co;
}








// пробуем заменить на русский текст -----------------------------------------------------------

for(var i=1;i<=20;i++){
  if(translated('#content h1', 'Marketplace Level '+String(i), 'Рынок - уровень '+String(i))===true) {
    console.info(i);
    break;
  }
}

translated('#symmary tr:nth-child(2) td:nth-child(2)', 'are on their way to you.', 'ты купил');
translated('#symmary tr:nth-child(3) td:nth-child(2)', 'resources have been sent.', 'ты продал');

translated('#build h4.spacer', 'Offers at the marketplace', 'Предложения на рынке');
translated('#range tr:nth-child(1) th:nth-child(1)', 'Offer', 'Продаёт');
translated('#range tr:nth-child(1) th:nth-child(3)', 'Search', 'Покупает');

function translated(css, slovoEn, slovoRu){
  console.info('CSS: '+css);
  var t=document.querySelector(css);
  var r;
  t===null?r=false:t.textContent===slovoEn?t.textContent=slovoRu:r=true; //console.info(t.textContent+'   Не та вкладка!');
  return r;
}