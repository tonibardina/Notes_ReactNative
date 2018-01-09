import React, { Component } from 'react'

import { Animated, Text, PanResponder, View } from 'react-native'

import Favourite from './Favourite'
import TrashCan from './TrashCan'

export default class AnimatedCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY()
    }
  }

  componentWillMount () {
    this._opacityAnimationCard = this.state.pan.x.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [0.2, 2, 2],
      extrapolate: 'clamp'
    })

    this._opacityAnimationHearth = this.state.pan.x.interpolate({
      inputRange: [-150, 100, 150],
      outputRange: [0, 0, 2],
      extrapolate: 'clamp'
    })

    this._opacityAnimationTrash = this.state.pan.x.interpolate({
      inputRange: [-150, -100, 150],
      outputRange: [2, 0, 0],
      extrapolate: 'clamp'
    })

    this._scaleAnimation = this.state.pan.x.interpolate({
      inputRange: [-150, 0],
      outputRange: [0.6, 1],
      extrapolate: 'clamp'
    })
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: this._handleOnPanResponderGrant,
      onPanResponderMove: this._handleOnPanResponderMove,
      onPanResponderRelease: this._handleOnPanResponderRelease
    })
  }

  _handleOnPanResponderGrant = (e) => {
    this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
    this.state.pan.setValue({x: 0, y: 0})
  }

  _handleOnPanResponderMove = (e, gestureState) => {
    if (gestureState.dx > 0 || gestureState.dx < 0) {
      this.props.scrolling(false)
    } else {
      this.props.scrolling(true)
    }
    return Animated.event([ null, {dx: this.state.pan.x} ])(e, gestureState)
  }

  _handleOnPanResponderRelease = () => {
    this.state.pan.flattenOffset()

    this.props.scrolling(true) 

    if (this.state.pan.x._value < 150 && this.state.pan.x._value > -150) {
      Animated.spring(this.state.pan, {
        toValue: {x: 0, y: 0},
        friction: 8
      }).start()
    } else if (this.state.pan.x._value > 150) {
      Animated.spring(this.state.pan, {
        toValue: {x: 150, y: 0},
        friction: 8
      }).start()
    } else if (this.state.pan.x._value < -150) {
      Animated.spring(this.state.pan, {
        toValue: {x: -150, y: 0},
        friction: 8
      }).start()
    }
  }

  render () {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Animated.View style={[{transform: [{translateX: this.state.pan.x}], opacity: this._opacityAnimationHearth}]}>
          <Favourite markAsFavorite style={{padding: 10}} />
        </Animated.View>
        <Animated.View style={[this.props.style,
          {transform:
            [{translateX: this.state.pan.x}, {scale: this._scaleAnimation}],
            opacity: this._opacityAnimationCard
          }
        ]}
          {...this._panResponder.panHandlers}
        >
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </Animated.View>
        <Animated.View style={[{transform: [{translateX: this.state.pan.x}], opacity: this._opacityAnimationTrash}]}>
          <TrashCan style={{padding: 10}} />
        </Animated.View>
      </View>
    )
  }
}
