import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  onChangeText,
  onKeyPress,
  onSubmitEditing,
  InputItem
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        selectionColor="#000"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        placeholderTextColor="#000"
        placeholder={placeholder}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        underlineColorAndroid="transparent"
        style={[styles.inputfield, style]}
        onSubmitEditing={onSubmitEditing}
      />
      <View style={styles.inputIcon}>
        {InputItem &&
          <InputItem />
        }
      </View>
    </View>
  )
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderColor: '#999',
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flexDirection: 'row'
  },
  inputfield: {
    flex: 1,
    color: '#424242',
    fontSize: 16
  },
  inputIcon: {
    alignSelf: 'center'
  }
})