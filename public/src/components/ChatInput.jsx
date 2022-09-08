import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && (
                        <Picker onEmojiClick={handleEmojiClick} />
                    )}
                </div>
            </div>
            <form
                className="input-container"
                onSubmit={(event) => sendChat(event)}
            >
                <input
                    type="text"
                    placeholder="Type here . ."
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #fff;
    border-top: 4px solid black;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: #fff;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 2rem;
                color: #000000;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #fff;
                box-shadow: none;
                border: 2px solid #000000;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #fff;
                    border-left: 0.5px solid #000000;
                    width: 5px;
                    &-thumb {
                        background-color: #000000;
                    }
                }
                .emoji-categories {
                    button {
                        filter: contrast(1);
                    }
                }
                .emoji-search {
                    background-color: transparent;
                    border: 2px groove #000000;
                    color: #000000;
                }
                .emoji-group:before {
                    background-color: #fff;
                    border-bottom: 2px solid #000000;
                    font-size: 0.8rem;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #fff;
        border: 4px solid #000000;
        input {
            width: 90%;
            height: 60%;
            background-color: #fff;
            color: #000000;
            border: none;
            margin-left: 2rem;
            font-size: 1.2rem;

            &::selection {
                background-color: #000000;
                color: #fff;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-top-right-radius: 2rem;
            border-bottom-right-radius: 2rem;
            border: none;
            border-left: 10px solid #000000;
            cursor: pointer;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                }
            }
            svg {
                font-size: 2rem;
                color: #000000;
            }
            &:hover {
                background-color: #000000;
                svg {
                    color: #fff;
                }
            }
        }
    }
`;
