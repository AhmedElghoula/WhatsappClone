import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  BackHandler,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export default function Auth(props) {
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

  var email, pwd;

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
            onChangeText={(text) => (email = text)}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={styles.textInputStyle}
            onChangeText={(text) => (pwd = text)}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
          <Button
            onPress={() => {
              props.navigation.navigate("Home");
            }}
            title="Submit"
          ></Button>
          <Button onPress={() => BackHandler.exitApp()} title="Exit"></Button>
        </View>

        <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              width: "100%",
              fontWeight: "bold",
              fontColor: "004f",
            }}
            onPress={() => props.navigation.navigate("NewUser")}
          >
            creer un compte
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
