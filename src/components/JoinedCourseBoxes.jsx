import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const JoinedCourseBoxes = (courses) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [joinedCourses, setJoinedCourses] = useState([]);
  const [approvedCourses, setApprovedCourses] = useState([]); // State for approved courses
  // const [displayCourses, setDisplayCourses] = useState([]);
  const user_id = localStorage.getItem('id');

  useEffect(() => {
    const fetchJoinedCourses = async () => {
      try {
        const response = await axios.get(
          `https://course-management-service.onrender.com/course/?user_id=${user_id}`
        );
        // Assuming the response data is an array of course objects
        setJoinedCourses(response.data);
        // Store joined courses data in local storage if needed
        localStorage.setItem("joinedCourses", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching joined courses:", error);
      }
    };

    const fetchApprovedCourses = async () => { // Function to fetch approved courses
      try {
        const response = await axios.get(
          "https://course-management-service.onrender.com/course/approved"
        );
        // Assuming the response data is an array of approved course objects
        setApprovedCourses(response.data);
        console.log(response.data);
        // Store approved courses data in local storage if needed
        localStorage.setItem("approvedCourses", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching approved courses:", error);
      }
    };

    fetchJoinedCourses();
    fetchApprovedCourses(); // Fetch approved courses on component mount
  }, [user_id]);

  const displayCourses = useMemo(() => {
    console.log(courses);
    if (courses.courses.length > 0) {
      const courseIds = new Set(courses.courses.map(c => c.course_id));
      console.log(courseIds);
      return joinedCourses.filter(jc => courseIds.has(jc.course_id));
    }
    return joinedCourses;
  }, [courses, joinedCourses]);


  const handleViewCourse = (courseId,course_name) => {
    console.log(joinedCourses);
    // Log the courseId to check its value
    console.log("Clicked courseId:", courseId);
    
    // Add your logic to navigate to the course details page or view the course
    console.log(`Viewing course with ID: ${courseId}`);
    navigate('/dashboard/viewcourse/',{state:{courseId:courseId,course_name:course_name}}); // Navigate to the course details page
  };
  

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Joined Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {displayCourses.map((course) => (
          <div
            key={course.course_id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => handleViewCourse(course.course_id,course.course_name)}
          >
            <h3 className="text-lg font-semibold mb-2">{course.course_name}</h3>
            <p className="text-sm text-gray-500 mb-4">{course.course_description}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleViewCourse(course.course_id,course.course_name)}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default JoinedCourseBoxes;
