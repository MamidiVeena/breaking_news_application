import { Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { COLORS, isSmall, SIZES } from "../constants";
import { FontAwesome } from '@expo/vector-icons'; 
import Icon from "./Icon";
import { useTheme } from "styled-components";
// import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useCallback, useState } from "react";
import Spinner from "./Spinner";
import ImageViewing from "react-native-image-viewing";
import ImageHeader from "../screens/GalleryView/ImageHeader";
import ImageFooter from "../screens/GalleryView/ImageFooter";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

const SinglePost = ({ post, favouriteToggle }) => {
	const theme = useTheme();
	// const navigation = useNavigation();
	const [isVoting, setIsVoting] = useState(false);
	const [isImageVisible, setIsImageVisible] = useState(false);

	return (
		<Container>
			<Header>
				<Pressable
					// onPressIn={() => navigation.navigate("Profile", { _id: author?._id })}
				>
					{/* <Icon
						containerStyle={{ marginRight: 10 }}
						src={require('../assets/images/void_nobg.png')}
						radius={10}
						resizeMode="cover"
					/> */}
					<FontAwesome style={{ marginRight: 10 }} name="user-circle-o" size={30} color="black" />
				</Pressable>
				<Details>
					<TouchableOpacity
						onPress={() => {
							if(post?.urls?.length > 0) {
								Linking.openURL(post?.urls[0]);
							}
						}}
					>
						<Name>{post?.sourceName}</Name>
						{/* <Position>{post?.sourceName}</Position> */}
						<Time>{moment(post?.createdAt).fromNow()}</Time>
					</TouchableOpacity>
				</Details>
				<TouchableOpacity onPress={() => !post?.isFavourite ? favouriteToggle() : {}}>
					{
						post?.isFavourite ? (
<MaterialIcons name="favorite" size={24} color="red" />
						) : (
							<MaterialIcons name="favorite-outline" size={24} color="black" />
						)
					}
				</TouchableOpacity>
			</Header>

			<TouchableOpacity
			>
				<Content>
					{post?.text}
				</Content>
			</TouchableOpacity>
			{
				!!post?.category?.name && (
			<Tags>
				
						<Tag
				
						>
							<Label>{post?.category?.name}</Label>
						</Tag>
			
			</Tags>

				)
			}

			{/* <ImageViewing
				images={[{ uri: thumbnail?.url }]}
				imageIndex={0}
				presentationStyle="overFullScreen"
				visible={isImageVisible}
				onRequestClose={() => setIsImageVisible(false)}
				HeaderComponent={() => {
					return (
						<ImageHeader
							onRequestClose={() => {
								setIsImageVisible(false);
							}}
						/>
					);
				}}
				FooterComponent={({ imageIndex }) => (
					<ImageFooter imageIndex={imageIndex} imagesCount={1} />
				)}
			/> */}
		
				<Pressable
					style={{ width: "100%", height: RFValue(200) }}
					onPress={() => {
						// if (isCommentsScreen) {
							setIsImageVisible(true);
						// } else {
							// navigation.navigate("PostComments", { postId: post._id });
						// }
					}}
				>
					<Thumbnail
						onPress={() => {
							setIsImageVisible(true);
						}}
						// source={
						// 	 require("../assets/images/void_nobg.png")
						// }
						resizeMode="contain"
					/>
				</Pressable>
			

		</Container>
	);
};

export default SinglePost;

// const getHeight = (height, all) => {
// 	if (all) {
// 		return height ? 'auto' : '300px';
// 	}

// 	return `${height ? 400 : 240}px`;
// };

//styles
const Container = styled.View`
	height: 210px;
	align-items: center;
	background-color: ${COLORS.white2};
	padding: 20px;
	padding-bottom: 0px;
	border-radius: ${SIZES.radius}px;
	margin: 10px 0px;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	width: 100%;
`;

const Details = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`;

const Name = styled.Text`
	font-size: ${isSmall ? 16 : 18}px;
	font-weight: 700;
	color: ${COLORS.black};
`;

const Position = styled.Text`
	font-size: ${isSmall ? 10 : 12}px;
	color: ${COLORS.black};
`;

const Time = styled.Text`
	font-size: ${isSmall ? 10 : 12}px;
	color: ${COLORS.black};
`;

const Content = styled.Text`
	margin: 10px 0px;
	/* text-align: justify; */
	font-size: ${isSmall ? 12 : 14}px;
	color: ${COLORS.black};
`;

const Tags = styled.View`
	flex-direction: row;
	align-items: center;
	width: 100%;
	/* background-color: red; */
	margin-bottom: ${(p) => (p.mb ? 6 : 12)}px;
`;

const Tag = styled.TouchableOpacity`
	background-color: ${COLORS.deepBlue};
	padding: 6px;
	margin-right: 15px;
	border-radius: ${SIZES.padding}px;
`;

const Label = styled.Text`
	color: ${COLORS.white1};
	font-size: 13px;
`;

const Thumbnail = styled.Image`
	width: 100%;
	height: 200px;
	margin: 15px 0px;
	margin-bottom: 24px;
`;

const Action = styled.View`
	background-color: ${ COLORS.deepBlue1};
	flex-direction: row;
	padding: 8px;
	border-radius: ${SIZES.radius + 2}px;
	position: ${(p) => (p.bottom ? "absolute" : "relative")};
	/* position: absolute; */
	z-index: 1;
	margin-top: ${(p) => (p.bottom ? "auto" : "10px")};
	bottom: ${(p) => (p.bottom ? 10 : 10)}px;
	justify-content: center;
`;

const ActionBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 0px 10px;
`;

const ActionLabel = styled.Text`
	color: ${(p) => p.color || COLORS.white1};
	margin-left: 4px;
`;
