vampire_check.js

var classmate_data = [ // demo in console how to access each element
    // e.g. classmate_data[0]['name']
    {
        'first_name': 'John Smith',
        'middle_name': 'John Smith',
        'last_name': 'John Smith',
        'gender': 'no',
        'garlic': 'no',
        'complexion': 'pale',
        'shadow': 'no'
    },
];

var num_of_humans = 0;
var num_of_vampires = 0;

function hideQuestions() {
        $("div[id='questions']").hide();
}

function showQuestions() {
        $("div[id='questions']").show();
}



function insert_row() {
    var table = document.getElementById("classmate_data");
    // Create an empty <tr> element and add it to the 1st position of the table:
    // BE CAREFUL!!! row 0 is our heading row
    var row = table.insertRow(1);
    // Try this
    // var row = table.insertRow(0);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);


    var count = 0;

    // Add some text to the new cells:
    cell1.innerHTML = $("input[id='first_name']").val(); // change to be var == classmate first name
    cell2.innerHTML = $("input[id='middle_name']").val()// as above with middle name
    cell3.innerHTML = $("input[id='last_name']").val();
    cell4.innerHTML = $("input[name='gender']:checked").val();

    if ($("select[id='mySelect']").val() == 'random') {
        Math.random() >= 0.5 ? table.setAttribute("humVal", parseInt(table.getAttribute("humVal")) + 1) : table.setAttribute("vampVal", parseInt(table.getAttribute("vampVal")) + 1);
        cell5.innerHTML = 'Random';
        cell6.innerHTML = 'Random';
        cell7.innerHTML = 'Random';
    }
    else {
        if ($("input[id='galic_checkbox']:checked").val()) {
            cell5.innerHTML = 'Yes';
            count += 3;
        }
        else {
            cell5.innerHTML = 'No';
        }
        if ($("input[id='pale_checkbox']:checked").val()) {
            cell6.innerHTML = 'Yes';
            count += 3;
        }
        else {
            cell6.innerHTML = 'No';
        }
        if ($("input[id='shadow_checkbox']:checked").val()) {
            cell7.innerHTML = 'Yes';
            count += 4;
        }
        else {
            cell7.innerHTML = 'No';
        }
        count < 6 ? table.setAttribute("humVal", parseInt(table.getAttribute("humVal")) + 1) : table.setAttribute("vampVal", parseInt(table.getAttribute("vampVal")) + 1);
    }

    update_table(parseInt(table.getAttribute("humVal")), parseInt(table.getAttribute("vampVal")));
}
function delete_row() {
    // delete the second row
    document.getElementById("classmate_data").deleteRow(1);
}
// based on https://stackoverflow.com/questions/10686888/delete-last-row-in-table
function delete_last_row() {
    var table = document.getElementById('classmate_data');
    var row_count = table.rows.length;

    table.deleteRow(row_count - 1);
}

function update_table(human_value, vampire_value) {
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {
        var data = new google.visualization.DataTable();
        // classmate_data_processing(classmate_data, data);
        classmate_data_processing(data);


        // Set chart options
        var options = {
            'title': 'How many vampires in the class?',
            'width': 400,
            'height': 300,
            'legendTextStyle': { color: '#cc3399' },
            'titleTextStyle': { color: '#cc3399' },
            'colors': ['#5dcc42', '#e6693e'],
            'is3D': true,
            'backgroundColor': 'transparent'
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    // model of MVC
    // function classmate_data_processing(input_data, result_data){
    function classmate_data_processing(result_data) {
        // Create the data table.
        result_data.addColumn('string', 'Element');
        result_data.addColumn('number', 'Count');
        result_data.addRows([
            ['Human', human_value],
            ['Vampire', vampire_value]
        ]);

    }
}