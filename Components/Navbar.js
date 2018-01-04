/* Core */
import React, { Component } from 'react'

/* Presentational */
import { View } from 'react-native'

// import styles from './styles'
import { styles } from '../style/styles.js'

import HeaderText from './HeaderText'

export default class Navbar extends Component {
  render () {
    return (
      <View style={styles.navbar}>
        <HeaderText>Notes</HeaderText>
      </View>
    )
  }
}
