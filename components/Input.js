import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? '#FF0000' : isFocused ? '#6F2929' : '#FFDB62',
            alignItems: 'center',
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ color: '#6F2929', fontSize: 22, marginRight: 10 }}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: '#808080', flex: 1 }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ color: '#6f2929', fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: '#FF0000', fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#A9A9A9',
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 8,
  },
});
// white: '#fff',
// black: '#000',
// blue: '#5D5FEE',
// grey: '#9BA4B5',
// light: '#F3F4FB',
// darkBlue: '#7978B5',
// red: 'red',
// Yello:'#FFE194',
// green:'#47A992',
// lightBlue:'#E8F6EF',
// darkGray:'#27374D'
export default Input;
