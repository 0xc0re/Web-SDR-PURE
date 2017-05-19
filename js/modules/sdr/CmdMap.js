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

        /** In Hz **/
        BAND_SCOPE : {
            "6 Meters": [50000000, 52000000],
            "10 Meters": [28000000, 29700000],
            "12 Meters": [24890000, 24990000],
            "15 Meters": [21000000, 21450000],
            "17 Meters": [18068000, 18168000],
            "20 Meters": [14000000, 14350000],
            "30 Meters": [10100000, 10150000],
            "40 Meters": [7000000, 7300000],
            "60 Meters": [5332000, 5405000],
            "80 Meters": [3500000, 4000000],
            "160 Meters": [1800000, 2000000],
        },

        constructor: function(){
        },

    });
});