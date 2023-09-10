const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        default: false,
        required:true,
    }
});

userSchema.pre('save', 
function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 2, (err, hash)=>{
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
});

userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('not found password!');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

userSchema.statics.isThisEmailInUse = async function (email) {

    if(!email) throw new Error('not a mail');

    try {
        const user =await this.findOne({ email });
        if (user) return false;

        return true;
    } catch (err) { console.log(err.message); return false; }
}
module.exports = mongoose.model('User', userSchema);