import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
// import Topic from "models/Topic";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Comment.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldTitle = (props) => {
  return (
    <div className="comment field">
      <label className="comment label">{props.label}</label>
    </div>
  );
};
FormFieldTitle.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
//Title 部分·未完成
const FormFieldIntroduction = (props) => {
  return (
    <div className="comment field">
      <label className="comment label">{props.label}</label>
      <input
        className="comment introduction"
      />
    </div>
  );
};
FormFieldIntroduction.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
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

const Comment = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>(null);
  const [item, setItem] = useState<string>(null);
  const [itemintroduction, setItemintroduction] = useState<string>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemId=localStorage.getItem("clickitemId");
        //This page will be reached only by clicking the item you want to comment
        const response = await api.get(`/item/${itemId}`);

        // Get the returned item 
        setItem(response.data);
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

  const doSubmit = async () => {
    try {
      const ownerId = localStorage.getItem("usingId");
      const requestBody = JSON.stringify({ ownerId, comment});
      await api.post("/comments", requestBody);
      alert("Successfully create!");
      navigate("/lobby");
    } catch (error) {
      alert(
        `Something went wrong during the create: \n${handleError(error)}`
      );
    }
  };

  const doBack = () => {
    alert("Are you sure that you want to go back without saving?");
    navigate("/lobby");
  } 
  

  return (
    <BaseContainer className="comment">
      <div className="comment titlecontainer">
          <FormFieldTitle
            label="(title:Course/Mensa/.....)"
          />
      </div>
      <div className="comment introductioncontainer">
        <div className="comment introductionform">
          <FormFieldIntroduction
            label="INTRODUCTION"
            value={itemintroduction}
          />
        </div>
      </div>
      <div className="comment commentcontainer">
        <div className="comment commentform">
          <FormFieldComment
            label="YOUR COMMENT"
            value={comment}
            onChange={(un: string) => setComment(un)}
          />
          <div className="comment button-container">
            <Button className="submit"
              disabled={!comment}
              width="25%"
              onClick={() => doSubmit()}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      {/* 还有展示其他评论部分未完成 */}
      {/* <div className="comment allcommentcontainer">
        <div className="comment allcommentform">
          <FormFieldIntroduction
            label="INTRODUCTION"
            value={itemintroduction}
          />
          <Button className="submit"
              disabled={!comment}
              width="25%"
              onClick={() => doSubmit()}
            >
              BACK
            </Button>
        </div>
      </div> */}
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Comment;