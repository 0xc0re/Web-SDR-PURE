define([
    "dojo/_base/declare",
    "dijit/MenuBar",
    "dijit/MenuBarItem",
    "dijit/PopupMenuBarItem",
    "dijit/DropDownMenu",
    "dijit/ToolbarSeparator",
    "dijit/RadioMenuItem",
    "dijit/TooltipDialog",
    "dijit/form/HorizontalSlider",
    "dojo/dom-construct",
], function(declare, MenuBar, MenuBarItem, PopupMenuBarItem, DropDownMenu, MenuSeparator, RadioMenuItem, TooltipDialog, HorizontalSlider, domConstruct){
    return declare(null, {
        cmdMap: null,
        slider: null,
        midFrequency: null,

        constructor: function(cmdMap, midFreq){
            this.cmdMap = cmdMap;
            this.midFrequency = midFreq;
        },

        buildMenubar: function(containerId){
            var pMenuBar = new MenuBar({id: "pureSettings"});
            this.buildModeDropDown(pMenuBar);
            pMenuBar.addChild(new MenuSeparator());
            this.buildBaseBandDropDown(pMenuBar);

            pMenuBar.addChild(new MenuSeparator());
            this.buildAudioDialog(pMenuBar);

            pMenuBar.placeAt(containerId);
            pMenuBar.startup();
        },

        buildPanel: function(container){
            this.buildFreqPane(container);
        },

        buildFreqPane: function(mainContainer){
            var container = domConstruct.create("div", {}, mainContainer);

            domConstruct.create("label", {innerHTML: "Mid Frequency&nbsp;:&nbsp;", style:"float:left;"}, container);
            domConstruct.create("div", {innerHTML: this.midFrequency, style:"float:left;"}, container);

            domConstruct.create("br", {}, container);

            domConstruct.create("label", {innerHTML: "Own Frequency:&nbsp;", style:"float:left;"}, container);
            domConstruct.create("input", {type: "number", value: this.midFrequency, id: "freqInput", style:"float:left;"}, container);
        },

        buildModeDropDown: function(parentNode){
            var pSubMenu = new DropDownMenu({id:"modeDrDwn"});
            var modes = Object.keys(this.cmdMap.MODE_MAP);
            for(var i=0; i < modes.length; i++){
                pSubMenu.addChild(new RadioMenuItem({
                    label: modes[i],
                    group: "mode"
                }));
            }
            parentNode.addChild(new PopupMenuBarItem({
                label: "Mode",
                popup: pSubMenu
            }));
        },

        buildBaseBandDropDown: function(parentNode){
            var pSubMenu = new DropDownMenu({id: "bandDrDwn"});
            var bands = Object.keys(this.cmdMap.BAND_SCOPE);
            for(var i=0; i < bands.length; i++){
                pSubMenu.addChild(new RadioMenuItem({
                    label: bands[i],
                    group: "baseband"
                }));
            }
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
                label: "Frequency",
                popup: myDialog
            }));
        },

        buildAudioDialog: function(parentNode){
            var content = domConstruct.create("div");
            var label = domConstruct.create("label", {innerHTML:"Volume"}, content);
            var params = {
                id: "volumeSlider",
                value: 100,
                showButtons: true,
                minimum: 0,
                maximum: 100,
                style: "width:300px;",
            };
            this.slider = new HorizontalSlider(params);
            content.appendChild(this.slider.domNode);
            var myDialog = new TooltipDialog({
                content: content,
            });
            parentNode.addChild(new PopupMenuBarItem({
                label: "Audio",
                popup: myDialog
            }));
        }
    });
});