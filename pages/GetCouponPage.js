import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity,Alert,Share,Platform } from 'react-native';
import Loading from '../components/Loading';
import { Ionicons } from '@expo/vector-icons';

//파이어베이스 마스터 키를 불러왔음!!
import {firebase_db} from "../firebaseConfig"
// 엑스포 도구를 설치 후에 가져와서 사용하는 것입니다.
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';

export default function GetCouponPage({ navigation, route }) {
    const [bapcou, setBapcou] = useState({
      "idx": 9,
      "category": "",
      "title":"",
      "image": "https://ifh.cc/g/SWClaf.jpg",
      "desc": " ",
      "date": "",
      "cnt": 0,
      "password":0
    });
    
    useEffect(()=>{
      navigation.setOptions({
        title: '쿠폰발급',
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


        //넘어온 데이터는 route.params에 들어 있습니다.
        const { idx } = route.params;
        //특정 데이터를 조회한 다음에
        firebase_db.ref('/bapcou/'+idx).once('value').then((snapshot) => {
            let bapcou = snapshot.val();
            //상태 관리를 넣어준 상태입니다.
            setBapcou(bapcou)
        });
    },[])

    const like = async () => {
        
        // like 방 안에
        // 특정 사용자 방안에
        // 특정 찜 데이터 아이디 방안에
        // 특정 찜 데이터 몽땅 저장!
        // 찜 데이터 방 > 사용자 방 > 어떤 찜인지 아이디
        let userUniqueId;
        if(isIOS){
        let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        }else{
            userUniqueId = await Application.androidId
        }

        console.log(userUniqueId)
        //1. 마스터 키로 파이어베이스에 접속한다.
        //2. '.ref('/like/'+userUniqueId+'/'+ bapcou.idx)' 어떤 방에 데이터를 저장할 건지 주소를 명시해준다.
        //3. set(bapcou,function(error) -> set이라는 함수를 통해서 특정 데이터를 보내줬습니다. 
        //4. 달라지는 것은 주소입니다. '/like/'+userUniqueId+'/'+ bapcou.idx
        // like라는 방은 없었지만 우리가 만들면서 그 방에 저장해주는 것입니다.
        // userUniqueId어떠한 사용자의 방인지!! 
        // bapcou.idx-> 구체적인 집주소만 저장을 해준 것입니다. 
        firebase_db.ref('/like/' + userUniqueId + '/' + bapcou.idx).set(bapcou, function (error) {
            if (error) {
              console.log(error);
            } else {
              if (bapcou.cnt > 0) {
                firebase_db
                  .ref('/bapcou/' + bapcou.idx)
                  .update({ cnt: bapcou.cnt - 1 })
                  .then(() => {
                    Alert.alert("쿠폰 발급 완료!\nMy 쿠폰함에서 사용이 가능합니다");
                    navigation.navigate('MyCouponBoxPage');
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
              
              }
            }
          });
        };

    const share = () => {
        Share.share({
            message:`${bapcou.title} \n\n ${bapcou.desc} \n\n ${bapcou.image}`,
        });
    }

    
    return (
        <View style={styles.container}>
          
          <Text style={styles.title}>{String(bapcou.title)}</Text>
          <Text style={styles.title2}>{bapcou.eventType}</Text>
          <Text style={styles.cardTitle}>{bapcou.password}</Text>
          <View style={styles.textContainer}>
            <Image style={styles.image} source={{ uri: bapcou.image }} />
            <Text style={styles.desc}>{bapcou.desc}</Text>
            <Text style={styles.date}>{bapcou.date}</Text>
            <Text style={styles.date}>{"남은 쿠폰 : " + bapcou.cnt}</Text>
            <TouchableOpacity style={styles.button} onPress={()=>like()}><Text style={styles.buttonText}>쿠폰 발급받기</Text></TouchableOpacity>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFF",
      height:"110%",
    },
    image: {
      width: 260,
      height: 260,
      borderRadius: 13,
      margin: 10
      
    },
    textContainer: {
      width: "90%",
      height: 530,
      backgroundColor: "#fff",
      marginTop: 10,
      borderRadius: 13,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center" //화면 중앙에 정렬
    },
    title: {
      fontSize: 47,
      fontWeight: "700",
      color: "#6F2929",
      marginTop:50,
      textAlign: 'center' //  가운데 정렬
    },
    title2: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "700",
      marginTop: 5,
    },
    desc: {
      color: "black",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "700",
      marginTop: 20,
      paddingLeft: 22,
      paddingRight: 22
    },
    date: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "700",
      color: "#808080"
      
    },
    button: {
      backgroundColor: "#6F2929",
      padding: 20,
      margin: 20,
      borderRadius: 50,
      width: 125,
      height: 65,
      justifyContent: 'center', //  수직 중앙 정렬
      alignItems: 'center', //  수평 중앙 정렬
      marginTop:50,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16.5,
      fontWeight: "700",
      textAlign: 'center',
    }
    })