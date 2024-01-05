// const express = require("express")
// const mongoose = require('mongoose')
// const cors = require("cors")
// const EmployeeModel = require('./models/Employee')

// const app = express()
// app.use(express.json())
// app.use(cors())

// // mongoose.connect("mongodb://localhost:27017/")
// mongoose.connect("mongodb://127.0.0.1:27017/employee");

// app.post("/login", (req, res) => {
//     const {email, password} = req.body;
//     EmployeeModel.findOne({email: email})
//     .then(user => {
//         if(user){
//             if(user.password === password){
//                 res.json("Success")
//             }
//             else{
//                 res.json("the password is incorrect")
//             }
//         }
//         else{
//             res.json("User doesn't exist")
//         }
//     })
// })

// app.post('/register', (req,res) =>{
//     EmployeeModel.create(req.body)
//     .then(employees => res.json(employees))
//     .catch(err => res.json(err))
// })

// app.listen(3001,() => {
//     console.log("server is running")
// })

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employee');

const secretKey = 'U8w2*sZv$Bq6@pYtT5rKl#nA!9E4gHj';

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await EmployeeModel.findOne({ email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ email: user.email }, secretKey);
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = await EmployeeModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3001, () => {
    console.log('Server is running');
});
