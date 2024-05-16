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
  const [itemAverageScore, setItemAverageScore] = useState(0);
  const [commentList, setCommentList] = useState<Comment[]>(null);
  const [commentRate, setCommentRate] =useState(0);
  const [commentStatus, setCommentStatus] =useState<boolean>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [thumbupsNumber,setThumbupsNumber]=useState(0);
  const [thumbupList, setThumbupList] = useState<Int16Array[]>(null);
  const totalStars = 5;


  useEffect(() => {
    async function fetchData() {
      try {
        const itemId = localStorage.getItem("currentItemId");
        //This page will be reached only by clicking the item you want to comment
        const responseItem = await api.get(`/items/getByItemId/${itemId}`);

        // Get the returned item 
        setItem(responseItem.data);
        setItemIntroduction(responseItem.data.itemIntroduction);
        setItemAverageScore(responseItem.data.itemAverageScore);

        const responseComments = await api.get(`/comments/itemId/${itemId}`, localStorage.getItem("currentUserId"));
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
  const handleThumbups = (commentId) => {
    const responseThumbsUpNum = api.post("", localStorage.getItem("currentUserId"));
    
    window.location.reload();
  };

  const doSubmit = async () => {
    try {
      const commentItemId=localStorage.getItem("currentItemId");
      const commentOwnerId = localStorage.getItem("currentUserId");
      const commentOwner = JSON.parse(localStorage.getItem("currentUser")) as User;
      const commentOwnerName = commentOwner.username;
      setCommentStatus(1);
      const requestBody = JSON.stringify({ commentOwnerName, commentItemId, commentOwnerId, content,commentRate});
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
      <div className="comment averageRateContainer">
        AverageScore:{itemAverageScore}
      </div>
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
            <p>CurrentRate:{commentRate} points</p>
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
                
              >
                <div className = "comment singlecommentcontainer" >
                  <div className="comment commentownerInformationcontainer">
                    <div className="comment commentowneravator" onClick={() => doCheckProfile(comment.commentOwnerId)}>
                      {}
                    </div>
                    <div className="comment commentownerUsername">
                    : {comment.commentOwnerName}
                    </div>
                  </div>
                  <div className="comment commentcontent">
                    {/* <textarea
                      readOnly={true}
                      className="comment introduction"
                      rows="4"
                      cols="50"
                      value={content}
                    /> */}
                    {comment.content}
                  </div>
                  <div className="comment replyandthumbupscontainer">
                    <div className="comment thumbups">
                      {/* <Button 
                        onClick={() => handleThumbups(comment.commentId)}>THUMBUPS</Button> */}
                      <div className="comment thumbupsButton" onClick={() => handleThumbups(comment.commentId)}>
                        {comment.commentThumbsUpStatus ? <svg 
                          className="comment thumbupsIcon" 
                          viewBox="0 0 1024 1024" 
                          version="1.1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20">
                          <path 
                            d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z" 
                            fill="#9499a0">
                          </path>
                        </svg> : <svg className="thumbupsLikedIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M860.032 341.12h-182.08c7.488-17.408 14.72-38.528 18.048-60.544 5.952-39.872 4.992-87.36-18.368-129.088-21.76-38.848-50.304-60.928-83.52-61.376-30.72-0.384-53.888 18.176-65.728 33.408a199.296 199.296 0 0 0-32.064 59.264l-1.92 5.184c-5.44 14.976-10.88 29.952-23.04 51.456-19.712 34.816-48.832 56.128-77.696 74.368a391.936 391.936 0 0 1-30.976 17.92v552.448a4621.952 4621.952 0 0 0 351.872-5.312c51.264-2.752 100.672-28.544 127.488-76.032 24.32-43.136 55.168-108.16 74.368-187.264 20.416-84.16 24.64-152.704 24.576-195.968-0.128-46.336-38.72-78.4-80.96-78.4z m-561.344 541.312V341.12H215.808c-59.712 0-113.408 42.048-120.896 104.32a1376 1376 0 0 0 0.64 330.368c7.36 58.688 56.128 100.032 113.024 102.848 25.024 1.28 55.552 2.56 90.112 3.712z" fill="#00aeec"></path></svg>}
                        <div className="comment thumbupsNumber">{comment.thumbsUpNum}</div>
                      </div>
                    </div>
                    <div className="comment reply">
                      {/* <Button 
                        onClick={() => handleThumbups(comment.commentId)}>THUMBUPS</Button> */}
                      <div className="comment replyButton" onClick={() => handleThumbups(comment.commentId)}>
                        <svg 
                          width="10" 
                          height="10" 
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
                  </div>
                </div>
                <div className="comment bottom-line"></div>
                {/* {comment.commentOwnerName}: {comment.content} */}
              </li>
            )) 
              : <div>Loading...</div>}
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