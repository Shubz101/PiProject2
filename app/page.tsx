'use client'

import { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/types'
import Script from 'next/script'
import './Home.css'

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp
    }
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()

      const initDataUnsafe = tg.initDataUnsafe || {}

      if (initDataUnsafe.user) {
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initDataUnsafe.user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setError(data.error)
            } else {
              setUser(data)
            }
          })
          .catch(() => {
            setError('Failed to fetch user data')
          })
      } else {
        setError('No user data available')
      }
    } else {
      setError('This app should be opened in Telegram')
    }
  }, [])

  const handleIncreasePoints = async () => {
    if (!user) return

    try {
      const res = await fetch('/api/increase-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId: user.telegramId }),
      })
      const data = await res.json()
      if (data.success) {
        setUser({ ...user, points: data.points })
        setNotification('Points increased successfully!')
        setTimeout(() => setNotification(''), 3000)
      } else {
        setError('Failed to increase points')
      }
    } catch {
      setError('An error occurred while increasing points')
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-between min-h-screen">
      <Script src="https://kit.fontawesome.com/18e66d329f.js" />
      
      <div className="header">
        <button onClick={toggleMenu}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
        <h1 className="title">Pi Trader Official</h1>
        <div></div>
      </div>

      <div className="text-center mt-4">
        <p className="custom-purple-text">
          Pi Coin has not launched. This is the premarket price set by our team and does not represent Official data
        </p>
        <br /><br />
        <h2 className="price">$0.65/Pi</h2>
      </div>

      <div className="image-container">
        <img src="https://storage.googleapis.com/a1aa/image/nHtKiYEJNtYhCFGEdd2czOW74EMguRulx5F4Ve6ewjWmxanTA.jpg" alt="Placeholder image representing Pi Coin" className="custom-purple rounded-full" />
      </div>

      <div className="button-container">
        <button onClick={handleIncreasePoints} className="increase-points-button">
          Increase Points
        </button>
        <p className="mt-4">Your current points: {user.points}</p>
        {notification && (
          <div className="notification">
            {notification}
          </div>
        )}
      </div>

      {/* Sliding Menu */}
      <div id="menu" className={`menu ${menuOpen ? 'open' : 'closed'}`}>
        <button onClick={toggleMenu} className="close-button">Close</button>
        <ul className="menu-list">
          <li><a href="#" className="menu-item">Home</a></li>
          <li><a href="#" className="menu-item">Transaction History</a></li>
          <li><a href="#" className="menu-item">About</a></li>
        </ul>
      </div>
    </div>
  )
}
