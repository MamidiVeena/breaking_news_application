import { FlatList } from "react-native";
import React, { useCallback } from "react";
import SinglePost from "./SinglePost";
import styled from "styled-components/native";
import ReachedEnd from "./ReachedEnd";
import NotFound from "./NotFound";
import Spinner from "./Spinner";

const PostsList = ({
	page,
	contentContainerStyle,
	getMorePosts,
	reachedEnd,
	busy,
	data,
	setIsUpvote,
	onScroll,
	favouriteToggle
}) => {

	return (
		<Container>
			<FlatList
				onScroll={onScroll}
				data={data}
				style={{ flex: 1 }}
				keyExtractor={(_, idx) => `post-${page}-${idx}`}
				renderItem={({ item }) => {
					return <SinglePost post={item} favouriteToggle={() => favouriteToggle(item)} setIsUpvote={setIsUpvote} />;
				}}
				ListFooterComponent={() => {
					if (reachedEnd && data.length > 1) {
						return <ReachedEnd />;
					}

					if (busy) {
						return <Spinner />;
					}
					return null;
				}}
				ListEmptyComponent={NotFound}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					{
						paddingHorizontal: 20,
						paddingBottom: 20,
					},
					contentContainerStyle,
				]}
				onEndReached={getMorePosts}
				onEndReachedThreshold={0}
			/>
		</Container>
	);
};

export default PostsList;

// styles

const Container = styled.View`
	flex: 1;
`;
