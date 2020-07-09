"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}function _createForOfIteratorHelper(o,allowArrayLike){var it;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function F(){};return{s:F,n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function s(){it=o[Symbol.iterator]()},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _iterableToArray(iter){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(iter))return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}$(document).ready((function(){window.addEventListener("scroll",(function(){toggleScrollClass()}))}));var guidance,unHide=function unHide(query,state){var cards=islGuide.filter((function(i){return i.Context==parseInt(state.Context)&&i.Objective==parseInt(state.Objective)})).map((function(i){return i.Intervention}));unhideCards(query,cards)},getGuidancePrep=function getGuidancePrep(state){return islGuide.filter((function(i){return i.Context==parseInt(state.Context)&&i.Objective==parseInt(state.Objective)&&i.Intervention==parseInt(state.Intervention)})).map((function(i){return i.Guidance}))[0]},pageState={Context:void 0,Objective:void 0,Intervention:void 0},hide=!0,highlightFunction=function highlightFunction(e){var parent=e.parentElement;if(e.onclick=null,!0===hide){var last=_toConsumableArray(parent.children).filter((function(i){return"none"!=i.style.display}))[0].getBoundingClientRect(),first=e.getBoundingClientRect(),deltaX=first.left-last.left,deltaY=first.top-last.top;Object.values(parent.children).filter((function(item){return item!=e})).forEach((function(item){item.onclick=null,item.classList.add("flipOutY"),setTimeout((function(){item.classList.add("hidden-object"),e.animate([{transformOrigin:"bottom right",transform:"\n                        translate(".concat(deltaX,"px, ").concat(deltaY,"px)\n                                ")},{transformOrigin:"top left",transform:"none"}],{duration:300,easing:"ease-in-out",fill:"both"})}),1e3)}))}else e.classList.add("selected"),Object.values(parent.children).forEach((function(item){item.classList.remove("card-hover"),item.onclick=null}));setTimeout((function(){var hidCol=document.getElementsByClassName("hidden-section animated card-col");if(0==hidCol.length)pageState.Intervention=e.getAttribute("index"),guidance=getGuidancePrep(pageState),updateGuidance(guidance),1==hide&&document.getElementById("card-section").classList.remove("card-section-max"),Object.values(document.getElementsByClassName("data-section")).forEach((function(elm){elm.classList.remove("hidden-object")})),0==hide&&document.getElementsByClassName("breadcrumb-data")[0].scrollIntoView({behavior:"smooth",block:"start"});else{var index=e.getAttribute("index");"context-data"==parent.id?pageState.Context=e.getAttribute("index"):"obj-data"==parent.id&&(pageState.Objective=index,unHide("#inter-data .card, #inter-header .card li",pageState,index));var col=hidCol[0];col.classList.remove("hidden-section"),col.classList.add("fadeInLeft")}}),1100);var breadcrumb=document.getElementById(e.parentElement.attributes["data-target"].value);if(breadcrumb.getElementsByTagName("span")[0].innerText=e.innerText,0==hide)breadcrumb.classList.add("unclickable"),breadcrumb.querySelector(".dropdown-toggle").classList.remove("dropdown-toggle");else breadcrumb.getElementsByTagName("div")[0].querySelector("li[index='"+e.getAttribute("index")+"']").remove()},switchNavMenuItem=function switchNavMenuItem(){if(""!==location.pathname.split("/").pop()){var _step,_iterator=_createForOfIteratorHelper(document.querySelectorAll(".sidenavr ul li a"));try{for(_iterator.s();!(_step=_iterator.n()).done;){var menuItem=_step.value;location.pathname.includes(menuItem.getAttribute("href").split("/").pop())&&(menuItem.className="active")}}catch(err){_iterator.e(err)}finally{_iterator.f()}}};$(document).ready((function(){switchNavMenuItem()}));var updateGuidance=function(){var _ref=_asyncToGenerator(regeneratorRuntime.mark((function _callee(guidanceID){return regeneratorRuntime.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,updateTabs(guidanceID);case 2:swapPrincp("#envrioGuidance");case 3:case"end":return _context.stop()}}),_callee)})));return function updateGuidance(_x){return _ref.apply(this,arguments)}}(),unhideCards=function unhideCards(query,cards){Object.values(document.querySelectorAll(query)).map((function(i){cards.includes(parseInt(i.getAttribute("index")))&&("LI"===i.tagName?i.style.display="list-item":i.style.display="block")}))};$(document).ready((function(){$('a[data-toggle="tab"]').on("show.bs.tab",(function(e){swapPrincp(e.target.getAttribute("href"))}))}));var swapPrincp=function swapPrincp(initPage){var page=document.querySelector(initPage),type=page.id.charAt(0),re=new RegExp("[P][0-7].","g"),principles=page.innerHTML.match(re).map((function(i){return parseInt(i.replace(".","").replace("P",""))})),uniquePrinc=new Set(principles);iconSwap(_toConsumableArray(uniquePrinc),type)},iconSwap=function iconSwap(){var principles=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],type=arguments.length>1?arguments[1]:void 0;$('[data-toggle="tooltip"]').tooltip("dispose");var princSection=document.getElementById("rel-princp");princSection.classList.add("hide"),setTimeout((function(){princSection.innerHTML="",iconMatrix.filter((function(i){return principles.includes(i.Principle)&&i.Type==type})).map((function(i){return document.getElementById("rel-princp").innerHTML+=cardIcon(i.Icon,i.Type,i.Principle)})),princSection.classList.remove("hide"),$('[data-toggle="tooltip"]').tooltip()}),300)},cardIcon=function cardIcon(icon,type,index){return'<div class=\'card\' data-toggle="tooltip" data-placement="top" title="Principle '.concat(index,'">\n                <a href="/wbgslsg/principle_').concat(type,"_").concat(index,".html\"> \n                    <img class='card-img' src=\"/wbgslsg/assets/images/icons/").concat(icon,'">\n                    </a>\n                    </div>')},refreshFunction=function refreshFunction(){location.reload()},addReport=function addReport(){console.log(guidance)},updateTabs=function updateTabs(guidance){var enviroG=document.getElementById("envrioGuidance"),aniG=document.getElementById("aniGuidance");return new Promise((function(resolve){fetch("/wbgslsg/assets/data/guidance/e/guidance_index_"+guidance+".html").then((function(i){if(i.ok)return i.text();throw new Error("Guidance Not Found")})).then((function(i){return enviroG.innerHTML=i})).then((function(z){return fetch("/wbgslsg/assets/data/guidance/ah/guidance_index_"+guidance+".html").then((function(i){if(i.ok)return i.text();throw new Error("Guidance Not Found")})).then((function(i){return aniG.innerHTML=i}))})).then((function(o){return resolve("resolved")}))}))};