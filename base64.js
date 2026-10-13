// Base64 encode/decode (UTF-8 safe)
// Часть генератора паролей (pasgen.github.io)

function b64_encode(str) {
	var bytes = new TextEncoder().encode(str);
	var bin = '';
	for (var i = 0; i < bytes.length; i++) {
		bin += String.fromCharCode(bytes[i]);
	}
	return btoa(bin);
}

function b64_decode(b64) {
	var bin = atob(b64.replace(/\s+/g, ''));
	var bytes = new Uint8Array(bin.length);
	for (var i = 0; i < bin.length; i++) {
		bytes[i] = bin.charCodeAt(i);
	}
	return new TextDecoder('utf-8').decode(bytes);
}

function b64_set_output(text, is_error) {
	if (is_error) {
		$('#b64out').html('<span style="color:#c00">' + htmlspecialchars(text) + '</span>');
	} else {
		$('#b64out').html(htmlspecialchars(text));
	}
}

$(function() {
	$('#b64enc').click(function() {
		try {
			b64_set_output(b64_encode($('#b64input').val()));
		} catch(e) {
			b64_set_output('Ошибка кодирования: ' + e, true);
		}
	});
	$('#b64dec').click(function() {
		try {
			b64_set_output(b64_decode($('#b64input').val()));
		} catch(e) {
			b64_set_output('Ошибка декодирования: неверная строка Base64', true);
		}
	});
	$('#b64input').keydown(function(e) {
		if (e.keyCode == 13) {
			$('#b64enc').click();
		}
	});
});