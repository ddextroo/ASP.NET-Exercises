// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$().ready(function () {
    $('#result').hide()
    let subtotal = 0
    let customerModel = {
        description: [
            "TV",
            "VCR",
            "REMOTE CONTROLLER",
            "CD PLAYER",
            "TAPE RECORDER"
        ],
        prices: [
            400.00,
            220.00,
            35.20,
            300.00,
            150.00
        ]
    }

    $('#CustomerTable').find("tbody").append($("<tr><tr><tr><tr><tr>"))
    $('#DataModal .modal-footer button:nth-child(2)').click(function () {
        $('#CustomerTable > tbody > tr > td').remove()
        setTimeout(function () {
        let quantities = $('#DataModal form').find("input[name='product']").map(function () { return $(this).val() }).get()
        $('#CustomerTable > tbody > tr').each(function (i, tr) {
            subtotal += quantities[i] * customerModel.prices[i]
            $(this).append($('<td>').text(quantities[i] | 0))
            $(this).append($('<td>').text(customerModel.description[i]))
            $(this).append($('<td>').text(parseFloat(customerModel.prices[i]).toFixed(2)))
            $(this).append($('<td>').text(parseFloat(quantities[i] * customerModel.prices[i]).toFixed(2)))
        })
        $('#result').show()
        $("#subtotal").text(parseFloat(subtotal).toFixed(2))
        $("#tax").text(parseFloat(subtotal * 0.0825).toFixed(2))
        $("#total").text(parseFloat(subtotal + (subtotal * 0.0825)).toFixed(2))
            $('#DataModal form').trigger('reset')
        }, 300)
    })
    
})