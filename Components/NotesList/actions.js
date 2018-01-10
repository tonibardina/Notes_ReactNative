function addFavorite (id) {
  return { type: 'ADD_FAVORITE', id: id }
}

function removeItem (id) {
  return { type: 'REMOVE_NOTE', id: id }
}

export { addFavorite, removeItem }