import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  RefreshControlBase,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import firebase from "firebase/compat/app";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../config";
export default function MyProfile() {
  const [nom, setNom] = useState();
  const [pseudo, setpseudo] = useState();
  const [telephone, setTelephone] = useState();
  const [isDefaultImage, setisDefaultImage] = useState(true);
  const [uriLocalImage, seturiLocalImage] = useState();
  const [localImage, setlocalImage] = useState();

  const db = firebase.database();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setisDefaultImage(false);
      seturiLocalImage(result.assets[0].uri);
      setlocalImage(result.assets[0].fileName);
    }
  };

  const uploadImageToStorage = async () => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const arraybuffer = await new Response(blob).arrayBuffer();

    await supabase.storage
      .from("ProfileImage")
      .upload(localImage, arraybuffer, {
        upsert: true,
      });

    const { link } = supabase.storage
      .from("ProfileImage")
      .getPublicUrl(localImage);
    return link.publicUrl;
  };
  return (
    <ImageBackground
      source={require("../../assets/bg-card-front.png")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>My Account</Text>

      <TouchableHighlight onPress={() => pickImage()}>
        <Image
          source={
            isDefaultImage
              ? require("../../assets/icon.png")
              : { uri: uriLocalImage }
          }
          style={{
            height: 200,
            width: 200,
          }}
        />
      </TouchableHighlight>
      <TextInput
        onChangeText={(text) => {
          setNom(text);
        }}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Nom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setpseudo(text);
        }}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Pseudo"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setTelephone(text);
        }}
        placeholderTextColor="#fff"
        textAlign="center"
        placeholder="Numero"
        style={styles.textinputstyle}
      ></TextInput>
      <TouchableHighlight
        onPress={async () => {
          const uriImage = await uploadImageToStorage();

          const ref_lesprofiles = db.ref("lesprofiles");
          const key = ref_lesprofiles.push().key;
          const ref_unprofil = ref_lesprofiles.child("unprofil_" + key);
          ref_unprofil.set({ nom, pseudo, telephone, uriImage });
        }}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={{
          marginBottom: 10,
          borderColor: "#00f",
          borderWidth: 2,
          backgroundColor: "#08f6",
          textstyle: "italic",
          fontSize: 24,
          height: 60,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 24,
          }}
        >
          Save
        </Text>
      </TouchableHighlight>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontWeight: "bold",
    backgroundColor: "#0004",
    fontSize: 20,
    color: "#fff",
    width: "75%",
    height: 50,
    borderRadius: 10,
    margin: 5,
  },
  textstyle: {
    fontSize: 40,
    fontFamily: "serif",
    color: "#07f",
    fontWeight: "bold",
  },
  container: {
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
