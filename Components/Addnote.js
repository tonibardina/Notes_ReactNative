import React, { Component } from 'react'

import iconIos from '../assets/ios/+Icon/+Filled.png'
import iconAndroid from '../assets/android/+Icon/+Filledhdpi.png'

import {
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image
 } from 'react-native'

class Addnote extends Component {
  handlePress = () => {
    this.props.handlePress('add')
  }

  render () {
    return (
      <View>
        {
          Platform.OS === 'ios' ? (
            <TouchableHighlight style={{padding: 18}} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={iconIos} />
            </TouchableHighlight>
          ) : (
            <TouchableNativeFeedback style={{padding: 18}} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={iconAndroid} />
            </TouchableNativeFeedback>
          )
        }
      </View>
    )
  }
}

export default Addnote