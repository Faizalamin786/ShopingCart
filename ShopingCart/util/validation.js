const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const isValid = function (value){
    if(typeof value === 'undefined'||value === null) return false
    if(typeof value === 'string'&&value.trim().length==0) return false
    return true;

}
const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0 
}

const isValidEmail = function (email) {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
}
const isValidObjectId = function(ObjectID){
    return mongoose.Types.ObjectID.isValid(ObjectID)
}
const isValidIndianPhone = function(MoblieNumber){
    if(MoblieNumber.length!==10){
    return false
    }
    return true
}
const hashPassWord = async (password) => {
    try {
        const saltRounds = 10;
        const hasspassword = await bcrypt.hash(password, saltRounds);
        return hasspassword;

    } catch (error) {
        res.status(500).send({ status: false, message: "hashpassword error" })
    }
}
module.exports = {isValid,hashPassWord, isValidRequestBody, isValidEmail,isValidObjectId,isValidIndianPhone}