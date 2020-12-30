import mongoose from '../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model

const uploadRouter = new Schema({
    fileName:{
        type:String,
        required:true,
        unique: true
    }
} ,{timestamps:true})

export default model('uploadRouter',uploadRouter)