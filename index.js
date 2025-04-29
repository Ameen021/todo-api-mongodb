const Todo = require('./models/Todo');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// let todos = [];
let nextId = 1;

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });
  

  app.post('/todos', async (req, res) => {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }
  
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
  });
  

app.put('/todos/:id', async (req, res) => {
    const { task } = req.body;
    const { id } = req.params;
  
    if (!task) return res.status(400).json({ error: 'Task is required' });
  
    const updated = await Todo.findByIdAndUpdate(id, { task }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
  
    res.json(updated);
  });
  

  app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  });
  
mongoose.connect('mongodb+srv://Ameen021:09127979314Nf@cluster0.ts54rnx.mongodb.net/todo_db?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`To-Do API running at http://localhost:${PORT}`);
});
