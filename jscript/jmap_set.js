function json_set(json){
    var pre_data = [];
    for(var i = 0; i < json.length; i++){
        pre_data.push({code: i+1, number: json[i]['newly_confirmed_cases']});
    }
    return pre_data;
};

$(document).ready(function(){
    pre_data=json_set(json);
    $('#jmap').jmap({
        height: "400px",
        width: "600px",
        skew: '10',
        lineWidth: 2,
        showHeatmap: true,
        heatmapLabelUnit: '人',
        heatmapType: 'HRed',
        showHeatlabel: true,
        heatmapLabelUnit: '人',
        heatmapConditions: ["<50", ">=50",  ">=150"], // 色がマッチする条件
        heatmapColors: ["#cccccc", "#FFA500", "#FF0000"],
        areas: pre_data
    });
});