import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { firebase_db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

export default function InputPage({ route, navigation }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [eventType, setEventType] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [cnt, setCnt] = useState("");
  const [idx, setIdx] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: "이벤트 업로드",
      headerStyle: {
        backgroundColor: "#FFDB62", // 헤더 배경색
      },
      headerTintColor: "#fff", // 헤더 텍스트 색상
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            navigation.navigate("MainPage");
          }}
        >
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity> //집모양아이콘메인페이지로 이동
      ),
    });
  }, []);

  const InputChange = (text, setInputState) => {
    setInputState(text);
  };

  const update = () => {
    console.log("Idx:", idx);
    console.log("Category:", category);
    console.log("Title:", title);
    console.log("Image:", image);
    console.log("EventType:", eventType);
    console.log("Desc:", desc);
    console.log("Date:", date);
    console.log("Cnt:", cnt);

    // 파이어베이스에 데이터 업로드
    const data = {
      idx: idx,
      category,
      cnt: parseInt(cnt),
      couponpassword: parseInt(cnt),
      date,
      desc,
      eventType,
      image,
      title,
    };

    firebase_db.ref(`/bapcou/${idx}`).set(data);
    Alert.alert("쿠폰을 등록 하셨습니다!");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="인덱스"
        value={idx}
        onChangeText={(text) => InputChange(text, setIdx)}
      />
      <TextInput
        style={styles.input}
        placeholder="이미지링크"
        value={image}
        onChangeText={(text) => InputChange(text, setImage)}
      />
      <TextInput
        style={styles.input}
        placeholder="카테고리"
        value={category}
        onChangeText={(text) => InputChange(text, setCategory)}
      />
      <TextInput
        style={styles.input}
        placeholder="가게이름"
        value={title}
        onChangeText={(text) => InputChange(text, setTitle)}
      />
      <TextInput
        style={styles.input}
        placeholder="이벤트 내용"
        value={eventType}
        onChangeText={(text) => InputChange(text, setEventType)}
      />
      <TextInput
        style={styles.input}
        placeholder="설명"
        value={desc}
        onChangeText={(text) => InputChange(text, setDesc)}
      />
      <TextInput
        style={styles.input}
        placeholder="날짜"
        value={date}
        onChangeText={(text) => InputChange(text, setDate)}
      />
      <TextInput
        style={styles.input}
        placeholder="발급 쿠폰 개수"
        value={cnt}
        onChangeText={(text) => InputChange(text, setCnt)}
      />

      <TouchableOpacity style={styles.button} onPress={update}>
        <Text style={styles.buttonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10, //양옆에 공백
  },
  button: {
    height: 55,
    width: "100%",
    backgroundColor: "#6F2929",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
