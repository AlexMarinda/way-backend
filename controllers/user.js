import {generateToken,encryptPass, checkPassword} from './../helpers';
const user =[];

class UserController {

static  registerUser(req, res) {

const newUser = {
email:req.body.email,
password:encryptPass(req.body.password),
first_name: req.body.first_name,
last_name: req.body.last_name
};
const token = generateToken(user.email);
user.push(newUser);

return res.status(201).send({ status: 'success', data: { 
token,
email:req.body.email,
password:encryptPass(req.body.password),
first_name: req.body.first_name,
last_name: req.body.last_name
 } });

}

static  login(req, res) {


const {email, password}=req.body;
const token = generateToken(user.email);
let findUser=null;

for (let i =0; i<user.length;i++){

    if((user[i].email===email)){
   console.log(checkPassword(user[i].password,password))
        if(checkPassword(user[i].password,password)){
        return res.status(201).send({ status: 'success', data: { 
token,
email:req.body.email,
password:req.body.password,
first_name: req.body.first_name,
last_name: req.body.last_name
 } });
}
        }
    }

    return res.status(401).send({ status: 'success', data: { 
'message':'User not found!'
 } });


}

}
export default UserController;