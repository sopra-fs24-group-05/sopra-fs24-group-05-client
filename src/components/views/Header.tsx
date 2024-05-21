import React, { useEffect, useState } from "react";
import {UserLogo} from "../ui/UserLogo";
import PropTypes from "prop-types";
import "../../styles/views/Header.scss";
import {SearchLogo} from "../ui/SearchLogo";
import {useNavigate} from "react-router-dom";
import {ReminderLogo} from "../ui/ReminderLogo";


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://react.dev/learn/your-first-component and https://react.dev/learn/passing-props-to-a-component 
 * @FunctionalComponent
 */


const Header = props => {
  const navigate = useNavigate();
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState(null);

  // useEffect(() => {
  //   // 定义一个函数来获取用户的评论
  //   const fetchComments = async () => {
  //     try {
  //       const userId;
  //       const response = await api.get(`/users/${userId}/comments`);
  //       const newComments = response.data;
        
  //       // 如果有新评论，设置提示
  //       if (newComments.length > comments.length) {
  //         setNewComment(newComments[0]); // 这里假设最新的评论在列表的开头
  //       }

  //       // 更新评论列表
  //       setComments(newComments);
  //     } catch (error) {
  //       console.error('Error fetching comments:', error);
  //     }
  //   };

  //   // 初始获取评论
  //   fetchComments();

  //   // 设置轮询
  //   const intervalId = setInterval(fetchComments, 5000); // 每5秒获取一次

  //   // 清除定时器
  //   return () => clearInterval(intervalId);
  // }, [comments, userId]);

  return (
    <div className="header container" style={{height: props.height}}>
      <h1 className="header title rankeverything" onClick={() => {localStorage.removeItem("currentTopic");localStorage.removeItem("currentTopicId");localStorage.removeItem("currentItemId");navigate("lobby");}}>Rank Everything!</h1>
      <SearchLogo width="100px" height="100px" onClick={() => {localStorage.removeItem("currentTopic");localStorage.removeItem("currentTopicId");localStorage.removeItem("currentItem");localStorage.removeItem("currentItemId");navigate("/search")}}/>
      <UserLogo width="100px" height="100px" onClick={() => navigate(`/profile/${localStorage.getItem("currentUserId")}`)}/>
      <ReminderLogo width="20px" height="20px"/>
    </div>
  );
};
  

Header.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default Header;