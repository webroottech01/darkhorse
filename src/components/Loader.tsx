'use client'

export default function Loader() {
  return (
    <div className="overlayloader pageloader">
      <img
        src="/assets/weed.gif"
        alt="Loading..."
        className="w-24 h-24 animate-pulse"
      />
      <p>Loading...</p>
    </div>
  )
}