'use client'

import { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/types'
import Script from 'next/script'
import Link from 'next/link'

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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()

      const initData = tg.initData || ''
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
          .catch((err) => {
            setError('Failed to fetch user data')
          })
      } else {
        setError('No user data available')
      }
    } else {
      setError('This app should be opened in Telegram')
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-between min-h-screen">
      <Script src="https://kit.fontawesome.com/18e66d329f.js" crossorigin="anonymous" />
      
      <div className="w-full custom-purple text-white p-4 flex items-center justify-between">
        <button onClick={toggleMenu}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
        <h1 className="text-2xl font-bold">Pi Trader Official</h1>
        <div></div>
      </div>

      <div className="text-center mt-4">
        <p className="custom-purple-text">
          Pi Coin has not launched. This is the premarket price set by our team and does not represent Official data
        </p>
        <br /><br />
        <h2 className="text-4xl font-bold mt-4">$0.65/Pi</h2>
      </div>

      <div className="flex justify-center mt-8">
        <img src="https://storage.googleapis.com/a1aa/image/nHtKiYEJNtYhCFGEdd2czOW74EMguRulx5F4Ve6ewjWmxanTA.jpg" alt="Placeholder image representing Pi Coin" className="custom-purple rounded-full w-64 h-64" width="256" height="256" />
      </div>

      <div className="w-full flex flex-col items-center mb-8">
        <Link href="/page2">
          <button className="custom-purple text-white text-2xl font-bold py-4 px-16 rounded-full mt-8">
            Sell Your Pi
          </button>
        </Link>
        <p className="mt-4">Your current points: {user.points}</p>
      </div>

      {/* Sliding Menu */}
      <div id="menu" className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">Close</button>
        <ul className="mt-16">
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Home</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Transaction History</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">About</a></li>
        </ul>
      </div>

      <style jsx>{`
        .custom-purple {
          background-color: #8A2BE2;
        }
        .custom-purple-text {
          color: #8A2BE2;
        }
      `}</style>
    </div>
  )
}
