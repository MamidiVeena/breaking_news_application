import styled from "styled-components/native";
import { COLORS } from "../constants";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Constants from "expo-constants";
import PostsList from "../components/PostsList";
import { StyleSheet, Text } from "react-native";
import UserService from "../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favourites = () => {
  const [isExtended, setIsExtended] = React.useState(true);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const res = await UserService.getNews();
      const id = await AsyncStorage.getItem("userId");
      const user = await UserService.getUser({ userId: id });
      setUserId(id);
      setData(
        res?.data?.data?.news.map((q) => ({
          ...q,
          isFavourite: user?.favourites?.some((o) => o?._id === q?._id),
        })) || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const favouriteToggle = async (post) => {
    try {
      post?.isFavourite
        ? await UserService.addFavourite({
            newsId: post?._id,
            userId
          })
        : await UserService.removeFavourite({
            newsId: post?._id,
            userId
          });
      setData(
        data.map((q) =>
          q?._id === post?._id ? { ...q, isFavourite: !q?.isFavourite } : q
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <Container>
      {/* {isLoading ? (
				<Loading />
			) : ( */}
      <PostsList
        favouriteToggle={favouriteToggle}
        onScroll={onScroll}
        getMorePosts={() => {}}
        reachedEnd={true}
        busy={false}
        data={data}
        page="Home"
      />
      {/* )} */}
    </Container>
  );
};

export default Favourites;

//styles
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.darkPurple : COLORS.white1};
  padding-top: ${Constants.statusBarHeight}px;
`;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
