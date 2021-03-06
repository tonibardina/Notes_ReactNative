const uuidv4 = require('uuid/v4')

function addNote (text) {
  return { type: 'ADD_NOTE', text: text, id: uuidv4(), favorite: false }
}

function changeMode (mode) {
  return { type: 'CHANGE_MODE', filter: mode }
}

function visibilityFilter (filter) {
  return { type: 'SHOW_VISIBILITY_FILTER', filter }
}

function resetCurrentNote () {
  return { type: 'RESET_CURRENT_NOTE' }
}

export { addNote, changeMode, visibilityFilter, resetCurrentNote }
