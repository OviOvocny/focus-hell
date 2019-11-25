import { storage } from './firebase'
import { shuffle } from 'shuffle-seed'

export default async function (deckId, seed) {
  return storage
    .ref('/decks')
    .child(deckId)
    .listAll()
    .then(data => data.items)
    .then(items => items.map(i => `https://firebasestorage.googleapis.com/v0/b/focus-hell.appspot.com/o/${encodeURIComponent(i.location.path_)}?alt=media`))
    .then(cards => shuffle(cards.concat(cards), seed))
}
