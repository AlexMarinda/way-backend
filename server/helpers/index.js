import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import trips  from '../model/trip';
import users from '../model/users';




// Generate Token

const generateToken = user => {
  const token = JWT.sign(user,process.env.JWT_SECRET);
  return token;
};



const jwtVerifiy = (token) => {
  const decodedToken = JWT.decode(token,  process.env.JWT_SECRET,{ expiresIn: '24h'});
  return decodedToken;
}

// check token

const verifyToken = async (req, res, next) => {
  try {
     const token = req.headers.authorization.split(' ')[1] || req.body.token;
      if (!token) return res.status(400).send({ status: 400,message: 'No token provided' });
    const decodedToken = await JWT.verify(token, process.env.JWT_SECRET,{ expiresIn: '24h' });
    
    if (!decodedToken) return res.status(401).send({ status: 401, message: 'Failed to authenticate token' });
    return next();
    
  } catch (error) {
    return res.status(403).send({ status: 403, message:'No token provided'});
  }
};



//encript password using bcrypt
 const encryptPass = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//check password
 const checkPassword = (hash, password) =>{ 
   return bcrypt.compareSync(password, hash)
   };
 
   //filter destination
   const findQueryByDestination = (dquery) =>{
    console.log(dquery);
     const dest = trips.filter(c => c.destination === dquery);
     return dest;
   }
   //filter origin
    const findQueryByOrigin = (oquery) =>{
     const orig = trips.filter(c => c.origin === oquery);
     return orig;
   }
   // find user using  using id
   const findUserById =(userID) =>{
    let foundUser =null;
    for (let i =0; i<users.length; i++){
      if(users[i].user_id===userID){
           foundUser = users[i];
      } 
 }    
 return foundUser;
   }
   const findTripById = (tripID) =>{
    
   let foundTrip =null;
  
   for (let i =0; i<trips.length; i++){
        if(trips[i].trip_id===tripID){
             foundTrip = trips[i];
        }
   }
   return foundTrip;
   }

   const  makeUserAdmin =(req, res) =>{
    const findUser =   users.find(t => t.user_id === parseInt(req.params.user_id));
    if(findUser )

    findUser .is_admin = req.body.is_admin;
       

     res.status(200).send({ status: 'success', data:  'you make user admin successfully'});

        return res.status(200).send({ status: 'success', data: { 
        'message':'trip not found!'
     } });

}

const invalidDataMessage=(res, result) =>{
  const errors = [];
  for (let index = 0; index < result.error.details.length; index += 1) {
    errors.push(result.error.details[index].message.split('"').join(' '));
  }
  return res.status(422).send({ status: 422, Error: errors });
}





   
  


export { 
  verifyToken, generateToken,encryptPass, checkPassword,findQueryByDestination,jwtVerifiy,
  findQueryByOrigin, findTripById, findUserById,makeUserAdmin,invalidDataMessage
};