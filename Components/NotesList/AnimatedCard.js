import React, { Component } from 'react'

import { Animated, Text, PanResponder, View, LayoutAnimation } from 'react-native'

import store from '../../store'

import Favourite from '../Buttons/Favourite'
import TrashCan from '../Buttons/TrashCan'

export default class AnimatedCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY()
    }
  }

  componentWillMount () {
    this._opacityAnimationCard = this.state.pan.x.interpolate({
      inputRange: [-50, 0, 50],
      outputRange: [0.2, 2, 2],
      extrapolate: 'clamp'
    })

    this._opacityAnimationHearth = this.state.pan.x.interpolate({
      inputRange: [-50, 25, 50],
      outputRange: [0, 0, 2],
      extrapolate: 'clamp'
    })

    this._opacityAnimationTrash = this.state.pan.x.interpolate({
      inputRange: [-50, -25, 50],
      outputRange: [2, 0, 0],
      extrapolate: 'clamp'
    })

    this._scaleAnimation = this.state.pan.x.interpolate({
      inputRange: [-50, 0],
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

  _handleOnPanResponderGrant = (e, gestureState) => {
    this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
    this.state.pan.setValue({x: 0, y: 0})
  }

  _handleOnPanResponderMove = (event, gestureState) => {
    gestureState.dx < 10 && gestureState.dx > -10 ? this.props.scrollEnabled(true) : this.props.scrollEnabled(false)
    return Animated.event([ null, {dx: this.state.pan.x} ])(event, gestureState)
  }

  _handleOnPanResponderRelease = (event, gestureState) => {
    this.state.pan.flattenOffset()

    this.props.scrollEnabled(true)

    if (this.state.pan.x._value < 50 && this.state.pan.x._value > -50) {
      Animated.spring(this.state.pan, {
        toValue: {x: 0, y: 0},
        friction: 8
      }).start()
    } else if (this.state.pan.x._value > 50) {
      Animated.spring(this.state.pan, {
        toValue: {x: 50, y: 0},
        friction: 8
      }).start()
    } else if (this.state.pan.x._value < -50) {
      Animated.spring(this.state.pan, {
        toValue: {x: -50, y: 0},
        friction: 8
      }).start()
    }
  }

  handlePress = (value) => {
    if (value === 'hearth') {
      store.dispatch({type: 'ADD_FAVORITE', id: this.props.id})
    } else if (value === 'trash') {
      store.dispatch({type: 'REMOVE_NOTE', id: this.props.id})
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }
  }

  render () {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Animated.View style={[{transform: [{translateX: this.state.pan.x}], opacity: this._opacityAnimationHearth}]}>
          <Favourite handlePress={this.handlePress} style={{padding: 10}} />
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
          <TrashCan handlePress={this.handlePress} style={{padding: 10}} />
        </Animated.View>
      </View>
    )
  }
}
