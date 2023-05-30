import React, { useEffect, useState } from "react";
import { Modal, Button, Loader } from "semantic-ui-react";
import { Lesson } from "../../../api";

export function LessonsModal(props) {
    const { lessons, onClose } = props;

    const handleCreateLesson = () => {
        // Lógica para crear una nueva lección
        // Puedes implementarla según tus necesidades
        console.log("Crear nueva lección");
    };

    return (
        <Modal open onClose={onClose}>
            <Modal.Header>Lecciones del Curso</Modal.Header>
            <Modal.Content>
                {Array.isArray(lessons) && lessons.length > 0 ? (
                    <ul>
                        {lessons.map((lesson) => (
                            <li key={lesson._id}>{lesson.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay lecciones disponibles</p>
                )}
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" onClick={handleCreateLesson}>
                    Añadir Lección
                </Button>
                <Button color="red" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
