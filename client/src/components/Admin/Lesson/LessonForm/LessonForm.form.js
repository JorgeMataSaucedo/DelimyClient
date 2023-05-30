import * as Yup from "yup";

export function initialValues(lesson) {
    return {
        title: lesson?.title || "",
        video: null,
        file: null,
        content: lesson?.content || "",
        slug: lesson?.slug || "",
    };
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        video: Yup.mixed().required(true),
        content: Yup.string().required(true),
        slug: Yup.string().required(true)
    });
}
