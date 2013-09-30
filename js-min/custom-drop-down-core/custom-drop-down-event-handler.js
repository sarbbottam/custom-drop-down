YUI.add("custom-drop-down-event-handler",function(a){var b;b=function(a){this.selectNode=a.referenceNodes.selectNode,this.optionNodes=a.referenceNodes.optionNodes,this.selectedOptionNode=a.referenceNodes.selectedOptionNode,this.correspondingNode=a.referenceNodes.correspondingNode,this.availableOptionsContainerNode=a.referenceNodes.availableOptionsContainerNode,this.selectedOptionAriaLabeledById=a.referenceNodes.selectedOptionAriaLabeledById,this.customDropDownMarkup=a.customDropDownMarkup,this.customDropDownStyleUpdater=a.customDropDownStyleUpdater,this.customDropDownIndex=a.customDropDownIndex,this.correspondingNodePlaceholder=this.correspondingNode?this.correspondingNode.get("parentNode").one(".placeholder"):null,this.selectedIndex=-1===this.selectNode.get("selectedIndex")?0:this.selectNode.get("selectedIndex"),this.menuHeight="",this.desiredOptionStartsWith="",this.currentKeyPressTime=0,this.previousKeyPressTime=0},a.mix(b.prototype,{selectedOptionNodeEventHandler:function(b,c){b.halt(),selectedIndex=c.selectNode.get("selectedIndex"),c.availableOptionsContainerNode.setStyle("display","block"),c.correspondingNode&&c.correspondingNode.addClass("highlight-border"),c.customDropDownStyleUpdater.highlightMenu(selectedIndex),a.fire("hide-available-options-container",null,c.availableOptionsContainerNode)},availableOptionsContainerNodeKeydownHandler:function(a,b){switch((38===a.keyCode||40===a.keyCode||9===a.keyCode||27===a.keyCode)&&a.halt(),menuSize=b.availableOptionsContainerNode.all("ul li").size(),a.keyCode){case 38:b.selectedIndex<=0&&(b.selectedIndex=menuSize),b.selectedIndex-=1,b.customDropDownStyleUpdater.highlightMenu(b.selectedIndex);break;case 40:b.selectedIndex>=menuSize-1&&(b.selectedIndex=-1),b.selectedIndex+=1,b.customDropDownStyleUpdater.highlightMenu(b.selectedIndex);break;case 9:b.correspondingNode?b.correspondingNode.focus():b.selectedOptionNode.one("a").focus(),b.availableOptionsContainerNode.setStyle("display","none");break;case 27:b.selectedOptionNode.one("a").focus(),b.availableOptionsContainerNode.setStyle("display","none")}},availableOptionsHotKeypressHandler:function(a,b){var c=0;a.halt(),b.currentKeyPressTime=(new Date).getTime(),b.previousKeyPressTime&&b.currentKeyPressTime-b.previousKeyPressTime>500&&(b.desiredOptionStartsWith=""),b.previousKeyPressTime=b.currentKeyPressTime,b.desiredOptionStartsWith=b.desiredOptionStartsWith+String.fromCharCode(a.keyCode),c=b.customDropDownIndex.getIndexOfDesiredOption(b.desiredOptionStartsWith),-1!==c&&(b.selectedIndex=c,b.customDropDownStyleUpdater.highlightMenu(b.selectedIndex))},selectOption:function(b,c){b.halt();var d=c.availableOptionsContainerNode.all("li").indexOf(b.target.get("parentNode"));c.selectNode.get("selectedIndex")!==d&&(c.selectedOptionNode.one("a").set("innerHTML",c.customDropDownMarkup.getSelectedOptionHTML(b.target)),c.correspondingNode&&c.customDropDownStyleUpdater.updateCorrespondingNodePadding(),c.selectNode.set("selectedIndex",d),a.fire("option-changed",null,c.selectNode),a.one("#"+c.selectedOptionAriaLabeledById).set("innerHTML",c.optionNodes.item(d).get("innerHTML"))),c.availableOptionsContainerNode.setStyle("display","none"),c.correspondingNode?c.correspondingNode.focus():c.selectedOptionNode.one("a").focus()},init:function(){var a,b=this;this.selectedOptionNode.on("click",this.selectedOptionNodeEventHandler,null,b),this.selectedOptionNode.on("keydown",function(a,b){(40===a.keyCode||38===a.keyCode)&&(a.halt(),b.selectedOptionNodeEventHandler(a,b))},null,b),this.availableOptionsContainerNode.on("keydown",this.availableOptionsContainerNodeKeydownHandler,null,b),this.selectedOptionNode.on("keypress",function(a){9!==a.keyCode&&(b.selectedOptionNodeEventHandler(a,b),b.availableOptionsHotKeypressHandler(a,b))}),this.availableOptionsContainerNode.on("keypress",this.availableOptionsHotKeypressHandler,null,b),this.availableOptionsContainerNode.on("mouseover",function(a,b){a.halt(),a.target.focus(),b.selectedIndex=b.availableOptionsContainerNode.all("li").indexOf(a.target.get("parentNode"))},null,b),this.availableOptionsContainerNode.all("li a").on("click",this.selectOption,null,b),this.availableOptionsContainerNode.all("li a").on("keydown",function(a,b){13===a.keyCode&&(a.halt(),b.selectOption(a,b))},null,b),b.correspondingNode?(a=b.correspondingNode,this.correspondingNode.on("blur",this.customDropDownStyleUpdater.unHighlightDesiredNodeBorder,null,a)):a=b.selectedOptionNode.one("a"),this.availableOptionsContainerNode.all("a").on("focus",this.customDropDownStyleUpdater.highlightDesiredNodeBorder,null,a),this.availableOptionsContainerNode.all("a").on("blur",this.customDropDownStyleUpdater.unHighlightDesiredNodeBorder,null,a),this.selectedOptionNode.one("a").on("focus",this.customDropDownStyleUpdater.highlightDesiredNodeBorder,null,a),this.selectedOptionNode.one("a").on("blur",this.customDropDownStyleUpdater.unHighlightDesiredNodeBorder,null,a)}},!0),a.namespace("CustomDropDownMenu"),a.CustomDropDownMenu.CustomDropDownEventHandler=b},{requires:["node"]});