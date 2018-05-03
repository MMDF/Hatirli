// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
exports.cronjob=functions.https.onRequest((req,res)=>{
    return admin.database().ref('/users').once('value').then((snap)=>{
        data=snap.val();
        newData={}
        Object.keys(data).forEach(key=>{
            user=data[key];
            Object.keys(user.srs).forEach(questionkey=>{
                user.srs[questionkey].interval-=1;
            });
            newData[key]=user;
        });
         return admin.database().ref('/users').set(newData).then(()=>res.send('success <3'));
    });

}); 