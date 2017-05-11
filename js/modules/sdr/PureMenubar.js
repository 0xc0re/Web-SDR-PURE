define([
    "dojo/_base/declare",
    "modules/sdr/MenuBarBuilder",
], function(declare, MenuBarBuilder){
    return declare(null, {
        builder: null,

        constructor: function(){
            this.builder = new MenuBarBuilder();
        },

        buildMenubar: function(containerId){
            this.builder.buildMenubar(containerId);
        },
    });
});