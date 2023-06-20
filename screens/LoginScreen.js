import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ImageBackground } from "react-native";
import { FormControl, Input, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider, VStack, Button, Container, Heading, extend } from "native-base";
import { useNavigation } from "@react-navigation/native";
import * as EmailValidator from 'email-validator';

export default function LoginScreen() {
  const [value, setValue] = React.useState("");
  const handleChange = text => setValue(text);
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <ImageBackground source={{ uri: 'https://w.wallhaven.cc/full/eo/wallhaven-eod6w8.jpg' }} resizeMode="cover" style={styles.image}>
        <Center style={styles.base}>
          <Heading size={"2xl"} mb="3" color="white">Login</ Heading >
          <Text style={styles.subheading}>Please enter your details to sign in.</ Text >
          <LoginForm />
          <Text style={styles.changetext}> Don't have an account? <Text style={styles.buttonish} onPress={() => { navigation.push("Register"); }}>Sign up</Text></Text>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

function LoginForm() {
  const [email, setEmail] = React.useState({});
  const [password, setPassword] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);

  const validate = () => {
    if (!EmailValidator.validate(email)) {
      setErrorEmail(true);
    }
    else {
      setErrorEmail(false);
    }

    if (password.length === 0) {
      setErrorPassword(true);
      console.log(errorPassword);
      console.log(password.length);
    }
    else {
      setErrorPassword(false);
    }

    if (errorEmail || errorPassword)
      return false;
    else
      return true;
  };

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#354F52',
  },
  subheading: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 100,
    justifyContent: "flex-start",
  },
  changetext: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    justifyContent: "flex-end",
  },
  buttonish: {
    fontWeight: "900",
  }
});
