import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import Topic from "models/Topic";
import Item from "models/Item";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Search.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="search field">
      {props.label && <label className="search label">{props.label}</label>}
      <div className="search select-wrapper">
        <select
          className="search select"
          onChange={(e) => props.selectType(e.target.value)}
        >  
          <option value="topics">Topic</option>
          <option value="items">Item</option>
        </select>
        <input
          className="search input"
          value={props.value}
          onChange={(e) => props.inputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  inputChange: PropTypes.func,
  selectType: PropTypes.func
};

const Search = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<String>("topics");
  const [searchContent, setSearchContent] = useState<String>("");
  const [searchTopicResult, setSearchTopicResult] = useState<Topic[] | null>(null);
  const [searchItemResult, setSearchItemResult] = useState<Item[] | null>(null);
  const [hotItemList, setHotItemList] = useState<Item[] | null>(null);
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [alreadySearched, setAlreadySearched] = useState(false);

  const doSearch = async () => {
    setSearchTopicResult([]);
    setSearchItemResult([]);
    setIsSearchDone(false);
    setAlreadySearched(true);

    try {
      const responseSearchResult = await api.get(`/${searchType}/search`, { params: {keyword: searchContent}});
      if (searchType === "topics") {
        setSearchTopicResult(responseSearchResult.data);
      } else if (searchType === "items") {
        setSearchItemResult(responseSearchResult.data);
      } else {
        alert("Invalid search!");
      }
      setIsSearchDone(true);
    } catch (error) {
      alert(
        `Something went wrong during the login: \n${handleError(error)}`
      );
    }
  };

  useEffect(() => {
    const fetchHotListData = async () => {
      try {
        const responseHotItemList = await api.get("/items/sortedByPopularity");
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        setHotItemList(responseHotItemList.data);
      } catch (error) {
        alert(
          `Something went wrong during the get: \n${handleError(error)}`
        );
      }
    };

    fetchHotListData();
  }, []);

  useEffect(() => {
    if (searchContent.trim() !== "") {
      doSearch();
    }
  }, [searchContent, searchType]);

  const doCheckTopic = (topicName, topicId) => {
    localStorage.setItem("currentTopic", topicName);
    localStorage.setItem("currentTopicId", topicId);
    navigate(`/topic/${topicName}`);
  }

  const doCheckItem = (itemId, topicName, topicId) => {
    localStorage.setItem("currentItemId", itemId);
    localStorage.setItem("currentTopic", topicName);
    localStorage.setItem("currentTopicId", topicId);
    navigate(`/comment/${itemId}`);
  }

  return (
    <BaseContainer className="search">
      <h1 className="search title">
        SEARCH
      </h1>
      <h3 className="search title">
        You can search topics or items here.
      </h3>
      <div className="search container">
        <FormField className="search form" selectType={setSearchType} inputChange={setSearchContent} />
        <div className="search button" onClick={() => doSearch()}>
          <svg 
            width="50" 
            height="50" 
            viewBox="0 0 17 17" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z" fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      { alreadySearched && (
        <div className="search displaycontainer">
          <div className="search displayform">
            <label className="search resultListTitle">RESULT {searchType.toUpperCase()}</label>
            { searchType === "topics" ? ( isSearchDone ? (searchTopicResult.length > 0 ? <ul className="search resultList">
              {searchTopicResult.map((topic, index) => (
                <li 
                  key={index}
                  onClick={() => doCheckTopic(topic.topicName, topic.topicId)}
                >
                  {topic.topicName}
                </li>))}  
            </ul> : <div><br />No Topic Found.</div>) : (<div/>)) : (<div/>)}
            { searchType === "items" ? ( isSearchDone ? (searchItemResult.length > 0 ? <ul className="search resultList">
              {searchItemResult.map((item, index) => (
                <li 
                  key={index}
                  onClick={() => doCheckItem(item.itemId, item.topic.topicName, item.topic.topicId)}
                >
                  {item.itemName}
                </li>))}  
            </ul> : <div><br />No Item Found.</div>) : (<div/>)) : (<div/>)}
            <br />
          </div>
        </div>
      )}
      <div className="search hotTopicContainer">
        <div className="search hotTopicForm">
          <h1 style={{textAlign: "center"}}>HOT ITEMS</h1>
          <ul className="topic hotTopicList">
            {hotItemList ? hotItemList.slice(0, 5).map((item, index) => (
              <li 
                key={index}
                onClick={() => doCheckItem(item.itemId, item.topic.topicName, item.topic.topicId)}
              >
                {item.itemName}
              </li>
            )) : <div>Loading...</div>}
          </ul>
        </div>
      </div> 
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Search;
