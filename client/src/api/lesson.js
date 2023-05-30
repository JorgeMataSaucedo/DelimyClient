import { ENV } from "../utils";

export class Lesson {
    baseApi = ENV.BASE_API;

    async createLesson(accessToken, courseId, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (data.file) {
                formData.append("video", data.file);
            }

            const url = `${this.baseApi}/course/${courseId}/lessons`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 201) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getLessons(accessToken, courseId, page = 1, limit = 10) {
        try {
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`;
            const url = `${this.baseApi}/course/${courseId}/lessons?${pageFilter}&${limitFilter}`;

            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }


    async getLesson(lessonId) {
        try {
            const url = `${this.baseApi}/lessons/${lessonId}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateLesson(accessToken, lessonId, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (data.file) {
                formData.append("video", data.file);
            }

            const url = `${this.baseApi}/lessons/${lessonId}`;
            const params = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteLesson(accessToken, lessonId) {
        try {
            const url = `${this.baseApi}/lessons/${lessonId}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}
