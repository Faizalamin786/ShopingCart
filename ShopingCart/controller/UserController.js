const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')
const { uploadFile } = require('../aws/aws')
const jwt = require('jsonwebtoken')
const { hashPassWord, comparePassword } = require('../util/validator')
require('dotenv').config()

const { SECRET_KEY } = process.env

const register = async function (req, res) {
    try {
        let data = JSON.parse(req.body.data);
        let files = req.files

        data.password = await hashPassWord(data.password)
        if (files.length === 0) {
            return res.status(400).send({ status: false, message: "No file found" })
        }

        let uploadedFiles = await uploadFile(files[0])

        data.profileImage = uploadedFiles

        const createUser = await userModel.create(data)

        return res.status(201).send({ status: true, message: "User created successfully", data: createUser })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
const login = async function (req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).send({ status: false, message: "email or password is missing" })

        const userDetail = await userModel.findOne({ email: email });

        const passwordStatus = await comparePassword(password, userDetail.password)

        if (!userDetail || !passwordStatus) {
            return res.status(401).send({ status: false, message: "username or the password is not correct" })
        }

        //generate token

        const token = jwt.sign({ userId: userDetail._id, exp: 7560606060 }, SECRET_KEY)

        return res.status(200).send({ status: true, data: { userId: userDetail._id, token: token } })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
