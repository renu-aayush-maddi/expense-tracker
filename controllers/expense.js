import ExpenseSchema from "../models/ExpenseModel.js";

export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 ) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }

    console.log(expense);
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
