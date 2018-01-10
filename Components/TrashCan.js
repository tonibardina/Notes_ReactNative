import React, { Component } from 'react'

import {
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image
 } from 'react-native'

class TrashCan extends Component {
  handlePress = () => {
    this.props.handlePress('trash')
  }

  render () {
    return (
      <View>
        {
          Platform.OS === 'ios' ? (
            <TouchableHighlight style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/ios/trashCan/trashCan.png')} />
            </TouchableHighlight>
          ) : (
            <TouchableNativeFeedback style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/android/trashCan/trashCanhdpi.png')} />
            </TouchableNativeFeedback>
          )
        }
      </View>
    )
  }
}

export default TrashCan