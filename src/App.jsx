import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board-tasks'

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function nextIdFrom(tasks) {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [inputText, setInputText] = useState('')
  const [nextId, setNextId] = useState(() => nextIdFrom(loadTasks()))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    const text = inputText.trim()
    if (!text) return
    setTasks([...tasks, { id: nextId, text, completed: false }])
    setNextId(nextId + 1)
    setInputText('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="container">
      <h1>タスクボード</h1>

      <div className="input-row">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="新しいタスクを入力..."
        />
        <button onClick={addTask}>追加</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">タスクがありません。</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item${task.completed ? ' completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}

      <p className="summary">
        {tasks.filter(t => !t.completed).length} / {tasks.length} 件 未完了
      </p>
    </div>
  )
}
