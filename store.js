import { createStore, combineReducers } from 'redux'

import deepFreeze from 'deep-freeze'
import expect from 'expect'

const sample = {
  id: 'sample',
  text: "Write your awesome notes by clicking on '+'! \nDrag left to delete note \nDrag right to mark note as favorite",
  favorite: false
}

const notes = (state = [ sample ], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          favorite: false
        }
      ]

    case 'ADD_FAVORITE':
      return state.map(note => {
        if (note.id !== action.id) {
          return note
        }

        return {
          ...note,
          favorite: !note.favorite
        }
      })

    case 'REMOVE_NOTE':
      return state.filter(item => item.id !== action.id)

    default:
      return state
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SHOW_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const mode = (state = 'SHOW_CONTENT', action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return action.filter
    default:
      return state
  }
}

const notesAppStore = combineReducers({
  notes,
  visibilityFilter,
  mode
})

// TESTS

const addNoteTest = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_NOTE',
    text: 'Hello World!',
    id: 0,
    favorite: false
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Hello World!',
      favorite: false
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter)
}

const addFavoriteTest = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Hello World!',
      favorite: false
    },
    {
      id: 1,
      text: 'Hello Martians!',
      favorite: false
    }
  ]
  const action = {
    type: 'ADD_FAVORITE',
    id: 1
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Hello World!',
      favorite: false
    },
    {
      id: 1,
      text: 'Hello Martians!',
      favorite: true
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter)
}

const removeNoteTest = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Hello World!',
      favorite: false
    },
    {
      id: 1,
      text: 'Hello Martians!',
      favorite: false
    }
  ]
  const action = {
    type: 'REMOVE_NOTE',
    id: 1
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Hello World!',
      favorite: false
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter)
}

const visibilityFilterTest = () => {
  const stateBefore = 'SHOW_ALL'

  const action = {
    type: 'SHOW_VISIBILITY_FILTER',
    filter: 'SHOW_FAVORITE'
  }
  const stateAfter = 'SHOW_FAVORITE'

  deepFreeze(action)
  deepFreeze(stateBefore)

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter)
}

const modeTest = () => {
  const stateBefore = 'SHOW_CONTENT'

  const action = {
    type: 'CHANGE_MODE',
    filter: 'WRITE_MODE'
  }
  const stateAfter = 'WRITE_MODE'

  deepFreeze(action)
  deepFreeze(stateBefore)

  expect(
    mode(stateBefore, action)
  ).toEqual(stateAfter)
}

addNoteTest()
addFavoriteTest()
removeNoteTest()
visibilityFilterTest()
modeTest()
console.log('Test passed!')

export default createStore(notesAppStore)
