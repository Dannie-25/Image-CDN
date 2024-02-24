import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
import axios from 'axios';


export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {

    const imageRef = ref(storage, 'image.jpg')

    const response = await fetch(image);
    const blob = await response.blob();

    uploadBytes(imageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

  }

const [variants, setVariants] = useState([]);

  async function uploadImage(){
    const formData = new FormData();
    formData.append("file", image)
  
    axios.request({
      url:"",
      method:"POST",
      data:formData,
      headers: {
        Authorization: "Bearer (aqui va la autenticacion del could)"
      }
    })

    const {data: {result: {variants}}} = result;
    setVariants(variants);
  }

  /*{
    "result": {
      "id": "",
      "filename":"",
    }
  }*/

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Submit" onPress={onSubmit} />

      
    </View>
  );


}