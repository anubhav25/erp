/**
 * Created by ANUBHAV on 05-Oct-17.
 */
$(document).ready(function($) {
    var frmvalidator = new Validator("myform");


    frmvalidator.addValidation("name", "req", "Please enter your Name");
    frmvalidator.addValidation("name", "maxlen=30", "Max length for Name is 30");
    frmvalidator.addValidation("name", "alpha", "Alphabetic chars only");



    frmvalidator.addValidation("email", "maxlen=50");
    frmvalidator.addValidation("email", "req");
    frmvalidator.addValidation("email", "email");

    frmvalidator.addValidation("mob_no", "maxlen=10");
    frmvalidator.addValidation("mob_no", "minlen=10");
    frmvalidator.addValidation("mob_no", "req");
    frmvalidator.addValidation("mob_no", "numeric");


    frmvalidator.addValidation("pin", "maxlen=6");
    frmvalidator.addValidation("pin", "numeric");
    frmvalidator.addValidation("pin", "req");


    frmvalidator.addValidation("aadhar_card_no", "maxlen=12");
    frmvalidator.addValidation("aadhar_card_no", "numeric");

    frmvalidator.addValidation("dob", "req");

    frmvalidator.addValidation("religion", "req");
    frmvalidator.addValidation("bg", "req");
    frmvalidator.addValidation("gender", "req");
    frmvalidator.addValidation("Nationality", "req");
    frmvalidator.addValidation("voter_card_no", "req");
    frmvalidator.addValidation("address", "req");
    frmvalidator.addValidation("city", "req");
    frmvalidator.addValidation("distt", "req");
    frmvalidator.addValidation("state", "req");
    frmvalidator.addValidation("country", "req");


});



