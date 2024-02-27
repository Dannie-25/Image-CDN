import React, { useState } from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
import axios from 'axios';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [variants, setVariants] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    const imageRef = ref(storage, 'image.jpg');
    const response = await fetch(image);
    const blob = await response.blob();

    uploadBytes(imageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    await uploadImage();
  };

  async function uploadImage() {
    const formData = new FormData();
    formData.append('file', image);

    const result = await axios.request({
      url: 'https://api.cloudflare.com/client/v4/accounts/0ef61389d99814d54ebb4aa45b2b721e/images/v1/fb049658-453d-4264-48bd-506618ae0300',
      method: 'GET',
      headers: {
        Authorization: 'Bearer V61ZfTsT2cv2bpHYDpAOQrTrHvSjkTLFgTgwEhbE',
      },
    });

    const { data: { result: { variants } } } = result;
    setVariants(variants);
  }

  {
    "result"; {
      "id"; "fb049658-453d-4264-48bd-506618ae0300",
      "filename";"alone.jpg",
      "uploaded"; "",
      "requireSignedURLs"; false,
      "variants"; [
        "https://imagedelivery.net/37VC2dLndCZbm_Rdd_3gog/fb049658-453d-4264-48bd-506618ae0300/articulo>",
        "https://imagedelivery.net/37VC2dLndCZbm_Rdd_3gog/fb049658-453d-4264-48bd-506618ae0300/banner>",
        "https://imagedelivery.net/37VC2dLndCZbm_Rdd_3gog/fb049658-453d-4264-48bd-506618ae0300/icon>",
        "https://imagedelivery.net/37VC2dLndCZbm_Rdd_3gog/fb049658-453d-4264-48bd-506618ae0300/public>"
      ]
    }
    "success"; true,
    "errors"; [],
    "message"; []
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      {variants.length > 0 && (
        <View style={styles.variantsContainer}>
          <Text>Variantes:</Text>
          {variants.map((/*variant,*/index) => (
            //<Text key={index}>{variant}</Text>
            <Image key={index} source={{ uri: /*variant,*/image }} style={styles.variantImage} />
          ))}
        </View>
      )}
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  variantsContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  variantImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
