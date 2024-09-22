import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'], // فقط دو نقش ثابت
        default: 'USER' // به طور پیش‌فرض نقش کاربر عادی است
    },
    // bio: {
    // s    type: String,
    //     maxlength: 500
    // },
    // profilePicture: {
    //     type: String
    // }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);