YUI.add("input-data-formatter",function(a){var b;b=function(){return"object"==typeof b.instance?b.instance:(b.instance=this,void 0)},a.mix(b.prototype,{getSepatarorPattern:function(a){for(var b="(",c=0,d=a.length;d>c;c+=1)c>0&&(b+="|"),b=b+"\\"+a[c];return b+=")"},keypressHandler:function(b,c,d,e){var f=this.get("selectionStart"),g=this.get("value"),h=g.length,i=g.replace(e,""),j=i.split(""),k=!0;if(k=-1===a.Array.indexOf([8,37,38,39,40],b.keyCode)?!0:!1){for(var l=0,m=c.length;m>l;l+=1)c[l]<=h&&(j.length>=c[l]&&j.splice(c[l],0,d[l]),f>=h&&f++,f===c[l]&&8!==b.keyCode&&f++);this.set("value",j.join("")),b.type&&(this.set("selectionStart",f),this.set("selectionEnd",f))}},formatter:function(a){var b=a.get("value"),c=a.getAttribute("data-format"),d=c.length,e=c.match(/[^X]/g),f=[],g=-1;if(a.detach("keypress",this.keypressHandler),d){a.setAttribute("maxlength",d);for(var h=0,i=e.length;i>h;h+=1)g=c.indexOf(e[h],g+1),f.push(g);a.on("keypress",this.keypressHandler,null,f,e,new RegExp(this.getSepatarorPattern(e),"g"))}""!==b&&(a.set("value",b.replace(/[^\d]/g,"")),this.keypressHandler.call(a,{},f,e,new RegExp(this.getSepatarorPattern(e),"g")))},updateFormat:function(b){var c,d,e;c=a.one("#"+b.getAttribute("corresponding-field-id")),c&&(d=-1===b.get("selectedIndex")?0:b.get("selectedIndex"),e=b.all("option").item(d).getAttribute("corresponding-field-data-format"),e?c.setAttribute("data-format",e):c.setAttribute("data-format",""),this.formatter(c))}},!0),a.namespace("InputDataModifier"),a.InputDataModifier.InputDataFormatter=b},{requires:["node"]});