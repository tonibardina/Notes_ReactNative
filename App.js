/* Core */
import React, { Component } from 'react'

/* Presentational */
import { View } from 'react-native'

// import styles from './styles'
import { styles } from './style/styles.js'

import Navbar from './Components/Navbar'
import AnimatedCard from './Components/AnimatedCard'
import store from './store'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Navbar />
        <AnimatedCard
          text={'Hello Worldhjgdhkhgjdfewffwrfderjhewgfjhewhjjwefghewfgwjkefgjwkegfkjwegfkjewferjkfhekjrfgkejrfhkier f kuherf rkhjf rekjhfrfhjk erhjk'}
          animatedCardStyle={styles.AnimatedCardText}
          style={styles.AnimatedCard}
          />
      </View>
    )
  }
}
