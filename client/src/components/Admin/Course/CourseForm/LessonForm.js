import React, { useState } from "react";

export const LessonForm = (props) => {
    const { courseId, onReload, onClose } = props;
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [video, setVideo] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSlugChange = (e) => {
        setSlug(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    console.log(courseId);
    console.log(localStorage.getItem("access").toString());
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("slug", slug);
            formData.append("content", content);
            formData.append("video", video);

            const url = `http://localhost:3977/api/v1/course/${courseId}/lessons`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`, // Obtener el token de acceso del localStorage
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            onReload();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Añadir Lección</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Slug:</label>
                    <input type="text" value={slug} onChange={handleSlugChange} />
                </div>
                <div>
                    <label>Contenido:</label>
                    <textarea value={content} onChange={handleContentChange} />
                </div>
                <div>
                    <label>Video:</label>
                    <input type="file" accept="video/*" onChange={handleVideoChange} />
                </div>
                <div>
                    <button type="submit">Guardar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

