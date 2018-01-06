/* Core */
import React, { Component } from 'react'

/* Presentational */
import {
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image
 } from 'react-native'

class Addnote extends Component {
  constructor (props) {
    super(props)
    this.state = { }
  }

  handlePress = () => {
    console.log('pressed')
  }

  render () {
    let clicked = this.state.clicked
    return (
      <View>
        {
          Platform.OS === 'ios' ? (
            <TouchableHighlight style={{padding: 18}} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/ios/+Icon/+Filled.png')} />
            </TouchableHighlight>
          ) : (
            <TouchableNativeFeedback style={{padding: 18}} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/android/+Icon/+Filledmdpi.png')} />
            </TouchableNativeFeedback>
          )
        }
      </View>
    )
  }
}

export default Addnote