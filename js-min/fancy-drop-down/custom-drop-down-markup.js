YUI.add("custom-drop-down-markup",function(a){var b;b=function(b){this.selectNode=b,this.selectedOptionHTML=[],this.availableOptionsHTML=[],this.selectedOptionId="selected-option-for-"+b.getAttribute("mobile-field-id"),this.availableOptionsContainerId="available-options-container-for-"+b.getAttribute("mobile-field-id"),this.selectedOptionAriaLabeledById="option-for-"+b.getAttribute("mobile-field-id"),this.optionNodes=b.all("option"),this.selectedIndex=b.get("selectedIndex"),this.correspondingNode=a.one("#"+b.getAttribute("mobile-field-id")),this.correspondingNodeWidth="",this.selectedOptionNode="",this.availableOptionsContainerNode=""},a.mix(b.prototype,{createAndInjectSelectedCountryCodeHTML:function(){var b=this.selectedOptionHTML,c=this.optionNodes,d=this.selectedIndex;return b.push('<div id="'+this.selectedOptionId+'" class="column selected-country-code">'),b.push('<a href="#'+this.availableOptionsContainerId+'" role="menuitem" aria-haspopup="true" aria-labelledby="'+this.selectedOptionAriaLabeledById+'" tabindex="0">'),b.push('<span class="flag-'),b.push(c.item(d).getAttribute("data-country-code")),b.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;'),b.push('<span id="'+this.selectedOptionAriaLabeledById+'" class="clipped">'+c.item(d).get("innerHTML")+"</span>"),b.push(c.item(d).get("value")),b.push("</a>"),b.push("</div>"),b=b.join(""),this.correspondingNode.get("parentNode").insertBefore(b,this.correspondingNode.get("parentNode").one("label")),this.selectedOptionNode=a.one("#"+this.selectedOptionId),this.correspondingNodeWidth=9===a.UA.ie?this.correspondingNode.get("offsetWidth")+17+"px":this.correspondingNode.get("offsetWidth")+"px",this.createAndInjectCountryCodesHTML()},createAndInjectCountryCodesHTML:function(){var b=this.availableOptionsHTML;return b.push('<div class="country-codes-container" id="'+this.availableOptionsContainerId+'" style="width:'+this.correspondingNodeWidth+'">'),b.push("<ul>"),this.optionNodes.each(function(a){b.push("<li>"),b.push('<a href="#" role="menuitem" data-code="'+a.get("value")+'">'),b.push('<span class="flag-'),b.push(a.getAttribute("data-country-code")),b.push('"></span>&nbsp;&nbsp;'),b.push(a.get("innerHTML")),b.push("</a>"),b.push("</li>")}),b.push("</ul>"),b.push("</div>"),b=b.join(""),this.selectedOptionNode.append(b),this.selectNode.hide(),this.availableOptionsContainerNode=a.one("#"+this.availableOptionsContainerId),{selectNode:this.selectNode,optionNodes:this.optionNodes,selectedOptionNode:this.selectedOptionNode,correspondingNode:this.correspondingNode,availableOptionsContainerNode:this.availableOptionsContainerNode,selectedOptionAriaLabeledById:this.selectedOptionAriaLabeledById}}},!0),a.namespace("CustomDropDownMenu"),a.CustomDropDownMenu.CustomDropDownMarkup=b});