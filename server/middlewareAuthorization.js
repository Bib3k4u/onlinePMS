const authenticateUser = (req, res, next) => {
  const {role} = 'teahcer';

  // If user information is not found in the session, check cookies
  

  // Add user information to the request for later use in route handlers
  if (!role) {
    return res.status(401).json({ message: 'Unauthorized: User not logged in' });
  }
  req.user={role}
  next();
};

  const authorizeTeacher = (req, res, next) => {
    
    const { role } = req.user;
    console.log(req.user);
    if (role!=='Admin'&&role !== 'Teacher') {
      return res.status(403).json({ message: 'Forbidden: Not a teacher' });
    }
  
    next();
  };
  const authorizeAdmin = (req,res,next)=>{
    const{role} = req.user;
    if(role!='Admin'){
      return res.status(403).json({message:'Forbidden:Not a Admin'});
    }
  }
  module.exports = { authenticateUser, authorizeTeacher ,authorizeAdmin};