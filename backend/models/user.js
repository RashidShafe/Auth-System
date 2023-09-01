const mongoose = require('mongoose');

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
    }
});
userSchema.statics.isThisEmailInUse = async function (email) {

    if(!email) throw new Error('not a mail');

    try {
        const user = this.findOne({ email });
        if (user) return false;

        return true;
    } catch (err) { console.log(err.message); return false; }
}
module.exports = mongoose.model('User', userSchema);