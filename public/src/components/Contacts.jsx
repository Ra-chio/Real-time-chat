import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        async function Con() {
            const data = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
        }
        Con();
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <>
            {currentUserImage && currentUserImage && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact ${
                                        index === currentSelected
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        changeCurrentChat(index, contact)
                                    }
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #fff;
    border-right: 4px solid #000000;
    border-bottom: 0;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 3rem;
            border: 4px solid #000000;
            border-radius: 1rem;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.5rem;
            &-thumb {
                background-color: #000000;
                width: 0.1rem;
            }
        }
        .contact {
            background-color: #fff;
            min-height: 4rem;
            cursor: pointer;
            width: 90%;
            border: 4px solid #000000;
            border-radius: 1rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                    border: 4px solid #000000;
                    border-radius: 100%;
                }
            }
            .username {
                h3 {
                    color: #000000;
                }
            }
        }
        .selected {
            background-color: #000000;
            .avatar {
                img {
                    border: 3px solid #fff;
                    border-radius: 100%;
                }
            }
            .username {
                h3 {
                    color: #fff;
                }
            }
        }
    }

    .current-user {
        background-color: #fff;
        display: flex;
        align-items: center;
        height: auto;
        justify-content: center;
        border-top: 4px solid #000000;
        gap: 1rem;
        .avatar {
            img {
                height: 3rem;
                max-inline-size: 100%;
                border: 4px solid #000000;
                border-radius: 100%;
            }
        }
        .username {
            h2 {
                color: #000000;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;
