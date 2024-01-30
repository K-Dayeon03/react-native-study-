import React,{useState, useEffect} from 'react';
import { ScrollView, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DownCard from '../components/DownCard';
import Loading from '../components/Loading';
import { Ionicons } from '@expo/vector-icons';
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';
import {firebase_db} from "../firebaseConfig"

export default function MyCouponBoxPage({navigation,route}){
   
    const [bapcou, setBapcou] = useState([])
    const [ready,setReady] = useState(true)

    useEffect(() => {
      navigation.setOptions({
        title: 'MY 쿠폰함',
        headerStyle: {
          backgroundColor: '#FFDB62', // 헤더 배경색
        },
        headerTintColor: '#fff', // 헤더 텍스트 색상
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => {
              navigation.navigate('MainPage');
            }}
          >
            <Ionicons name="home" size={24} color="white" />
          </TouchableOpacity>//집모양아이콘메인페이지로 이동
        ),
      });
        getLike()
    },[])

    const getLike = async () => {
        let userUniqueId;
        if (isIOS) {
          let iosId = await Application.getIosIdForVendorAsync();
          userUniqueId = iosId;
        } else {
          userUniqueId = await Application.androidId;
        }
      
        console.log(userUniqueId);
        firebase_db.ref('/like/' + userUniqueId)
          .once('value')
          .then((snapshot) => {
            console.log("파이어베이스에서 데이터 가져왔습니다!!");
            if (snapshot.exists()) {
              let bapcou = snapshot.val();
              let bapcou_list = Object.values(bapcou);
              if (bapcou_list && bapcou_list.length > 0) {
                setBapcou(bapcou_list);
                setReady(false);
              }
            } else {
              console.log("데이터가 존재하지 않습니다.");
            }
          })
          .catch((error) => {
            console.log("데이터 가져오기 오류:", error);
          });
      };//else로 null인 경우를 추가 안 할 경우도 만들어 주어야함
    return (
        <ScrollView style={styles.container}>
           {
               bapcou.map((content,i)=>{
                   // LikeCard에서 꿀팀 상태 데이터(==bapcou)과 꿀팁 상태 데이터를 변경하기 위한
                   // 상태 변경 함수(== setBapcou)을 건네준다.
                   //즉 자기 자신이 아닌, 자식 컴포넌트에서도 부모의 상태를 변경할 수 있다.
                   return(<DownCard key={i} content={content} navigation={navigation} bapcou={bapcou} setBapcou={setBapcou}/>)
               })
           }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff"
    }
})