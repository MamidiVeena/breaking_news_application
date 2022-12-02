import styled from "styled-components/native";
import { COLORS } from "../constants";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Constants from "expo-constants";
import PostsList from "../components/PostsList";
import { StyleSheet, Text } from "react-native";
import UserService from "../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

let newsCount = 0;

const Home = () => {
  const [isExtended, setIsExtended] = React.useState(true);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    getNews();
    setInterval(() => {
      if (expoPushToken) {
        sendNotification();
      }
    }, 1000);
  }, []);

  const sendNotification = async () => {
    newsCount = newsCount + 1;
    await sendPushNotification(expoPushToken, data[(newsCount % data?.length + data?.length) % data?.length]?.text);
  };

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
            userId,
          })
        : await UserService.removeFavourite({
            newsId: post?._id,
            userId,
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

export default Home;

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
