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

class Tick extends Component {
  handlePress = () => {
  
  }

  render () {
    return (
      <View>
        {
          Platform.OS === 'ios' ? (
            <TouchableHighlight style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/ios/tickIcon/tick.png')} />
            </TouchableHighlight>
          ) : (
            <TouchableNativeFeedback style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              <Image source={require('../assets/android/tickIcon/tickhdpi.png')} />
            </TouchableNativeFeedback>
          )
        }
      </View>
    )
  }
}

export default Tick