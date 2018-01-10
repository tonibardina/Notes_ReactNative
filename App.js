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
      scrolling: true,
      noteToBeAdded: '',
    }

    store.subscribe(() => {
      this.setState({
        visibilityFilter: store.getState().visibilityFilter,
        notes: store.getState().notes,
        mode: store.getState().mode
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
        <Navbar 
          mode={this.state.mode} 
          notes={this.state.notes}
          noteToBeAdded={this.state.noteToBeAdded}
        />
        {
          this.state.mode === 'WRITE_MODE'
          ? <TextInput onChangeText={(text) => this.setState({noteToBeAdded: text})} placeholderTextColor={'white'} style={{height: 30, width: '80%', color: 'white'}} key={'w'} placeholder={'Whats on your mind?'} />
          : <NotesList scrolling={this.state.scrolling} scrollEnabled={this.scrollEnabled} visibilityFilter={this.state.visibilityFilter} notes={this.state.notes} />
        }
      </View>
    )
  }
}
