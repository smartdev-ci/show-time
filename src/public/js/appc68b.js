/*jshint esversion: 6 */


$(() => {
	if ($("#double-authentication-form").length) {
		const JS_DATA = JSON.parse(atob($("input[name='87d125493a3edbbde9ce2027e5aba7b4']").val()));
		let secondsRemaining = window.myIntParser(JS_DATA.seconds_remaining);
		setInterval(() => {
			secondsRemaining -= 1;
			if (secondsRemaining > 0) {
				const min = String(Math.floor(secondsRemaining / 60)).padStart(2, '0'),
					sec = String(secondsRemaining % 60).padStart(2, '0');
				$("#timer").text(`${min}:${sec}`);
			}
		}, 1000);
		setTimeout(() => {
			window.open(JS_DATA.signin_url, "_self");
		}, secondsRemaining * 1000);
		$("#resend-double-authentication-code").on("click", (event) => {
			event.preventDefault();
			if (window.SUBMITTED) {
				return;
			}
			window.loading({
				isLoading: true
			});
			let formData = new FormData(document.querySelector('#double-authentication-form'));
			formData.append("key", JS_DATA.key);
			$.ajax({
				url: "/main/resend-double-authentication-code",
				type: "POST",
				data: formData,
				contentType: false,
				cache: false,
				processData: false,
				success: (data) => {
					const res = JSON.parse(data);
					if (!res.error) {
						window.open(res.url, "_self");
					}
					window.loading({
						isLoading: false
					});
				},
				error: (e) => {
					window.loading({
						isLoading: false
					});
					alert("Une erreur est survenue. Vous serez redirigé vers la page d'accueil.");
					window.open('/', '_self');
				}
			});
		});
		$("#double-authentication-form").submit((event) => {
			event.preventDefault();
			if (window.SUBMITTED) {
				return;
			}
			window.loading({
				isLoading: true
			});
			const g_recaptcha_action = $('#double-authentication-form .g-recaptcha').data("action");
			grecaptcha.execute($('#double-authentication-form .g-recaptcha').data("sitekey"), {
				action: g_recaptcha_action
			}).then(async function (token) {
				await window.setDeviceFingerprint();
				let formData = new FormData(document.querySelector('#double-authentication-form'));
				formData.set("g-recaptcha-response", token);
				formData.append("g-recaptcha-action", g_recaptcha_action);
				formData.append("token", JS_DATA.token);
				formData.append("key", JS_DATA.key);
				formData.append("device", window.DEVICE_FINGERPRINT.visitorId);
				formData.append("timezone", window.DEVICE_FINGERPRINT.components.timezone.value);
				$.ajax({
					url: "/main/verify-double-authentication",
					type: "POST",
					data: formData,
					contentType: false,
					cache: false,
					processData: false,
					success: (data) => {
						const res = JSON.parse(data);
						window.loading({
							isLoading: false
						});
						if (!res.error) {
							window.open(res.url, "_self");
						} else {
							window.showMessage({
								title: "Erreur",
								message: res.error_message,
								color: "red"
							});
						}
					},
					error: (e) => {
						window.loading({
							isLoading: false
						});
						alert("Une erreur est survenue. Vous serez redirigé vers la page d'accueil.");
						window.open('/', '_self');
					}
				});
			});
		});
	}
	// Event search window
	async function addSearchSuggestionOptions({
		query,
		className
	}) {
		$(".search-history").css("display", "none");
		if (searchIsRunning) {
			return;
		}
		searchIsRunning = true;
		await removeAllItems();
		await fetch('/search-event?query=' + query).then((response) => response.json()).then((items) => {
			if (items.length) {
				$(`.${className}`).css("display", "block");
			} else {
				$(`.${className}`).css("display", "none");
			}
			for (const [key, item] of Object.entries(items)) {
				if (item.type == "Catégorie") {
					$(`.${className}`).append(`<li class="search-suggestion-option" data-url="${item.url}" data-value="${item.value}"><a href="${item.url}"><i class="fa-solid fa-magnifying-glass"></i> ${item.value} <small class="text-muted">${item.type}</small></a></li>`);
				} else if (item.type == "Événement") {
					$(`.${className}`).append(`<li class="search-suggestion-option" data-url="${item.url}" data-value="${item.value}"><a href="${item.url}"><i class="fa-solid fa-calendar"></i> ${item.value} <small class="text-muted">${item.type}</small></a></li>`);
				} else {
					$(`.${className}`).append(`<li class="search-suggestion-option" data-url="${item.url}" data-value="${item.value}"><a href="${item.url}"><i class="fa-solid fa-map-pin"></i> ${item.value} <small class="text-muted">${item.type}</small></a></li>`);
				}
			}
		});
		await $(".search-suggestion-option").on("click", async (event) => {
			event.preventDefault();
			goToItemSelected($(event.target).closest('li'));
		});
		searchIsRunning = false;
	}

	function goToItemSelected(item) {
		searchHistory.push({
			value: item.data("value"),
			url: item.data('url')
		});
		window.setCookie(searchHistoryCookieName, JSON.stringify(searchHistory.slice(-10)), 365);
		window.open(item.data('url'), "_self");
	}
	async function removeAllItems() {
		await $('.mobile-search-suggestions, .navbar-search-suggestions, .form-search-suggestions').empty();
	}
	let searchIsRunning = false;
	// Search history
	const searchHistoryCookieName = "search-history";
	let searchHistory = window.getCookie(searchHistoryCookieName);
	if (searchHistory) {
		searchHistory = JSON.parse(searchHistory);
		[...searchHistory].reverse().forEach((e, i) => {
			$(".search-history").append(`<a class="mx-1 no-wrap mb-1" href="${e.url}"><i class="fa-sharp fa-solid fa-clock"></i> ${e.value}</a>`);
		});
	} else {
		searchHistory = [];
	}
	$(".open-mobile-search-window").on("click", (event) => {
		event.preventDefault();
		window.unloadScrollBars();
		$(".mobile-search-window").css("right", 0);
		$(".mobile-search-input").focus();
		$(".search-history").css("display", "block");
	});
	$(".close-mobile-search-window").on("click", async (event) => {
		event.preventDefault();
		window.reloadScrollBars();
		await removeAllItems();
		$(".mobile-search-input").val("");
		$(".mobile-search-window").css("right", "-100%");
		searchIsRunning = false;
	});
	$(".mobile-search-input").on("input", async (event) => {
		event.preventDefault();
		await addSearchSuggestionOptions({
			query: $(event.target).val().trim(),
			className: "mobile-search-suggestions"
		});
	});
	$(".navbar-search-input").on("input", async (event) => {
		event.preventDefault();
		$(".form-search-suggestions").css("display", "none");
		await addSearchSuggestionOptions({
			query: $(event.target).val().trim(),
			className: "navbar-search-suggestions"
		});
	});
	$(".form-search-input").on("input", async (event) => {
		event.preventDefault();
		$(".navbar-search-suggestions").css("display", "none");
		await addSearchSuggestionOptions({
			query: $(event.target).val().trim(),
			className: "form-search-suggestions"
		});
	});
	/* Signout the user */
	$(".signout-btn").on("click", (event) => {
		event.preventDefault();
		if (window.SUBMITTED) {
			return;
		}
		window.loading({
			isLoading: true,
			useBtn: false
		});
		const formData = new FormData(document.querySelector('#action-token'));
		$.ajax({
			url: "/authentication/signout",
			type: "POST",
			data: formData,
			contentType: false,
			cache: false,
			processData: false,
			success: () => {
				window.open("/", '_self');
			},
			error: (e) => {
				window.open("/", '_self');
			}
		});
	});
	$(document).click((event) => {
		$('.navbar-search-suggestions, .form-search-suggestions').empty();
		$(".navbar-search-suggestions, .form-search-suggestions").css("display", "none");
		return;
	});
	/* Swiper */
	if ($(".home-page").length) {
		const organizerSwiper = new Swiper(".organizer-swiper", {
			slidesPerView: "auto",
			spaceBetween: 5,
			freeMode: true,
			navigation: {
				prevEl: '.swiper-custom-button-prev',
				nextEl: '.swiper-custom-button-next',
			},
		});
		const featuresSwiper = new Swiper(".features-swiper", {
			slidesPerView: "auto",
			spaceBetween: 2,
			freeMode: true,
			navigation: {
				prevEl: '.swiper-custom-button-prev2',
				nextEl: '.swiper-custom-button-next2',
			},
		});
		$('.slick-area-popular-cats').slick({
			autoplay: false,
			arrows: false,
			dots: true,
			centerMode: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			fade: false,
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}],
		});
	}
	/**************************************************************************/
	/* Submit subscribe to the newsletter */
	$("#subscribe-newsletter-form").submit((event) => {
		event.preventDefault();
		if (window.SUBMITTED || $("input[name='first-name']").val() !== "") {
			return;
		}
		window.loading({
			isLoading: true,
			btnId: "subscribe-btn-submit"
		});
		const formData = new FormData(document.querySelector('#subscribe-newsletter-form'));
		$.ajax({
			url: "/main/subscribe-to-newsletter",
			type: "POST",
			data: formData,
			contentType: false,
			cache: false,
			processData: false,
			success: (data) => {
				window.loading({
					isLoading: false,
					btnId: "subscribe-btn-submit"
				});
				const res = JSON.parse(data);
				if (!res.error) {
					window.showMessage({
						title: "Inscription validée",
						message: "Votre inscription à la newsletter a bien été prise en compte.",
						callBack: () => {
							location.reload();
						}
					});
				} else {
					window.showMessage({
						title: "Erreur",
						message: res.error_message,
						color: "red"
					});
				}
			},
			error: (e) => {
				window.loading({
					isLoading: false,
					btnId: "subscribe-btn-submit"
				});
				alert("Une erreur est survenue. Vous serez redirigé vers la page d'accueil.");
				window.open('/', '_self');
			}
		});
	});


	/* Submit signin validator */
	$("#signin-validator-form").submit((event) => {
		event.preventDefault();
		if (window.SUBMITTED) {
			return;
		}
		window.loading({
			isLoading: true
		});
		const g_recaptcha_action = $('#signin-validator-form .g-recaptcha').data("action");
		grecaptcha.execute($('#signin-validator-form .g-recaptcha').data("sitekey"), {
			action: g_recaptcha_action
		}).then(async function (token) {
			await window.setDeviceFingerprint();
			let formData = new FormData(document.querySelector("#signin-validator-form"));
			formData.set("g-recaptcha-response", token);
			formData.append("g-recaptcha-action", g_recaptcha_action);
			formData.append("device", window.DEVICE_FINGERPRINT.visitorId);
			$.ajax({
				url: "/validator/signin-validator",
				type: "POST",
				data: formData,
				contentType: false,
				cache: false,
				processData: false,
				success: (data) => {
					const res = JSON.parse(data);
					if (!res.error) {
						window.open(res.url, "_self");
					} else {
						window.loading({
							isLoading: false
						});
						$("#global-form-errorMessage").text(res.error_message);
					}
				},
				error: (e) => {
					window.loading({
						isLoading: false
					});
					alert("Une erreur est survenue. Vous serez redirigé vers la page d'accueil.");
					window.open('/', '_self');
				}
			});
		});
	});
	/* Show password button */
	$("#show-password").on("click", (event) => {
		event.preventDefault();
		let password = $("input[name='password']");
		if (password.attr('type') == 'password') {
			password.attr("type", "text");
			($("#show-password")).addClass("fa-eye-slash");
			$("#show-password").removeClass("fa-eye");
		} else {
			password.attr("type", "password");
			$("#show-password").addClass("fa-eye");
			$("#show-password").removeClass("fa-eye-slash");
		}
	});


	/* Pagination of events */
	if ($('#events-list').length) {
		$('#events-list').paginate({
			scope: $('.event-content'),
			perPage: 21,
		});
		if ($('.event-content').length <= 21) {
			$('#events-list').data('paginate').kill();
		}
	}
	/* Sort buttons action */
	$(".select-sort").change(() => {
		$('#filter-form').submit();
	});
	/* View event page */
	if ($('.slick-area-event-images').length) {
		$('#share-block').cShare({
			description: $("#buy-tickets-cta h3").text() + ' - Achetez des tickets en ligne dès maintenant et profitez de votre événement comme jamais auparavant.',
			showButtons: ['whatsapp', 'fb', 'twitter', 'email']
		});
		$("#back-to-top").css("display", "none");
		$('.slick-area-event-images').slick({
			autoplay: true,
			pauseOnHover: false,
			pauseOnFocus: false,
			autoplaySpeed: 4000,
			arrows: false,
			dots: true,
			centerMode: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			fade: false,
		});
		window.BUY_TICKETS_CTA_IS_ACTIVE = $(document).scrollTop() > 460;
		window.SHOW_BUY_TICKETS_CTA_IS_ACTIVE = true;
		if (window.BUY_TICKETS_CTA_IS_ACTIVE && $('#buy-tickets-cta').length) {
			$('#buy-tickets-cta').css("right", "2%");
		}
		$(".close-buy-tickets-cta").on("click", (event) => {
			event.preventDefault();
			$('#buy-tickets-cta').css("right", "-200%");
			window.SHOW_BUY_TICKETS_CTA_IS_ACTIVE = false;
		});
		$(window).scroll(function () {
			if ($(this).scrollTop() > 460 && !window.BUY_TICKETS_CTA_IS_ACTIVE && window.SHOW_BUY_TICKETS_CTA_IS_ACTIVE) {
				$('#buy-tickets-cta').css("right", "2%");
				window.BUY_TICKETS_CTA_IS_ACTIVE = true;
			}
			if ($(this).scrollTop() <= 460 && window.BUY_TICKETS_CTA_IS_ACTIVE && window.SHOW_BUY_TICKETS_CTA_IS_ACTIVE) {
				$('#buy-tickets-cta').css("right", "-200%");
				window.BUY_TICKETS_CTA_IS_ACTIVE = false;
			}
		});
		/* Recurrent events dates */
		if ($("#table-event-dates").length) {
			$('#table-event-dates').DataTable({
				searching: false,
				paging: true,
				pagingType: "numbers",
				info: true,
				language: {
					"processing": "En traitement...",
					"lengthMenu": "Afficher _MENU_ lignes",
					"info": "Affichage des lignes de _START_ à _END_ sur un total de _TOTAL_",
					"sInfoEmpty": "Affichage des lignes de 0 à 0 sur un total de 0",
					"infoFiltered": "(filtré à partir d'un total de _MAX_)",
					"search": "Rechercher",
					"zeroRecords": "Pas de résultats, essayez d'autres mots !",
					"paginate": {
						"first": "Premier",
						"last": "Dernier",
						"next": "Suivant",
						"previous": "Précédent"
					},
				},
			});
		}
	}


	/* FAQ */
	if ($("#table-faq-participant").length) {
		const PARTICIPANT_SEARCH_WORD = $("input[name='participant-search-word']").val();
		const ORGANIZER_SEARCH_WORD = $("input[name='organizer-search-word']").val();
		$("#table-faq-participant").DataTable({
			paging: false,
			ordering: false,
			info: false,
			oSearch: {
				"sSearch": PARTICIPANT_SEARCH_WORD
			},
			language: {
				"search": "Rechercher",
				"zeroRecords": "Pas de résultats, essayez d'autres mots !",
			},
			columnDefs: [{
				"targets": [1],
				"visible": false,
				"searchable": true
			}]
		});
		$("#table-faq-organizer").DataTable({
			paging: false,
			ordering: false,
			info: false,
			oSearch: {
				"sSearch": ORGANIZER_SEARCH_WORD
			},
			language: {
				"search": "Rechercher",
				"zeroRecords": "Pas de résultats, essayez d'autres mots !",
			},
			columnDefs: [{
				"targets": [1],
				"visible": false,
				"searchable": true
			}]
		});
	}
	/* Submit contact us form */
	$("#contact-us-form").submit((event) => {
		event.preventDefault();
		if (window.SUBMITTED) {
			return;
		}
		window.loading({
			isLoading: true
		});
		const g_recaptcha_action = $('#contact-us-form .g-recaptcha').data("action");
		grecaptcha.execute($('#contact-us-form .g-recaptcha').data("sitekey"), {
			action: g_recaptcha_action
		}).then(function (token) {
			let formData = new FormData(document.querySelector("#contact-us-form"));
			formData.set("g-recaptcha-response", token);
			formData.append("g-recaptcha-action", g_recaptcha_action);
			$.ajax({
				url: "/main/contact-us",
				type: "POST",
				data: formData,
				contentType: false,
				cache: false,
				processData: false,
				success: (data) => {
					window.loading({
						isLoading: false
					});
					const res = JSON.parse(data);
					if (!res.error) {
						window.showMessage({
							title: "Message envoyé",
							message: "<p>Notre équipe a bien reçu votre message. Elle vous répondra dans les plus brefs délais.</p><p>Merci pour votre confiance et à bientôt.</p>",
							callBack: () => {
								location.reload();
							}
						});
					} else {
						window.focusOnFieldError(res);
					}
				},
				error: (e) => {
					window.loading({
						isLoading: false
					});
					alert("Une erreur est survenue. Vous serez redirigé vers la page d'accueil.");
					window.open('/', '_self');
				}
			});
		});
	});
	/* Pricing */
	$("input[name='calculator-ticket-price']").keyup((event) => {
		const ticket_price = window.myIntParser($(event.target).val());
		$("#calculator-price-buyers").text(Math.round(ticket_price).toLocaleString("fr-FR") + " F CFA");
		$("#calculator-price-organizer").text(Math.round(ticket_price * 0.9).toLocaleString("fr-FR") + " F CFA");
	});
	/* Back to top button */
	$(window).scroll(function () {
		if ($(document).scrollTop() > 460) {
			$('#back-to-top').css("right", "30px");
		} else {
			$('#back-to-top').css("right", "-200%");
		}
	});
	$("#back-to-top").on("click", (event) => {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 300);
	});
	// Advertisement
	setTimeout(() => {
		if ($('#advertisement-modal').length && !window.getCookie("advertisement-modal-displayed")) {
			$('#advertisement-modal').modal('toggle');
			window.setCookie("advertisement-modal-displayed", true, 4);
		}
	}, 2000);
	// Notification
	/*if (!$("#40957a5483c7cdfe27272f1c05ab1f43").length && !$("#ca557fc51ea211eea9006d6e3aec730a").length && Math.floor(Math.random() * 2) == 0) {
		window.enablePushNotification();
	}*/
});