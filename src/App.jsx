import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from './store/counterSlice';

function App() {
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);

  const handleAdd = () => {
    if (editId !== null) {
      dispatch(updateTodo({ id: editId, text: input }));
      setEditId(null);
    } else {
      dispatch(addTodo(input));
    }
    setInput('');
  };
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks))
  }, [tasks])
  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleUpdate = (id, text) => {
    setInput(text);
    setEditId(id);
  };

  return (
    <div className='grid w-full justify-center my-3'>
      <div className='flex items-center gap-5 my-3'>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className='border border-black rounded px-5 py-0.5 w-full'
          placeholder='Enter Task'
        />
        <button onClick={handleAdd} className='bg-green-500 rounded text-white px-5 py-0.5'>
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <div>
        <h2 className='text-center text-3xl py-5'>Task List</h2>
        {tasks.map((task) => (
          <div key={task.id} className='md:flex grid bg-gray-300 px-5 py-2 my-2 items-center justify-center md:justify-between gap-5'>
            <p className='font-semibold text-2xl'>
              {task.text}
            </p>

            <div className='flex gap-3 justify-center'>
              <button onClick={() => handleDelete(task.id)} className='bg-red-500 rounded text-white px-5 py-0.5'>
                Delete
              </button>
              <button onClick={() => handleUpdate(task.id, task.text)} className='bg-blue-500 rounded text-white px-5 py-0.5'>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
