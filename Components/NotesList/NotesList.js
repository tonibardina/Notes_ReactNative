import React, { Component } from 'react'

import { ScrollView } from 'react-native'

import { styles } from '../../style/styles.js'

import AnimatedCard from './AnimatedCard'

export default class NotesList extends Component {
  render () {
    let scroll = this.props.scrollEnabled
    return (
      <ScrollView scrollEnabled={this.props.scrolling} width={'100%'} contentContainerStyle={{alignItems: 'center', marginTop: 20}}>
        {
          this.props.visibilityFilter === 'SHOW_FAVORITE'
            ? this.props.notes.map(note =>
              note.favorite
                ? <AnimatedCard scrollEnabled={scroll} key={note.id} id={note.id} text={note.text} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
                : null
                )
            : this.props.notes.map(note =>
              <AnimatedCard scrollEnabled={scroll} key={note.id} id={note.id} text={note.text} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
              )
        }
      </ScrollView>
    )
  }
}
