import {generateToken,encryptPass, checkPassword} from './../helpers/index';
import users from '../model/users';
import DbHelper from './../helpers/DbHelper';
import Respond from '../helpers/responseHandle';
import dotenv from 'dotenv';

dotenv.config();

const { response } = Respond;



//class contain all user operation
class UserController {
    
// new user 
static   async registerUser (req, res) {

const newUser = {
email:req.body.email,
password:encryptPass(req.body.password),
first_name: req.body.first_name,
last_name: req.body.last_name
};
const { error: firstError, response: firstResult } = await DbHelper.findOne('users', 'email', newUser.email);

if (firstError) {
  return response(res, 500, 'Oops! unexpected things happened into server', true);
}
if(firstResult.rowCount>0){
  return response(res, 409, 'choose another email this was taken!', true);

}

const { error, response: result } = await DbHelper.insert('users', newUser);
if (error) {
 
  return response(res, 400, error, true);
}
const [creatededUser] = result.rows;

const token = generateToken(creatededUser);
users.push(newUser);
delete creatededUser.password;
return response(res, 201,  {token,...creatededUser});

}


// user signin function
static async login(req, res) {


const {email, password}=req.body;
const { error, response: result } = await DbHelper.findOne('users', 'email', email);

if (error) {
  console.log(error)
  return response(res, 500, 'Oops! unexpected things happened into server', true);
}

const { rows, rowCount } = result;


if (rowCount > 0) {
  // compare password
  const [currentUser] = rows;
console.log(currentUser);
  if (checkPassword(currentUser.password,password)) {
    const token = generateToken(currentUser);
    delete currentUser.password;
    return res.status(200).json({
      status: 'success',
      data: {
        token,...currentUser
      }
    });
  }
}


    return res.status(401).send({ status: 'success', data: { 
'message':'User not found!'
 } });


}

}
export default UserController;