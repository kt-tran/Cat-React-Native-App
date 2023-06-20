import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ImageBackground, Alert } from "react-native";
import { FormControl, Input, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider, VStack, Button, Container, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { scaleSize } from '../constants/Layout';
import * as EmailValidator from 'email-validator';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function RegisterScreen() {
  const [value, setValue] = React.useState("");
  const handleChange = text => setValue(text);
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <ImageBackground source={{ uri: 'https://w.wallhaven.cc/full/eo/wallhaven-eod6w8.jpg' }} resizeMode="cover" style={styles.image}>
        <Center style={styles.base}>
          <KeyboardAwareScrollView>
            <Heading size={"2xl"} mb="3" color="white">Create Account</ Heading >
            <RegistrationForm />
            <Text style={styles.changetext}> Already have an account? <Text style={styles.buttonish} onPress={() => { navigation.push("Login"); }}>Log in here</Text></Text>
          </KeyboardAwareScrollView>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

function RegistrationForm() {
  const [username, setUsername] = React.useState({});
  const [email, setEmail] = React.useState({});
  const [password, setPassword] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const navigation = useNavigation();

  const validate = () => {
    if (!EmailValidator.validate(email)) {
      setErrorEmail(true);
    }
    else {
      setErrorEmail(false);
    }
    if (password.length < 6) {
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

  const createAlert = () => {
    Alert.alert('Welcome to Purrfect Paws!', 'Thanks for registering an account :)', [
      { text: 'OK', onPress: () => { navigation.push("Login"); } },
    ]);
  }

  const onSubmit = () => {
    if (validate()) {
      createAlert();
      fetch(`http://192.168.1.186:3001/users/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password
        })
      })
        .catch(e => {
          console.log(e)
        })

    }
    else {
      console.log('Validation Failed');
    }
  };

  return (
    <Box alignSelf="center" width="90%" mx="3">
      <Box pb="3">
        <FormControl>
          <FormControl.Label _text={{
            color: "white"
          }}>Username</FormControl.Label>
          <Input placeholder="CrazyAlice" onChangeText={username => setUsername(username)} color="white" />
        </FormControl>
      </Box>
      <Box pb="3">
        <FormControl isInvalid={errorEmail} isRequired>
          <FormControl.Label _text={{
            color: "white"
          }}>Email</FormControl.Label>
          <Input placeholder="yourname@example.com" color="white" onChangeText={email => setEmail(email)} />
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
        <FormControl isInvalid={errorPassword} isRequired>
          <FormControl.Label _text={{
            color: "white"
          }}>Password</FormControl.Label>
          <Input placeholder="Password" color="white" onChangeText={password => setPassword(password)} />
          {errorPassword
            ? <FormControl.ErrorMessage >
              Please create a password.
            </FormControl.ErrorMessage>
            : <FormControl.HelperText _text={{
              color: "white"
            }}>
              Must be atleast 6 characters.
            </FormControl.HelperText>
          }
        </FormControl>
      </Box>
      <Button onPress={onSubmit} mt="5" style={styles.button}>
        Register
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#354F52',
  },
  changetext: {
    color: 'white',
    fontSize: scaleSize(12),
    textAlign: 'center',
    marginTop: 15,
    justifyContent: "flex-end",
  },
  buttonish: {
    fontWeight: "900",
  }
});
