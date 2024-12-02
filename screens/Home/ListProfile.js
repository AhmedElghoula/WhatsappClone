import {
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/compat/app";
export default function ListProfile(props) {
  const currentId = props.currentId;
  const db = firebase.database();
  const ref_lesprofiles = db.ref("lesprofiles");
  const [data, setdata] = useState([]);
  const d = [];
  useEffect(() => {
    ref_lesprofiles.on("value", (snapshot) => {
      snapshot.forEach((profile) => {
        if (profile.val.id == currentId) {
          d.push(profile.val());
        }
      });
      setdata(d);
    });
    return () => {
      ref_lesprofiles.off();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/bg-card-front.png")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>List Profiles</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <Text
              key={item.nom}
              onPress={() => {
                props.navigation.navigate("Chat", {
                  currentId: currentId,
                  item: item,
                });
              }}
            >
              {item.nom} {item.pseudo}
            </Text>
          );
        }}
        style={{ backgroundColor: "#afff4", width: "95%" }}
      ></FlatList>
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
    color: "#fff",
    fontWeight: "bold",
    marginTop: 50,
  },
  container: {
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
