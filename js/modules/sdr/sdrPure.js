define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dijit/MenuBar",
    "dijit/MenuBarItem",
    "dijit/PopupMenuBarItem",
    "dijit/MenuItem",
    "dijit/DropDownMenu",
    "dijit/Menu",
    "dijit/CheckedMenuItem",
    "dijit/RadioMenuItem",
    "modules/sdr/jsCascade",
    "dojox/mobile/Audio",
    "dojox/mobile/parser",
    "dojox/mobile",
], function(declare, dom, domConstruct, MenuBar, MenuBarItem, PopupMenuBarItem, MenuItem, DropDownMenu, Menu, CheckedMenuItem, RadioMenuItem, jsCascade, Audio){
    return declare(null, {
        containerNode: null,
        cascade: null,


        /**
         *
         * @param params
         *      .containerId --> ID of the HTML-Container
         */
        constructor: function(params){
            this.containerNode = dom.byId(params.containerId);
            this.cascade = new jsCascade(params);
        },

        buildRadioContent: function(){
            //Setup Frame
            this.buildAudioPlayer();
            this.buildMenubar();
            this.cascade.drawCanvas(200);
        },

        buildMenubar: function(){
            var pMenuBar = new MenuBar({});
            var pSubMenu = new DropDownMenu({});

            pSubMenu.addChild(new RadioMenuItem({
                label: "FM",
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "AM",
                group: "mode"
            }));
            pMenuBar.addChild(new PopupMenuBarItem({
                label: "Mode",
                popup: pSubMenu
            }));

            var pSubMenu2 = new DropDownMenu({});
            pSubMenu2.addChild(new RadioMenuItem({
                label: "LSB",
                group: "filter"
            }));
            pSubMenu2.addChild(new RadioMenuItem({
                label: "USB",
                group: "filter"
            }));

            pMenuBar.addChild(new PopupMenuBarItem({
                label: "Filter",
                popup: pSubMenu2
            }));
            pMenuBar.placeAt(this.containerNode.id);
            pMenuBar.startup();
        },

        buildAudioPlayer: function(){
            var widget = new Audio({
                source: []
            });

            console.log("widget", widget);

            this.containerNode.appendChild(widget.domNode);
            widget.startup();
        },

        //TEST
        processSpectData: function(data){
            this.cascade.processSpectrumData(data);
        }

    });
});