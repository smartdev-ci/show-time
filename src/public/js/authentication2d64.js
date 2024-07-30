/*jshint esversion: 6 */
// Fonction pour continuer avec OAuth en utilisant les données du formulaire
window.continueWithOauth = async function (formData) {
    $.ajax({
        url: "/authentication/continue-with-oauth",
        type: "POST",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: (response) => {
            if (!response.error) {
                window.open(response.url, "_self");
            } else {
                window.showMessage({
                    title: "Erreur",
                    message: response.error_message,
                    color: 'red',
                    callBack: () => {
                        window.open("/", "_self");
                    }
                });
            }
        },
        error: (e) => {
            alert("Une erreur est survenue. Vous serez redirigé vers la page d'accueil.");
            window.open('/', '_self');
        }
    });
};
// Fonction pour gérer l'authentification avec Google
window.handleGoogleLogin = function (response) {
    const data = jwt_decode(response.credential);
    let formData = new FormData(document.querySelector("#action-token"));
    formData.append("user-email", data.email);
    formData.append("user-last-name", data.family_name);
    formData.append("user-first-name", data.given_name);
    window.continueWithOauth(formData);
};
// Fonction pour gérer l'authentification avec Facebook
window.handleFacebookLogin = function () {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            FB.api('/me?fields=email,first_name,last_name', function (data) {
                let formData = new FormData(document.querySelector("#action-token"));
                formData.append("user-email", data.email);
                formData.append("user-last-name", data.last_name);
                formData.append("user-first-name", data.first_name);
                window.continueWithOauth(formData);
            });
        }
    });
};
$(() => {
    // Fonction exécutée lorsque le document est prêt
    // Gestionnaire d'événement pour le formulaire de connexion
    $("#signin-form").submit((event) => {
        event.preventDefault();
        if (window.SUBMITTED) {
            return;
        }
        window.loading({
            isLoading: true
        });
        const formData = new FormData(document.querySelector("#signin-form"));
        $.ajax({
            url: "/authentication/signin",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: (response) => {
                if (!response.error) {
                    window.open(response.url, "_self");
                } else {
                    window.loading({
                        isLoading: false
                    });
                    $("#global-form-errorMessage").text(response.error_message);
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
    // Gestionnaire d'événement pour le formulaire d'inscription
    $("#signup-form").submit((event) => {
        event.preventDefault();
        if (window.SUBMITTED) {
            return;
        }
        window.loading({
            isLoading: true
        });
        const formData = new FormData(document.querySelector("#signup-form"));
        $.ajax({
            url: "/authentication/signup",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: (response) => {
                if (!response.error) {
                    window.open(response.url, "_self");
                } else {
                    window.loading({
                        isLoading: false
                    });
                    $("#global-form-errorMessage").text(response.error_message);
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

    // Gestionnaire d'événement pour le formulaire de demande de réinitialisation de mot de passe par e-mail
    $("#forgot-password-form").submit((event) => {
        event.preventDefault();
        if (window.SUBMITTED) {
            return;
        }
        window.loading({
            isLoading: true
        });
        const formData = new FormData(document.querySelector("#forgot-password-form"));
        $.ajax({
            url: "/authentication/send-email-forgot-password",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: (response) => {
                window.loading({
                    isLoading: false
                });
                if (!response.error) {
                    window.showMessage({
                        title: "E-mail envoyé",
                        message: "Rendez-vous dans votre boîte de réception. Si vous pensez que vous n'avez pas reçu l'e-mail, veuillez vérifier votre dossier SPAM.",
                        callBack: () => {
                            window.open("/", "_self");
                        }
                    });
                } else {
                    $("#global-form-errorMessage").text(response.error_message);
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
    // Gestionnaire d'événement pour le formulaire de réinitialisation de mot de passe
    $("#reset-password-form").submit((event) => {
        event.preventDefault();
        if (window.SUBMITTED) {
            return;
        }
        window.loading({
            isLoading: true
        });
        const formData = new FormData(document.querySelector('#reset-password-form'));
        $.ajax({
            url: "/authentication/change-password",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: (response) => {
                window.loading({
                    isLoading: false
                });
                if (!response.error) {
                    window.showMessage({
                        title: "Mot de passe changé",
                        message: "Votre mot de passe a été changé avec succès. Vous pouvez vous connecter en toute sécurité avec votre nouveau mot de passe.",
                        callBack: () => {
                            window.open(response.url, "_self");
                        }
                    });
                } else if (response.stay_on_page) {
                    window.showMessage({
                        title: "Erreur",
                        message: response.error_message,
                        color: "red",
                    });
                } else {
                    $("#global-form-errorMessage").text(response.error_message);
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
    if ($('#phone').length) {
        window.PhoneInput = window.intlTelInput(document.querySelector("#phone"), {
            utilsScript: "/assets/js/utils.min.js",
            hiddenInput: "phone",
            initialCountry: "ci",
            onlyCountries: ["ci"],
            autoPlaceholder: "off",
        });
    }
    $("#signup-distributor-form").submit((event) => {
        event.preventDefault();
        if (window.submitted) {
            return;
        }
        window.loading({
            isLoading: true
        });
        const formData = new FormData(document.querySelector('#signup-distributor-form'));
        $.ajax({
            url: "/authentication/signup-distributor",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: (response) => {
                window.loading({
                    isLoading: false
                });
                if (!response.error) {
                    window.showMessage({
                        title: "Compte crée",
                        message: "<p>Votre compte a été créé avec succès, mais est actuellement inactif.</p><p>Pour finaliser la création de votre compte et l'activer, vous devez nous fournir quelques pièces justificatives.</p>",
                        callBack: () => {
                            window.open(response.url, "_self");
                        }
                    });
                } else {
                    window.focusOnFieldError(response);
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
    $("#delete-account-form").submit((event) => {
        event.preventDefault();
        if (window.SUBMITTED) {
            return;
        }
        window.loading({
            isLoading: true
        });
        const formData = new FormData(document.querySelector("#delete-account-form"));
        $.ajax({
            url: "/authentication/delete-account",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: (response) => {
                window.loading({
                    isLoading: false
                });
                if (!response.error) {
                    window.showMessage({
                        title: "Compte supprimé",
                        message: "Votre compte sera supprimé dans 48 heures. Si avant la fin de cette période vous souhaitez conserver votre compte, merci de nous contacter via nos pages de contact.",
                        callBack: () => {
                            window.open("/", "_self");
                        }
                    });
                } else {
                    $("#global-form-errorMessage").text(response.error_message);
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