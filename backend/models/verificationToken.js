const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const verificatonTokenSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required: true
    },
    token:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        expires: 3600,
        default: Date.now()
    }
});

verificatonTokenSchema.pre('save', 
async function(next){
    if(this.isModified('token')){
       const hash = await bcrypt.hash(this.token, 3);
       this.token=hash;
    }
    next();
});

verificatonTokenSchema.methods.compareToken = async function(token){
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}

module.exports = mongoose.model('VerificationToken', verificatonTokenSchema);