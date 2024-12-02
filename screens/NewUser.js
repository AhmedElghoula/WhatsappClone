import { View, Text, ImageBackground, StyleSheet, Button } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import firebase from "../config";
const auth = firebase.auth();
export default function NewUser(props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    textInputStyle: {
      width: "95%",
      height: 45,
      backgroundColor: "#55ff",

      overflow: "hidden",
    },
  });

  var pwd, confirmPwd, email;

  return (
    <ImageBackground
      source={require("../assets/bg-card-front.png")}
      style={styles.container}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          width: "95%",
          backgroundColor: "#0005",
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#fff",
          }}
        >
          Bienvenue
        </Text>
        <View
          style={{
            flexDirection: "col",
            width: "100%",
            gap: 20,
            padding: 5,
          }}
        >
          <TextInput
            placeholder="email@gmail.com"
            keyboardType="email-address"
            style={styles.textInputStyle}
            onChangeText={(text) => {
              email = text;
            }}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={styles.textInputStyle}
            onChangeText={(text) => {
              pwd = text;
            }}
          />
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            style={styles.textInputStyle}
            onChangeText={(text) => {
              confirmPwd = text;
            }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
          <Button
            title="Register"
            onPress={() => {
              auth
                .createUserWithEmailAndPassword(email, pwd)
                .then(() => {
                  const currentId = auth.currentUser.uid;
                  props.navigation.replace("Home", { id: currentId });
                })
                .catch((error) => {
                  alert(error);
                });
            }}
          ></Button>
          <Button title="Exit"></Button>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
