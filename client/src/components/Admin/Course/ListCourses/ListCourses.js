import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Course } from "../../../../api";
import { CourseItem } from "../CourseItem";
import "./ListCourses.scss";

const courseController = new Course();

export function ListCourses(props) {
  const { reload, onReload } = props;
  const [courses, setCourses] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    (async () => {
      try {
        let response;
        if (userRole === "instructor") {
          response = await courseController.getCourseByInstructorId({ page });
        } else if (userRole === "admin") {
          response = await courseController.getCourses({ page });
        }
        setCourses(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload, userRole]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!courses) return <Loader active inline="centered" />;
  if (size(courses) === 0) return "No hay ningún curso";

  return (
      <div className="list-courses">
        {map(courses, (course) => (
            <CourseItem key={course._id} course={course} onReload={onReload} />
        ))}

        <div className="list-courses__pagination">
          <Pagination
              totalPages={pagination.pages}
              defaultActivePage={pagination.page}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              onPageChange={changePage}
          />
        </div>
      </div>
  );
}
