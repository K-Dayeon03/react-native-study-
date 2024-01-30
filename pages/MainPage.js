import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from "../firebaseConfig";
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper/src';
import Loading from '../components/Loading';
import Card from '../components/Card';


export default function MainPage({ navigation }) {
  
  console.disableYellowBox = true;

  const [state, setState] = useState([]);
  const [cateState, setCateState] = useState([]);
  const [ready, setReady] = useState(true);
  const [todayHotPlace, setTodayHotPlace] = useState('');


  useEffect(() => {     navigation.setOptions({
    title: '밥상쿠폰',
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
    const fetchData = async () => {
      try {
        const snapshot = await firebase_db.ref('/bapcou').once('value');
        const bapcouData = snapshot.val();
        setState(bapcouData);
        setCateState(bapcouData);
        setReady(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!ready) {
      const randomIndex = Math.floor(Math.random() * state.length);
      const randomTip = state[randomIndex].title;
      setTodayHotPlace(randomTip); //오늘의 추천 가게 랜덤으로 바뀜
    }
  }, [state, ready]);

  
  const category = (cate) => {
    if (cate === "전체보기") {
      setCateState(state);
    } else {
      setCateState(state.filter((d) => d.category === cate));
    }
  };

  return ready ? (
    <Loading />
  ) : (
    <ScrollView style={styles.container}>
      <StatusBar style="black" />
      <View style={styles.header}>
        <View style={styles.login}>
          <TouchableOpacity onPress={() => { navigation.navigate('LoginPage') }}><Text>로그인</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('EventUploadPage') }}><Text>이벤트업로드</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('RegistrationPage') }} style={{ marginLeft: 15 }}><Text>회원가입</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.BoxButton} onPress={() => { navigation.navigate('MyCouponBoxPage') }}>
          <Image style={{ height: 30, width: 30, alignSelf: "center" }} source={{ uri: 'https://ifh.cc/g/PWmYgH.png' }} />
          <Text style={styles.BoxButtonText}>My 쿠폰함</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.HotPlace}>오늘의 추천 가게: {todayHotPlace}</Text>
      <View>
        <Swiper style={styles.swiper} autoplay={true} autoplayTimeout={2} >
          {state.map((content, i) => {
            return (
              <Image key={i} source={{ uri: content.image }} style={styles.slideImage} />
            )
          })}
        </Swiper>
      </View>
      <ScrollView style={styles.middleContainer} horizontal indicatorStyle={'white'}>
        <TouchableOpacity style={styles.middleButton} onPress={() => { category('전체보기') }}>
          <Image style={styles.middleButtonImage} source={{ uri: 'https://ifh.cc/g/PWzdZs.png' }} />
          <Text style={styles.middleButtonText}>전체보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton} onPress={() => { category('한식') }}>
          <Image style={styles.middleButtonImage} source={{ uri: 'https://ifh.cc/g/t0vTKJ.png ' }} />
          <Text style={styles.middleButtonText}>한식</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton} onPress={() => { category('양식') }}>
          <Image style={styles.middleButtonImage} source={{ uri: 'https://ifh.cc/g/AQnofZ.png' }} />
          <Text style={styles.middleButtonText}>양식</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton} onPress={() => { category('일식') }}>
          <Image style={styles.middleButtonImage} source={{ uri: 'https://ifh.cc/g/vjbQ2F.png' }} />
          <Text style={styles.middleButtonText}>일식</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton} onPress={() => { category('중식') }}>
          <Image style={styles.middleButtonImage} source={{ uri: 'https://ifh.cc/g/NRvdYW.png ' }} />
          <Text style={styles.middleButtonText}>중식</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton} onPress={() => { category('디저트') }}>
          <Image style={styles.middleButtonImage} source={{ uri: 'https://ifh.cc/g/KWvtpT.png' }} />
          <Text style={styles.middleButtonText}>디저트</Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView style={styles.cardContainer}>
        {cateState.map((content, i) => {
          return (<Card content={content} key={i} navigation={navigation} />)
        })}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: 20,
  },
  login: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HotPlace: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 15,
    fontWeight: '700',
  },
  BoxButton: {
    width: 100,
    height: 30,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginRight: 20,
    flexDirection: 'column',
  },
  BoxButtonText: {
    color: "#6F2929",
    textAlign: "center",
    fontWeight: '700',
    alignSelf: "center",
  },
  swiper: {
    height: 250,
    marginTop: 10
  },
  slideImage: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover'
  },
  middleContainer: {
    marginTop: 20,
    marginLeft: 5,
  },
  middleButtonImage: {
    width: 50,
    height: 50,
    marginLeft: 1,
    alignSelf: "center"
  },
  middleButton: {
    width: 69,
    flex: 1,
    marginLeft: 7,
  },
  middleButtonText: {
    color: "black",
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 1,
  },

  cardContainer: {//쿠폰 형태 전체 
    marginTop:10,
    marginLeft:10
  },
  BoxButton: {  //발급받은 쿠폰함 넘어가는 버튼
    
    width:100,
    height:30,
    borderRadius:10,
    alignSelf:"flex-end",
    marginRight:20,
    flexDirection: 'column',
  },
  BoxButtonText: {
    color:"#6F2929",
    textAlign:"center",
    fontWeight:'700',
    alignSelf:"center",
    
  },
  swiper: {
    
    height:250,
    marginTop:10
  },


  
 
slideImage: {
    alignSelf:'center',
    width:'90%',
    height:200,    
    borderRadius:10,
    marginTop:10,
    resizeMode: 'cover'//이미지 꽉차게
  },



});