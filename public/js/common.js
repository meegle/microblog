//用户注册/登录
$('form.J_ajaxSubmit').on('submit', function() {
	var $this = $(this);
	$.ajax({
		url: $this.attr('action'),
		type: $this.attr('method'),
		dataType: 'json',
		data: $this.serialize(),
		success: function(data, textStatus) {
			if (data.status) {
				alert(data.message);
				window.location.href = data.redirect;
			} else {
				var $container = $('#container');
				if ($container.children('#returnMessage').length) {
					$('#returnMessage').text(data.message);
				} else {
					$container.prepend($('<div>').attr('id', 'returnMessage').addClass('alert alert-error').text(data.message));
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#container').prepend('<div class="alert alert-error">' + errorThrown + '</div>');
		}
	});
	return false;
});
