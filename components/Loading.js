import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';


export default function Loading() {
  const [rotation] = useState(new Animated.Value(0)); // 회전값을 담을 상태 변수

  useEffect(() => {
    startRotation(); // 컴포넌트가 마운트되면 회전 애니메이션 시작
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1, // 360도 회전
        duration: 1000, // 회전 애니메이션의 지속 시간 (밀리초)
        easing: Easing.linear, //속도 일정하게
        useNativeDriver: true, 
      })
    ).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [-1, 1], // 무한 반복
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://ifh.cc/g/gjN7z9.png' }}
        style={[styles.image, { transform: [{ rotate: rotateInterpolate }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdc453',
  },
  image: {
    width: 180,
    height: 180,
  },
});
