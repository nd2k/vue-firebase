import firebase from 'firebase'
import 'firebase/firestore'

// Firebase init
var config = {
  
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
