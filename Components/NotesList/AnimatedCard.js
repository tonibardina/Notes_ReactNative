import React, { Component } from 'react'

import { Animated, Text, PanResponder, View, LayoutAnimation, StyleSheet, UIManager, Platform } from 'react-native'

// Enable LayoutAnimation
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
//

import store from '../../store'

import { addFavorite, removeItem } from './actions'

import glamorous, {ThemeProvider} from 'glamorous-native'

import Favourite from '../Buttons/Favourite'
import TrashCan from '../Buttons/TrashCan'

const ContainerView = glamorous.view({
  flexDirection: 'row', 
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
})

const CardText = glamorous.text({
  color: '#28605e',
  fontSize: 16,
  fontWeight: 'bold'
})

export default class AnimatedCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY(),
      HearthIcon: false,
      TrashIcon: false
    }
  }

  componentWillMount () {
    this._opacityAnimationCardButton = this.state.pan.x.interpolate({
      inputRange: [-50, 0, 50],
      outputRange: [0.2, 2, 2],
      extrapolate: 'clamp'
    })

    this._opacityAnimationHearthButton = this.state.pan.x.interpolate({
      inputRange: [-50, 25, 50],
      outputRange: [0, 0, 2],
      extrapolate: 'clamp'
    })

    this._opacityAnimationTrashButton = this.state.pan.x.interpolate({
      inputRange: [-50, -25, 50],
      outputRange: [2, 0, 0],
      extrapolate: 'clamp'
    })

    this._scaleCardAnimation = this.state.pan.x.interpolate({
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

    let panX = this.state.pan.x._value

    if (panX < 50 && panX > -50) {
      Animated.spring(this.state.pan, {
        toValue: {x: 0, y: 0},
        friction: 8
      }).start()
      this.props.scrollEnabled(true)
      this.setState({ HearthIcon: false, TrashIcon: false})
    } else if (panX > 50) {
      this.setState({ HearthIcon: true})
      Animated.spring(this.state.pan, {
        toValue: {x: 50, y: 0},
        friction: 8
      }).start()
    } else if (panX < -50) {
      this.setState({ TrashIcon: true})
      Animated.spring(this.state.pan, {
        toValue: {x: -50, y: 0},
        friction: 8
      }).start()
    }
  }

  handlePress = (value) => {
    if (value === 'hearth') {
      this.state.HearthIcon ? store.dispatch(addFavorite(this.props.id)) : null
    } else if (value === 'trash') {
      this.state.TrashIcon ? store.dispatch(removeItem(this.props.id)) : null
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }
  }

  render () {
    return (
      <ContainerView>
        <Animated.View style={[{transform: [{translateX: this.state.pan.x}], opacity: this._opacityAnimationHearthButton}]}>
          <Favourite handlePress={this.handlePress} style={styles.AnimatedCardIcons} />
        </Animated.View>
        <Animated.View style={[styles.AnimatedCard,
          { transform: [{translateX: this.state.pan.x}, {scale: this._scaleCardAnimation}], opacity: this._opacityAnimationCardButton}]}
          {...this._panResponder.panHandlers}
        >
          <CardText>{this.props.text}</CardText>
        </Animated.View>
        <Animated.View style={[{transform: [{translateX: this.state.pan.x}], opacity: this._opacityAnimationTrashButton}]}>
          <TrashCan handlePress={this.handlePress} style={styles.AnimatedCardIcons} />
        </Animated.View>
      </ContainerView>
    )
  }
}

const styles = StyleSheet.create({
  AnimatedCard: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#42a1c8',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  AnimatedCardIcons: {
    padding: 20,
  }
})
