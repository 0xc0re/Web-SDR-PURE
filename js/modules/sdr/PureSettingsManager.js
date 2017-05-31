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
    "dijit/form/Button",
], function(declare, MenuBar, MenuBarItem, PopupMenuBarItem, DropDownMenu, MenuSeparator, RadioMenuItem, TooltipDialog, HorizontalSlider, domConstruct, Button){
    return declare(null, {
        cmdMap: null,
        slider: null,
        midFrequency: null,
        ownFrequency: null,

        constructor: function(cmdMap, midFreq){
            this.cmdMap = cmdMap;
            this.midFrequency = midFreq;
            this.ownFrequency = midFreq
        },

        buildMenubar: function(containerId){
            var pMenuBar = new MenuBar({id: "pureSettings"});
            this.buildModeDropDown(pMenuBar);
            pMenuBar.addChild(new MenuSeparator());
            this.buildBaseBandDropDown(pMenuBar);

            pMenuBar.placeAt(containerId);
            pMenuBar.startup();
        },

        buildPanel: function(container){
            this.buildFreqPane(container);
            this.buildAudioDialog(container);
        },

        buildFreqPane: function(mainContainer){
            var container = domConstruct.create("div", {className: "settingsPane"}, mainContainer);

            domConstruct.create("label", {innerHTML: "Mid Frequency&nbsp;:&nbsp;", style:"float:left;"}, container);
            domConstruct.create("div", {innerHTML: this.midFrequency, style:"float:left;"}, container);

            domConstruct.create("br", {}, container);

            domConstruct.create("label", {innerHTML: "Own Frequency:&nbsp;", style:"float:left;"}, container);
            domConstruct.create("input", {type: "number", value: this.ownFrequency, id: "freqInput", style:"float:left;"}, container);
        },

        buildModeDropDown: function(parentNode){
            //TODO Write mode into menuBar
            var pSubMenu = new DropDownMenu({id:"modeDrDwn"});
            var modes = Object.keys(this.cmdMap.MODE_MAP);
            for(var i=0; i < modes.length; i++){
                pSubMenu.addChild(new RadioMenuItem({
                    label: modes[i],
                    group: "mode"
                }));
            }
            parentNode.addChild(new PopupMenuBarItem({
                id: "modeMenu",
                label: "Mode: USB",
                popup: pSubMenu
            }));
        },

        getMatchingBand: function(){
            var bands = Object.keys(this.cmdMap.BAND_SCOPE);
            var matchingBand = null;
            for(var i=0; i < bands.length; i++){
                var scope = this.cmdMap.BAND_SCOPE[bands[i]];
                if(this.ownFrequency >= scope[0] && this.ownFrequency <= scope[1]){
                    matchingBand = bands[i];
                }
            }
            if(!matchingBand) matchingBand = "Gen";
            return matchingBand;
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
                id: "bandMenu",
                label: "Band: "+this.getMatchingBand(),
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

        buildAudioDialog: function(mainContainer){
            var content = domConstruct.create("div", {className: "settingsPane"}, mainContainer);
            var label = domConstruct.create("label", {innerHTML:"Volume"}, content);
            var params = {
                id: "volumeSlider",
                value: 100,
                showButtons: true,
                minimum: 0,
                maximum: 100,
                style: "width:200px; float:left",
            };
            this.slider = new HorizontalSlider(params);
            var params = {
                id: "muteButton",
                muted: false,
                label: "Mute",
                style: "float:left",
            };
            this.muteButton = new Button(params);

            content.appendChild(this.slider.domNode);
            content.appendChild(this.muteButton.domNode);
            this.muteButton.startup();
        }
    });
});