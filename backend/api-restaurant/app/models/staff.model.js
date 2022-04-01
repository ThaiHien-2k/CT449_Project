
const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "staff name is required"],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        address: String,
        phone: String,
        salaryperhour:String,
        men:Boolean,
    },
    { timestamps: true}
);


schema.method("toJSON", function(){
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("staffs",schema);