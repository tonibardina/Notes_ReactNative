import React, { Component } from 'react'

import { ScrollView } from 'react-native'

import { styles } from '../style/styles.js'

import AnimatedCard from './AnimatedCard'

export default class NotesList extends Component {
  render () {
    return (
      <ScrollView scrollEnabled={this.props.scrolling} animation={false} width={'100%'} contentContainerStyle={{alignItems: 'center'}}>
        {
          this.props.notes.length
          ? this.props.visibilityFilter === 'SHOW_FAVORITE'
              ? this.props.notes.map(note =>
                note.favorite
                  ? <AnimatedCard scrollEnabled={this.props.scrollEnabled} key={note.id} text={note.text} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
                  : null
                  )
              : this.props.notes.map(note =>
                <AnimatedCard scrollEnabled={this.props.scrollEnabled} key={note.id} text={note.text} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
                )
          : <AnimatedCard scrollEnabled={this.props.scrollEnabled} key={'x'} text={"Write something by cliking in '+' !"} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
        }
      </ScrollView>
    )
  }
}
