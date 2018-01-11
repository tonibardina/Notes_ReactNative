import React, { Component } from 'react'

import { View, Platform, TouchableHighlight, TouchableNativeFeedback, Image } from 'react-native'

import store from '../../store'

import HearthFilled from './assets/ios/hearthIcon/hearthFilled.png'
import HearthBorder from './assets/ios/hearthIcon/hearthBorder.png'

import HearthFilledA from './assets/android/hearthIcon/hearthFilledmdpi.png'
import HearthBorderA from './assets/android/hearthIcon/hearthBordermdpi.png'

class Favourite extends Component {
  handlePress = () => {
    this.props.handlePress('hearth')
  }

  render () {
    return (
      <View>
        {
          Platform.OS === 'ios' 
            ? <TouchableHighlight style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
                {
                  store.getState().visibilityFilter === 'SHOW_FAVORITE' 
                    ? <Image source={ HearthFilled } />
                    : <Image source={ HearthBorder } />
                }
              </TouchableHighlight>
            : <TouchableNativeFeedback style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
                {
                  store.getState().visibilityFilter === 'SHOW_FAVORITE' 
                    ? <Image source={ HearthFilledA } />
                    : <Image source={ HearthBorderA } />
                }
              </TouchableNativeFeedback>
        }
      </View>
    )
  }
}

export default Favourite
