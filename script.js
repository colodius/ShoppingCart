var numOnly = function (string) {
    var newString = string.slice(2);
    return newString;
}

var updateSubTotal = function () {

    $('tbody tr').each(function (i, ele) {
        var qty =  parseFloat($(ele).find('.qty input').val());
        var price = parseFloat(numOnly($(ele).find('.price').text()));
        var subTotal = qty * price;
        var subTotalDisplay = parseFloat(subTotal).toFixed(2);  
        $(ele).children('.sTotal').html('$ '+ subTotalDisplay);
        $('#totalPrice').html('');   
    });
}
var totalCal = function () {
    var total = 0;
    $('tbody tr').each(function (i, ele) {
        var subTotal = parseFloat(numOnly($(ele).find('.sTotal').text()));
        total += subTotal;
    });
    return total;
}


$(document).ready(function () {

    $(document).on('click', '.btn.cancel', function (event) {
        $(this).closest('tr').remove();
        updateSubTotal();
    });

    var timeout;
    $(document).on('input', 'tr input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          updateSubTotal();
        }, 1000);
    });


    $('#addItem').on('submit', function (event) {
        event.preventDefault();
        var name = $(this).children('[name=name]').val();
        var price = $(this).children('[name=price]').val();
        var priceDisplay = parseFloat(price).toFixed(2);  

        $('tbody').append(
            '<tr>' +
            '<td class="name col-4">' + name+ '</td>' +
            '<td class="price col-3">' + '$ ' + priceDisplay+ '</td>' +
            '<td class="qty col-2">'+ "QTY  " + '<input class="qty" type="number" value ="1">'+ '</td>' +
            '<td><button class="btn btn-light btn-sm cancel">Cancel</button></td>' +
            '<td class="sTotal col-2">' + '</td>' +
            '</tr>');
        ;

        updateSubTotal();
        $(this).children('[name=name]').val('');
        $(this).children('[name=price]').val('');
          
    });

    $(document).on('click', '#showTotalPrice', function (event) {
        var sum = totalCal(); 
        $('#totalPrice').html('$ ' + sum.toFixed(2));
    });

});
