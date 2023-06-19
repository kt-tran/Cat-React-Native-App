import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { FormControl, Input, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider, VStack, Button, Container } from "native-base";

export default function LoginScreen() {
  const [value, setValue] = React.useState("");
  const handleChange = text => setValue(text);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        {/* TODO:
        If user exists then log in
        else create user account
        Need to render different forms for the above */}
        <Container alignSelf="center" p="8">
          < Text >Please enter your details to sign in.</ Text >
        </Container>
        <Container alignSelf="center" width="70%">
          <BuildingAFormExample />
        </Container>
      </View>
    </NativeBaseProvider>
  );
}

function BuildingAFormExample() {
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
    <VStack width="90%" mx="3">
      <Box pb="5">
        <FormControl isInvalid={'name' in errors}>
          <FormControl.Label _text={{
            bold: true
          }}>Email</FormControl.Label>
          <Input placeholder="yourname@example.com" onChangeText={value => setData({
            ...formData,
            name: value
          })} />
          {'name' in errors ? <FormControl.ErrorMessage>That is not a valid email address.</FormControl.ErrorMessage> : <FormControl.HelperText>
            Please enter your email address.
          </FormControl.HelperText>}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" placeholder="Password" />
          <FormControl.HelperText>
            Must be atleast 6 characters.
          </FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please enter your password.
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      <Button onPress={onSubmit} mt="5" colorScheme="cyan">
        Login
      </Button>
    </VStack>
  );
}