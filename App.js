/* Core */
import React, { Component } from 'react'

/* Presentational */
import { View } from 'react-native'

// import styles from './styles'
import { styles } from './style/styles.js'

import Navbar from './Components/Navbar'

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Navbar />
      </View>
    )
  }
}
