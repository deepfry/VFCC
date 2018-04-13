// var postie = $.post;
// var jaxie = $.ajax;
// var huehue = new XMLHttpRequest();
// $.post = function(){
// 	console.log("POST rekt email bruh")
// }
// $.ajax = function(){
// 	console.log("AJAX rekt email bruh")
// }
// var XMLHttpRequest = function(){
// 	console.log("XML rekt email bruh")
// }
$(document).on('scroll', function(){
	if($(document).scrollTop() > 300 && !$('header').hasClass('sticky')){
		$('header').addClass('sticky');
	}
	else if ($(document).scrollTop() < 300 && $('header').hasClass('sticky')){
		$('header').removeClass('sticky');
	}
})

$(document).on('mousedown','a',function(e){
	if ($(this).attr('href') != undefined && $(this).attr('href') != '' && /(#\w+$)/.test($(this).attr('href'))){
		var samePage = /(\w)+(?=#\w+$)/.exec($(this).attr('href')) != null ? /(\w)+(?=#\w+$)/.exec($(this).attr('href')) : [pageClass]
		samePage = samePage[0]
		if (samePage === pageClass){
			e.preventDefault();
			var element = /(#\w+$)/.exec($(this).attr('href'))
			element = element[0]
			$('html,body').stop().animate({
				scrollTop:$(element).offset().top - 100,
				easing: 'swing',
			},500)
			if ($(window).width() <= 992){
				$('#menu-overlay-toggle,#menu1,body').toggleClass('custom-toggled-class')
			}
		}
	}
})
$(window).on('resize',function(){
	if($('body').hasClass('custom-toggled-class')){
		$('#menu-overlay-toggle,#menu1,body').toggleClass('custom-toggled-class')
	}
})
	// // Set the date we're counting down to
	// var countDownDate = ''
	//
	// // Update the count down every 1 second
	// var x = setInterval(function() {
	//
	//   // Get todays date and time
	//   var now = new Date().getTime();
	//
	//   // Find the distance between now an the count down date
	//   var distance = countDownDate - now;
	//
	//   // Time calculations for days, hours, minutes and seconds
	//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	//
	//   // Display the result in the element with id="demo"
	//   console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ")
	//   $('#countdown-timer .countdown-days').html(days)
	//   $('#countdown-timer .countdown-hours').html(hours)
	//   $('#countdown-timer .countdown-minutes').html(minutes)
	//   $('#countdown-timer .countdown-seconds').html(seconds)
	//   //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	//
	//   // If the count down is finished, write some text
	//   if (distance < 0) {
	// 	clearInterval(x);
	// 	//document.getElementById("demo").innerHTML = "EXPIRED";
	//   }
	// }, 1000);


$(document).ready(function(){
	if ($('#date-container').attr('data-date') != undefined){
		countDownDate = new Date($('#date-container').attr('data-date'))
	}
	if (window.location.hash){
		$('html, body').stop().animate({
			scrollTop: $(window.location.hash).offset().top -100,
			easing: 'swing'
		},500)
	}
})


$('form.form-email.custom-script').submit(function(e){
	//form validation stuff
	e.preventDefault()
	var body          = $('body'),
		thisForm      = $(e.target).closest('form'),
		formAction    = typeof thisForm.attr('action') !== typeof undefined ? thisForm.attr('action') : "",
		submitButton  = thisForm.find('button[type="submit"], input[type="submit"]'),
		error         = 0,
		originalError = thisForm.attr('original-error'),
		captchaUsed   = thisForm.find('div.recaptcha').length ? true:false,
		successRedirect, formError, formSuccess, errorText, successText;
	body.find('.form-error, .form-success').remove();
	submitButton.attr('data-text', submitButton.text());
	errorText = thisForm.attr('data-error') ? thisForm.attr('data-error') : "Please fill all fields correctly";
	successText = thisForm.attr('data-success') ? thisForm.attr('data-success') : "Thanks, we'll be in touch shortly";
	// change errortext based captcha
	if (grecaptcha.getResponse() === ''){
		errorText = 'Please complete captcha'
	}
	// change errortext based URLs within message
	if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm.test($('textarea').val()) === true){
		errorText = 'Please do not include URLs in the message body'
	}
	thisForm.append('<div class="form-error" style="display: none;">' + errorText + '</div>');
	thisForm.append('<div class="form-success" style="display: none;">' + successText + '</div>');
	formError = body.find('.form-error');
	formSuccess = body.find('.form-success');
	thisForm.addClass('attempted-submit');
	// big-daddy validation statement
	if (mr.forms.validateFields($('form.form-email.custom-script')) !== 1 && grecaptcha.getResponse() != '' && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm.test($('textarea').val()) != true){
		thisForm.find('input,textarea').prop('readonly','true')
		thisForm.find("button").prop("disabled","true")
		// $('form.form-email.custom-script').unbind('submit').submit()
		// console.log('email sent')
		// window.location = '/thankyou'
		// jaxie({
		// 	url:formAction,
		// 	type: 'post',
		// 	success:function(){
		// 		console.log('email sent')
		// 	}
		// })
		// jaxie(formAction, thisForm.serialize(), function(res){
		// 	//alert(JSON.stringify(res))
		// 	if(res.status == "success"){
		// 		window.location = '/thankyou'
		// 	}
		// 	else {
		// 		thisForm.find('input,textarea').prop('readonly','false')
		// 		thisForm.find("button").prop("disabled","false")
		// 		formError.html('Something went wrong sending the email...')
		// 		mr.forms.showFormError(formSuccess, formError, 1000, 5000, 500)
		// 	}
		// })
			var http = huehue;
			var params = new FormData(document.getElementById('contact-form'));
			http.open("POST", formAction, true);
			http.send(params);
			http.onload = function() {
				window.location = '/thankyou'
				// var res = JSON.parse(http.responseText)
				// if(res.status == "success"){
				//
				// }
				// else{
				// 	thisForm.find('input,textarea').prop('readonly','false')
				// 	thisForm.find("button").prop("disabled","false")
				// 	formError.html('Something went wrong sending the email...')
				// 	mr.forms.showFormError(formSuccess, formError, 1000, 5000, 500)
				// }
			}

		//$('form.form-email.custom-script').submit()
		//return true
		// postie(thisForm.attr("action"), thisForm.serialize()).then(function() {
		// 	window.location = thisForm.attr("action")
		// });
	}
	else{
		mr.forms.showFormError(formSuccess, formError, 1000, 5000, 500)
		//e.preventDefault();
	}

})
