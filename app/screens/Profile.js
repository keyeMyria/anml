import React, { Component }  from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, Platform, Animated } from 'react-native';
import {  Icon } from 'react-native-elements';
import  { LinearGradient }  from 'expo';
import { Ionicons } from '@expo/vector-icons';

//Components 
import StatsLabel from '../components/StatsLabel';
import ButtonOutline from '../components/ButtonOutline';

export default class Profile extends Component {

  constructor(props){
    super(props);

  }

  async getProfilePosts() {
    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/feed`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log(responseJSON)
        this.setState({
          isFeedLoading: false,
          posts: responseJSON,
        })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Unable to get the feed. Please try again later')
    }
  }

  _renderBannerImage = (image) => {
    if(image){
      return(
        <Image
        source={{uri: image }}
        style= {{
          width: '100%', 
          height: 300,
        }}
      />
      )
    }
  }


  _renderProfileImage = (image) => {
    if(image){
      return(
        <Image 
         source={{uri: image}}
         style={{
           width: 100,
           height: 100, 
           borderRadius: 50, 
           top: -30,

           marginLeft: 5,
         }}
        />  
      )
    }
  }

  render(){

    const { navigate } = this.props.navigation
    const { profile } = this.props.navigation.state.params

    console.log(profile)

    return(
      <View style={{
          flex: 1,
          alignContent: 'center',
        }}
      >
      
      {this._renderBannerImage(profile.banner_image)}

      <View style={styles.headerContainer}>
        {this._renderProfileImage(profile.profile_image)}

        <View style={styles.labelButtonContainer}> 

          <View style={styles.labelContainer}>
            <StatsLabel
            stats='1'
            title='posts'
            />
            <StatsLabel
            stats='261'
            title='followers'
            />
            <StatsLabel
            stats='1'
            title='following'
            />
          </View> 

        <View style={styles.buttonContainer}>
          <ButtonOutline 
            
            title='edit profile'
            buttonEnabled={true}
            width={160}
            height={30}
            borderRadius={20}
            onPress={() => navigate('EditProfile')}
          />
          </View>
        </View>
      </View> 
     </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: 'transparent'
  }, 

  headerContainer: {
    width: '100%',
    top: -30,
    flexDirection: 'row',
    backgroundColor: '#FFEBB7',  

    
  },

  labelContainer: {
    flex: 1,  
    paddingTop: 10,
    flexDirection: 'row',
  },

  labelButtonContainer: { 
    flex: 1,
  },
  
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
  }
})