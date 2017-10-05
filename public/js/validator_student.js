/**
 * Created by ANUBHAV on 05-Oct-17.
 */
$(document).ready(function($) {
    var frmvalidator = new Validator("myform");


    frmvalidator.addValidation("name", "req", "Please enter your Name");
    frmvalidator.addValidation("name", "maxlen=30", "Max length for Name is 30");
    frmvalidator.addValidation("name", "alpha", "Alphabetic chars only");

    frmvalidator.addValidation("fname", "req", "Please enter your Father's Name");
    frmvalidator.addValidation("fname", "maxlen=30", "Max length for Father's Name is 30");
    frmvalidator.addValidation("fname", "alpha", "Alphabetic chars only");

    frmvalidator.addValidation("mname", "req", "Please enter your Mother's Name");
    frmvalidator.addValidation("mname", "maxlen=30", "Max length for Mother's name is 30");
    frmvalidator.addValidation("mname", "alpha", "Alphabetic chars only");


    frmvalidator.addValidation("email", "maxlen=50");
    frmvalidator.addValidation("email", "req");
    frmvalidator.addValidation("email", "email");

    frmvalidator.addValidation("mob_no", "maxlen=10");
    frmvalidator.addValidation("mob_no", "minlen=10");
    frmvalidator.addValidation("mob_no", "req");
    frmvalidator.addValidation("mob_no", "numeric");

    frmvalidator.addValidation("fmob_no", "maxlen=10");
    frmvalidator.addValidation("fmob_no", "minlen=10");
    frmvalidator.addValidation("fmob_no", "req");
    frmvalidator.addValidation("fmob_no", "numeric");

    frmvalidator.addValidation("rollno", "maxlen=10");
    frmvalidator.addValidation("rollno", "numeric");
    frmvalidator.addValidation("rollno", "req");

    frmvalidator.addValidation("pin", "maxlen=6");
    frmvalidator.addValidation("pin", "numeric");
    frmvalidator.addValidation("pin", "req");


    frmvalidator.addValidation("aadhar_card_no", "maxlen=12");
    frmvalidator.addValidation("aadhar_card_no", "numeric");


    frmvalidator.addValidation("classs_group", "req");
    frmvalidator.addValidation("classs_group", "dontselect=0");

    frmvalidator.addValidation("classs", "req");
    frmvalidator.addValidation("classs", "dontselect=0");

    var yr = (new Date()).getYear();
    frmvalidator.addValidation("batch_name", "req");

    frmvalidator.addValidation("sem", "req");

    frmvalidator.addValidation("foccupation", "req");
    frmvalidator.addValidation("dob", "req");
    frmvalidator.addValidation("religion", "req");
    frmvalidator.addValidation("bg", "req");
    frmvalidator.addValidation("gender", "req");
    frmvalidator.addValidation("Nationality", "req");
    frmvalidator.addValidation("caste", "req");
    frmvalidator.addValidation("Category", "req");
    frmvalidator.addValidation("family_income", "req");
    frmvalidator.addValidation("voter_card_no", "req");
    frmvalidator.addValidation("residancy", "req");
    frmvalidator.addValidation("address", "req");
    frmvalidator.addValidation("city", "req");
    frmvalidator.addValidation("distt", "req");
    frmvalidator.addValidation("state", "req");
    frmvalidator.addValidation("country", "req");


});