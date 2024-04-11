// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.s

$(document).ready(function () {
    var studentModel = {
        course: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
        tuition: [356.75, 387.75, 345.94, 351.26, 378.44, 326.11, 310.35, 399.79],
        registration: [545.00, 550.00, 555.00, 560.00, 565.00, 570.00, 610.00, 624.00],
        misc: [1000.45, 1050.35, 1100.25, 1150.15, 1200.05, 1249.05, 1299.85, 1340.75],
        labfee: [1900.75, 1900.20, 1939.65, 1959.10, 1978.55, 1998.00, 2017.45, 2036.90]
    };
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
        $("#DataModal2 .modal-title").text(`Student Payment - ${idnum}`)
        var asssessment = [
            "prelim",
            "midterm",
            "semifinal",
            "final"
        ]
        let res, a, assessment_value
        $('#sel_assessment').on('change', function (e) {
            selectedAssessment = $(this).find(':selected').val();
            selectedAssessmentName = $(this).find(':selected').text();
            $.ajax({
                url: "/Home/GetStudentEntry",
                type: "GET",
                data: { idnum: idnum },
                success: function (response) {
                    if (response) {
                        res = response
                        a = asssessment[selectedAssessment]
                        assessment_value = res[a]
                        var payment = (selectedAssessmentName.toLowerCase() == "prelim") ? res.prelim_payment : (selectedAssessmentName.toLowerCase() == "midterm") ? res.midterm_payment : (selectedAssessmentName.toLowerCase() == "semifinal") ? res.semifinal_payment : res.final_payment

                        let n = res[a];
                        let word = "";

                        if (n < 0) {
                            word = "Negative ";
                            n = Math.abs(n);
                        }

                        if (n === 0) {
                            word = "Zero";
                        }

                        let onesWord = "", teensWord = "", tensWord = "", hundreds = "", thousandsWord = "", tensthousandsWord = "";

                        switch (Math.floor(n % 10)) {
                            case 0: onesWord = ""; break;
                            case 1: onesWord = "One"; break;
                            case 2: onesWord = "Two"; break;
                            case 3: onesWord = "Three"; break;
                            case 4: onesWord = "Four"; break;
                            case 5: onesWord = "Five"; break;
                            case 6: onesWord = "Six"; break;
                            case 7: onesWord = "Seven"; break;
                            case 8: onesWord = "Eight"; break;
                            case 9: onesWord = "Nine"; break;
                        }

                        switch (Math.floor((n % 100) / 10)) {
                            case 0: tensWord = ""; break;
                            case 1:
                                switch (Math.floor(n % 100)) {
                                    case 10: teensWord = "Ten"; break;
                                    case 11: teensWord = "Eleven"; break;
                                    case 12: teensWord = "Twelve"; break;
                                    case 13: teensWord = "Thirteen"; break;
                                    case 14: teensWord = "Fourteen"; break;
                                    case 15: teensWord = "Fifteen"; break;
                                    case 16: teensWord = "Sixteen"; break;
                                    case 17: teensWord = "Seventeen"; break;
                                    case 18: teensWord = "Eighteen"; break;
                                    case 19: teensWord = "Nineteen"; break;
                                }
                                break;
                            case 2: tensWord = "Twenty"; break;
                            case 3: tensWord = "Thirty"; break;
                            case 4: tensWord = "Forty"; break;
                            case 5: tensWord = "Fifty"; break;
                            case 6: tensWord = "Sixty"; break;
                            case 7: tensWord = "Seventy"; break;
                            case 8: tensWord = "Eighty"; break;
                            case 9: tensWord = "Ninety"; break;
                        }

                        switch (Math.floor((n % 1000) / 100)) {
                            case 0: break;
                            case 1: hundreds = "One Hundred "; break;
                            case 2: hundreds = "Two Hundred "; break;
                            case 3: hundreds = "Three Hundred "; break;
                            case 4: hundreds = "Four Hundred "; break;
                            case 5: hundreds = "Five Hundred "; break;
                            case 6: hundreds = "Six Hundred "; break;
                            case 7: hundreds = "Seven Hundred "; break;
                            case 8: hundreds = "Eight Hundred "; break;
                            case 9: hundreds = "Nine Hundred "; break;
                        }

                        switch (Math.floor((n % 10000) / 1000)) {
                            case 0: break;
                            case 1: thousandsWord = "One Thousand "; break;
                            case 2: thousandsWord = "Two Thousand "; break;
                            case 3: thousandsWord = "Three Thousand "; break;
                            case 4: thousandsWord = "Four Thousand "; break;
                            case 5: thousandsWord = "Five Thousand "; break;
                            case 6: thousandsWord = "Six Thousand "; break;
                            case 7: thousandsWord = "Seven Thousand "; break;
                            case 8: thousandsWord = "Eight Thousand "; break;
                            case 9: thousandsWord = "Nine Thousand "; break;
                        }

                        switch (Math.floor((n % 100000) / 10000)) {
                            case 0: tensthousandsWord = ""; break;
                            case 1:
                                switch (Math.floor(n / 1000)) {
                                    case 10: tensthousandsWord = "Ten Thousand "; break;
                                    case 11: tensthousandsWord = "Eleven Thousand "; break;
                                    case 12: tensthousandsWord = "Twelve Thousand "; break;
                                    case 13: tensthousandsWord = "Thirteen Thousand "; break;
                                    case 14: tensthousandsWord = "Fourteen Thousand "; break;
                                    case 15: tensthousandsWord = "Fifteen Thousand "; break;
                                    case 16: tensthousandsWord = "Sixteen Thousand "; break;
                                    case 17: tensthousandsWord = "Seventeen Thousand "; break;
                                    case 18: tensthousandsWord = "Eighteen Thousand "; break;
                                    case 19: tensthousandsWord = "Nineteen Thousand "; break;
                                }
                                break;
                            case 2: tensthousandsWord = "Twenty "; break;
                            case 3: tensthousandsWord = "Thirty "; break;
                            case 4: tensthousandsWord = "Forty "; break;
                            case 5: tensthousandsWord = "Fifty "; break;
                            case 6: tensthousandsWord = "Sixty "; break;
                            case 7: tensthousandsWord = "Seventy "; break;
                            case 8: tensthousandsWord = "Eighty "; break;
                            case 9: tensthousandsWord = "Ninety "; break;
                        }
                        let fourthDigit;
                        switch (Math.floor((Math.floor(n) / 1000) % 10)) {
                            case 0: fourthDigit = ""; break;
                            case 1: fourthDigit = "One"; break;
                            case 2: fourthDigit = "Two"; break;
                            case 3: fourthDigit = "Three"; break;
                            case 4: fourthDigit = "Four"; break;
                            case 5: fourthDigit = "Five"; break;
                            case 6: fourthDigit = "Six"; break;
                            case 7: fourthDigit = "Seven"; break;
                            case 8: fourthDigit = "Eight"; break;
                            case 9: fourthDigit = "Nine"; break;
                        }

                        word = (tensthousandsWord !== "" ? (n > 20999 ? tensthousandsWord + " " + fourthDigit + " Thousand " : tensthousandsWord) : thousandsWord) + hundreds + tensWord + " " + (teensWord !== "" ? teensWord : onesWord);

                        const decimalPart = n % 1;
                        if (decimalPart > 0) {
                            const decimalStr = (decimalPart * 100).toFixed(0);
                            word += ` and ${decimalStr}/100`;
                        }

                        $("#DataModal2 form #translate").text(word.trim())

                        $("#DataModal2 form #total_amount").val(res[a].toFixed(2))
                        $("#DataModal2 form #amount_tendered").val(payment.toFixed(2) * 100)
                        if (payment == 0.0) {
                            $("#DataModal2 form #change").val(0)
                            $("#DataModal2 form #amount_tendered").removeAttr('disabled')
                            $("#DataModal2 .modal-footer button:nth-child(2)").removeAttr('disabled')
                        } else {
                            $("#DataModal2 form #amount_tendered").attr('disabled', 'disabled')
                            $("#DataModal2 .modal-footer button:nth-child(2)").attr('disabled', 'disabled')
                            $("#DataModal2 form #change").val((payment - res[a]).toFixed(2))
                        }
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
            if (parseFloat($('#DataModal2 form #amount_tendered').val() / Math.pow(10, 2)) > assessment_value) {
                $.ajax({
                    url: "/Home/UpdateStudentEntry",
                    type: "POST",
                    data: {
                        idnum: idnum,
                        assessment_value: assessment_value,
                        assessment_name: selectedAssessmentName.toLowerCase(),
                        amount_tendered: $('#DataModal2 form #amount_tendered').val()
                    },
                    complete: function (response) {
                        $("#pay").trigger('reset');
                        alert("Transaction Success");
                        retrieve()
                    }
                });
            } else {
                alert("Insufficient Balance")
                $("#pay").trigger("reset")
            }

        })

    })

    $('#DataModal .modal-footer button:nth-child(2)').off('click').on('click', function () {
        let user = $('#DataModal form').find("input[name='user']").map(function () { return $(this).val() }).get()
        var isValid = true;

        var idNumber = $('#DataModal form input[name="user"]').eq(0).val();
        if (idNumber === '') {
            isValid = false;
        }

        var lastName = $('#DataModal form input[name="user"]').eq(1).val();
        if (lastName === '') {
            isValid = false;
        }

        var firstName = $('#DataModal form input[name="user"]').eq(2).val();
        if (firstName === '') {
            isValid = false;
        }

        var gender = $('#DataModal form #sel_gender').val();
        if (gender === null) {
            isValid = false;
        }

        var courseCode = $('#DataModal form #sel_ccode').val();
        if (courseCode === null) {
            isValid = false;
        }

        var year = $('#DataModal form #sel_year').val();
        if (year === null) {
            isValid = false;
        }

        var subjects = $('#DataModal form input[name="user"]').eq(3).val();
        if (subjects === '') {
            isValid = false;
        }

        if (!isValid) {
            alert('Please fill out all required fields.');
        } else {
            $.ajax({
                url: "/Home/CreateStudentEntry",
                type: 'POST',
                data: {
                    idnum: user[0],
                    fname: user[1],
                    lname: user[2],
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
                success: function (response) {
                    $("#student").trigger('reset');
                    alert(response)
                    retrieve()
                }

            })
        }

    })

})
