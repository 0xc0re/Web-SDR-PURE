define([
    "dojo/_base/declare",
    "dijit/MenuBar",
    "dijit/MenuBarItem",
    "dijit/PopupMenuBarItem",
    "dijit/MenuItem",
    "dijit/DropDownMenu",
    "dijit/Menu",
    "dijit/CheckedMenuItem",
    "dijit/RadioMenuItem",
], function(declare, MenuBar, MenuBarItem, PopupMenuBarItem, MenuItem, DropDownMenu, Menu, CheckedMenuItem, RadioMenuItem){
    return declare(null, {

        constructor: function(){
        },

        buildMenubar: function(containerId){
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
            pMenuBar.placeAt(containerId);
            pMenuBar.startup();
        },

    });
});