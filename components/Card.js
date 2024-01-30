import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Loading from '../components/Loading';
import { firebase_db } from "../firebaseConfig"

export default function Card({ content, navigation }) {
  const [bapcou, setBapcou] = useState({
    "cnt": 0,
  });

  useEffect(() => {
    const fetchData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBapcou(data);
      }
    };

    const firebaseRef = firebase_db.ref('/bapcou/' + content.idx);
    firebaseRef.on('value', fetchData);//데이터 바로바로 로딩되도록 설정해줌

    return () => {
      // 컴포넌트가 언마운트될 때 리스너를 정리합니다.
      firebaseRef.off('value', fetchData);
    };
  }, [content.idx]);//데이터 가져오기

  if (bapcou.cnt <= 0) {
    return null;//데이터 안 가져옴
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('GetCouponPage', { idx: content.idx }) }}>
      <Image style={styles.cardImage} source={{ uri: content.image }} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{bapcou.cnt}</Text>
        <Text style={styles.cardTitle}>{content.title}</Text>
        <Text style={styles.cardDesc}>{content.desc}</Text>
        <Text style={styles.cardDate}>{content.date}</Text>
      </View>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "90%",
    height: 140,
    flexDirection: "row",
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#eee",
    alignSelf: "center",
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 10
  },
  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    marginTop: 20,
    marginLeft: 20
  },
  cardText: {
    flex: 2,
    flexDirection: "column",
    margin: 10,
    marginTop: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    justifyContent: "center",
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10
  },
  cardDate: {
    fontSize: 10,
    color: "#A6A6A6",
    textAlign: 'center',
    marginTop: 10
  }
});
