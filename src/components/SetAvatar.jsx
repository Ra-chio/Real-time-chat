import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "top-left",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "light",
    };

    useEffect(() => {
        async function SaOne() {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
                navigate("/login");
        }
        SaOne();
    }, [navigate]);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );

            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error(
                    "Error setting avatar. Please try again.",
                    toastOptions
                );
            }
        }
    };

    useEffect(() => {
        async function SaTwo() {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        SaTwo();
    }, [api]);

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>CHOOSE AN AVATAR FOR YOUR PROFILE</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div
                                    className={`avatar ${
                                        selectedAvatar === index
                                            ? "selected"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn">
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #fff;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: #000000;
        }
    }
    .avatars {
        display: flex;
        gap: 4rem;
        padding: 2rem 0;

        .avatar {
            border: 0.2rem solid transparent;
            padding: 0.4rem;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.1s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #000000;
        }
    }
    .submit-btn {
        background-color: #fff;
        color: #000000;
        padding: 1rem 2rem;
        border: 4px solid #000000;
        font-weight: bold;
        cursor: pointer;
        font-size: 1.5rem;
        text-transform: uppercase;
        &:hover {
            background-color: #000000;
            color: #fff;
        }
    }
`;
