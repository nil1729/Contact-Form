function saveData(name, email, number, company, message) {
    const data = {
        name: name,
        email: email,
        phoneNumber: number,
        company: company,
        message: message
    };
    const save = firebase.functions().httpsCallable('saveData');
    save(data)
        .then(result => {
            showAlert('success', result.data);
        })
        .catch(error => console.log(error));
}

// Handle Submit 
$('.submit').click(e => {
    e.preventDefault();
    const nameRagex = /^[a-zA-Z ]*$/;
    const emailRagex = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    const numberRagex = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/;
    let erorrs = '';
    if ($('#name').val() == '' || $('#email').val() == '' || $('#number').val() == '' || $('#company').val() == '' || $('#message').val() == '') {
        erorrs += `<p class="lead"> Any Field Should not be Blank While Submitting. </p>`;
    }
    if (!nameRagex.test($('#name').val())) {
        erorrs += `<p class="lead"> Name doesn't Contain any number or a special Charecter. <p>`;
    }
    if (!emailRagex.test($('#email').val())) {
        erorrs += `<p class="lead"> Email is not Valid. Please enter a valid Email. <p>`;
    }
    if (!numberRagex.test($('#number').val())) {
        erorrs += `<p class="lead"> Phone Number is not Valid. Please enter a valid Phone Number. <p>`;
    }
    if (erorrs.length != 0) {
        resetAlert();
        showAlert('danger', erorrs);
    } else {
        resetAlert();
        saveData(
            $('#name').val(),
            $('#email').val(),
            $('#number').val(),
            $('#company').val(),
            $('#message').val()
        );
        resetForm();
    }
});


$('.close').click(resetAlert);
// resetAlert 
function resetAlert() {
    $('.msg').html('');
    $('.alert').removeClass('alert-success');
    $('.alert').removeClass('alert-danger');
    $('.close').css('display', 'none');
}

// show alert
function showAlert(type, msg) {
    $('.msg').html(msg);
    $('.alert').addClass(`alert-${type}`);
    $('.alert').fadeIn('slow');
    $('.close').css('display', 'block');
    $('html, body').animate({
        scrollTop: $(".alert").offset().top
    }, 500);
}


// Reset form after message sent
function resetForm() {
    $('#name').val('');
    $('#company').val('');
    $('#email').val('');
    $('#number').val('');
    $('#message').val('');
}