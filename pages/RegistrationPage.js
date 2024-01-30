import React,{useEffect} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const RegistrationPage = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    id: '',
    // phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  //데이트픽커??
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('이메일을 작성해주세요.', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('올바른 이메일 형식으로 작성해주세요.', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('이름을 작성해주세요.', 'fullname');
      isValid = false;
    }

    // if (!inputs.phone) {
    //   handleError('Please input phone number', 'phone');
    //   isValid = false;
    // }
    if (!inputs.id) {
      handleError('아이디를 입력해주세요', 'id');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('비밀번호를 입력해주세요.', 'password');
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError('8글자 이상 비밀번호를 입력해주세요.', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert('오류', '어떤 문제가 생겼어요. 다시 작성해주세요!');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  useEffect(()=>{
    navigation.setOptions({
        title:'회원가입',
        headerStyle: {
            backgroundColor: '#FFDB62',
            shadowColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: '700', // 글꼴을 두껍게
        },
    })
},[])
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold',marginVertical: 10,textAlign:'center'}}>
          밥쿠와 함께 해주셔서 감사합니다.
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="이름"
            placeholder="이름을 작성해주세요."
            error={errors.fullname}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="이메일"
            placeholder="이메일 주소를 작성해주세요."
            error={errors.email}
          />
          {/* <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          /> */}
          <Input
            onChangeText={text => handleOnchange(text, 'id')}
            onFocus={() => handleError(null, 'id')}
            iconName="lock-outline"
            label="아이디"
            placeholder="아이디를 입력해주세요."
            error={errors.id}
            id
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            error={errors.password}
            password
          />
          <Button title="가입하기" onPress={validate} />
          <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('LoginPage')}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            계정이 있으신가요? 로그인
          </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationPage;