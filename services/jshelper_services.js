function get_current_date(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today
}

function trancate_str(data){
    var s = data.replace(/[ ,.-]/g, "");
    return s;
}

function make_numeric(data){
  var s = data.replace(/[ ,-]/g, "");
  return s;
}

function bdt_int_currency_convert(input){
    var amt = trancate_str(input)
    if (amt.length <= 3) return amt
    var myamount = amt.substring(amt.length-3, amt.length)
    var idx = amt.length-4;
    var cnt = 0;
    while(idx>=0){
      if(cnt == 0) myamount = "," + myamount
      myamount = String(amt[idx]) + myamount
      cnt++;
      if(cnt == 2) cnt = 0;
      idx--;
    }
    return myamount
  }


function bdt_currency_convert(input){
    if (input.length == 0) return ""

    var pt_idx = 0;
    var int_part = ""
    while(pt_idx < input.length){
        if(input[pt_idx] == '.') break
        int_part += String(input[pt_idx])
        pt_idx++;
    }

    if(pt_idx != input.length){ // Decimal case
        var decimal_part = input.substring(pt_idx+1, input.length)
        int_part = bdt_int_currency_convert(int_part)
        var amount = int_part + "." + decimal_part
        return amount
    }else{ // No decimal
        var decimal_part = "00"
        int_part = bdt_int_currency_convert(int_part)
        var amount = int_part + "." + decimal_part
        return amount
    }
  }

module.exports.get_current_date = get_current_date
module.exports.bdt_currency_convert = bdt_currency_convert
module.exports.make_numeric = make_numeric