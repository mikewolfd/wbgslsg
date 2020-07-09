"use strict";function _createForOfIteratorHelper(o,allowArrayLike){var it;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function F(){};return{s:F,n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function s(){it=o[Symbol.iterator]()},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var switchNavMenuItem=function switchNavMenuItem(){if(""!==location.pathname.split("/").pop()){var _step,_iterator=_createForOfIteratorHelper(document.querySelectorAll(".sidenavr ul li a"));try{for(_iterator.s();!(_step=_iterator.n()).done;){var menuItem=_step.value;location.pathname.includes(menuItem.getAttribute("href").split("/").pop())&&(menuItem.className="active")}}catch(err){_iterator.e(err)}finally{_iterator.f()}}};$(document).ready((function(){switchNavMenuItem()}));var updateTabs=function updateTabs(guidance){var enviroG=document.getElementById("envrioGuidance"),aniG=document.getElementById("aniGuidance");return new Promise((function(resolve){fetch("/assets/data/guidance/e/guidance_index_"+guidance+".html").then((function(i){if(i.ok)return i.text();throw new Error("Guidance Not Found")})).then((function(i){return enviroG.innerHTML=i})).then((function(z){return fetch("/assets/data/guidance/ah/guidance_index_"+guidance+".html").then((function(i){if(i.ok)return i.text();throw new Error("Guidance Not Found")})).then((function(i){return aniG.innerHTML=i}))})).then((function(o){return resolve("resolved")}))}))};