import User from '../../../database/models/users/index.js'
function giveUser(req, res, next,id){
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.user= user;
        next();
    });
}

export default giveUser