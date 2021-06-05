import * as React from 'react'
import {Button, Image, View, Platform} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
export default class PickImage extends React.Component{
  state = {
    image: null
  }

render(){
  var image = this.state.image
  return(
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
    <Button title = 'pick an image from cam roll' onPress = {this.pick_image}>
    </Button>
    </View>
  )
}
componentDidMount(){
  this.getPermissionsAsync()
}

getPermissionsAsync = async()=>{
  if (Platform.OS !== 'web'){
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted'){
      alert('sorry we need cam roll permissions')
    }
  }
}

  pick_image = async()=>{
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({image : result.data})
      console.log(result.uri)
      this.uploadimage(result.uri);
    }
    }

    catch (error){console.log(error)}
  }

  uploadimage = async(uri)=>{
    const data = new FormData()
    var filename = uri.split('/')[uri.split('/').length - 1]
    var type = 'image/$'{uri.split('.')[uri.split('.').length - 1]}
    const filetoupload = {
      uri:uri,name:filename, type:type
    }
    data.append('digit', filetoupload)
    fetch('', {
      method : 'POST',
      body:data,
      headers:{
        'content-type':'multipart/form-data'
      }
    })

  }




}
