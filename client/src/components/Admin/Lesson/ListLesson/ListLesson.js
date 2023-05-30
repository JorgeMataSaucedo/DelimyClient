import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { Lesson } from "../../../../api";
import { LessonItem } from "../LessonItem";

const lessonController = new Lesson();

export function ListLessons(props) {
    const { courseId } = props;
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await lessonController.getLessons(courseId);
                setLessons(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [courseId]);

    if (loading) return <Loader active inline="centered" />;
    if (lessons.length === 0) return <p>No hay lecciones disponibles.</p>;

    return (
        <div>
            {lessons.map((lesson) => (
                <LessonItem key={lesson._id} lesson={lesson} onReload={() => {}} />
            ))}
        </div>
    );
}
