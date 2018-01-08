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

class Cross extends Component {
  handlePress = () => {
  
  }

  render () {
    return (
      <View>
        {
          Platform.OS === 'ios' ? (
            <TouchableHighlight style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/ios/crossIcon/cross.png')} />
            </TouchableHighlight>
          ) : (
            <TouchableNativeFeedback style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/android/crossIcon/crosshdpi.png')} />
            </TouchableNativeFeedback>
          )
        }
      </View>
    )
  }
}

export default Cross