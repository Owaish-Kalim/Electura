import User from '../../../../database/models/users/index.js'
import DbErrorHandler from  '../../../helpers/errorHandlers/database/index.js'

function signUp(req, res){
    console.log(req.body)
    const user  = new User(req.body)
    // console.log("User is - ");
    // console.log(user)
    user.save((err, user)=>{
        if(err){
            let errorMessage = DbErrorHandler(err)
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }
        res.json({
            user
        })
    })
}

export default signUp

