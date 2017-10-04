/**
 * Created by ANUBHAV on 04-Oct-17.
 */

google.charts.load('current', {
    'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    $.get('getMyAttendance',function(mydata){

        console.log(mydata);
        for(var i in mydata){

            console.log(mydata[i]);
            var p=0,a=0;
            // console.log(i)
            for(var b in mydata[i].attendance){
                console.log(b);
                if( mydata[i].attendance[b].present==='true')
                {
                    p++;
                }
                else
                    a++;
            }

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Attendence');
            data.addColumn('number', 'attendence');
            data.addRows([
                ['present', p],
                ['absent', a]

            ]);

            console.log(mydata[i]);
            // Set chart options
            var options = {
                'title': mydata[i].sub,
                'width': 400,
                'height': 300
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);

        }
    });

}