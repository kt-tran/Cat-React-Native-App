import React, { useState } from "react";
import { Text, View, StyleSheet, ImageBackground, Alert, Platform } from "react-native";
import { FormControl, Input, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider, VStack, Button, Container, Heading, } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { scaleSize } from '../constants/Layout';
import * as EmailValidator from 'email-validator';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function LoginScreen() {
  const [value, setValue] = React.useState("");
  const handleChange = text => setValue(text);
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <ImageBackground source={{ uri: 'https://w.wallhaven.cc/full/eo/wallhaven-eod6w8.jpg' }} resizeMode="cover" style={styles.image}>
        {Platform.OS === 'ios' ?
          <Center style={styles.base}>
            <KeyboardAwareScrollView style={styles.ios}>
              <Heading size={"2xl"} mb="3" color="white">Login</ Heading >
              <Text style={styles.subheading}>Please enter your details to sign in.</ Text >
              <LoginForm />
              <Text style={styles.changetext}> Don't have an account? <Text style={styles.buttonish} onPress={() => { navigation.push("Register"); }}>Sign up</Text></Text>
            </KeyboardAwareScrollView>
          </Center> :
          <Center style={styles.base}>
            <Heading size={"2xl"} mb="3" color="white">Login</ Heading >
            <Text style={styles.subheading}>Please enter your details to sign in.</ Text >
            <LoginForm />
            <Text style={styles.changetext}> Don't have an account? <Text style={styles.buttonish} onPress={() => { navigation.push("Register"); }}>Sign up</Text></Text>
          </Center>}
      </ImageBackground>
    </NativeBaseProvider>
  );
}

function LoginForm() {
  const [email, setEmail] = React.useState({});
  const [password, setPassword] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const navigation = useNavigation();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('my-key', value);
    } catch (e) {
      // saving error
    }
  };

  const validate = () => {
    if (!EmailValidator.validate(email)) {
      setErrorEmail(true);
    }
    else {
      setErrorEmail(false);
    }

    if (password.length === 0) {
      setErrorPassword(true);
    }
    else {
      setErrorPassword(false);
    }

    if (errorEmail || errorPassword)
      return false;
    else
      return true;
  };

  const failAlert = () => {
    Alert.alert('Uh oh!', "It looks like you weren't finished. Please try again.", [
      { text: 'OK', onPress: () => { console.log("OK pressed") } },
    ]);
  }

  const badCredentials = () => {
    Alert.alert('Uh oh!', "It looks your email or password were incorrect. Please try again.", [
      { text: 'OK', onPress: () => { console.log("OK pressed") } },
    ]);
  }

  const onSubmit = () => {
    if (validate()) {
      fetch(`http://192.168.1.186:3001/users/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.error === true) {
            throw Error(res.message)
          }

          storeData(res.token)
          navigation.push("Main")
        })
        .catch(e => {
          badCredentials();
          return;
        })
    }
    else {
      failAlert();
      console.log("Validation Failed");
    }
  };

  return (
    <Box alignSelf="center" width="90%" mx="3">
      <Box pb="5">
        <FormControl isInvalid={errorEmail}>
          <FormControl.Label _text={{
            color: "white"
          }}>Email</FormControl.Label>
          <Input placeholder="yourname@example.com" onChangeText={email => setEmail(email)} color="white" />
          {errorEmail
            ? <FormControl.ErrorMessage>That is not a valid email address.</FormControl.ErrorMessage>
            : <FormControl.HelperText _text={{
              color: "white"
            }}>
              Please enter your email address.
            </FormControl.HelperText>}
        </FormControl>
      </Box>
      <Box>
        <FormControl isInvalid={errorPassword}>
          <FormControl.Label _text={{
            color: "white"
          }} >Password</FormControl.Label>
          <Input placeholder="Password" color="white" onChangeText={password => setPassword(password)} />
          {errorPassword
            ? <FormControl.ErrorMessage >
              Please enter your password.
            </FormControl.ErrorMessage>
            : null}
        </FormControl>
      </Box>
      <Button onPress={onSubmit} mt="5" style={styles.button}>
        Login
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  base: {
    backgroundColor: '#000000c0',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(32),
    borderRadius: scaleSize(4),
    elevation: scaleSize(3),
    backgroundColor: '#354F52',
  },
  subheading: {
    color: 'white',
    fontSize: scaleSize(14),
    textAlign: 'center',
    marginBottom: scaleSize(25),
    justifyContent: "flex-start",
  },
  changetext: {
    color: 'white',
    fontSize: scaleSize(14),
    textAlign: 'center',
    marginTop: scaleSize(15),
    justifyContent: "flex-end",
  },
  buttonish: {
    fontWeight: "900",
  },
  ios: {
    marginTop: scaleSize(100),
  }
});
