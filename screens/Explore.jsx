import { useCallback, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import styled from "styled-components/native";
import { COLORS } from "../constants";
import Constants from "expo-constants";
import PostsList from "../components/PostsList";
import TagsFilter from "../components/TagsFilter";
import UserService from "../services/user.service";

let resultData = [];

const Explore = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isUpvote, setIsUpvote] = useState(false);
  const [tags, setTags] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    getNews();
  },[])

  const getNews = async () => {
    try {
      const res = await UserService.getNews();
      resultData = res?.data?.data?.news;
      setTags((res?.data?.data?.news || []).reduce((a,b) => {
        if(b?.category?.name && !a.includes(b?.category?.name)) {
          a.push(b?.category?.name);
        }
        return a;
      },[]));
      setData(resultData)
    } catch (error) {
      console.log(error);
    }
  };
  const filterPosts = () => {
    if(selectedTags.length > 0) {
      setData(resultData?.filter(q => !!q?.category?.name && selectedTags.includes(q?.category?.name)))
    }else {
      setData(resultData)
    }
  }

  const renderPosts = useCallback(() => {
    return (
      <PostsList
        onScroll={() => {}}
        getMorePosts={() => {}}
        reachedEnd={true}
        busy={false}
        data={data}
        page="Home"
      />
    );
  }, [data]);

  return (
    <Container>
      {/* <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        searchInPosts={() => {}}
      /> */}
      <Box>
        <TagsFilter
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          filterPosts={filterPosts}
          tags={tags}
        />
      </Box>
      {renderPosts()}
    </Container>
  );
};

export default Explore;

//styles

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white1};
  padding-top: ${Constants.statusBarHeight}px;
`;

const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
`;
