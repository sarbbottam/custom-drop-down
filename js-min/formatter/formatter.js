YUI.add("formatter",function(a){var b,c,d;b=function(a,b,c){if(a.keyCode>47&&a.keyCode<58){for(var d=this.get("value"),e=d.length,f=d.split(""),g=0,h=b.length;h>g;g+=1)b[g]<=e&&d.charAt(b[g])!==c[g]&&(f.splice(b[g],0,c[g])," "===c[g+1]&&(f.splice(b[g+1],0,c[g+1]),g+=1));this.set("value",f.join(""))}},c=function(a){var c=a.get("value"),d=a.getAttribute("data-format"),e=d.length,f=d.match(/[^X]/g),g=[],h=-1;if(a.detach("keyup",b),e){a.setAttribute("maxlength",e);for(var i=0,j=f.length;j>i;i+=1)h=d.indexOf(f[i],h+1),g.push(h);a.on("keyup",b,null,g,f)}""!==c&&(a.set("value",c.replace(/[^\d]/g,"")),b.call(a,{keyCode:48},g,f))},a.all("[data-format]").each(function(a){c(a)}),d=function(b){var d,e,f;d=a.one("#"+b.getAttribute("corresponding-field-id")),e=-1===b.get("selectedIndex")?0:b.get("selectedIndex"),f=b.all("option").item(e).getAttribute("corresponding-field-data-format"),f?d.setAttribute("data-format",f):d.setAttribute("data-format",""),c(d)},a.all("[data=country-code-drop-down]").each(function(a){d(a)}),a.on("country-code-change",function(a,b){d(b)})});