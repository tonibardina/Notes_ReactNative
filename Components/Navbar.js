/* Core */
import React, { Component } from 'react'

/* Presentational */
import { View } from 'react-native'

// import styles from './styles'
import { styles } from '../style/styles.js'

import HeaderText from './HeaderText'
import Favourite from './Favourite'
import Addnote from './Addnote'
import Tick from './Tick'
import Cross from './Cross'

export default class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {AddingNote: false}
  }

  render () {
    let AddingNote = this.state.AddingNote
    return (
      <View style={styles.navbar}>
        {
          AddingNote
          ? <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Tick style={styles.navbarHearth} />
            <HeaderText>Add note</HeaderText>
            <Cross />
          </View>

          : <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Favourite style={styles.navbarHearth} />
            <HeaderText>Notes</HeaderText>
            <Addnote />
          </View>
        }
      </View>
    )
  }
}
