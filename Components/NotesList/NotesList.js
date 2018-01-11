import React, { Component } from 'react'

import { ScrollView } from 'react-native'

import AnimatedCard from './AnimatedCard'

import { addCurrentNote } from './actions'

import store from '../../store'

import glamorous from 'glamorous-native'

const Input = glamorous.textInput({
  height: 60,
  fontSize: 20,
  width: '80%',
  color: 'white'
})

export default class NotesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrolling: true
    }
  }

  scrollEnabled = (value) => {
    this.setState({
      scrolling: value
    })
  }

  render () {
    return (
      <ScrollView scrollEnabled={this.state.scrolling} width={'100%'} contentContainerStyle={{alignItems: 'center', marginTop: 20}}>
        { 
          this.props.mode === 'WRITE_MODE'
          ? <Input
            onChangeText={(text) => store.dispatch(addCurrentNote(text))}
            placeholder={'Whats on your mind?'}
            placeholderTextColor={'white'}
            />
          : this.props.visibilityFilter === 'SHOW_FAVORITE'
            ? this.props.notes.map(note =>
              note.favorite
                ? <AnimatedCard scrollEnabled={this.scrollEnabled} key={note.id} id={note.id} favorite={note.favorite} text={note.text} />
                : null
                )
            : this.props.notes.map(note =>
              <AnimatedCard scrollEnabled={this.scrollEnabled} key={note.id} id={note.id} favorite={note.favorite} text={note.text} />
              )
        }
      </ScrollView>
    )
  }
}
