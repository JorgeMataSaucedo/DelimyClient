import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Lesson } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { LessonForm } from "../LessonForm";

const lessonController = new Lesson();

export function LessonItem(props) {
    const { lesson, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { accessToken } = useAuth();

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateLesson = () => {
        onOpenCloseModal();
    };

    const onDelete = async () => {
        try {
            await lessonController.deleteLesson(accessToken, lesson._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <h4>{lesson.title}</h4>
                <p>{lesson.content}</p>
                <Button icon primary onClick={openUpdateLesson}>
                    <Icon name="pencil" />
                </Button>
                <Button icon color="red" onClick={onOpenCloseConfirm}>
                    <Icon name="trash" />
                </Button>
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title="Formulario de Lección">
                <LessonForm onClose={onOpenCloseModal} onReload={onReload} lesson={lesson} />
            </BasicModal>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`Eliminar la lección "${lesson.title}"?`}
                size="mini"
            />
        </>
    );
}
