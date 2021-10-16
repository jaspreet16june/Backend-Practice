function createElement(ElementModel){
    return async function(req,res){
        
        try{
            let user = await ElementModel.create(req.body)
            res.status(202).json({
                createdUser :user
            })
            
        }
        catch(err){
            res.status(500).json({
                message:"server error"
            })
        }
    }
}
function getElement(ElementModel){
   return async function(req, res) {
        try {
            let { id } = req.params;
            let user = await ElementModel.findById(id);
            res.status(200).json({
                message: user,
            })
    
        } catch (err) {
            res.status(404).json({
                message: err.message,
            })
        }
    }

}
function getElements(ElementModel){
      
    return async function (req,res){
        try{
          let user = await ElementModel.find();
          res.status(202).json({
            message: user
        })
     }
     catch(err){
        res.status(500).json({
            message:"server error"
        })
     }
    }
}
function deleteElement(ElementModel){

    return async function(req,res){
        try{
            let { id } = req.body
            let user = await ElementModel.findByIdAndDelete(id);
            res.status(202).json({
                message:"User Is Deleted"
        })
    }
    catch{
        res.status(500).json({
            message:"server error"
            })
        }
    }
}
function updateElement(ElementModel){

    return async function(req,res){
        try{
        let {id} = req.params
        let user = await ElementModel.findById(id);
        if(req.body.password || req.body.confirmPassword){
            res.status(200).json({
                message:"Use forget password instead"
            })
        }
        

        for(let key in req.body){
            user[key] = req.body[key]
                }
                await user.save({
                    validateBeforeSave: false
                });
                res.status(202).json({
                    message:"User Is Updated"
                })
                
            }
    catch(err){
        res.status(500).json({
            message:"server error"
        })
    }
 }
}


module.exports.createElement = createElement;
module.exports.deleteElement = deleteElement;
module.exports.updateElement = updateElement;
module.exports.getElements = getElements;
module.exports.getElement = getElement;