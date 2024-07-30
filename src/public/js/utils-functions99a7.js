/* jshint esversion: 6 */
window.DEVICE_FINGERPRINT = null;
window.setDeviceFingerprint = async function () {
	window.DEVICE_FINGERPRINT = await import('https://openfpcdn.io/fingerprintjs/v3').then((FingerprintJS) => {
		return FingerprintJS.load();
	}).then((fp) => {
		return fp.get();
	});
};
window.stringifyError = function (e) {
	if (e instanceof Object) {
		return JSON.stringify(e, Object.getOwnPropertyNames(e));
	} else {
		return e.toString();
	}
};
window.reportJavascriptError = function (e) {
	if ($('#action-token').length) {
		let formData = new FormData(document.querySelector('#action-token'));
		formData.set('error', window.stringifyError(e));
		$.ajax({
			url: '/main/report-javascript-error',
			type: 'POST',
			data: formData,
			contentType: false,
			cache: false,
			processData: false,
			success: (data) => { },
			error: (e) => {
				alert('Erreur inconnue');
				window.open('/', '_self');
			}
		});
	}
};
// Status of form submissions
window.SUBMITTED = false;
// Camera configuration
window.cameraConfig = {
	fps: 15,
	qrbox: {
		width: 250,
		height: 250
	}
};
// Focus client attention on a specific field in order to display an error message.
window.focusOnFieldError = function (jsonError) {
	$("#" + jsonError.field_id + "-errorMessage").text(jsonError.error_message);
	if ($("#" + jsonError.field_id).length) {
		$('body, html').animate({
			scrollTop: Math.max($("#" + jsonError.field_id).prev('label').length ? $("#" + jsonError.field_id).prev('label').offset().top - 100 : $("#" + jsonError.field_id).offset().top - 100, 0)
		}, 1000);
		$("#" + jsonError.field_id).focus();
	}
};
window.focusOnField = function (field_id, error_message) {
	$("#" + field_id + "-errorMessage").text(error_message);
	if ($("#" + field_id).length) {
		$('body, html').animate({
			scrollTop: Math.max($("#" + field_id).prev('label').length ? $("#" + field_id).prev('label').offset().top - 100 : $("#" + field_id).offset().top - 100, 0)
		}, 1000);
		$("#" + field_id).focus();
	}
};
// Set, get and erase a client cookie
window.setCookie = function (name, value, days) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
window.getCookie = function (name) {
	let nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
};
window.eraseCookie = function (name) {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
// Show message of various types (error, confirmation, warning).
window.showMessage = function ({
	title,
	message,
	color = "green",
	callBack = () => {
		return;
	}
}) {
	$.confirm({
		title: title,
		content: message,
		scrollToPreviousElement: false,
		scrollToPreviousElementAnimate: false,
		theme: 'modern',
		type: color,
		buttons: {
			Ok: () => {
				callBack();
			}
		}
	});
};
// Convert to integer 
window.myIntParser = function (value, defaultValue = 0) {
	const intValue = parseInt(value);
	return isNaN(intValue) ? defaultValue : intValue;
};
// Convert to float 
window.myFloatParser = function (value, defaultValue = 0.0) {
	const floatValue = parseFloat(value);
	return isNaN(floatValue) ? defaultValue : floatValue;
};
// Toggle scrollbar on and off 
window.reloadScrollBars = function () {
	document.documentElement.style.overflow = 'auto';
	document.body.scroll = "yes";
};
window.unloadScrollBars = function () {
	document.documentElement.style.overflow = 'hidden';
	document.body.scroll = "no";
};
// Loading spinner 
window.loading = function ({
	isLoading,
	btnId = "submit-button",
	useBtn = true,
	useSpinner = true
}) {
	if (useBtn) {
		$(`#${btnId}`).prop('disabled', isLoading);
	}
	window.SUBMITTED = isLoading;
	if (useSpinner) {
		$(".container-spinner").css("display", isLoading ? "block" : "none");
	}
	if (isLoading) {
		$("[id$='-errorMessage']").text("");
		$("#global-form-errorMessage").text("");
		window.unloadScrollBars();
	} else {
		window.reloadScrollBars();
	}
};
window.loadingOnButton = function ({
	isLoading,
	btn
}) {
	window.SUBMITTED = isLoading;
	$(btn).prop('disabled', isLoading).attr('aria-disabled', isLoading);
	if (isLoading) {
		$("#global-form-errorMessage, [id$='-errorMessage']").text("");
		$(btn).addClass("disabled").append(` <i class="fa fa-spinner fa-spin">`);
	} else {
		$(btn).removeClass("disabled");
		$(btn + " .fa-spinner").remove();
	}
};
// Go to an element into the page 
$(".goto").on("click", (event) => {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: Math.max($($(event.target).closest('a').data("link")).offset().top - 100, 0),
	}, 1000);
});
window.gotoElement = function (element, minus = 0) {
	$('html, body').animate({
		scrollTop: Math.max($(`${element}`).offset().top - minus, 0),
	}, 1000);
};
// Google autocomplete 
window.initGoogleAutocomplete = function () { };
// Get client's position 
window.getPosition = function () {
	const options = {
		enableHighAccuracy: true,
		timeout: 60000,
		maximumAge: 0
	};
	return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));
};
window.showError = function (error) {
	let error_message = "Erreur inconnue, veuillez actualiser la page et réessayer !";
	switch (error.code) {
		case error.PERMISSION_DENIED:
			if (navigator.userAgent.toLowerCase().includes("iphone") || navigator.userAgent.toLowerCase().includes("convertify")) {
				error_message = "<p>Dans les paramètres de votre appareil iOS, veuillez d'abord activer la géolocalisation et/ou autoriser l'application ou Safari à accéder à votre position !</p>";
			} else {
				error_message = "<p>Vous avez refusé la demande de géolocalisation.</p><p>Dans les paramètres de votre appareil, veuillez autoriser TIKERAMA à accéder à votre position !</p>";
			}
			break;
		case error.POSITION_UNAVAILABLE:
			error_message = "Les informations de localisation ne sont pas disponibles.";
			break;
		case error.TIMEOUT:
			error_message = "La demande d'obtention de la position a expiré.";
			break;
		default:
			error_message = "Erreur inconnue, veuillez actualiser la page et réessayer !";
			break;
	}
	window.showMessage({
		title: "Position non partagée",
		message: error_message,
		color: "red",
		callBack: () => {
			location.reload();
		}
	});
};
// Push notification
$('#enable-push-notification').on('click', async (event) => {
	event.preventDefault();
	await window.enablePushNotification(true);
	location.reload();
});
async function updateSubscriptionOnServer(subscription) {
	await fetch('/push-notification/save-subscription', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'subscription': subscription
		}),
	});
}
window.enablePushNotification = async function (displayNotificationDenied = false) {
	if (!window.isSecureContext || !('serviceWorker' in navigator) || !('PushManager' in window)) {
		throw new Error('Push Notification not supported !');
	}
	const permission = await window.Notification.requestPermission();
	if (permission !== 'granted') {
		window.eraseCookie('notification-request-granted');
		if (displayNotificationDenied) {
			window.showMessage({
				title: 'Notification refusée',
				message: "<p>Les notifications sont très importantes pour vous informer en temps réel.</p> <p>Nous n'arrivons pas à activer les notifications sur votre appareil, vous pouvez le faire vous-même en vous rendant dans les paramètres de votre appareil !</p>",
				color: 'orange',
				callBack: () => { }
			});
		}
		return;
	}
	navigator.serviceWorker.register('/push-notification-sw.js').then(function (registration) {
		registration.pushManager.getSubscription().then((subscription) => {
			updateSubscriptionOnServer(subscription);
		}).catch(function (e) {
			console.error('Get Subscription Error', e);
		});
	}).catch(function (e) {
		console.error('Register Service Worker Error', e);
	});
	window.setCookie('notification-request-granted', true, 365);
};
// Localization
window.localePhrases = {}, window.currentLocale = $("input[name='locale']").length ? $("input[name='locale']").val() : "fr";
window.initLocalization = function (lang) {
	window.currentLocale = lang;
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://tikerama.com/assets/json/languages.json', false);
	try {
		xhr.send();
		if (xhr.status === 200) {
			window.localePhrases = JSON.parse(xhr.responseText);
		}
	} catch (err) {
		console.error("Request failed");
	}
};
window.translate = function (key) {
	return window.localePhrases[window.currentLocale] ? (window.localePhrases[window.currentLocale][key] ? window.localePhrases[window.currentLocale][key] : key) : key;
};
// Service worker
window.addEventListener('load', (event) => {
	// Register the serviceWorker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js')
			.then((reg) => {
				//console.log('Service worker registered successfully');
			}).catch((error) => {
				console.warn('Error during service worker registration:', error);
			});
	}
});
const cookieName = "user-time-zone-set";
if (!window.getCookie(cookieName) && !window.getCookie("user-timezone-set-dashboard")) {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const offsetMinutes = new Date().getTimezoneOffset();
	const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
	const offsetSign = (offsetMinutes >= 0) ? '-' : '+';
	const formData = new FormData(document.querySelector('#action-token'));
	formData.append("timezone", timezone);
	formData.append("offset", offsetHours > 0 ? `${offsetSign}${offsetHours}` : '');
	$.ajax({
		url: "/set-user-timezone",
		type: "POST",
		data: formData,
		contentType: false,
		cache: false,
		processData: false,
		success: () => { },
		error: (e) => { }
	});
	window.setCookie(cookieName, true, 0.25);
}