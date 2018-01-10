import React, { Component } from 'react'

import { View, Platform, TouchableHighlight, TouchableNativeFeedback, Image } from 'react-native'

import IconIos from './assets/ios/tickIcon/tick.png'
import IconAndroid from './assets/android/tickIcon/tickhdpi.png'

class Tick extends Component {
  handlePress = () => {
   this.props.handlePress('tick')
  }

  render () {
    return (
      <View>
        {
          Platform.OS === 'ios' 
            ? <TouchableHighlight style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
                <Image source={ IconIos } />
              </TouchableHighlight>
            : <TouchableNativeFeedback style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
                <Image source={ IconAndroid } />
              </TouchableNativeFeedback>
        }
      </View>
    )
  }
}

export default Tick