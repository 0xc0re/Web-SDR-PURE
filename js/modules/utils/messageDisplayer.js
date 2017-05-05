/*
If you want to use this method, make sure this HTML-Struct is available.
<div id="showMsg">
</div>
*/

define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/domReady!js/modules/utils/MessageDisplayer",
], function (declare, dom, domConstruct, domClass) {
    return declare(null, {
        /**
         * Builds a message area into a skeleteon based layout
         * @param size - Range From one to sixteen - written words (sixteen, five, etc)
         */
        buildMessageArea : function(size){
            var msgArea = dom.byId("showMsg");
            msgArea.className = "container";
            msgArea.style.display = "none";
            domConstruct.create("div", { id: "msgArea", className: size+" columns" }, msgArea);
        },

        showMsg : function(msg, isError){
            if(isError){
                domClass.add("showMsg", "showError");
            } else {
                domClass.remove("showMsg", "showError");
            }
            var msgContainer = dom.byId("showMsg");
            msgContainer.style.display = "";
            msgContainer.childNodes[1].innerHTML = "<label>"+msg+"</label>";
        },
    });
});

