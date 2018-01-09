import React, { Component } from 'react'

import { View, ScrollView, TextInput } from 'react-native'

import { styles } from '../style/styles.js'

import AnimatedCard from './AnimatedCard'
import store from '../store'

export default class NotesList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      scrolling: true,
    }
  }

  scrolling = (boolean) => {
    this.setState({
      scrolling: boolean
    })
  }

  render () {
    return (
      <ScrollView scrollEnabled={this.state.scrolling} animation={false} width={'100%'} contentContainerStyle={{alignItems: 'center'}}>
        { 
          this.props.notes.length 
          ? this.props.visibilityFilter === 'SHOW_FAVORITE'
              ? this.props.notes.map(note =>
                note.favorite
                  ? <AnimatedCard scrolling={this.scrolling} key={note.id} text={note.text} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
                  : null
                  )
              : this.props.notes.map(note =>
                <AnimatedCard scrolling={this.scrolling} key={note.id} text={note.text} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
                )
          : <AnimatedCard scrolling={this.scrolling} key={'x'} text={"Write something by cliking in '+' !"} style={styles.AnimatedCard} textStyle={styles.AnimatedCardText} />
        }
      </ScrollView>
    )
  }
}
