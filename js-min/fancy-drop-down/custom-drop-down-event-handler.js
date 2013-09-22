YUI.add("custom-drop-down-event-handler",function(a){var b;b=function(a,b,c){this.selectNode=a.selectNode,this.optionNodes=a.optionNodes,this.selectedOptionNode=a.selectedOptionNode,this.correspondingNode=a.correspondingNode,this.correspondingNodePlaceholder=this.correspondingNode.get("parentNode").one(".placeholder"),this.availableOptionsContainerNode=a.availableOptionsContainerNode,this.selectedOptionAriaLabeledById=a.selectedOptionAriaLabeledById,this.menuHeight="",this.selectedIndex=0,this.customDropDownUpdateStyle=b,this.customDropDownIndex=c,this.desiredOptionStartsWith="",this.currentKeyPressTime=0,this.previousKeyPressTime=0},a.mix(b.prototype,{selectedOptionNodeEventHandler:function(b,c){b.halt(),selectedIndex=c.selectNode.get("selectedIndex"),c.availableOptionsContainerNode.setStyle("display","block"),c.correspondingNode&&c.correspondingNode.addClass("highlight-border"),c.customDropDownUpdateStyle.highlightMenu(selectedIndex),a.fire("hide-available-options-container",null,c.availableOptionsContainerNode)},availableOptionsContainerNodeKeydownHandler:function(a,b){switch((38===a.keyCode||40===a.keyCode||9===a.keyCode||27===a.keyCode)&&a.halt(),menuSize=b.availableOptionsContainerNode.all("ul li").size(),a.keyCode){case 38:0===b.selectedIndex&&(b.selectedIndex=menuSize),b.selectedIndex-=1,b.customDropDownUpdateStyle.highlightMenu(b.selectedIndex);break;case 40:b.selectedIndex===menuSize-1&&(b.selectedIndex=-1),b.selectedIndex+=1,b.customDropDownUpdateStyle.highlightMenu(b.selectedIndex);break;case 9:b.correspondingNode.focus(),b.availableOptionsContainerNode.setStyle("display","none");break;case 27:b.selectedOptionNode.one("a").focus(),b.availableOptionsContainerNode.setStyle("display","none")}},availableOptionsHotKeypressHandler:function(a,b){b.currentKeyPressTime=(new Date).getTime(),b.previousKeyPressTime&&b.currentKeyPressTime-b.previousKeyPressTime>500&&(b.desiredOptionStartsWith=""),b.previousKeyPressTime=b.currentKeyPressTime,b.desiredOptionStartsWith=b.desiredOptionStartsWith+String.fromCharCode(a.keyCode),b.selectedIndex=b.customDropDownIndex.getIndexOfDesiredOption(b.desiredOptionStartsWith),-1!==b.selectedIndex&&b.customDropDownUpdateStyle.highlightMenu(b.selectedIndex)},selectOption:function(b,c){b.halt();var d,e=b.target.getAttribute("data-code"),f=[];f.push('<span class="'),f.push(b.target.one("span").get("className")),f.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;'),f.push('<span id="'+c.selectedOptionAriaLabeledById+'" class="clipped"></span>'),f.push(e),c.selectedOptionNode.one("a").set("innerHTML",f.join("")),c.correspondingNode&&c.customDropDownUpdateStyle.updateCorrespondingNodePadding(),c.availableOptionsContainerNode.setStyle("display","none"),d=c.availableOptionsContainerNode.all("li").indexOf(b.target.get("parentNode")),c.selectNode.set("selectedIndex",d),a.fire("country-code-change",null,c.selectNode),a.one("#"+c.selectedOptionAriaLabeledById).set("innerHTML",c.optionNodes.item(d).get("innerHTML")),c.correspondingNode&&c.correspondingNode.focus()},highlightCorrespondingNode:function(a,b){b.correspondingNode.addClass("highlight-border")},unHighlightCorrespondingNode:function(a,b){b.correspondingNode.removeClass("highlight-border")},init:function(){var a=this;this.selectedOptionNode.on("click",this.selectedOptionNodeEventHandler,null,a),this.selectedOptionNode.on("keydown",function(a,b){(40===a.keyCode||38===a.keyCode)&&(a.halt(),b.selectedOptionNodeEventHandler(a,b))},null,a),this.availableOptionsContainerNode.on("keydown",this.availableOptionsContainerNodeKeydownHandler,null,a),this.availableOptionsContainerNode.on("keypress",this.availableOptionsHotKeypressHandler,null,a),this.availableOptionsContainerNode.on("mouseover",function(a,b){a.halt(),a.target.focus(),b.selectedIndex=b.availableOptionsContainerNode.all("li").indexOf(a.target.get("parentNode"))},null,a),this.availableOptionsContainerNode.all("li").on("click",this.selectOption,null,a),a.correspondingNode&&(this.availableOptionsContainerNode.all("a").on("focus",this.highlightCorrespondingNode,null,a),this.availableOptionsContainerNode.all("a").on("blur",this.unHighlightCorrespondingNode,null,a),this.selectedOptionNode.one("a").on("focus",this.highlightCorrespondingNode,null,a),this.selectedOptionNode.one("a").on("blur",this.unHighlightCorrespondingNode,null,a),this.correspondingNode.on("blur",this.unHighlightCorrespondingNode,null,a))}},!0),a.namespace("CustomDropDownMenu"),a.CustomDropDownMenu.CustomDropDownEventHandler=b});