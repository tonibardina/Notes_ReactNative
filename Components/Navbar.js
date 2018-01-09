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

  addNotePress = () => {
    console.log('addNote pressed')
    store.dispatch({type: 'SHOW_VISIBILITY_FILTER', filter: 'WRITE_MODE'})
  }


  render () {
    return (
      <View style={styles.navbar}>
        {
          this.props.visibilityFilter === 'WRITE_MODE'
          ? <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Tick style={styles.navbarHearth} />
            <HeaderText>Add note</HeaderText>
            <Cross style={styles.navbarHearth} />
          </View>

          : <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Favourite style={styles.navbarHearth} />
            <HeaderText>Notes</HeaderText>
            <Addnote handlePress={this.addNotePress} />
          </View>
        }
      </View>
    )
  }
}
