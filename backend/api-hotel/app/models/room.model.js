
const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "room name is required"],
        },
        cost: Number,
        type: String,
        status: Boolean
    },
    { timestamps: true}
);


schema.method("toJSON", function(){
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("rooms",schema);