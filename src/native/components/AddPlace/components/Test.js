import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { SocialIcon, Rating, Tile } from "react-native-elements"

export default class Test extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  
  render() {
    return (
      <View style={[styles.container, { display: "flex" }]}>
        <SocialIcon
          type="youtube"
        />
        <Rating
          type="star"
        />

        <Button title="Call" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "50%"
  },
  overlayBottom: {
    marginTop: "120%",
    height: "30%",
    width: "100%"
  },

  overlayMiddle: {
    height: "30%",
    width: "100%"
  }
})