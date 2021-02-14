$(document).ready(function() {
	var faIcon = {
		valid: 'fa fa-check-circle fa-lg text-success',
		invalid: 'fa fa-times-circle fa-lg',
		validating: 'fa fa-refresh'
	}
	$('#frm_change_pwd').bootstrapValidator({
		excluded: [':disabled'],
		feedbackIcons: faIcon,
		fields: {
			f_rpt_current_pwd: {
				validators: {
					notEmpty: {
						message: 'Please enter the current password'
					}
				}
			}
			,f_rpt_new_pwd: {
				validators: {
					notEmpty: {
						message: 'The new password is required and can\'t left be empty'
					},
					identical: {
						field: 'f_rpt_conf_new_pwd',
						message: 'The new password and its confirm are not the same'
					},
					different: {
						field: 'f_rpt_current_pwd',
						message: 'The current & new password should not be the same, please enter different password'
					}
				}
			}
			,f_rpt_conf_new_pwd: {
				validators: {
					notEmpty: {
						message: 'The confirm password is required and can\'t left be empty'
					},
					identical: {
						field: 'f_rpt_new_pwd',
						message: 'The new password and its confirm are not the same'
					}
				}
			}
		}
	});
});	