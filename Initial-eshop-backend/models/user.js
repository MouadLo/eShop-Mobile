import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        street: {
            type: String,
            default: "",
        },
        apartment: {
            type: String,
            default: "",
        },
        zip: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.passwordHash
                delete ret.__v
            },
        },
    }
)

userSchema.virtual("id").get(function () {
    return this._id.toHexString()
})

const User = mongoose.model("User", userSchema)

export { User, userSchema }
