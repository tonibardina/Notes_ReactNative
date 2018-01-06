/* Core */
import React, { Component } from 'react'

/* Presentational */
import { Animated, Text, PanResponder, Dimensions } from 'react-native'

import Favourite from './Favourite'

var {
  width: deviceWidth
} = Dimensions.get('window')

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
      onPanResponderGrant: (e) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
        this.state.pan.setValue({x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([ null, {dx: this.state.pan.x} ]),
      onPanResponderRelease: () => {
        this.state.pan.flattenOffset()
        if (this.state.pan.x._value < 150 && this.state.pan.x._value > -150) {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 6
          }).start()
        } else if (this.state.pan.x._value > 150) {
          Animated.spring(this.state.pan, {
            toValue: {x: 150, y: 0},
            friction: 6
          }).start()
        } else if (this.state.pan.x._value < -150) {
          Animated.spring(this.state.pan, {
            toValue: {x: -150, y: 0},
            friction: 6
          }).start()
        }
      }
    })
  }

  render () {
    return (
      <Animated.View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'red'}}>
        <Animated.View style={[{transform: [], opacity: this._opacityAnimationHearth}]}>
          <Favourite />
        </Animated.View>
        <Animated.View style={[this.props.style,
          {transform:
            [{translateX: this.state.pan.x}, {scale: this._scaleAnimation}],
            opacity: this._opacityAnimationCard
          }
        ]}
          {...this._panResponder.panHandlers}
        >
          <Text style={this.props.animatedCardStyle}>{this.props.text}</Text>
        </Animated.View>
        <Animated.View style={[{transform: [], opacity: this._opacityAnimationTrash}]}>
          <Favourite />
        </Animated.View>
      </Animated.View>
    )
  }
}
