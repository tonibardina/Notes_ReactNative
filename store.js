import { createStore, combineReducers } from 'redux'

import deepFreeze from 'deep-freeze'
import expect from 'expect'

const notes = (state = [], action) => {
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
      return state.map(notes => {
        if (notes.id !== action.id) {
          return notes
        }

        return {
          ...notes,
          favorite: true
        }
      })

    case 'REMOVE_NOTE':
      return state.map(notes => {
        if (notes.id !== action.id) {
          return notes
        }
      })

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

const notesAppStore = combineReducers({
  notes,
  visibilityFilter
})

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

addNoteTest()
addFavoriteTest()
console.log('Test passed!')

export default createStore(notesAppStore)
