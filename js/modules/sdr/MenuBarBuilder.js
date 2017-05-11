define([
    "dojo/_base/declare",
    "dijit/MenuBar",
    "dijit/MenuBarItem",
    "dijit/PopupMenuBarItem",
    "dijit/DropDownMenu",
    "dijit/ToolbarSeparator",
    "dijit/RadioMenuItem",
    "dijit/TooltipDialog",
    "dojo/dom-construct",
], function(declare, MenuBar, MenuBarItem, PopupMenuBarItem, DropDownMenu, MenuSeparator, RadioMenuItem, TooltipDialog, domConstruct){
    return declare(null, {

        constructor: function(){
        },

        buildMenubar: function(containerId){
            var pMenuBar = new MenuBar({});
            this.buildModeDropDown(pMenuBar);
            pMenuBar.addChild(new MenuSeparator());
            this.buildBaseBandDropDown(pMenuBar);
            pMenuBar.addChild(new MenuSeparator());
            this.buildFreqDialog(pMenuBar);

            pMenuBar.placeAt(containerId);
            pMenuBar.startup();
        },

        buildModeDropDown: function(parentNode){
            var pSubMenu = new DropDownMenu({});
            pSubMenu.addChild(new RadioMenuItem({
                label: "LSB",
                value: 0,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "USB",
                value: 1,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "DSB",
                value: 2,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "CWL",
                value: 3,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "CWH",
                value: 4,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "FM",
                value: 5,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "AM",
                value: 6,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "DIGU",
                value: 7,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "SPEC",
                value: 8,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "DIGL",
                value: 9,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "SAM",
                value: 10,
                group: "mode"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "DRM",
                value: 11,
                group: "mode"
            }));
            parentNode.addChild(new PopupMenuBarItem({
                label: "Mode",
                popup: pSubMenu
            }));
        },

        buildBaseBandDropDown: function(parentNode){
            var pSubMenu = new DropDownMenu({});
            pSubMenu.addChild(new RadioMenuItem({
                label: "10m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "12m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "15m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "17m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "20m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "30m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "40m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "60m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "80m",
                group: "baseband"
            }));
            pSubMenu.addChild(new RadioMenuItem({
                label: "160m",
                group: "baseband"
            }));

            parentNode.addChild(new PopupMenuBarItem({
                label: "Band",
                popup: pSubMenu
            }));
        },

        buildFreqDialog: function(parentNode){
            var content = domConstruct.create("table");

            var row = domConstruct.create("tr");
            row.appendChild(this.buildMidFreqLabel());
            row.appendChild(this.buildMidFreqVal());
            content.appendChild(row);

            var row = domConstruct.create("tr");
            row.appendChild(this.buildFreqLabel());
            row.appendChild(this.buildFreqVal());
            content.appendChild(row);

            var row = domConstruct.create("tr");
            row.appendChild(this.buildFreqButton());
            content.appendChild(row);

            var myDialog = new TooltipDialog({
                content: content,
            });

            parentNode.addChild(new PopupMenuBarItem({
                label: "Frequency   ",
                popup: myDialog
            }));
        },

        buildMidFreqLabel: function(){
            var data = domConstruct.create("td");
            var label = domConstruct.create("label", {innerHTML: "Mid Frequency:"});
            data.appendChild(label);
            return data;
        },

        buildMidFreqVal: function(){
            var data = domConstruct.create("td");
            var input = domConstruct.create("div", {innerHTML: "100"});
            data.appendChild(input);
            return data;
        },

        buildFreqLabel: function(){
            var data = domConstruct.create("td");
            var label = domConstruct.create("label", {innerHTML: "Own Frequency:"});
            data.appendChild(label);
            return data;
        },

        buildFreqVal: function(){
            var data = domConstruct.create("td");
            var input = domConstruct.create("input", {value: "100"});
            data.appendChild(input);
            return data;
        },

        buildFreqButton: function(){
            var data = domConstruct.create("td");
            var button = domConstruct.create("button", {innerHTML: "Set Frequency", id: "freqButton"});
            data.appendChild(button);
            return data;
        }
    });
});