YUI.add("country-code-drop-down-markup",function(a){var b;b=function(a){this.selectNode=a.target,this.selectedOptionId="selected-option-for-"+this.selectNode.get("id"),this.availableOptionsContainerId="available-options-container-for-"+this.selectNode.get("id"),this.selectedOptionAriaLabeledById="option-for-"+this.selectNode.get("id"),this.optionNodes=this.selectNode.all("option"),this.selectedIndex=this.selectNode.get("selectedIndex"),this.correspondingNode=a.correspondingNode,this.ie9WidthOffset=a.ie9WidthOffset,this.correspondingNodeWidth="",this.selectedOptionNode="",this.availableOptionsContainerNode="",this.selectedOptionHTML=[],this.availableOptionsHTML=[]},a.mix(b.prototype,{createAndInjectSelectedOptionHTML:function(){var b=this.selectedOptionHTML,c=this.optionNodes,d=this.selectedIndex;return b.push('<div id="'+this.selectedOptionId+'" class="column selected-country-code">'),b.push('<a href="#'+this.availableOptionsContainerId+'" role="menuitem" aria-haspopup="true" aria-labelledby="'+this.selectedOptionAriaLabeledById+'" tabindex="0">'),b.push('<span class="flag-'),b.push(c.item(d).getAttribute("country-tld")),b.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;'),b.push('<span id="'+this.selectedOptionAriaLabeledById+'" class="clipped">'+c.item(d).get("innerHTML")+"</span>"),b.push(c.item(d).get("value")),b.push("</a>"),b.push("</div>"),b=b.join(""),this.correspondingNode.get("parentNode").insertBefore(b,this.correspondingNode.get("parentNode").one("label")),this.selectedOptionNode=a.one("#"+this.selectedOptionId),this.correspondingNodeWidth=this.correspondingNode.get("offsetWidth"),this.correspondingNodeWidth=9===a.UA.ie?this.correspondingNodeWidth+this.ie9WidthOffset+"px":this.correspondingNodeWidth+"px",this.createAndInjectAvailableOptionsHTML()},createAndInjectAvailableOptionsHTML:function(){var b=this.availableOptionsHTML;return b.push('<div class="country-codes-container available-options-container" id="'+this.availableOptionsContainerId+'" style="width:'+this.correspondingNodeWidth+'">'),b.push("<ul>"),this.optionNodes.each(function(a){b.push("<li>"),b.push('<a href="#" role="menuitem" data-code="'+a.get("value")+'">'),b.push('<span class="flag-'),b.push(a.getAttribute("country-tld")),b.push('"></span>&nbsp;&nbsp;'),b.push(a.get("innerHTML")),b.push("</a>"),b.push("</li>")}),b.push("</ul>"),b.push("</div>"),b=b.join(""),this.selectedOptionNode.append(b),this.selectNode.hide(),this.availableOptionsContainerNode=a.one("#"+this.availableOptionsContainerId),{selectNode:this.selectNode,optionNodes:this.optionNodes,selectedOptionNode:this.selectedOptionNode,correspondingNode:this.correspondingNode,availableOptionsContainerNode:this.availableOptionsContainerNode,selectedOptionAriaLabeledById:this.selectedOptionAriaLabeledById}},getSelectedOptionHTML:function(a){var b=a.getAttribute("data-code"),c=[];return c.push('<span class="'),c.push(a.one("span").get("className")),c.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;'),c.push('<span id="'+this.selectedOptionAriaLabeledById+'" class="clipped"></span>'),c.push(b),c.join("")}},!0),a.namespace("CustomDropDownMenu"),a.CustomDropDownMenu.CountryCodeDropDownMarkup=b});