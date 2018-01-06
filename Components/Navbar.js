/* Core */
import React, { Component } from 'react'

/* Presentational */
import { View } from 'react-native'

// import styles from './styles'
import { styles } from '../style/styles.js'

import HeaderText from './HeaderText'
import Favourite from './Favourite'
import Addnote from './Addnote'

export default class Navbar extends Component {
  render () {
    return (
      <View style={styles.navbar}>
        <Favourite style={styles.navbarHearth} />
        <HeaderText>Notes</HeaderText>
        <Addnote />
      </View>
    )
  }
}
