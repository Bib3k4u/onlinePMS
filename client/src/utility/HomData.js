import student from './../assests/images/Icons/student.png';
import teacher from './../assests/images/Icons/teacher.png';
import teacher2 from './../assests/images/Icons/teacher(1).png';
import project from './../assests/images/Icons/solution.png';
const userRole = sessionStorage.getItem('role');
const homeData = [
    {src: student, title: 'Add Student', toRoute: '/a/addStudent' ,category:['Admin'],relatedTo:'Admin'},
    {src: student, title: 'Update Student Data', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Admin'},
    {src: teacher, title: 'Add teacher', toRoute: '/a/addTeacher',category:['Admin'],relatedTo:'Teacher'},
    {src: teacher2, title: 'Update Teacher Data', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Teacher'},
    {src: project, title: 'Create Project Group', toRoute: '/project/createProject',category:['Admin','Student','Guide'],relatedTo:'Projects'},
    {src: student, title: 'Projects Groups', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Projects'},
    {src: student, title: 'Research papers', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Projects'},
    {src: teacher2, title: 'Allocate Guide', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Projects'},
    {src: teacher, title: 'Allocate Reviewer', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Projects'},
    {src: teacher, title: 'Project to Guide', toRoute: '/s/addStudeent',category:['guide','Admin'],relatedTo:'Guide'},
    {src: teacher, title: 'Project to Review ', toRoute: '/s/addStudeent',category:['reviewer','Admin'],relatedTo:'Reviewer'},
    {src: teacher, title: 'Update Guide', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Guide'},

    {src: teacher, title: 'Update Reviewer ', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:'Reviewer'},

    {src:project,title:'My project',toRoute:'/projects/myProject',category:['Student'],relatedTo:'Student'}
  ];
  let filteredHomeData = [];

  if (userRole) {
    filteredHomeData = homeData.filter(item =>
      ( item.category &&item.category.includes(userRole) || item.relatedTo === userRole)
    );
  } else {
    // Handle the case when userRole is undefined, e.g., show default or handle accordingly
    console.error("User role is undefined");
  }
  console.log(filteredHomeData);
  export default filteredHomeData;