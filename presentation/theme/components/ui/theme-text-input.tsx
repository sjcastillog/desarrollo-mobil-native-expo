import React from 'react'
import { Text, TextInputProps, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


interface PropsI extends TextInputProps{ 
    icon?:keyof typeof Ionicons.glyphMap;
}


const ThemeTextInput = ({icon, ...rest}:PropsI) => {
  return (
    <View>
      <Text>ThemeTextInput</Text>
    </View>
  )
}

export default ThemeTextInput