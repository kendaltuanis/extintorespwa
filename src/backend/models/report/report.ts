const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const expenseSchema = new Schema({
    expense: { type: Number, require: true },
    detail: { type: String, require: true }
}, { _id: false });

const reportSchema = new Schema({
    gasoline: { type: Number, require: true },
    mileage: { type: Number, require: true },
    details: String,
    date: { type: Date, default: Date.now() },
    expense: [expenseSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

reportSchema.index({date: 1, user: 1}, {unique: true});


export const Report = mongoose.model("Report", reportSchema);

