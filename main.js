var firebaseConfig = {
    apiKey: "AIzaSyC3sIXf8cwi_cQ17KROiSkmXjEZjUhvT1k",
    authDomain: "contact-form-a3a20.firebaseapp.com",
    databaseURL: "https://contact-form-a3a20.firebaseio.com",
    projectId: "contact-form-a3a20",
    storageBucket: "contact-form-a3a20.appspot.com",
    messagingSenderId: "814166570273",
    appId: "1:814166570273:web:b32bb575b32aced75aba60",
    measurementId: "G-QDK13EJ704"
};

firebase.initializeApp(firebaseConfig);
const messagesRef = firebase.database().ref('messages');

function saveData(name, email, number, company, message) {
    let newMesssageRef = messagesRef.push();
    newMesssageRef.set({
        name: name,
        email: email,
        phoneNumber: number,
        company: company,
        message: message
    });
}

$('.submit').click(e => {
    e.preventDefault();
    saveData(
        $('#name').val(),
        $('#email').val(),
        $('#number').val(),
        $('#company').val(),
        $('#message').val()
    );
    resetForm();
    $('.alert').fadeIn('slow');
    setTimeout(() => {
        $('.alert').fadeOut('slow');
    }, 2000);
});

function resetForm() {
    $('#name').val('');
    $('#company').val('');
    $('#email').val('');
    $('#number').val('');
    $('#message').val('');
}