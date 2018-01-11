function addFavorite (id) {
  return { type: 'ADD_FAVORITE', id: id }
}

function removeItem (id) {
  return { type: 'REMOVE_NOTE', id: id }
}

function addCurrentNote (text) {
  return { type: 'ADD_CURRENT_NOTE', text }
}

export { addFavorite, removeItem, addCurrentNote }
