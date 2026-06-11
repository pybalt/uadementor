import React from 'react'
import { Avatar } from './Avatar.jsx'
import { RatingStars } from './RatingStars.jsx'
import { Tag } from './Tag.jsx'
import { Badge } from '../ds/Badge.jsx'
import { Button } from './Button.jsx'
import { IconPin } from './icons.jsx'

/**
 * Product composite: a tutor result card for the search grid. Composes
 * Avatar, RatingStars, Tag, Badge and Button.
 */
export function TutorCard({
  name = 'Tutor',
  subjects = [],
  rating = 0,
  reviewCount,
  modality,
  hourlyRate,
  highlight,
  onView,
  style = {},
}) {
  const [hover, setHover] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 14,
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderColor: hover ? 'var(--brand-border)' : 'var(--border)',
        borderRadius: 'var(--radius-card)', padding: 20,
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <Avatar name={name} size={52} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{name}</span>
            {highlight && <Badge tone="gold" size="sm">{highlight}</Badge>}
          </div>
          <div style={{ marginTop: 3 }}>
            <RatingStars value={rating} size={14} showValue />
            {reviewCount != null && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginLeft: 6 }}>
                ({reviewCount})
              </span>
            )}
          </div>
        </div>
        {hourlyRate != null && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>${hourlyRate}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>por hora</div>
          </div>
        )}
      </div>

      {subjects.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {subjects.slice(0, 3).map((s, i) => <Tag key={i} tone={i === 0 ? 'brand' : 'neutral'}>{s}</Tag>)}
          {subjects.length > 3 && <Tag>+{subjects.length - 3}</Tag>}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 2 }}>
        {modality && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            <IconPin />
            {modality}
          </span>
        )}
        <Button variant="secondary" size="sm" onClick={onView} style={{ marginLeft: 'auto' }}>Ver perfil</Button>
      </div>
    </div>
  )
}