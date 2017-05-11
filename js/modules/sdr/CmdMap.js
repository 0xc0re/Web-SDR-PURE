define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom",
], function(declare, domConstruct, dom){
    return declare(null, {
        MODE_MAP : {
            "LSB": 0,
            "USB": 1,
            "DSB": 2,
            "CWL": 3,
            "CWH": 4,
            "FM": 5,
            "AM": 6,
            "DIGU": 7,
            "SPEC": 8,
            "DIGL": 9,
            "SAM": 10,
            "DRM": 11,
        },

        constructor: function(){

        },

    });
});