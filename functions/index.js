const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./secret.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: serviceAccount.db_URI
});

const db = admin.firestore();

exports.saveData = functions.https.onCall((data, context) => {
    return db.collection("Contact-Request").add(data)
        .then((docRef) => {
            console.log(docRef);
            return `<p class="lead">Message sent successfully<p><p class="lead">We will contact you soon.<p>`;
        }).catch(err => console.log(err));
});