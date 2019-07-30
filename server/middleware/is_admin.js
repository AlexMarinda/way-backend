import JWT from 'jsonwebtoken';
import users from '../model/users'

// to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
     const token = req.headers.authorization.split(' ')[1] || req.body.token;
      const decoded = await JWT.verify(token, process.env.JWT_SECRET,{ expiresIn: '24h' });
      const foundUser = decoded.user;
      console.log(foundUser);
       
      users.forEach((user)=>{
        if(user.email ===foundUser.email){
          if(foundUser.is_admin){
            next();
          }
        }
      });

      return res.status(401).send({ status: 'success', data: { 'message':'Unauthorized access'} }); 
    
    } 
    
    catch (error) {
      return res.status(403).send({ status: 403, error });
    }

    return true;
  };
  
  export default  isAdmin;
  