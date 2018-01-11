import React, { Component } from 'react'

import glamorous from 'glamorous-native'

import Navbar from './Components/Navbar/Navbar'
import NotesList from './Components/NotesList/NotesList'

import store from './store'

const ContainerView = glamorous.view({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  backgroundColor: '#9cd8d5'
})

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notes: store.getState().notes
    }

    store.subscribe(() => {
      this.setState({
        visibilityFilter: store.getState().visibilityFilter,
        notes: store.getState().notes,
        mode: store.getState().mode
      })
    })
  }

  render () {
    return (
      <ContainerView>
        <Navbar
          mode={this.state.mode}
          notes={this.state.notes}
        />
        <NotesList
          visibilityFilter={this.state.visibilityFilter}
          notes={this.state.notes}
          mode={this.state.mode}
        />
      </ContainerView>
    )
  }
}
