import uploadRouter from '../../../database/models/uploadRouter/index.js'

// At the top of the file
import { parse } from 'querystring';
import multer from 'multer';

import fs from 'fs'
import path from 'path'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file');

export function uploadFile(req, res, next){

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("Checking error from isntance of multer")
            console.log(err);
            return res.status(500).json(err)
        } else if (err) {
            console.log("Checking error")
            console.log(err);
            return res.status(500).json(err)
        }
        console.log("saved file name is - ")
        console.log(req.file.filename) // working!

        let achBody = {
            fileName:req.file.filename,
        }
    
        let newFile = new uploadRouter(achBody)
    
        newFile.save((err, ach)=>{
            if(err){
                let errorMessage = err
                console.log(errorMessage)
                return res.status(400).json({
                    errorMessage : errorMessage
                })
            }

            console.log("Saving file!")
    
            res.send(ach)   
        })

    })

}

export function fetchFiles(req,res, next){
    uploadRouter.find((err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(result)
    })

}
