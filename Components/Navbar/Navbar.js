import React, { Component } from 'react'

import { View } from 'react-native'

import glamorous, {ThemeProvider} from 'glamorous-native'

import store from '../../store'
import { addTodo, changeMode, visibilityFilter } from './actions'

import Favourite from '../Buttons/Favourite'
import Addnote from '../Buttons/Addnote'
import Tick from '../Buttons/Tick'
import Cross from '../Buttons/Cross'

const ContainerView = glamorous.view({
  backgroundColor: '#42a1c8',
  width: '100%',
  height: '15%',
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center'
})

const NavbarView = glamorous.view({
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  width: '100%', 
  alignItems: 'center'
})

const HeaderText = glamorous.text({
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold'
})

export default class Navbar extends Component {

  handlePress = (value) => {
    if (value === 'tick') {
      store.dispatch(addTodo(this.props.noteToBeAdded))
      store.dispatch(changeMode('SHOW_CONTENT'))
    } else if (value === 'cross') {
      store.dispatch(changeMode('SHOW_CONTENT'))
    } else if (value === 'hearth') {
      store.getState().visibilityFilter === 'SHOW_FAVORITE'
      ? store.dispatch(visibilityFilter('SHOW_ALL'))
      : store.dispatch(visibilityFilter('SHOW_FAVORITE'))
    } else if (value === 'add') {
      store.dispatch(changeMode('WRITE_MODE'))
    }
  }
    
  render () {
    return (
      <ContainerView>
        {
          this.props.mode === 'WRITE_MODE'
          ? <NavbarView>
              <Tick handlePress={this.handlePress} style={{padding: 20}} />
              <HeaderText>Add note</HeaderText>
              <Cross handlePress={this.handlePress} style={{padding: 20}} />
            </NavbarView>

          : <NavbarView>
              <Favourite handlePress={this.handlePress} style={{padding: 20}} />
              <HeaderText>Notes</HeaderText>
              <Addnote handlePress={this.handlePress} handlePress={this.handlePress} style={{padding: 20}} />
            </NavbarView>
        }
      </ContainerView>
    )
  }
}
