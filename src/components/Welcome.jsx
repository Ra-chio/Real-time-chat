import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function Wel() {
            setUserName(
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                ).username
            );
        }
        Wel();
    }, []);

    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Hey there <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    line-height: 3rem;
    font-size: 1.5rem;
    flex-direction: column;
    img {
        height: 20rem;
        border-top: 10px solid #000000;
        border-radius: 100%;
        padding: 1% 0;
    }
    span {
        color: red;
    }
`;
