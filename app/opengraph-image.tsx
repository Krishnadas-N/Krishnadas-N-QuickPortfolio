import { ImageResponse } from 'next/og'
import profileData from '@/data/profile.json'

export const alt = `${profileData.name} - ${profileData.title}`
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: '#0b0f1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00E5FF',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          {profileData.name}
        </div>
        <div style={{ fontSize: 40, color: '#7C4DFF' }}>
          {profileData.title}
        </div>
        <div style={{ fontSize: 24, color: '#9CA3AF', marginTop: 20 }}>
          {profileData.summary}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

