
const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "product name is required"],
        },
        cost: String,
        type: String,
    },
    { timestamps: true}
);


schema.method("toJSON", function(){
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("products",schema);