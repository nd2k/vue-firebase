import firebase from 'firebase'
import 'firebase/firestore'

// Firebase init
var config = {
  apiKey: 'AIzaSyALydn8ZiratkTHYEfzdf1K16Iro8Gjioo',
  authDomain: 'fir-auth-d82ab.firebaseapp.com',
  databaseURL: 'https://fir-auth-d82ab.firebaseio.com',
  projectId: 'fir-auth-d82ab',
  storageBucket: 'fir-auth-d82ab.appspot.com',
  messagingSenderId: '842714773671'
}
firebase.initializeApp(config)

// Firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// Date issue Firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// Firebase collections
const usersCollection = db.collection('users')

export { db, auth, currentUser, usersCollection }
