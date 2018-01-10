/* Core */
import React, { Component } from 'react'

/* Presentational */
import { View } from 'react-native'

// import styles from './styles'
import { styles } from '../style/styles.js'

import store from '../store'

import HeaderText from './HeaderText'
import Favourite from './Favourite'
import Addnote from './Addnote'
import Tick from './Tick'
import Cross from './Cross'

export default class Navbar extends Component {

  handlePress = (value) => {
    if (value === 'tick') {
      store.dispatch({type: 'ADD_NOTE', id: new Date(), text: this.props.noteToBeAdded, favorite: false})
      store.dispatch({type: 'CHANGE_MODE', filter:'SHOW_CONTENT'})
    } else if (value === 'cross') {
      store.dispatch({type: 'CHANGE_MODE', filter:'SHOW_CONTENT'})
    } else if (value === 'hearth') {
      store.getState().visibilityFilter === 'SHOW_FAVORITE'
      ? store.dispatch({type: 'SHOW_VISIBILITY_FILTER', filter:'SHOW_ALL'})
      : store.dispatch({type: 'SHOW_VISIBILITY_FILTER', filter:'SHOW_FAVORITE'})
    } else if (value === 'add') {
      store.dispatch({type: 'CHANGE_MODE', filter:'WRITE_MODE'})
    }
  }
    
  render () {
    return (
      <View style={styles.navbar}>
        {
          this.props.mode === 'WRITE_MODE'
          ? <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Tick handlePress={this.handlePress} style={styles.navbarHearth} />
            <HeaderText>Add note</HeaderText>
            <Cross handlePress={this.handlePress} style={styles.navbarHearth} />
          </View>

          : <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Favourite handlePress={this.handlePress} style={styles.navbarHearth} />
            <HeaderText>Notes</HeaderText>
            <Addnote handlePress={this.handlePress} handlePress={this.handlePress} />
          </View>
        }
      </View>
    )
  }
}
