import React from 'react'

const ico = (path, props = {}) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>{path}</svg>
)

export function IconSearch(props) { return ico(<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>, props) }
export function IconCalendar(props) { return ico(<><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>, props) }
export function IconStar(props) { return ico(<path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.9 6.2 21l1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z"/>, props) }
export function IconArrow(props) { return ico(<path d="M5 12h14M13 6l6 6-6 6"/>, props) }
export function IconBack(props) { return ico(<path d="M19 12H5M11 18l-6-6 6-6"/>, props) }
export function IconCheck(props) { return ico(<path d="M20 6 9 17l-5-5"/>, props) }
export function IconSliders(props) { return ico(<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>, props) }
export function IconLaptop(props) { return ico(<><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></>, props) }
export function IconPin(props) { return ico(<><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Z"/></>, props) }
