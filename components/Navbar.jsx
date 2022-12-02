import styled, { useTheme } from "styled-components/native";
import {View } from "react-native";
import { COLORS, icons, SIZES } from "../constants";
import Icon from "./Icon";
import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

const NavBar = ({ profile }) => {
	const theme = useTheme();
	// const navigation = useNavigation();

	return (
		<Container>
			<TouchableOpacity
				onPress={() => {
					// navigation.toggleDrawer();
				}}
			>
				<Icon
					src={require('../assets/images/menu_dark.png')}
					width={48}
					height={48}
				/>
			</TouchableOpacity>
			<View
				style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
			>
				<Title>News Feed</Title>
			</View>

			<TouchableOpacity
				onPress={() =>{}
				
				}
			>
				<Icon
					src={require('../assets/images/menu_dark.png')}
					width={45}
					height={45}
					radius={10}
					resizeMode="cover"
				/>
			</TouchableOpacity>
		</Container>
	);
};

export default NavBar;

//styles
const Container = styled.View`
	padding: 10px 20px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.Text`
	font-size: ${RFValue(20)}px;
	margin-left: 10px;
	font-weight: bold;
	color: ${(p) => (p.theme.name === "dark" ? COLORS.white1 : COLORS.black)};
`;

const AddBtn = styled.TouchableOpacity`
	border: ${(p) =>
		`2px solid ${p.theme.name === "dark" ? COLORS.white1 : COLORS.black}`};
	border-radius: ${SIZES.radius}px;
	padding: 3px;
	margin-right: 15px;
`;
