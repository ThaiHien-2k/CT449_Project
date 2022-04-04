
const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        room_name: {
            type: String,
            required: [true, "room_name is required"],
        },
        type:String,
        cost:Number,
        name:String,
        CMND:String,
        phone:String,
        nam:Boolean,
        staff_name:String,
        time:Number,
        total:Number
    },
    { timestamps: true}
);


schema.method("toJSON", function(){
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("bills",schema);