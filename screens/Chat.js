import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import React from "react";
import firebase from "../config";
import { TextInput } from "react-native-paper";
const database = firebase.database();
const ref_lesDiscussions = database.ref("lesDiscussions");
export default function Chat(props) {
  const currentId = props.route.params.currentId;
  const item = props.route.params.item;
  const idDisc =
    currentId > item?.id ? currentId + item.id : item.id + currentId;
  const ref_disc = ref_lesDiscussions.child(idDisc);
  const [message, setmessage] = useState();

  const [data, setdata] = useState([]);
  useEffect(() => {
    ref_disc.on("value", (snapshot) => {
      let d = [];
      snapshot.forEach((disc) => {
        d.push(disc.val());
      });
      setdata(d);
    });
    return () => {
      ref_disc.off();
    };
  }, []);
  return (
    <ImageBackground
      source={require("../assets/bg-card-front.png")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const color = item.id == currentId ? "red" : "white";
          return (
            <View style={{ backgroundColor: color }}>
              <Text>{item.body}</Text>
              <Text>{item.time}</Text>
            </View>
          );
        }}
        style={{ width: "95%", backgroundColor: "#fff4", marginBottom: 5 }}
      />
      <View style={{ flexDirection: "row", marginBottom: 4 }}>
        <TextInput
          style={{ width: "80%", backgroundColor: "#fff4" }}
          onChangeText={(text) => {
            setmessage(text);
          }}
        />
        <Button
          onPress={() => {
            const key = ref_disc.push().key;
            const ref_message = ref_disc.child(key);
            ref_message.set({
              body: message,
              time: new Date().toLocaleString(),
              sender: currentId,
              receiver: item?.id,
            });
          }}
          color={"green"}
          title="send"
        />
      </View>
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
