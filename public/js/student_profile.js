
$(document).ready(function($) {



$.get('/getMyDetails',function(data)
{
	alert();
	console.log(email);

	$('#name').val(data.name);
$('#mob_no').val(data.mob_no);
$('#rollno').val(data.rollno);
$('#batch_name').val(data.batch_name);
$('#classs').val(data.classs);
$('#sem').val(data.sem);
$('#fname').val(data.fname);
$('#fmob_no').val(data.fmob_no);
$('#foccupation').val(data.foccupation);
$('#mname').val(data.mname);
$('#dob').val(data.dob);
$('#religion').val(data.religion);
$('#bg').val(data.bg);
$('#gender').val(data.gender);
$('#Nationality').val(data.Nationality);
$('#caste').val(data.caste);
$('#Category').val(data.Category);
$('#family_income').val(data.family_income);
$('#voter_card_no').val(data.voter_card_no);
$('#aadhar_card_no').val(data.aadhar_card_no);
$('#residancy').val(data.residancy);
$('#email').val(data.email);
$('#classs_group').val(data.classs_group);
$('#address').val(data.address);
$('#city').val(data.city);
$('#distt').val(data.distt);
$('#state').val(data.state);
$('#pin').val(data.pin);
$('#landline').val(data.landline);
$('#country').val(data.country);

// disabled section

$('#foccupation').attr('disabled',true);
$('#classs').attr('disabled',true);
$('#batch_name').attr('disabled',true);
$('#name').attr('disabled',true);
$('#mob_no').attr('disabled',true);
$('#fmob_no').attr('disabled',true);
$('#mob_no').attr('disabled',true);
$('#rollno').attr('disabled',true);
$('#batch_name').attr('disabled',true);
$('#fname').attr('disabled',true);
$('#sem').attr('disabled',true);
$('#mname').attr('disabled',true);
$('#dob').attr('disabled',true);
$('#religion').attr('disabled',true);
$('#bg').attr('disabled',true);
$('#gender').attr('disabled',true);
$('#Nationality').attr('disabled',true);
$('#caste').attr('disabled',true);
$('#Category').attr('disabled',true);
$('#family_income').attr('disabled',true);
$('#voter_card_no').attr('disabled',true);
$('#aadhar_card_no').attr('disabled',true);
$('#residancy').attr('disabled',true);
$('#classs_group').attr('disabled',true);
$('#address').attr('disabled',true);
$('#city').attr('disabled',true);
$('#distt').attr('disabled',true);
$('#state').attr('disabled',true);
$('#pin').attr('disabled',true);
$('#landline').attr('disabled',true);
$('#country').attr('disabled',true);
$('#email').attr('disabled',true);





});





});


