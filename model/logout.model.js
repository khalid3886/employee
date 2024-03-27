const mongoose=require('mongoose')
const logoutSchema=mongoose.Schema({
    token:String
},{
    versionKey:false
})

const LogoutModel=mongoose.model('logout',logoutSchema)
module.exports={
    LogoutModel
}