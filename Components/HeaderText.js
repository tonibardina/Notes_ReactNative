/* Core */
import React, { Component } from 'react'

/* Presentational */
import { View, Text } from 'react-native'

// import styles from './styles'
import { styles } from '../style/styles.js'

export default class HeaderText extends Component {
  render () {
    return (
      <View>
        <Text style={styles.headerText}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}
