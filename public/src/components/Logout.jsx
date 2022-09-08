import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        const id = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
            localStorage.clear();
            navigate("/login");
        }
    };

    return (
        <Button onClick={handleClick}>
            <FaPowerOff />
        </Button>
    );
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    border: 4px solid #000000;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #000000;
    }
`;
