'use client'

import { useState, useEffect } from 'react'

export default function AgeGate() {
  const [showGate, setShowGate] = useState(false)

  // Check localStorage on first mount
  useEffect(() => {
    const verified = localStorage.getItem('age-verified')
    if (!verified) setShowGate(true)
  }, [])

  // Add/remove class on showGate change
  useEffect(() => {
    if (showGate) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    // Clean up in case component unmounts
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [showGate])

  const handleAccept = () => {
    localStorage.setItem('age-verified', 'true')
    setShowGate(false)
  }

  const handleDecline = () => {
    window.location.href = 'https://www.google.com'
  }

  if (!showGate) return null

  return (
    <div className="age-gate">
      <div className="age-gate__content">
        <h2 className="age-gate__title">Are you 21 or older?</h2>
        <p className="age-gate__text">You must be of legal age to enter this site.</p>
        <div className="age-gate__buttons">
        <button onClick={handleAccept} className="age-gate__btn accept">
            Yes, I am 21+
          </button>
          <button onClick={handleDecline} className="age-gate__btn decline">
            No, I’m underage
          </button>
        </div>
      </div>
    </div>
  )
}
