import React, { useEffect, useState } from "react";
import { Container, Image } from "semantic-ui-react";
import { map } from "lodash";
import { reviewsData } from "./Reviews.data";
import "./Reviews.scss";

export function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            const data = await reviewsData();
            setReviews(data);
        }

        fetchReviews();
    }, []);

    const getRandomUserImage = async () => {
        try {
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();
            const userImage = data.results[0]?.picture.medium;
            return userImage;
        } catch (error) {
            console.log("Error al obtener la imagen del usuario:", error);
            return null;
        }
    };

    const updateReviewData = async () => {
        const updatedReviews = await Promise.all(
            reviews.map(async (review) => {
                const randomUserImage = await getRandomUserImage();
                const randomName = await getRandomUserName();
                const randomComment = await getRandomComment();
                return {
                    ...review,
                    avatar: randomUserImage || review.avatar,
                    userName: randomName || review.userName,
                    comment: randomComment || review.comment,
                };
            })
        );

        setReviews(updatedReviews);
    };

    const getRandomUserName = async () => {
        try {
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();
            const firstName = data.results[0]?.name.first;
            const lastName = data.results[0]?.name.last;
            const fullName = `${firstName} ${lastName}`;
            return fullName;
        } catch (error) {
            console.log("Error al obtener el nombre del usuario:", error);
            return null;
        }
    };

    const getRandomComment = async () => {
        try {
            const response = await fetch("https://api.example.com/randomcomment");
            const data = await response.json();
            const randomComment = data.comment;
            return randomComment;
        } catch (error) {
            console.log("Error al obtener el comentario aleatorio:", error);
            return null;
        }
    };

    useEffect(() => {
        updateReviewData();
    }, [reviews]);

    return (
        <Container className="reviews">
            <h2>Forma parte de los 150 mil estudiantes</h2>

            <div className="reviews__list">
                {map(reviews, (review, index) => (
                    <div key={index}>
                        <p>{review.comment}</p>
                        <div className="reviews__list-user">
                            <Image src={review.avatar} avatar />
                            <div>
                                <span>{review.userName}</span>
                                <span>{review.userType}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
