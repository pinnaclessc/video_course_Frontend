import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import style from './AdminPage.module.css';
import AllCourses from './Pages/AllCourses';
import AllStudent from './Pages/AllStudent';
import AddCourse from './Pages/AddCourse';
import AddCourseContent from './Pages/AddCourseContent';
import InstructorData from './Instructor/InstructorData';
import InstructorDataList from './Instructor/InstructorDataList';
import CategoryForm from './Courses/Category';

export default function AdminPage() {
  const navigate = useNavigate();

  const[allCourses,setAllCourses]=useState(true);
  const[allStudent,setAllStudnt]=useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const[courseContent, setCourseContent]=useState(false)
  const[instructor,setInstructor]=useState(false)
  const[instructor_list,setInstructor_list]=useState(false)
  const[category,setCategory]=useState(false)
 
  const handleAllCourses=()=>{
    setAllCourses(true);
    setAddCourse(false);
    setAllStudnt(false);
    setCourseContent(false);
    setInstructor_list(false);
    setCategory(false);
    setInstructor(false);
  };

  const handleAllStudent=()=>{
    setAllCourses(false);
    setAddCourse(false);
    setAllStudnt(true);
    setCourseContent(false);
    setInstructor_list(false);
    setCategory(false);
    setInstructor(false);
  }

  const handleAddNewCourse=()=>{
    setAllCourses(false);
    setAddCourse(true);
    setAllStudnt(false);
    setCourseContent(false);
    setInstructor_list(false);
    setCategory(false);
    setInstructor(false);
  }

  const handleAddcourseContent=()=>{
    setCourseContent(true);
    setAllCourses(false);
    setAddCourse(false);
    setAllStudnt(false);
    setInstructor_list(false);
    setCategory(false);
    setInstructor(false);

  }

  const handleInstructorData=()=>{
    setCourseContent(false);
    setAllCourses(false);
    setAddCourse(false);
    setAllStudnt(false);
    setInstructor_list(false);
    setCategory(false);
    setInstructor(true);
  }

  const handleInstructorList=()=>{
    setCourseContent(false);
    setAllCourses(false);
    setAddCourse(false);
    setAllStudnt(false);
    setInstructor_list(true);
    setCategory(false);
    setInstructor(false);
  }

  const handleCategory=()=>{
    setCourseContent(false);
    setAllCourses(false);
    setAddCourse(false);
    setAllStudnt(false);
    setInstructor_list(false);
    setCategory(true);
    setInstructor(false);
  }

  const ViewcourseContentHandler=()=>{
    navigate('/admin/show-course-Content');
  }

  return (
    <div className={style["admin-wraper"]}>

      {/* NavBar-admin  */}
      <div className={style["admin-navbar"]}>
        <div className={style["admin-navItems"]}onClick={handleAllCourses}>All Courses</div>
        <div className={style["admin-navItems"]}onClick={handleAllStudent}>All Students</div>
        <div className={style["admin-navItems"]}onClick={ViewcourseContentHandler}>View Course Content</div>
        <div className={style["admin-navItems" ]}onClick={handleAddNewCourse}>Add New Course</div>
        <div className={style["admin-navItems"]}onClick={handleAddcourseContent}>Add Course Content</div>
        <div className={style["admin-navItems" ]}onClick={handleInstructorData}>Add Instructor Data</div>
        <div className={style["admin-navItems" ]}onClick={handleInstructorList}>Instructor List</div>
        <div className={style["admin-navItems" ]}onClick={handleCategory}>Add Category</div>
        {/* <div className={style["admin-navItems-addCourses" ]}onClick={handleAddcourseContent}>Add Chapter</div> */}
        {/* <div className={style["admin-navItems-addCourses" ]}>Add New Student</div> */}
      </div>
      
      {allCourses&&<AllCourses/>}
      {allStudent&&<AllStudent/>}
      {addCourse&&<AddCourse/>}
      {instructor&&<InstructorData/>}
      {instructor_list&&<InstructorDataList/>}
      {category && <CategoryForm/>}
      {courseContent&&<AddCourseContent/>}

    </div>
  )
}
