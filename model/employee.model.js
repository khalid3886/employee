const mongoose=require('mongoose')
const employeeSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    salary:Number,
    date:String,
    department:{type:String, enum:["Tech","Marketing","Operations"]}
},{
    versionKey:false
})

const EmployeeModel=mongoose.model('employee',employeeSchema)
module.exports={
    EmployeeModel
}