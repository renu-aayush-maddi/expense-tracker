import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        amount: {
            type: Number,
            required: true,
            trim: true
        },
        type: {
            type: String,
            default: "income"
        },
        date: {
            type: Date,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 100,
            trim: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Income', IncomeSchema);
