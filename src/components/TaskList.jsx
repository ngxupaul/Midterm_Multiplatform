import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks, toggleTask, deleteTask } from '../utils/storage'
import './TaskList.css'

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [tapCounts, setTapCounts] = useState({})
  const [tapTimers, setTapTimers] = useState({})
  const [swipedTaskId, setSwipedTaskId] = useState(null)
  const touchDataRef = React.useRef({ startX: 0, deltaX: 0, activeId: null })
  const navigate = useNavigate()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const loadedTasks = await getTasks()
    setTasks(loadedTasks)
  }

  const handleToggleTask = async (taskId) => {
    const updatedTasks = await toggleTask(taskId)
    setTasks(updatedTasks)
  }

  const handleTripleTap = (taskId) => {
    setTapCounts(prev => {
      const current = (prev[taskId] || 0) + 1
      if (tapTimers[taskId]) clearTimeout(tapTimers[taskId])
      const timer = setTimeout(() => {
        setTapCounts(p => ({ ...p, [taskId]: 0 }))
        setTapTimers(p => ({ ...p, [taskId]: null }))
      }, 450)
      setTapTimers(p => ({ ...p, [taskId]: timer }))
      if (current >= 3) {
        clearTimeout(timer)
        setTapCounts(p => ({ ...p, [taskId]: 0 }))
        setTapTimers(p => ({ ...p, [taskId]: null }))
        handleToggleTask(taskId)
      }
      return { ...prev, [taskId]: current }
    })
  }

  const longPressTimersRef = React.useRef({})
  const startLongPress = (taskId) => {
    cancelLongPress(taskId)
    longPressTimersRef.current[taskId] = setTimeout(async () => {
      if (window.confirm('Bạn có muốn xóa công việc này không?')) {
        const updated = await deleteTask(taskId)
        setTasks(updated)
      }
    }, 600)
  }
  const cancelLongPress = (taskId) => {
    const t = longPressTimersRef.current[taskId]
    if (t) {
      clearTimeout(t)
      delete longPressTimersRef.current[taskId]
    }
  }

  const onTouchStart = (taskId, e) => {
    const touch = e.touches ? e.touches[0] : e
    touchDataRef.current = { startX: touch.clientX, deltaX: 0, activeId: taskId }
    startLongPress(taskId)
  }
  const onTouchMove = (taskId, e) => {
    const touch = e.touches ? e.touches[0] : e
    const deltaX = touch.clientX - touchDataRef.current.startX
    touchDataRef.current.deltaX = deltaX
    cancelLongPress(taskId)
  }
  const onTouchEnd = (taskId) => {
    const { deltaX, activeId } = touchDataRef.current
    cancelLongPress(taskId)
    if (activeId !== taskId) return
    if (deltaX < -60) {
      setSwipedTaskId(taskId)
    } else if (deltaX > 40) {
      setSwipedTaskId(null)
    } else {
      handleTripleTap(taskId)
    }
    touchDataRef.current = { startX: 0, deltaX: 0, activeId: null }
  }

  const handleClickDelete = async (taskId) => {
    if (window.confirm('Bạn có muốn xóa công việc này không?')) {
      const updated = await deleteTask(taskId)
      setTasks(updated)
      setSwipedTaskId(null)
    }
  }

  return (
    <div className="task-list-container">
      <header className="header">
        <h1>Danh sách Việc cần làm</h1>
      </header>

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có công việc nào. Hãy thêm công việc mới!</p>
          </div>
        ) : (
          <ul className="tasks-list">
            {tasks.map((task) => {
              const isSwiped = swipedTaskId === task.id
              return (
                <li
                  key={task.id}
                  className={`task-item-wrapper ${isSwiped ? 'show-delete' : ''}`}
                >
                  <div className="delete-slot">
                    <button className="delete-button" onClick={() => handleClickDelete(task.id)}>
                      Xóa
                    </button>
                  </div>
                  <div
                    className="task-item"
                    onTouchStart={(e) => onTouchStart(task.id, e)}
                    onTouchMove={(e) => onTouchMove(task.id, e)}
                    onTouchEnd={() => onTouchEnd(task.id)}
                    onMouseDown={() => startLongPress(task.id)}
                    onMouseUp={() => onTouchEnd(task.id)}
                    onMouseLeave={() => cancelLongPress(task.id)}
                  >
                    <button
                      className={`task-toggle ${task.completed ? 'completed' : 'pending'}`}
                      onClick={() => handleTripleTap(task.id)}
                    >
                      {task.completed ? '✅' : '⏳'}
                    </button>
                    <div className="task-content">
                      <span className={`task-name ${task.completed ? 'completed-text' : ''}`}>
                        {task.name}
                      </span>
                      <span className={`task-status ${task.completed ? 'status-done' : 'status-progress'}`}>
                        {task.completed ? 'DONE' : 'IN PROGRESS'}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <button
        className="add-button"
        onClick={() => navigate('/add')}
        aria-label="Thêm công việc mới"
      >
        ➕
      </button>
    </div>
  )
}

export default TaskList

