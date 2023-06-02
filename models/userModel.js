const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide a username"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please enter confirm password"],
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

},
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    } catch (error) {
        console.log(error);
    }
});

userSchema.methods.checkPassword = async function (
    candidatePassword, //inside the body
    userPassword //inside the DB
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


module.exports = mongoose.model('user', userSchema);