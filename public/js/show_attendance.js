/**
 * Created by ANUBHAV on 04-Oct-17.
 */
$(document).ready(function($) {

showAttendance();


});
function showAttendance() {
    $.get('getMyAttendance', function (mydata) {
            var obj=[];
        console.log(mydata);
        for (var i in mydata) {

            var p = 0, a = 0;
            for (var b in mydata.attendance) {
                if (mydata.attendance[b].present === 'true') {
                    p++;
                }
                else
                    a++;
            }
            var a = {};
            a.p=p;
            a.a=a;
            a.sub=mydata[i].sub;
            obj.push(a);
        }

        google.charts.load('current', {
            'packages': ['corechart']
        });

// Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(function(){
            drawChart(obj);
        });




    });
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(obj) {
    for(var a in obj) {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Attendence');
        data.addColumn('number', 'attendence');
        data.addRows([
            ['present', a.p],
            ['absent', a.a]

        ]);

        // Set chart optionsd
        var options = {
            'title': a.sub,
            'width': 250,
            'height': 180
        };

        // Instantiate and draw our chart, passing in some options.
        $('#chart_div').append($('<div>').attr('id', a.sub));
        var chart = new google.visualization.PieChart(document.getElementById(sub));
        chart.draw(data, options);

    }
}