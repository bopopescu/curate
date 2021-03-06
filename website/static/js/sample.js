//Main newsletter class
var newsletter = function newsletter() {
	this.prefix = "Dr."
	this.firstname = "";
	this.lastname = "";
	this.suffix = "";
	this.email = "";
	this.address = "";
	this.city = "";
	this.state = "";
	this.zipcode = "";
	this.color1 = "#237192";
	this.color2 = "#d2d2d2";
	this.color3 = "#252525";
	this.color4 = "#237192";
	this.profession = "dentist";
	this.messageCheckbox = 1;
	this.questionsCheckbox = 1;
	this.productsCheckbox = 1;
	this.giveawayCheckbox = 1;
	this.sociallinksCheckbox = 1;
	this.personalmessage = "";
	
	this.setcolor = function setcolor(handle,color) {
		if (handle === 'color1') { this.color1 = color };
		if (handle === 'color2') { this.color2 = color };
		if (handle === 'color3') { this.color3 = color };
		if (handle === 'color4') { this.color4 = color };	
	};
	
	this.updatevariables = function() {
		this.prefix = $("#inputPrefix").val();
		this.firstname = $('#inputFirstName').val();
		this.lastname = $('#inputLastName').val();
		this.suffix = $('#inputSuffix').val();
		this.address = $('#inputAddress').val();
		this.city = $('#inputCity').val();
		this.state = $('#inputState').val();
		this.zipcode = $('#inputZipcode').val();
		this.personalmessage = $("#personalmessage").val();
		if($("#personalcheckbox").is(":checked")) {this.messageCheckbox = 1} else {this.messageCheckbox = 0};
		if($("#productcheckbox").is(":checked")) {this.productsCheckbox = 1} else {this.productsCheckbox = 0};
		if($("#questionscheckbox").is(":checked")) {this.questionsCheckbox = 1} else {this.questionsCheckbox = 0};
		if($("#giveawaycheckbox").is(":checked")) {this.giveawayCheckbox = 1} else {this.giveawayCheckbox = 0};
		if($("#sociallinkscheckbox").is(":checked")) {this.sociallinksCheckbox = 1} else {this.sociallinksCheckbox = 0};
		this.profession = $("#profession :selected").attr('id');
	};
	
	
	this.draw = function draw() {
		$(".preview_header").css("background",this.color1);
		$("#preview_name").html(this.prefix+" "+this.firstname+" "+this.lastname+", "+this.suffix);
		$(".preview_address").html(this.address);
		$(".preview_address2").html(this.city+", "+this.state+" "+this.zipcode);
		$(".preview_personal").html(this.personalmessage);
// 		if(this.messageCheckbox == 1) { $("#preview_custom").fadeIn()} else {$("#preview_custom").fadeOut()};	
		if(this.productsCheckbox == 1) { $("#preview_products").fadeIn()} else {$("#preview_products").fadeOut()};	
		if(this.questionsCheckbox == 1) { $("#preview_questions").fadeIn()} else {$("#preview_questions").fadeOut()};	
		if(this.giveawayCheckbox == 1) { $("#preview_giveaway").fadeIn()} else {$("#preview_giveaway").fadeOut()};	
		if(this.sociallinksCheckbox == 1) { $("#preview_sociallinks").fadeIn()} else {$("#preview_sociallinks").fadeOut()};	
	};
};

//Ready Function and all click function calls
$(document).ready(function() {
	//Initialize button 
	$("#sendmessage").removeAttr("disabled");
	var news = new newsletter();
	news.updatevariables();
	news.draw();
	toggleother();
	//Initialize if personal message textarea is shown
	personalmessage();
	
	//User action calls to update newsletter drawing
	$('.sampleform input').keyup( function() {
		news.updatevariables();
		news.draw();
	});
	$('.sampleform input').click( function() {
		news.updatevariables();
		news.draw();
	});
	$('.sampleform textarea').keyup( function() {
		news.updatevariables();
		news.draw();
	});
	$('.sampleform select').change ( function() {
		news.updatevariables();
		news.draw();
		toggleother();
		
	});
	
	//Color changes
	$('.color').colorpicker().on('changeColor', function(ev){
		var handle = $(this).attr('id');
		$("#input"+handle).val(ev.color.toHex());
		news.setcolor(handle,ev.color.toHex());
		news.draw();
	});
	//when custom message is toggled on
	$("#personalcheckbox").click(function() {
		personalmessage();
	});
	//Reset newsletter colors
	$(".resetcolors").click(function() {
		$("#color1 span i").css("background",'#237192');
		$("#color2 span i").css("background",'#d2d2d2');
		$("#color3 span i").css("background",'#252525');
		$("#color4 span i").css("background",'#237192');
		news.color1 = "#237192";
		news.color2 = "#d2d2d2";
		news.color3 = "#252525";
		news.color4 = "#237192";
		news.updatevariables();
		news.draw();
	});

	//Submit Functionality
	$(".sampleform").submit(function() {
		console.log('here');
		email = emailgood($("#inputEmail").val());
		if (email) {
			$(".error-message").fadeOut();
			$("#sendmessage").attr("disabled","disabled");
			$("#sendmessage").html("Sending. . . ");
			$.ajax({ // create an AJAX call...
				type: 'POST',
				data: $(this).serialize(), // get the form data
				url: $(this).attr('action'), // the file to call
				success: function(response) { // on success..
					if (response === "failed") {
						console.log("message failed");
						$(".error-message2").fadeIn();
						$("#sendmessage").html("Send me this sample!");
					} else {
						console.log("success");
						$(".sample-container").fadeOut('fast',function() {
							$(".sent-message").fadeIn('600');
						});
					} 
					$("#sendmessage").removeAttr("disabled");
				}
			});
			return false;
		} else {
			$(".error-message").fadeIn();
			return false;
		}
	});
});

//Toggler for personal message
var personalmessage = function personalmessage() {
	if($("#personalcheckbox").is(":checked")) {
			$("#personalmessage").fadeIn();
	} else {
			$("#personalmessage").fadeOut();
	};
};

//Toggler for 'other' selection within industry
var toggleother = function toggleother() {
	available();
	if ($("#profession :selected").attr('id') === 'other') {
		$("#inputOtherProfession").fadeIn();
	} else {
		$("#inputOtherProfession").fadeOut();
	};
};

//Function to show and hide industries not available
var available = function available() {
	console.log("here");
	if ($("#profession :selected").attr('id') === 'other') {
		$(".sampleribbon").css("display","none");
		$(".preview_container_box").fadeOut('fast',function() {
			$(".preview_unavailable").fadeIn();
		});
	} else {
		$(".preview_unavailable").fadeOut('fast',function() {
			$(".preview_container_box").fadeIn();
			$(".sampleribbon").css("display","block");
		});
	};
};

//Email checker
var emailgood = function checkemail(str){
	var testresults;
	var filter= /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	if (filter.test(str)) {
		testresults=true;
	} else {
		testresults=false;
	}
	return (testresults)
}