const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');


// Get All Employees
router.get('/api/employees', async (req, res) => {
    try {
        const data = await Employee.find({});
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});



//Get Single Employee

router.get('/api/employee/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send('Employee not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});



//Save Employee
router.post('/api/employee/add', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    });

    emp.save()
        .then(data => {
            res.status(200).json({ code: 200, message: 'Employee Added Successfully', addEmployee: data });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});


//Update Employee
router.put('/api/employee/update/:id', (req, res) => {
    const emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true })
        .then(data => {
            if (data) {
                res.status(200).json({ code: 200, message: 'Employee Updated Successfully', updateEmployee: data });
            } else {
                res.status(404).send('Employee not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});





//Delete Employee
router.delete('/api/employee/:id', (req, res) => {
    Employee.findOneAndDelete({ _id: req.params.id })
        .then(data => {
            if (data) {
                res.status(200).json({ code: 200, message: 'Employee deleted', deleteEmployee: data });
            } else {
                res.status(404).send('Employee not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});



module.exports = router;