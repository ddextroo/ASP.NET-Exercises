
$().ready(function () {
    var studentModel = {
        course: [
            "C1",
            "C2",
            "C3",
            "C4",
            "C5",
            "C6",
            "C7",
            "C8"
        ],
        tuition: [
            356.75,
            387.75,
            345.94,
            351.26,
            378.44,
            326.11,
            310.35,
            399.79
        ],
        registration: [
            545.00,
            550.00,
            555.00,
            560.00,
            565.00,
            570.00,
            610.00,
            624.00,
        ],
        misc: [
            1000.45,
            1050.35,
            1100.25,
            1150.15,
            1200.05,
            1249.05,
            1299.85,
            1340.75,
        ],
        labfee: [
            1900.75,
            1900.20,
            1939.65,
            1959.10,
            1978.55,
            1998.00,
            2017.45,
            2036.90,
        ]
    }
    var selectedCode
    var selectedId
    var selectedGender
    var selectedYear

    $('#CustomerTable').find("tbody").append($("<tr><tr><tr><tr><tr>"))

    $('#sel_ccode').on('change', function (e) {
        selectedCode = $(this).find(':selected').val();
        selectedId = $(this).find(':selected').text();
        $('#course').val(studentModel.course[selectedCode])
    })
    $('#sel_gender').on('change', function (e) {
        selectedGender = $(this).find(':selected').text();
    })
    $('#sel_year').on('change', function (e) {
        selectedYear = $(this).find(':selected').text();
    })
    $('#DataModal .modal-footer button:nth-child(2)').click(function () {
        let user = $('#DataModal form').find("input[name='user']").map(function () { return $(this).val() }).get()

        $.post("../Home/StudentEntry",
            {
                idnum: user[0],
                lname: user[1],
                fname: user[2],
                gender: selectedGender,
                course_code: selectedId,
                course: studentModel.course[selectedCode],
                year: selectedYear,
                subject: user[4],
                registration: studentModel.registration[selectedCode],
                tuition: studentModel.tuition[selectedCode],
                labfee: studentModel.labfee[selectedCode],
                misc: studentModel.misc[selectedCode],

            },
            function (data, status) {
                alert("Data: " + data.idnum + "\nStatus: " + status);
            });
    })



    /*
    $('#DataModal .modal-footer button:nth-child(2)').click(function () {
        $('#CustomerTable > tbody > tr > td').remove()

        let quantities = $('#DataModal form').find("input[name='product']").map(function () { return $(this).val() }).get()
    }
        */
})