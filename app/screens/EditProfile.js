import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

export default class componentName extends Component {
  
  constructor(props){
    super(props)

    this.state= {
      isProfileLoading: true
    } 
  }

  //Name  
  //Email 
  //Password 
  //Profile Picture
  //Banner Picture 

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
