import React, { Component } from 'react'

import {
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image
 } from 'react-native'

import store from '../store'

class Favourite extends Component {
  constructor (props) {
    super(props)
    this.state = { clicked: false }
  }

  handlePress = () => {
    this.props.pressResponse()

    this.setState({
      clicked: !this.state.clicked
    })
  }

  render () {
    let clicked = this.state.clicked
    return (
      <View>
        {
          Platform.OS === 'ios' ? (
            <TouchableHighlight style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              {
              clicked ? <Image source={require('../assets/ios/hearthIcon/hearthFilled.png')} />
                        : <Image source={require('../assets/ios/hearthIcon/hearthBorder.png')} />
              }
            </TouchableHighlight>
          ) : (
            <TouchableNativeFeedback style={this.props.style} onPress={this.handlePress} underlayColor={'transparent'}>
              {
              clicked ? <Image source={require('../assets/android/hearthIcon/hearthFilledhdpi.png')} />
                        : <Image source={require('../assets/android/hearthIcon/hearthBorderhdpi.png')} />
              }
            </TouchableNativeFeedback>
          )
        }
      </View>
    )
  }
}

export default Favourite
