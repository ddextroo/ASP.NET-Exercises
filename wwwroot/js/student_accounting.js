// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
﻿
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
    retrieve()

    function retrieve() {
        $('#CustomerTable > tbody > tr > td').off();

        $.ajax({
            url: "/Home/GetAllStudentEntries",
            type: "GET",
            success: function (response) {
                if (response && response.length > 0) {
                    var tbody = $('#CustomerTable > tbody');
                    tbody.empty();
                    $.each(response, function (i, res) {
                        var row = $("<tr>");
                        row.append($('<td>').text(res.idnum));
                        row.append($('<td>').text(parseFloat(res.total_tuition_units.toFixed(2))));
                        row.append($('<td>').text(parseFloat(res.prelim.toFixed(2))));
                        row.append($('<td>').text(parseFloat(res.midterm.toFixed(2))));
                        row.append($('<td>').text(parseFloat(res.semifinal.toFixed(2))));
                        row.append($('<td>').text(parseFloat(res.total_fee.toFixed(2))));
                        row.append($('<td>').text(res.mode_of_payment));
                        row.append($('<td>').text(res.amount_tendered));
                        row.append($('<td>').text(parseFloat(res.change).toFixed(2)));
                        var editButton = $('<button type="button" class="btn btn-success btn-sm btn-pay" data-bs-toggle="modal" data-bs-target="#DataModal2">Edit</button>');
                        editButton.data("idNum", res.idnum)
                        row.append($("<td>").html(editButton))
                        tbody.append(row);
                    });
                } else {
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    }
    $("#DataModal2").on('shown.bs.modal', function (e) {
        const idnum = $(e.relatedTarget).data("idNum")
        var asssessment = [
            "prelim",
            "midterm",
            "semifinal",
            "final"
        ]
        let res, a, assessment_value
        $('#sel_assessment').on('change', function (e) {
            selectedAssessment = $(this).find(':selected').val();
            $.ajax({
                url: "/Home/GetStudentEntry",
                type: "GET",
                data: { idnum: idnum },
                success: function (response) {
                    if (response) {
                        res = response
                        a = asssessment[selectedAssessment]
                        assessment_value = res[a]
                        $("#DataModal2 form #total_amount").val(res[a].toFixed(2))
                    } else {
                        alert("not found");
                    }
                },
                error: function (error) {
                    $("#result").html("Error: " + error);
                }
            });
        })
        $('#DataModal2 .modal-footer button:nth-child(2)').off('click').on('click', function () {
            $.ajax({
                url: "/Home/UpdateStudentEntry",
                type: "POST",
                data: {
                    idnum: idnum,
                    assessment_value: assessment_value,
                    amount_tendered: $('#DataModal2 form #amount_tendered').val()
                },
                complete: function (response) {
                    $("#student").trigger('reset');
                    console.log("Complete:", response);
                    retrieve()
                }
            });
            
        })
        
    })

    $('#DataModal .modal-footer button:nth-child(2)').off('click').on('click', function () {
        let user = $('#DataModal form').find("input[name='user']").map(function () { return $(this).val() }).get()

        $.ajax({
            url: "/Home/CreateStudentEntry",
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
            error: function (error) {
                console.log(error)
            },
            complete: function () {
                $("#student").trigger('reset');
                retrieve()
            }

        })

    })

})
