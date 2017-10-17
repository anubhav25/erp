$(document).ready(function($) {
    var studentListBody = $("#studentList tbody");
    var studentListHead = $("#studentList thead");

    var btn = $("#btn");
    var submit = $("#submit");
    var date = $("#date");
    var batch;
    var classs;
    var sem;
    var sub;
    var months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC'];

    var student_list = $("#student_list");
    var left1 = $('#left1');
    var list;
    $.get('/myLectures', function (data) {
        list = data;

        var lectureCount = data.length;
        var i;
        for (i = 0; i < lectureCount; i++) {
            sub = data[i].sub_name;

            if (data[i].group) {

                var input = $('<button>').text(data[i].class_name + '_' + data[i].sem + '_' + data[i].group).attr({
                    id: i,
                    class: 'class_name'
                });

                input.click(function (event) {
                    btn.hide();
                    var a = parseInt(event.target.id);
                    console.log(list[a]);
                    $.get('/getAttendance/' + list[a].class_name + '/' + list[a].sem + '/' +list[a].sub+'/'+ list[a].group+"/"+list[a].batch, function (student_list) {


                        createList(student_list);
                    });

                });


                btn.append(input);
            }
            else {
                var input = $('<button>').text(data[i].class_name + '_' + data[i].sem).attr({
                    id: i,
                    class: 'class_name'
                });

                input.click(function (event) {
                    btn.hide();
                    var a = parseInt(event.target.id);
                    console.log(list[a]);

                    $.get('/getAttendance/' + list[a].class_name + '/' + list[a].sem+"/"+list[a].sub_name+'/'+list[a].batch, function (student_list) {

                      //  console.log(student_list);
                        createList(student_list);
                    });

                });
                btn.append(input);

            }
        }


    });

    var a = {};

    function createList(student_list,mon=0 ) {



        var months_avail=new Set();
        function compare(a,b) {
            var d1=new Date(a.date);
            var d2=new Date(b.date);
            if (d1 < d2)
                return -1;
            if (d1 > d2)
                return 1;
            return 0;
        }

        var StudentCount = student_list.length;


        var i;

        if(StudentCount>0)
        {

            var tr = $('<tr>');
            tr.append($('<th>').text('RollNo'));
            var dates=new Set();
            for(var j in student_list[0].attendance)
            {
                student_list[0].attendance.sort(compare);
                var aDate=student_list[0].attendance[j].date.split('-');
                months_avail.add(parseInt(aDate[1]));
                    if(parseInt(mon)===0 || parseInt(mon)===parseInt(aDate[1])){
                        tr.append($('<th>').text(aDate.reverse().join('-')));
                        dates.add(student_list[0].attendance[j].date);
                    }

            }
            tr.append($('<th>').text('Absent'));
            tr.append($('<th>').text('Present'));
            tr.append($('<th>').text('Percentage'));
            tr.attr('id', 'heading');
            studentListHead.text('');
            studentListHead.append(tr);
            if(months_avail.size>1)
            {
                var sel=$('#month');
                sel.show();
                sel.text('');
                sel.append($(`<option value=0>`).text('All'));

                months_avail.forEach((m)=>{
                    if(mon==m)
                       sel.append($(`<option value=${parseInt(m)} selected>`).text(months[parseInt(m)-1]));
            else
                        sel.append($(`<option value=${parseInt(m)}>`).text(months[parseInt(m)-1]));
                });
                sel.off().on('change',e=>{
                    createList(student_list,parseInt(sel.val()));

                });

            }
            //console.log(studentListHead.children().eq(0).children.push())
        }
        studentListBody.text('');
        for (i = 0; i < StudentCount; i++) {
            $('#studentList').show();

            //console.log(student_list[i]);

            var tr = $('<tr>');

            tr.append($('<td>').text(student_list[i].rollno));
            var p=0,ab=0;
            for(var j in student_list[0].attendance)
            {
                if(dates.has(student_list[i].attendance[j].date)){
                if(student_list[i].attendance[j].present=='true')
                {
                    tr.append($('<th>').text('P'));
                    p++;
                }
                else
                {
                    tr.append($('<th>').text('A'));
                    ab++;
                }}
            }
            tr.append($('<th>').text(ab));
            tr.append($('<th>').text(p));
            tr.append($('<th>').text(`${Math.round((p/(ab+p))*100)}`));


          //  tr.append($('<td>').text(student_list[i].name));


            studentListBody.append(tr);


        }


    }
});
/**
 * Created by ANUBHAV on 06-Oct-17.
 */
