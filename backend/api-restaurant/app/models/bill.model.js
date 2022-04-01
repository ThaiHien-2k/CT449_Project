
const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        table_name: {
            type: String,
            required: [true, "table_name is required"],
        },
        product_name: String,
        amount: String,
        staff_name:String,
        tip:String,
        total_money:String,
    },
    { timestamps: true}
);


schema.method("toJSON", function(){
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("bills",schema);