import React,{useEffect} from 'react'
import {ScrollView, View, Text,StyleSheet, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Input from '../components/Input';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
export default function LoginPage({route, navigation}){
  navigation.setOptions({
    title: '로그인',
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
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.title1}>이메일과 비밀번호를 입력하세요.</Text>
        <View style={styles.middlecontainer}>
            <Input 
            placeholder='이메일 주소를 입력하세요.'
            iconName="email-outline" 
            label="Email"
            />
            <Input 
            placeholder='비밀번호를 입력하세요.'
            iconName="lock-outline" 
            label="Password"
            password
            />
            <TouchableOpacity
       onPress={() => navigation.navigate('MainPage')}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: '#6F2929',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* Button.js가 회원가입 페이지에서 사용하는 양식과 동일해서 그냥 버튼을 사용하지 않고 연결시켜버림 */}
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
        Login
      </Text>
    </TouchableOpacity>
            <Text
            onPress={() => navigation.navigate('RegistrationPage')}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            로그인 정보가 없나요? 회원가입
          </Text>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',   
    },
    title1: {
        color: 'grey',
        fontSize: 18,
        marginVertical: 10,
    },
    middlecontainer:{
        marginVertical: 20,
    },

})