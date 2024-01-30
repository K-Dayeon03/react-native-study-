import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, KeyboardAvoidingView } from 'react-native'
import { firebase_db } from "../firebaseConfig"
import { useNavigation } from '@react-navigation/native';
import * as Application from 'expo-application';
import MainPage from '../pages/MainPage';
const isIOS = Platform.OS === 'ios';




export default function DownCard({ content, route }) {
  const navigation = useNavigation();

  const [bapcou, setBapcou] = useState({
    "idx": 9,
    "password": 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { idx } = content;
        const snapshot = await firebase_db.ref('/bapcou/' + idx).once('value');
        const data = snapshot.val();
        setBapcou(data);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, [content]);

  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openPassword = () => {
    setShowModal(true);
  };

  const closePassword = () => {
    setShowModal(false);
    setPassword('');
  };

  const checkPassword = () => {
    if (bapcou.password === Number(password)) {
      Alert.alert('쿠폰이 확인 되었습니다.', '', [
        {
          text: '확인',
          onPress: () => {
            //카드삭제
            closePassword();
            removeCard(content.idx);
           
          },
        },
      ]);
    } else {
      Alert.alert('비밀번호가 일치하지 않습니다.', '다시 입력해주세요.');
    }
  };

  const removeCard = async (idx) => {
    try {
      let userUniqueId;
      if (isIOS) {
        let iosId = await Application.getIosIdForVendorAsync();
        userUniqueId = iosId;
      } else {
        userUniqueId = await Application.androidId;
      }
  
      console.log(userUniqueId);
  
      // 데이터 삭제
      await firebase_db.ref(`/like/${userUniqueId}/${idx}`).remove();
      navigation.navigate('MainPage');
      // 삭제 후 화면 이동 또는 다른 작업 수행
    } catch (error) {
      console.error('카드 삭제 오류:', error);
      Alert.alert('카드 삭제 중 오류가 발생했습니다.');
    }
  };
  
  return (
    <View>
      <View style={styles.cardall}>
        <View style={styles.cardcolomn}>
          <View style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: content.image }} />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{bapcou.password}</Text>
              <Text style={styles.cardTitle}>{content.title}</Text>
              <Text style={styles.cardDesc}>{content.desc}</Text>
              <Text style={styles.cardDate}>{content.date}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={openPassword}><Text style={styles.buttonText}>쿠폰 확인</Text></TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="padding" enabled>
        <Modal visible={showModal} transparent={true} animationType="fade">
          <View style={styles.PasswordBackground}>
            <View style={styles.PassworPopup}>
              <Text style={styles.PasswordTitle}>비밀번호 입력</Text>
              <TextInput
                style={styles.입력창}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
              />
              <View style={styles.버튼}>
                <TouchableOpacity style={styles.PasswordButton} onPress={checkPassword}>
                  <Text style={styles.PasswordText}>입력완료</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.PasswordButton} onPress={closePassword}>
                  <Text style={styles.PasswordText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  cardall:{
    flex:1,
    flexDirection:"column",
    width:"95%",
    alignSelf:"center",
    margin:10,
  },
  cardcolomn:{
    flex:5,
    flexDirection:"column",
    borderWidth:1,
    borderColor:'#F6F6F6',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: 'white',
    elevation: 5, // 그림자 효과를 주는 elevation 속성 작성을 안 하면 안 뜨는 그림자가 안뜨는 핸드폰이 있음
    shadowColor: '#D5D5D5',//색상 변경함
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 4,

  },
  button:{
    flex:1,
    padding:10,
    borderWidth:1,
    borderColor:'#D5D5D5',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    backgroundColor: 'white',
    elevation: 5, // 숫자는 그림자 진하기
    shadowColor: '#D5D5D5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
},
    
  card:{
    flex:1,
    flexDirection:"row",
    height:140,
    
  },
  cardImage: {
    flex:1,
    width:100,
    height:110,
    borderRadius:10,
    margin:20,
  },
  cardText: {
    flex:2,
    margin:20,
    alignSelf:"center",
  },
  cardTitle: {
    fontSize:20,
    fontWeight:"700",
    justifyContent:"center",
    textAlign: 'center',


    
  },
  cardDesc: {
    fontSize:15,
    textAlign: 'center',
    marginTop:10
  },
  cardDate: {
    fontSize:10,
    color:"#A6A6A6",
    textAlign: 'center',
    marginTop:10
  },
  buttonText:{
      fontWeight:"600",
      textAlign:'center'
  },

    PasswordBackground:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",//rgba써주기
  },
  PassworPopup: {
    backgroundColor: "white",
    marginTop:50,//높이조절
    padding: 20,
    borderRadius: 13,
    width: "80%",
  
  },
  PasswordTitle: {
    fontSize: 19,
    marginTop:15,
    marginBottom: 5,
    fontWeight: "700",
    color: "#6F2929",
  },
  입력창: {
    borderColor: "#6F2929",
    borderWidth: 1,
    padding: 10,
  },
  버튼: {
    flexDirection: "row",
    justifyContent: "center",
  },
  PasswordButton: {
    marginRight: 30,
    paddingVertical: 10,
    alignItems: "center",
 
  },
  PasswordButton2: {
    marginLeft: 30,
    paddingVertical: 10,
    alignItems: "center",
 
  },
  PasswordText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6F2929",
  },
});