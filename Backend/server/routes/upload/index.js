import express from 'express'
import {uploadFile, fetchFiles} from '../../controllers/uploads/index.js'
import authorizer from '../../helpers/authorizers/index.js'

const uploadRouter  = express.Router()

uploadRouter.post('/uploadFile', authorizer(), uploadFile)
uploadRouter.get('/fetchFiles', fetchFiles)

export default uploadRouter