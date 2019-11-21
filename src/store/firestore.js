import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCzrXcrs-jYaQz8DS-PV3WFqC_F4EXtUzk',
  authDomain: 'focus-hell.firebaseapp.com',
  databaseURL: 'https://focus-hell.firebaseio.com',
  projectId: 'focus-hell',
  storageBucket: 'focus-hell.appspot.com',
  messagingSenderId: '824170186366',
  appId: '1:824170186366:web:258f3c8696305bcb2d3a2f'
}

export default firebase.initializeApp(firebaseConfig).firestore()
