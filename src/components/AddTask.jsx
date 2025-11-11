import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTask } from '../utils/storage'
import './AddTask.css'

function AddTask() {
  const [taskName, setTaskName] = useState('')
  const navigate = useNavigate()

  const handleSave = async () => {
    if (!taskName.trim()) {
      return
    }
    await addTask(taskName.trim())
    setTaskName('')
    navigate('/')
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="add-task-container">
      <header className="header">
        <h1>Thêm công việc mới</h1>
      </header>

      <div className="form-container">
        <div className="form-card">
          <label htmlFor="task-name" className="label">
            Tên công việc
          </label>
          <div className="input-wrapper">
            <input
              id="task-name"
              type="text"
              className="task-input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Nhập tên công việc..."
              autoFocus
            />
          </div>
          <p className="hint-text">Bạn có thể chỉnh sửa trạng thái sau khi lưu.</p>
          <div className="button-group">
            <button className="button cancel-button" onClick={handleCancel}>
              Hủy
            </button>
            <button
              className="button save-button"
              onClick={handleSave}
              disabled={!taskName.trim()}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTask

