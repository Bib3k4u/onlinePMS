const authenticateUser = (req, res, next) => {
    const { userId, role } = req.session.user || req.cookies;
  
    
  
    // Perform additional authentication checks if needed, such as checking roles or tokens
    // For example, check if the user role is valid for accessing the specific route
  
    // Add user information to the request for later use in route handlers
    req.user = { userId, role };
    next();
  };
  
  const authorizeTeacher = (req, res, next) => {
    const { role } = req.user;
    console.log(req.user);
    if (role !== 'Teacher') {
      return res.status(403).json({ message: 'Forbidden: Not a teacher' });
    }
  
    next();
  };
  const authorizeAdmin = (req,res,next)=>{
    const{role} = req.user;
    if(role!='Admin'){
      return res.status(403).json({message:'Forbidden:Not a teacher'});
    }
  }
  module.exports = { authenticateUser, authorizeTeacher };