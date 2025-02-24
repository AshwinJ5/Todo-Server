const Todos = require("../Schema/todoSchema");

// add new todo
exports.addNewTodo = async (req, res) => {
    const { userId, title, description, status, priority } = req.body;

    if (!userId || !title || !description || !priority) {
        return res.status(400).json({ error: "Missing datas" });
    }

    try {
        const newTodo = new Todos({
            userId,
            title,
            description,
            status,
            priority,
        });

        await newTodo.save();
        console.log("New Task Created Successfully");
        res.status(200).json(newTodo);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get all todo of a user
exports.getAllTodosOfaUser = async (req, res) => {
    const {id}= req.params;    

    try {
        const userTodos = await Todos.find({ userId: id });
        res.status(200).json(userTodos);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get a todo
exports.deleteATodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todos.findByIdAndDelete(id);
        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(400).json(error);
    }
};
// update a todo
exports.updateATodoDetails = async (req, res) => {
    const { title, description, status, priority } = req.body;
    const { id } = req.params;
    if (!title || !description || !priority) {
        return res.status(400).json({ error: "Missing datas" });
    }

    try {
        const updatedTodo = await Todos.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                status,
                priority,
            },
            { new: true }
        );

        await updatedTodo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json(error);
    }
};

// update status of todo
exports.updateATodoStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        const updatedTodo = await Todos.findByIdAndUpdate(
            { _id: id },
            {
                status,
            },
            { new: true }
        );

        await updatedTodo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json(error);
    }
};
