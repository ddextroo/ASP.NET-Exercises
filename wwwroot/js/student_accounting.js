﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

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
    var selectedCode, selectedId, selectedGender, selectedYear, res

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
    $('#DataModal .modal-footer button:nth-child(2)').off('click').on('click', function () {
        let user = $('#DataModal form').find("input[name='user']").map(function () { return $(this).val() }).get()


        $.ajax({
            url: "/Home/StudentEntry",
            type: 'POST',
            data: {
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
            success: function (response) {
                res = response

            },
            error: function (error) {
                console.log(error)
            },
            complete: function () {
                $("#student").trigger('reset');

                setTimeout(function () {
                    $('#CustomerTable > tbody > tr > td').remove()
                    $('#CustomerTable > tbody').each(function (i, tr) {
                        $(this).append($("<tr>"))
                        $(this).append($('<td>').text(res[0].idnum));
                        $(this).append($('<td>').text(parseFloat(res[0].total_tuition_units.toFixed(2))));
                        $(this).append($('<td>').text(parseFloat(res[0].prelim.toFixed(2))));
                        $(this).append($('<td>').text(parseFloat(res[0].midterm.toFixed(2))));
                        $(this).append($('<td>').text(parseFloat(res[0].semifinal.toFixed(2))));
                        $(this).append($('<td>').text(parseFloat(res[0].total_fee.toFixed(2))));
                        $(this).append($('<td>').text(res[0].mode_of_payment));
                    });
                }, 500)

            }

        })

    })

})