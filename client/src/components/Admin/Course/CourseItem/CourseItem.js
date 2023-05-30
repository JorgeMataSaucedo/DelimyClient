import React, { useState } from "react";
import { Image, Button, Icon, Confirm, Card, Modal } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { CourseForm } from "../CourseForm";
import "./CourseItem.scss";

const courseController = new Course();

export function CourseItem(props) {
  const { course, onReload } = props;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLessonsModal, setShowLessonsModal] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseUpdateModal = () => setShowUpdateModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const onOpenCloseLessonsModal = () => setShowLessonsModal((prevState) => !prevState);

  const openUpdateCourse = () => {
    setShowUpdateModal(true);
  };

  const onDelete = async () => {
    try {
      await courseController.deleteCourse(accessToken, course._id);
      onReload();
      setShowConfirm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const playLessonVideo = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  const renderLessonCards = () => {
    return course.lessons.map((lesson, index) => (
        <Card key={lesson._id}>
          <Card.Content>
            <Card.Header>{lesson.title}</Card.Header>
            <Card.Description>{lesson.content}</Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Button
                icon
                color="blue"
                onClick={() => playLessonVideo(lesson.video.url)}
                disabled={index > 0 && !course.lessons[index - 1].video.url}
            >
              <Icon name="play" />
              Reproducir
            </Button>
          </Card.Content>
        </Card>
    ));
  };

  return (
      <>
        <div className="course-item">
          <div className="course-item__info">
            <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
            <div>
              <p>{course.title}</p>
              <p>{course.instructorName}</p>
            </div>
          </div>

          <div>
            <Button icon as="a" href={course.url} target="_blank">
              <Icon name="eye" />
            </Button>
            <Button icon primary onClick={openUpdateCourse}>
              <Icon name="pencil" />
            </Button>
            <Button icon color="red" onClick={onOpenCloseConfirm}>
              <Icon name="trash" />
            </Button>
            <Button icon color="yellow" onClick={onOpenCloseLessonsModal}>
              <Icon name="plus" />
            </Button>
          </div>
        </div>

        {showUpdateModal && (
            <BasicModal
                show={showUpdateModal}
                close={onOpenCloseUpdateModal}
                title={`Actualizar ${course.title}`}
            >
              <CourseForm onClose={onOpenCloseUpdateModal} onReload={onReload} course={course} />
            </BasicModal>
        )}

        {showLessonsModal && (
            <Modal open={showLessonsModal} onClose={onOpenCloseLessonsModal} size="large">
              <Modal.Header>Lecciones de {course.title}</Modal.Header>
              <Modal.Content scrolling>
                <Card.Group centered itemsPerRow={1}>
                  {renderLessonCards()}
                </Card.Group>
              </Modal.Content>
            </Modal>
        )}

        <Confirm
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm={onDelete}
            content={`Eliminar el curso ${course.title}`}
            size="mini"
        />
      </>
  );
}
