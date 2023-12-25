import React, { useState, useRef } from "react";
import Styles from "./Message.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { AiOutlineSearch } from "react-icons/ai";
export default function Message() {
  const [showMessage, setShowMessage] = useState(true);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const composeHandler = () => {
    setShowMessage(false);
    setShowNewMessage(true);
  };

  const cancleHandler = () => {
    setShowMessage(true);
    setShowNewMessage(false);
  };
  // Editor

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      // Here, you have the editor content in HTML format
      // You can save it in the state, send it to the server, or perform any other action you need.
    }
  };

  return (
    <>
      {/* <button onClick={composeHandler}>Compose</button>
    <button onClick={cancleHandler}>cancle</button> */}
      {showMessage && (
        <div className={Styles["Message-fullPage"]}>
          <div className={Styles["Message-Main-Body"]}>
            <div className={Styles["Message-Heading"]}>Messages</div>
            <div className={Styles["checkbox-section"]}>
              <div>
                <input type="checkbox"></input> Unread
              </div>
              <div>
                <input type="checkbox"></input> Important
              </div>
              <div>
                <input type="checkbox"></input> Not Answered
              </div>
              <div>
                <input type="checkbox"></input> Show Automatation Message
              </div>
              <div className={Styles["dropdown-section"]}>
                Short by:
                <select
                  defaultValue="Newest-First"
                  className={Styles["select-option-div"]}
                >
                  <option>Newest-First</option>
                  <option>Oldest-First</option>
                </select>
              </div>
              <div className={Styles["Compose-div"]}>
                <button
                  className={Styles["Compose-btn"]}
                  onClick={composeHandler}
                >
                  Compose
                </button>
              </div>
            </div>

            <div className={Styles["message-body-section"]}>
              <div className={Styles["message-body-box1"]}>
                <div className={Styles["Search-div"]}>
                  <input
                    type="text"
                    placeholder="Search by Keyword sender name"
                  />
                  <AiOutlineSearch />
                </div>
                <div className={Styles["image-noResult-div"]}>
                  <img
                    src="/image/carousel02.jpg"
                    alt=""
                    className={Styles["message-image-div"]}
                  ></img>
                  <h4>
                    <i>No results</i>
                  </h4>
                  <p>Try a different filter or search</p>
                </div>
              </div>
              <div className={Styles["message-body-box2"]}></div>
            </div>
          </div>
        </div>
      )}
      {showNewMessage && (
        <div className={Styles["ComposeNewMessage-fullPage"]}>
          <div className={Styles["heading-decion"]}>
            <div className={Styles["heading-div"]}>New Message</div>
            <button onClick={cancleHandler} className={Styles["cancle-button"]}>
              Cancle
            </button>
          </div>
          <div className={Styles["send-to-div"]}>
            <div className={Styles["To-div"]}>
              <b>To :</b>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <input
              type="email"
              placeholder="Type a user's name"
              className={Styles["emai-input"]}
            ></input>
          </div>

          <div>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="This is the initial content of the editor."
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              className={Styles["message-text-div"]}/>
            {/* <button onClick={log}>Log editor content</button> */}
            {/* <input type="text" className={Styles["message-text-box"]}></input> */}
          </div>
          <div className={Styles["Save-div"]}>
            <button className={Styles["Save-botton"]}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}
