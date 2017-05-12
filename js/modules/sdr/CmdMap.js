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

        BAND_MAP : {
            "10 Meters": 29000000,
            "12 Meters": 24940000,
            "15 Meters": 21225000,
            "17 Meters": 18118000,
            "20 Meters": 14175000,
            "30 Meters": 10125000,
            "40 Meters": 7150000,
            "60 Meters": 5382000,
            "80 Meters": 3750000,
            "160 Meters": 1900000,
        },

        constructor: function(){
        },

    });
});