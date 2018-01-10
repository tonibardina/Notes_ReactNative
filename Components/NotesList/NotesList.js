import React, { Component } from 'react'

import { ScrollView } from 'react-native'

import AnimatedCard from './AnimatedCard'

export default class NotesList extends Component {
  constructor (props) {
    super(props)
    this.state = {scrolling: true}
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
          this.props.visibilityFilter === 'SHOW_FAVORITE'
            ? this.props.notes.map(note =>
              note.favorite
                ? <AnimatedCard scrollEnabled={this.scrollEnabled} key={note.id} id={note.id} text={note.text} />
                : null
                )
            : this.props.notes.map(note =>
              <AnimatedCard scrollEnabled={this.scrollEnabled} key={note.id} id={note.id} text={note.text} />
              )
        }
      </ScrollView>
    )
  }
}
