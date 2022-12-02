import { COLORS, isSmall, SIZES } from "../constants";
import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { Formik } from "formik";
import { Text, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Button, Snackbar } from "react-native-paper";
import UserService from "../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather } from "@expo/vector-icons";
import TagsSelect from '../components/TagsSelect';

const Register = ({ navigation }) => {
  const [error, setError] = React.useState({ message: null });
  const onDismissSnackBar = () => setError(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    name: yup.string().required("Name is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const handleRegistration = async (
    { name, email, password },
    { setErrors }
  ) => {
    setLoading(true);
    try {
      const res = await UserService.register({ name, email, password,categries: selectedTags });
      await AsyncStorage.setItem("userId", res?.data?.data?.savedUser?._id);
      navigation.navigate("Home");
      navigation.navigate("MyTabs");
      setLoading(false);
    } catch (error) {
      if (error?.code === "ERR_BAD_REQUEST") {
        setErrors({ email: "Email already exists" });
      }
      setLoading(false);
    }
  };

  const toggleModal = useCallback(() => {
    setOpen((p) => !p);
  }, []);

  const toggleSelection = useCallback(
    (name) => {
      const idx = selectedTags.indexOf(name);
      if (idx !== -1) {
        let arr = selectedTags.filter((i) => i !== name);
        setSelectedTags(arr);
        return;
      }

      if (selectedTags.length === 5) {
        return;
      }

      setSelectedTags((p) => [...p, name]);
    },
    [selectedTags, setSelectedTags]
  );

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
                <WelcomeText>Create Account</WelcomeText>

                <Fields>
                  <Box>
                    {/* <Label>Name</Label> */}
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
                  )}
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
                  <Box>
                    <Tags>
                      <Text
                        color={
                          COLORS.black
                        }
                      >
                        Tags:
                      </Text>
                      <Group>
                        <SelectTags onPress={toggleModal}>
                          <Text color={COLORS.gray10}>Choose tags</Text>
                          <AntDesign
                            name="down"
                            size={14}
                            color={COLORS.gray10}
                          />
                        </SelectTags>
                        <InfoLabel>You can select maximum 5 tags</InfoLabel>
                      </Group>
                    </Tags>

                    <SelectedTags>
                      {selectedTags?.map((tag) => {
                        return (
                          <Tag key={tag}>
                            <Text
                              style={{color: COLORS.white}}
                              size={12}
                            >
                              {tag.toUpperCase()}
                            </Text>
                            <TouchableOpacity
                              onPress={() => toggleSelection(tag)}
                            >
                              <Feather
                                name="x"
                                size={14}
                                color={
                                 
                                     COLORS.white1
                                }
                                style={{ marginLeft: 8 }}
                              />
                            </TouchableOpacity>
                          </Tag>
                        );
                      })}
                    </SelectedTags>
                    {/* <Label>Confirm Password</Label>  */}
                    <TagsSelect
                      selectedTags={selectedTags}
                      open={open}
                      toggleModal={toggleModal}
                      toggleSelection={toggleSelection}
                    />
                  </Box>

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
                    Register
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

export default Register;

//styles
const Container = styled.View`
  flex: 1;
  padding: 30px;
  padding-top: ${Constants.statusBarHeight + 20}px;
  background-color: ${COLORS.white2};
  justify-content: center;
`;

const WelcomeText = styled.Text`
  font-size: ${isSmall ? 34 : 38}px;
  color: ${COLORS.deepBlue};
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
  color: ${ COLORS.deepBlue};
`;

const Input = styled.TextInput`
  padding: 12px 15px;
  margin-top: 8px;
  background-color: ${COLORS.white1};
  opacity: ${1};
  color: ${COLORS.deepBlue};
  border-radius: ${SIZES.font}px;
  font-size: ${isSmall ? 16 : 18}px;
  shadow-color: #233b7a;
  shadow-opacity: 1.5;
  shadow-radius: 20px;
  elevation: 10;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${COLORS.deepBlue};
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
const Tags = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
`;

const Group = styled.View`
	flex: 1;
	margin-left: 15px;
`;

const SelectTags = styled.TouchableOpacity`
	background-color: ${'#f5f6fa'};
	border-radius: 10px;
	padding: 10px 15px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const SelectedTags = styled.View`
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	padding: 8px 10px;
`;

const InfoLabel = styled.Text`
	color: ${COLORS.gray10};
	font-size: 10px;
	font-weight: bold;
	margin-left: 4px;
`;

const Tag = styled.View`
	background-color: ${COLORS.deepBlue};
  color: ${COLORS.white};
	padding: 6px 10px;
	margin: 8px 8px 0 0;
	flex-direction: row;
	align-items: center;
	border-radius: ${SIZES.padding}px;
`;
