import student from './../assests/images/Icons/student.png';
import teacher from './../assests/images/Icons/teacher.png';
import teacher2 from './../assests/images/Icons/teacher(1).png';
import project from './../assests/images/Icons/solution.png';
const homeData = [
    {src: student, title: 'Add Student', toRoute: '/a/addStudent' ,category:['admin'],relatedTo:'student'},
    {src: student, title: 'Update Student Data', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'student'},
    {src: teacher, title: 'Add teacher', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'teacher'},
    {src: teacher2, title: 'Update Teacher Data', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'teacher'},
    {src: project, title: 'Create Project Group', toRoute: '/s/addStudeent',category:['admin','student','guide'],relatedTo:'projects'},
    {src: student, title: 'Projects Groups', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'projects'},
    {src: student, title: 'Research papers', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'projects'},
    {src: teacher2, title: 'Allocate Guide', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'projects'},
    {src: teacher, title: 'Allocate Reviewer', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'projects'},
    {src: teacher, title: 'Project to Guide', toRoute: '/s/addStudeent',category:['guide','admin'],relatedTo:'guide'},
    {src: teacher, title: 'Project to Review ', toRoute: '/s/addStudeent',category:['reviewer','admin'],relatedTo:'reviewer'},
    {src: teacher, title: 'Update Guide', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'guide'},

    {src: teacher, title: 'Update Reviewer ', toRoute: '/s/addStudeent',category:['admin'],relatedTo:'reviewer'},


  ]
export default homeData;