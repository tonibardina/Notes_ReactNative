import React, { Component } from 'react'

import { View, TextInput } from 'react-native'

import { styles } from './style/styles.js'

import Navbar from './Components/Navbar'
import NotesList from './Components/NotesList'

import store from './store'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibilityFilter: 'SHOW_ALL',
      notes: [],
      scrolling: true
    }

    store.subscribe(() => {
      this.setState({
        visibilityFilter: store.getState().visibilityFilter,
        notes: store.getState().notes
      })
    })
  }

  scrollEnabled = (value) => {
    this.setState({
      scrolling: value
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Navbar visibilityFilter={this.state.visibilityFilter} notes={this.state.notes} />
        {
          this.state.visibilityFilter === 'WRITE_MODE'
          ? <TextInput placeholderTextColor={'white'} style={{height: 30, width: '80%', color: 'white'}} key={'w'} placeholder={'Whats on your mind?'} />
          : <NotesList scrolling={this.state.scrolling} scrollEnabled={this.scrollEnabled} visibilityFilter={this.state.visibilityFilter} notes={this.state.notes} />
        }
      </View>
    )
  }
}
