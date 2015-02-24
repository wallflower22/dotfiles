Registry.require(["crcrc","helper","layout/default/layout_helper"],function(){var l=Registry.get("crcrc").cr,h=Registry.get("crcrc").crc,p=Registry.get("helper"),u=Registry.get("layout/default/layout_helper").images,s=function(b,a,c){var d=(a.uuid?a.uuid:"")+a.id,e=l("div",a.name,d,"input");e.key=a.id;var f=l("input",a.name,d,"input",!0);b=b.split("##");f.name=a.name;f.uuid=a.uuid;f.key=a.id;f.oldvalue=a.value;f.value=void 0!=a.value?a.value:"";f.type="text";c&&!f.inserted&&f.addEventListener("change",
c);c=h("span","optiondesc",a.name,d,"s1");d=l("span",a.name,d,"s2");c.textContent=b[0]+":";1<b.length&&(d.textContent=b[1]);e.appendChild(c);e.appendChild(f);e.appendChild(d);a.enabledBy&&e.setAttribute("name","enabled_by_"+a.enabledBy);return{elem:e,input:f}},v=function(b,a,c){b=null;b=h("input","button",a.name,(a.uuid?a.uuid:"")+a.id,"bu",!0);b.name=a.name;b.uuid=a.uuid;b.key=a.id;b.type="button";b.value=a.name;b.reload=a.reload;b.ignore=a.ignore||a.reload;b.warning=a.warning;a.enabledBy&&b.setAttribute("name",
"enabled_by_"+a.enabledBy);!b.inserted&&c&&b.addEventListener("click",c);return b},w=function(b,a,c,d){var e=null,e=h("input","button",b,a,"bu",!0);e.name=b;e.key=a;e.type="button";e.value=c;!e.inserted&&d&&e.addEventListener("click",d);return e},t=function(b,a){var c=(b.uuid?b.uuid:"")+b.id,d,e;if(e=b.after||b.validation)d=b.validation?"validation":"help",d=h("span",d,b.name,c,d,!0),e.imageURL&&(c=['background-image: url("'+e.imageURL+'")'],e.opacity&&c.push("opacity: "+e.opacity),d.setAttribute("style",
c.join(";"))),d&&(a&&d.addEventListener("click",a),e.msg&&d.setAttribute("title",e.msg));return d},x=function(b){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[b]||b},q=function(b,a,c,d){var e=(d.uuid?d.uuid:"")+d.id;a.title=b;(b=t({after:{imageURL:u.get("help")},name:d.name,id:e}))&&c.appendChild(b)};Registry.register("layout/default/htmlutil","202",{getInfoFromUrl:function(b){if(-1!=b.search(/\/\^?(http(s|s\?|\.\+)?|\.\*):\/\/(\.\*)*\$?\/?$/)||-1!=b.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)||
-1!=b.search(/\*:\/\/(\*\/\*|\*)*$/)||"*"==b)return{dom:"*",tld:"*"};0==b.search(/\//)&&(b=b.replace(/\([^\)]*\)[\?|\+|\*|\{[^\}]*]*/g,""),b=b.replace(/\[[^\]]*\][\?|\+|\*|\{[^\}]*]*/g,""),b=b.replace(/^\/|\/$|\^|\$|\\\?.*|#.*|\?|\(|\)|\+|\\|\.\*|/g,""));b=b.replace(/^\*:\/\//,"http://");0!=b.search("http")&&(b="http://"+b);b=b.split("/");if(3>b.length)return null;b=b[2].split(".");if(2>b.length)return null;var a=b[b.length-1],c=b[b.length-2];"*"!==c&&(c=c.replace(/\*/g,""));for(var d=[],e=b.length-
3;0<=e&&-1==b[e].search("\\*");e--)d.push(b[e]);return{tld:a,dom:c,subdom:d.reverse()}},safeTagsReplace:function(b){return b.replace(/[&<>]/g,x)},addClass:function(b,a){var c=b.getAttribute("class")||"";-1==c.search(RegExp("[ \t]*"+a+"[ \t]*"))&&(c=(c?c+" ":"")+a);b.setAttribute("class",c)},toggleClass:function(b,a){var c=b.getAttribute("class")||"",d=RegExp("[ \t]*"+a+"[ \t]*"),c=-1!=c.search(d)?c.replace(d,""):(c?c+" ":"")+a;b.setAttribute("class",c)},setHelp:q,createAfterIcon:t,createEnabler:function(b,
a,c,d,e,f,k){b=h("div","clickable enabler "+b,a,c,d,"wrap",!0);e&&(b.title=e);b.key=c;b.uuid=a;b.alt=" ?";b.textContent=k;f&&b.addEventListener("click",f);return b},createImage:function(b,a,c,d,e,f){d=h("img","icon16",a,c,d,!0);d.setAttribute("src",b);f&&(b=d.getAttribute("class")||"",d.setAttribute("class",b+" clickable"));e&&(d.title=e);d.key=c;d.name=a;d.alt=" ?";f&&(d.addEventListener("click",f),d.href="#");return d},createFavicon:function(b,a,c,d){var e=h("img","icon16",a,c,p.filter(d,/[a-zA-Z0-9]/g));
if(e.inserted)return e;"Array"!==p.toType(b)&&(b=[b]);a=function(){if(0!=b.length){var a=b.shift();e.setAttribute("src",a)}};e.addEventListener("error",a);a();d&&(e.title=d);e.alt=" ?";return e},createFileInput:function(b,a,c){b=h("input","import","file",null,null,!0);b.inserted||(b.type="file",c&&b.addEventListener("change",c));return b},createTextarea:function(b,a,c){var d=(a.uuid?a.uuid:"")+a.id,e=l("div",a.name,d,"textarea");e.key=a.id;var f=h("textarea","settingsta",a.name,d,"textarea",!0);f.name=
a.name;f.key=a.id;f.uuid=a.uuid;f.array=a.array;f.oldvalue=a.value;f.value=void 0!=a.value?a.array?a.value.join("\n"):a.value:"";c&&!f.inserted&&f.addEventListener("change",c);c=l("span",a.name,d,"s1");b&&(c.textContent=b+":");a.desc&&q(a.desc,c,c,a);e.appendChild(c);e.appendChild(f);return{elem:e,textarea:f,label:c}},createFileSelect:function(b,a,c){var d=(a.uuid?a.uuid:"")+a.id,e=l("input",a.name,d,"file"),f=function(a){c(a.target.files)};e.inserted||(e.type="file",e.addEventListener("change",f,
!1));return b?(f=l("div",a.name,d,"input"),a=l("span",a.name,d,"s1"),a.textContent=b+":",f.appendChild(a),f.appendChild(e),{elem:f,input:e}):{elem:e}},createInput:s,createPassword:function(b,a,c){b=s(b,a,c);b.input.setAttribute("type","password");return b},createCheckbox:function(b,a,c){var d=(a.uuid?a.uuid:"")+a.id,e=h("div","checkbox",a.name,d,"cb1");e.key=a.id;var f=l("input",a.name,d,"cb",!0);f.title=a.desc?a.desc:"";f.name=a.name;f.uuid=a.uuid;f.key=a.id;f.reload=a.reload;f.warning=a.warning;
f.oldvalue=a.enabled;f.checked=a.enabled;f.type="checkbox";f.valtype="boolean";c&&!f.inserted&&f.addEventListener("click",c);c=h("span","checkbox_desc",a.name,d,"cb2");c.textContent=b;a.desc&&q(a.desc,e,c,a);e.appendChild(f);e.appendChild(c);return{elem:e,input:f}},createDropDown:function(b,a,c,d,e){var f=(a.uuid?a.uuid:"")+a.id,k=l("div",a.name,f,"outer_dd");k.key=a.id;var g=l("select",a.name,f,"dd",!0),r=!1,m;for(m in c){var n=l("option",a.name,c[m].name,"dd"+f,!0);n.textContent=p.decodeHtml(c[m].name);
n.value=c[m].value;n.warning=c[m].warning;r|=!!c[m].warning;c[m].enabledBy&&n.setAttribute("name","enabled_by_"+c[m].enabledBy);a.enabler&&c[m].enable&&n.setAttribute("enables",JSON.stringify(c[m].enable));c[m].value==a.value&&(n.selected=!0);g.appendChild(n)}g.key=a.id;g.name=a.name;g.uuid=a.uuid;g.reload=a.reload;g.warning=a.warning;g.oldvalue=a.value;g.valtype="native";g.inserted||(d&&g.addEventListener("change",d),r&&e&&g.addEventListener("change",e));c=h("span","optiondesc",a.name,f,"inner_dd");
c.textContent=b+": ";k.appendChild(c);k.appendChild(g);a.desc&&q(a.desc,k,k,a);a.enabledBy&&k.setAttribute("name","enabled_by_"+a.enabledBy);return{elem:k,select:g}},createImageButton:function(b,a,c,d,e){var f=null,k=null,g=null,f=h("input","imgbutton button",b,a,"bu",!0),k=h("div","imgbutton_container",b,a,"bu_container");k.appendChild(f);f.uuid=b;f.key=a;f.type="button";g=h("img","imgbutton_image",b,a,"bu_img",!0);g.src=d;k.appendChild(g);f.setAttribute("title",c);g.setAttribute("title",c);!f.inserted&&
e&&(f.addEventListener("click",e),g.addEventListener("click",e));return k},createButton:function(b,a,c,d){return"Object"===p.toType(a)?v.apply(this,arguments):w.apply(this,arguments)},createPosition:function(b,a,c){for(var d=(a.uuid?a.uuid:"")+a.id,e=l("div",a.name,d,"pos1"),f=l("select",a.name,d,"pos",!0),k=1;k<=a.posof;k++){var g=l("option",a.name,d,"opt"+k);g.textContent=k;k==a.pos&&(g.selected=!0);f.appendChild(g)}f.key=a.id;f.uuid=a.uuid;f.name=a.name;c&&!f.inserted&&f.addEventListener("change",
c);a=h("span","optiondesc",a.name,d,"pos2");a.textContent=b;e.appendChild(a);e.appendChild(f);return e},createSearchBox:function(b){var a=h("div","searchbox","search_inner"),c=h("div","searchbox_mv","search_inner_mv"),d=h("input","searchbox_input","search_input"),e=h("input","searchbox_button","search_button");d.type="text";d.value=b;e.type="button";e.value="Go";var f=function(){window.location=window.location.origin+window.location.pathname+"?url="+encodeURIComponent(d.value)};e.addEventListener("click",
f);d.addEventListener("keyup",function(a){a&&13==a.keyCode&&f()});c.appendChild(d);c.appendChild(e);a.appendChild(c);return a}})});
