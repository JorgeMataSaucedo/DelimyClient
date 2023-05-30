import React, { useCallback } from "react";
import { Form } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Lesson } from "../../../../api";
import { useAuth } from "../../../../hooks";

const lessonController = new Lesson();

const initialValues = (lesson) => {
    return {
        title: lesson?.title || "",
        video: lesson?.video || "",
        file: null,
        content: lesson?.content || "",
        slug: lesson?.slug || "",
    };
};

const validationSchema = Yup.object({
    title: Yup.string().required("El título es requerido"),
    video: Yup.mixed().required("El video es requerido"),
    content: Yup.string().required("El contenido es requerido"),
    slug: Yup.string().required("El slug es requerido"),
});

export function LessonForm(props) {
    const { onClose, onReload, lesson } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(lesson),
        validationSchema,
        onSubmit: async (formValues) => {
            try {
                const formData = new FormData();
                formData.append("title", formValues.title);
                formData.append("content", formValues.content);
                formData.append("slug", formValues.slug);
                formData.append("video", formValues.video);

                if (!lesson) {
                    await lessonController.createLesson(accessToken, courseId, formData);
                } else {
                    await lessonController.updateLesson(
                        accessToken,
                        lesson._id,
                        formData
                    );
                }

                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        },
    });

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("video", file);
        formik.setFieldValue("file", URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "video/*",
        onDrop,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name="title"
                label="Título"
                placeholder="Ingrese el título de la lección"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && formik.errors.title}
            />
            <Form.Input
                name="video"
                label="Video"
                type="file"
                onChange={(event) => {
                    formik.setFieldValue("video", event.currentTarget.files[0]);
                }}
                error={formik.touched.video && formik.errors.video}
            />
            <Form.TextArea
                name="content"
                label="Contenido"
                placeholder="Ingrese el contenido de la lección"
                onChange={formik.handleChange}
                value={formik.values.content}
                error={formik.touched.content && formik.errors.content}
            />
            <Form.Input
                name="slug"
                label="Slug"
                placeholder="Ingrese el slug de la lección"
                onChange={formik.handleChange}
                value={formik.values.slug}
                error={formik.touched.slug && formik.errors.slug}
            />

            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {formik.values.file ? (
                    <p>{formik.values.file.name}</p>
                ) : (
                    <p>Arrastra el video aquí</p>
                )}
            </div>

            <Form.Button type="submit" primary>
                {!lesson ? "Crear lección" : "Actualizar lección"}
            </Form.Button>
        </Form>
    );
}
