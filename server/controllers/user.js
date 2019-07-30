import {generateToken,encryptPass, checkPassword} from './../helpers';
import users from '../model/users'


//class contain all user operation
class UserController {
    
// new user 
static  registerUser(req, res) {

const newUser = {
user_id:users.length + 1,
email:req.body.email,
password:encryptPass(req.body.password),
first_name: req.body.first_name,
last_name: req.body.last_name
};
for (let i =0; i<users.length;i++){
  
    if(users[i].email===req.body.email )
       
      return res.status(200).send({ status: 'success', data: "choose another email this was taken" });
      
           
        }
const token = generateToken(users.email);
users.push(newUser);

return res.status(201).send({ status: 'success', data: { 
token,
email:req.body.email,
password:encryptPass(req.body.password),
first_name: req.body.first_name,
last_name: req.body.last_name
 } });

}


// user signin function
static  login(req, res) {


const {email, password}=req.body;


for (let i =0; i<users.length;i++){

    if((users[i].email===email) && (checkPassword(users[i].password,password))){
        const token = generateToken(users[i]);
        return res.status(200).send({ status: 'success', data: { 
            token,
            user_id:users.length + 1,
            email:users[i].email,
            password:encryptPass(req.body.password),
            first_name: users[i].first_name,
            last_name: users[i].last_name
             } });
           }
        }

    return res.status(401).send({ status: 'success', data: { 
'message':'User not found!'
 } });


}

}
export default UserController;