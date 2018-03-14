$('form.form-email.custom-script').submit(function(e){
	e.preventDefault();
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
	if (grecaptcha.getResponse() === ''){
		errorText = 'Please complete captcha'
	}
	if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm.test($('textarea').val()) === true){
		errorText = 'Please do not include URLs in the message body'
	}
	thisForm.append('<div class="form-error" style="display: none;">' + errorText + '</div>');
	thisForm.append('<div class="form-success" style="display: none;">' + successText + '</div>');
	formError = body.find('.form-error');
	formSuccess = body.find('.form-success');
	thisForm.addClass('attempted-submit');
	if (mr.forms.validateFields($('form.form-email.custom-script')) !== 1 && grecaptcha.getResponse() != '' && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm.test($('textarea').val()) != true){
		$.post(thisForm.attr("action"), thisForm.serialize()).then(function() {
			window.location = thisForm.attr("action")
		});
	}
	else mr.forms.showFormError(formSuccess, formError, 1000, 5000, 500);

})
