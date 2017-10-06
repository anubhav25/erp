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

            var p = 0, ab = 0;
            for (var b in mydata[i].attendance) {
                if (mydata[i].attendance[b].present === 'true') {
                    p++;
                }
                else
                    ab++;
            }
            var a = {};
            a.p=p;
            a.a=ab;

            a.sub=mydata[i].sub;
            obj.push(a);
            insertIntoTable(a);
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
    var arr = [
        ['Subject','Present', 'Absent', { role: 'annotation' } ]
    ];
    obj.forEach(function(a){
        var total=a.p+a.a;
        var p=100*a.p/total;
        var ab=100*a.a/total;
        var t=[a.sub,p,ab,''];
       arr.push(t);
    });

    var data = google.visualization.arrayToDataTable(arr);

    var options = {
        width: 600,
        height: 400,
        backgroundColor:{fill : 'transparent'},
        legend: { position: 'top', maxLines: 10 },
        bar: { groupWidth: '75%' },
        isStacked: true
    };


        // Instantiate and draw our chart, passing in some options.
      //  $('#chart_div').append($('<div>').attr('id', a.sub));
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);

   // });
}



function insertIntoTable(a){
    console.log(a);
    var t=a.p+a.a;
    var per=a.p*100 / t;
    if(isNaN(per))
    {
        per ='--'
    }
    var table=$('#attendanceTable tbody');
    table.append($('<tr>').append($('<td>').text(a.sub)).append($('<td>').text(t)).append($('<td>').text(a.p)).append($('<td>').text(a.a)).append($('<td>').text(per)));
    table.parent().show();

}