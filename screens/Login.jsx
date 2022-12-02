import { COLORS, isSmall, SIZES } from "../constants";
import React, { useState } from "react";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { Formik } from "formik";
import { Text } from "react-native";
import * as yup from "yup";
import { Button, Snackbar } from "react-native-paper";
import UserService from "../services/user.service";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [error, setError] = React.useState({ message: null });
  const onDismissSnackBar = () => setError(false);
  const [loading, setLoading] = useState(false);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),

    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const handleRegistration = async ({ email, password }, { setErrors }) => {
    setLoading(true);
    try {
      const res = await UserService.login({ email, password });
      await AsyncStorage.setItem('userId', res?.data?.data?.user?._id)
      navigation.navigate("MyTabs");
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error))
      if (error?.code === "ERR_BAD_REQUEST") {
        setErrors({
          email: "Invalid Credentials",
          password: "Invalid Credentials",
        });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Container>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: "", password: "", name: "" }}
          onSubmit={handleRegistration}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <KeyboardAvoidingScrollView>
                <WelcomeText>SignIn to the Account</WelcomeText>

                <Fields>
                  {/* <Box>
                   <Label>Name</Label> 
                  <Input
                    name="name"
                    placeholder="Name"
                    //   style={styles.textInput}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                </Box>
                {errors.name && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.name}
                  </Text>
                )} */}
                  <Box>
                    {/* <Label>Email ID</Label> */}
                    <Input
                      name="email"
                      placeholder="Email Address"
                      //   style={styles.textInput}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </Box>
                  {errors.email && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.email}
                    </Text>
                  )}
                  <Box>
                    {/* <Label>Password</Label> */}
                    <Input
                      name="password"
                      placeholder="Password"
                      // style={styles.textInput}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                    />
                  </Box>
                  {errors.password && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.password}
                    </Text>
                  )}
                  <Button
                    style={{
                      backgroundColor: !isValid ? "grey" : COLORS.purple2,
                      marginTop: 20,
                      paddingTop: 3,
                      paddingBottom: 3,
                    }}
                    mode="contained"
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={!isValid}
                  >
                    Login
                  </Button>
                </Fields>
              </KeyboardAvoidingScrollView>
            </>
          )}
        </Formik>
      </Container>
      <Snackbar
        onDismiss={onDismissSnackBar}
        visible={error.message != null}
        duration={1000}
      >
        {error.message}
      </Snackbar>
    </>
  );
};

export default Login;

//styles
const Container = styled.View`
  flex: 1;
  padding: 30px;
  padding-top: ${Constants.statusBarHeight + 20}px;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.darkgrey : COLORS.white2};
  justify-content: center;
`;

const WelcomeText = styled.Text`
  font-size: ${isSmall ? 34 : 38}px;
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.purple2 : COLORS.deepBlue};
  width: 80%;
`;

const Fields = styled.View`
  /* flex: 1; */
  padding: 20px 10px;
`;

const Box = styled.View`
  justify-content: center;
  margin: ${isSmall ? 10 : 20}px 0px;
`;

const Label = styled.Text`
  font-size: 22px;
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
`;

const Input = styled.TextInput`
  padding: 12px 15px;
  margin-top: 8px;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.purple2 : COLORS.white1};
  opacity: ${({ theme }) => (theme.name === "dark" ? 0.5 : 1)};
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
  border-radius: ${SIZES.font}px;
  font-size: ${isSmall ? 16 : 18}px;
  shadow-color: #233b7a;
  shadow-opacity: 1.5;
  shadow-radius: 20px;
  elevation: 10;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(p) =>
    p.theme.name === "dark" ? COLORS.purple2 : COLORS.deepBlue};
  align-items: center;
  border-radius: 30px;
  margin-bottom: ${RFValue(-10)}px;
  margin-top: ${RFValue(20)}px;
  padding: ${RFValue(5)}px;
`;

const Label1 = styled.Text`
  color: ${(p) => COLORS.white1};
  font-size: ${isSmall ? 20 : 22}px;
  text-align: center;
`;
