const express=require("express")
const empRouter=express.Router()
const {mployeeModel, EmployeeModel}=require('../model/employee.model')
const {auth}=require('../middleware/auth.middleware')

empRouter.get('/',auth,async(req,res)=>{
    let { _sort, _search,_filter,_page} = req.query;
    _sort = _sort || "asc";
    _page=parseInt(_page) || 1
    try{
        let query = {};
        if(_search) {
            query.firstname = _search;
        }
        if(_filter) {
            query.department = _filter;
        }
        const totalEmployees = await EmployeeModel.countDocuments(query);
        const totalPages = Math.ceil(totalEmployees / 3);


        const employee=await EmployeeModel.find(query).sort({salary:_sort}).skip((_page-1)*3).limit(3)
        res.status(200).json({employee,totalPages})
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
})

empRouter.post('/',auth,async(req,res)=>{
    const {firstname,lastname,email,salary}=req.body
    let date=new Date()
    date = date.toISOString().split('T')[0];
    try{
       const newEmp=new EmployeeModel({firstname,lastname,email,salary,date})
        await newEmp.save()
        res.status(201).json({msg:'new employee has been added'})
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
})

empRouter.delete('/:id',auth,async(req,res)=>{
const _id=req.params.id
try{
await EmployeeModel.findByIdAndDelete(_id)
res.status(200).json({msg:'data has been deleted'})
}
catch(err)
{
    console.log(err)
    res.status(400).json({error:err})
}
})

empRouter.patch('/:id',auth,async(req,res)=>{
    const _id=req.params.id
    const {firstname,lastname,email,salary}=req.body
    try{
    await EmployeeModel.findByIdAndUpdate(_id,{firstname,lastname,email,salary})
    res.status(200).json({msg:'data has been updated'})
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
    })

module.exports={
    empRouter
}