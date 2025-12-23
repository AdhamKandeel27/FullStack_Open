import React from 'react'

function Notification({ type, message }) {
  if (!message) {
    return null
  }

  const getNotificationStyle = () => {
    const baseStyle = {
      fontSize: '20px',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '2px solid',
      fontWeight: 'bold',
    }

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          color: '#155724',
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
        }
      case 'error':
        return {
          ...baseStyle,
          color: '#721c24',
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
        }
      case 'info':
        return {
          ...baseStyle,
          color: '#004085',
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
        }
      default:
        return {
          ...baseStyle,
          color: '#004085',
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
        }
    }
  }

  return (
    <div className={`notification notification-${type}`} style={getNotificationStyle()}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  )
}

export default Notification