import { firestore } from './firebase'

export default function list (collection) {
  return firestore
    .collection(collection)
    .get()
    .then(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}
