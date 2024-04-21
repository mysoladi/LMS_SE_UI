import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";

const CourseBoxes = (searchCourses) => {
  const [courses, setCourses] = useState([]);
  const [user_id, setUserId] = useState("");
  const [joinedCourses, setJoinedCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://course-management-service.onrender.com/course/approved"
        );
        setCourses(response.data);
        localStorage.setItem("approvedCourses", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchJoinedCourses = async () => {
      try {
        const user_id = localStorage.getItem("id");
        setUserId(user_id);
        const response = await axios.get(
          `https://course-management-service.onrender.com/course/?user_id=${user_id}`
        );
        setJoinedCourses(response.data);
        localStorage.setItem("joinedCourses", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching joined courses:", error);
      }
    };

    fetchCourses();
    fetchJoinedCourses();
  }, [refresh]); // Refresh when the state of 'refresh' changes

  const displayCourses = useMemo(() => {
    console.log(searchCourses);
    if (searchCourses.searchCourses.length > 0) {
      const courseIds = new Set(searchCourses.searchCourses.map(c => c.course_id));
      console.log(courseIds);
      return courses.filter(jc => courseIds.has(jc.course_id));
    }
    return courses;
  }, [searchCourses, courses]);

  const handleJoinCourse = async (courseId) => {
    try {
      await axios.put(
        "https://course-management-service.onrender.com/course/join",
        {
          user_id: user_id,
          course_id: courseId,
        }
      );
      setRefresh(!refresh); // Toggle refresh state to trigger re-fetching courses
    } catch (error) {
      console.error("Error joining course:", error);
    }
  };

  // Filter out joined courses from the main courses list
  const filteredCourses = displayCourses.filter(
    (course) => !joinedCourses.some((joinedCourse) => joinedCourse.course_id === course.course_id)
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Courses to Join</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.course_id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">{course.course_name}</h3>
            <p className="text-sm text-gray-500 mb-4">{course.course_description}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleJoinCourse(course.course_id)}
            >
              Join Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBoxes;
