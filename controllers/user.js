import {generateToken} from './../helpers';
const user =[];

class UserController {

static async registerUser(req, res) {

const newUser = {
email:req.body.email,
password:req.body.password,
first_name: req.body.first_name,
last_name: req.body.last_name
};
const token = generateToken(user.email);
user.push(newUser);
const data ={
token,

}
return res.status(201).send({ status: 'success', data: { 
email:req.body.email,
password:req.body.password,
first_name: req.body.first_name,
last_name: req.body.last_name
 } });

}

}
export default UserController;