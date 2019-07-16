import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Generate Token

const generateToken = (email) => {
  const token = JWT.sign({
    userEmail: email,
  },
  process.env.JWT_SECRET);
  return token;
};
// check token

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) return res.status(403).send({ status: 403, error: 'No token provided' });
  try {
    const decodedToken = await JWT.verify(token, process.env.JWT_SECRET);
    const { rows } = await dbCon.query('SELECT * FROM users WHERE email= $1', [decodedToken.userEmail]);
    if (!rows) return res.status(403).send({ status: 403, error: 'Failed to authenticate token' });
    req.user = rows;
    next();
  } catch (error) {
    return res.status(403).send({ status: 403, error });
  }
};




 const encryptPass = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


 const checkPassword = (hash, password) =>{ 
   return bcrypt.compareSync(password, hash)
   };



export { verifyToken, generateToken,encryptPass, checkPassword};