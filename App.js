import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import Torch from 'react-native-torch'
import RNShake from 'react-native-shake'

const App = () =>{
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(()=>{
    //liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /* Quando o celular for chacoalhado, mudaremos o toggle */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    return () => subscription.remove();
  }, [])

  return (
    <View style={toggle ? style.containerLight : style.container} >
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image 
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle 
              ? require('./assets/eco-light.png') 
              : require('./assets/eco-light-off.png')}
        />
        <Image 
          style={style.dioLogo}
          source={
            toggle 
              ? require('./assets/logo-dio.png') 
              : require('./assets/logo-dio-white.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default App

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: "#fff",
    width: 150,
    height: 150
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250
  },
});