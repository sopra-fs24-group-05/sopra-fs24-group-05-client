import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
// import Topic from "models/Topic";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import { ChatButton } from "components/ui/ChatButton";
import "styles/views/Comment.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { OutputFileType } from "typescript";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldTitle = (props) => {
  return (
    <h1>
      {props.value}
    </h1>
  );
};
FormFieldTitle.propTypes = {
  value: PropTypes.string,
};
const FormFieldIntroduction = (props) => {
  return (
    <div className="comment field">
      <label className="comment label">{props.label}</label>
      <textarea
        readOnly={true}
        className="comment introduction"
        rows="4"
        cols="50"
        value={props.value}
      />
    </div>
  );
};
FormFieldIntroduction.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
const FormFieldComment = (props) => {
  return (
    <div className="comment field">
      <label className="comment label">{props.label}</label>
      <textarea
        className="comment input"
        // bug：这里不能把input改成其他名字，否则UI会变得很怪！
        placeholder="enter here.."
        rows="4"
        cols="50"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
FormFieldComment.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
const FormFieldDisplay = (props) => {
  return (
    <div className="comment field">
      <label className="comment label">{props.label}</label>
      <textarea readOnly={true}
        className="comment display"
        rows="3"
        cols="50"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
FormFieldDisplay.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
function Star({ selected = false, onClick = f => f }) {
  return (
    <div className={selected ? "comment star selected" : "comment star"} onClick={onClick}>
      ★
    </div>
  )
};
Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func
};
const CommentContentForm =(props)=> {
  return (
    <div className="comment commentcontent">
      {/* <label className="comment label">{props.label}</label>
      <textarea readOnly={true}
        className="comment display"
        rows="3"
        cols="50"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      /> */}
    </div>
  );
};

const Comment = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [content, setContent] = useState<string>(null);
  const [item, setItem] = useState<string>(null);
  const [topic, setTopic] = useState<string>(null);
  const [itemname, setItemname] = useState<string>(localStorage.getItem("currentItem"));
  const [topicname, setTopicname] = useState<string>(localStorage.getItem("currentTopic"));
  const [itemIntroduction, setItemIntroduction] = useState<string>(null);
  const [commentList, setCommentList] = useState<Comment[]>(null);
  const [commentRate, setCommentRate] =useState(0);
  const [commentStatus, setCommentStatus] =useState<boolean>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const totalStars = 5


  useEffect(() => {
    async function fetchData() {
      try {
        const itemId = localStorage.getItem("currentItemId");
        //This page will be reached only by clicking the item you want to comment
        const responseItem = await api.get(`/items/getByItemId/${itemId}`);

        // Get the returned item 
        setItem(responseItem.data);
        setItemIntroduction(responseItem.data.itemIntroduction);

        const responseComments = await api.get(`/comments/itemId/${itemId}`);
        setCommentList(responseComments.data);
        // // This is just some data for you to see what is available.
        // // Feel free to remove it.
        // console.log("request to:", response.request.responseURL);
        // console.log("status code:", response.status);
        // console.log("status text:", response.statusText);
        // console.log("requested data:", response.data);

        // // See here to get more data.
        // console.log(response);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the item: \n${handleError(
            error
          )}`
        );
      //   console.error("Details:", error);
      //   alert(
      //     "Something went wrong while fetching the item! See the console for details."
      //   );
      // }
      }
    }
    fetchData();
  }, []);

  const ChatSpace = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, { text: message, sender: "Me" }]);
      setMessage("");
    }
  };


  const doSubmit = async () => {
    try {
      const commentItemId=localStorage.getItem("currentItemId");
      const commentOwnerId = localStorage.getItem("currentUserId");
      const commentOwner = JSON.parse(localStorage.getItem("currentUser")) as User;
      const commentOwnerName = commentOwner.username;
      setCommentStatus(1);
      const requestBody = JSON.stringify({ commentOwnerName, commentItemId, commentOwnerId, content});
      await api.post("/comments/create", requestBody);
      alert("Successfully create!");
      location.reload();
    } catch (error) {
      alert(
        `Something went wrong during the create: \n${handleError(error)}`
      );
    }
  };

  const doBack = () => {
    localStorage.removeItem("currentItem");
    localStorage.removeItem("currentItemId");
    navigate(`/topic/${localStorage.getItem("currentTopicId")}`)
  } 

  const doCheckProfile = (commentOwnerId) => {
    navigate(`/profile/${commentOwnerId}`);
  }
  
  const doFollow = (currentUserId, currentItemId) => {
    const followItemId = currentItemId;
    api.put(`/users/followItem/${currentUserId}`, { followItemId });
    alert("Successfully follow!");
  }

  return (
    <BaseContainer className="comment">
      <div className="comment titlecontainer">
        <FormFieldTitle
          value={`${topicname}/${itemname}`}
        />
      </div>
      <ChatButton 
        width="20%"
        onClick={ChatSpace}
      >
        ChatSpace
      </ChatButton>
      {isOpen && (
        <div className="comment chatspacecontainer">
          <div className="comment chatspaceform">
            <div className="comment chatspace">
              {/* 显示聊天历史 */}
              {chatHistory.map((msg, index) => (
                <div key={index}>
                  <strong>{msg.sender}: </strong> {msg.text}
                </div>
              ))}
            </div>
            <input
              className="comment chatinput"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <div className="comment button-containerin">
              <Button 
                width="75%"
                onClick={handleSendMessage}
              >
              Send
              </Button>
            </div>
          </div>
        </div>  
      )}
      <div className="comment introductioncontainer">
        <div className="comment introductionform">
          <FormFieldIntroduction
            label="INTRODUCTION"
            value={itemIntroduction}
          />
          <div className="comment button-containerin">
            <Button className="follow"
              width="25%"
              onClick={() => doFollow(localStorage.getItem("currentUserId"), localStorage.getItem("currentItemId"))}
            >
              Follow
            </Button>
          </div>
        </div>
      </div>
      <div className="comment commentcontainer">
        <div className="comment commentform">
          <FormFieldComment
            label="YOUR COMMENT"
            value={content}
            onChange={(un: string) => setContent(un)}
          />
          <div className="comment star-rating">
            {[...Array(totalStars)].map((_, index) => (
              <Star
                key={index}
                selected={index < commentRate}
                onClick={() => setCommentRate(index + 1)}
              />
            ))}
            <p>CurrentRate：{commentRate} points</p>
          </div>
          <div className="comment button-containerin">
            <Button className="submit"
              disabled={!content||!commentRate}
              width="25%"
              onClick={() => doSubmit()}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      <div className="comment displaycontainer">
        <div className="comment displayform">
          <label className="comment commentListTitle">ALL COMMENTS</label>
          <ul className="comment commentList">
            {commentList ? commentList.map((comment, index) => (
              <li 
                key={index}
                onClick={() => doCheckProfile(comment.commentOwnerId)}
              >
                <div className = "comment singlecommentcontainer" >
                  <div className="comment commentownerInformationcontainer">
                    <div className="comment commentowneravator">
                      {}
                    </div>
                    <div className="comment commentownerUsername">
                    : {username}
                    </div>
                  </div>
                  <div className="comment commentcontent">
                    {content}
                  </div>
                  <div className="comment commentReplyandThumbups">

                  </div>
                </div>
                {comment.commentOwnerName}: {comment.content}
              </li>
            )) : <div>Loading...</div>}
          </ul>
        </div>
      </div> 
      <div className="comment button-containerout">
        <Button className="back"
          width="13%"
          onClick={() => doBack()}
        >
          BACK
        </Button>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object"s properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Comment;