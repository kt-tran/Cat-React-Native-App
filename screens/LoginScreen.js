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
      {/* TODO:
        If user exists then log in
        else create user account
        Need to render different forms for the above */}
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
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({
        ...errors,
        name: 'Name is required'
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Name is too short'
      });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  };

  return (
    <Box alignSelf="center" width="90%" mx="3">
      <Box pb="5">
        <FormControl isInvalid={'name' in errors}>
          <FormControl.Label _text={{
            color: "white"
          }}>Email</FormControl.Label>
          <Input placeholder="yourname@example.com" onChangeText={value => setData({
            ...formData,
            name: value
          })} color="white" />
          {'name' in errors ? <FormControl.ErrorMessage>That is not a valid email address.</FormControl.ErrorMessage> : <FormControl.HelperText _text={{
            color: "white"
          }}>
            Please enter your email address.
          </FormControl.HelperText>}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormControl.Label _text={{
            color: "white"
          }}>Password</FormControl.Label>
          <Input type="password" placeholder="Password" color="white" />
          <FormControl.HelperText _text={{
            color: "white"
          }}>
            Must be atleast 6 characters.
          </FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please enter your password.
          </FormControl.ErrorMessage>
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
