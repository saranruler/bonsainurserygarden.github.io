$(document).ready(function() {
    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }
});


function LoginUser() {
    var userid = document.getElementById("inf_lg_name").value;
    var password = document.getElementById("inf_lg_pwd").value;

    if (userid != '' && password != '') {
        document.getElementById("loginButton").innerHTML = "Please wait...";
        document.getElementById("loginButton").disabled = true;
        document.frm.submit();
    } else {
        return false;
    }
}
