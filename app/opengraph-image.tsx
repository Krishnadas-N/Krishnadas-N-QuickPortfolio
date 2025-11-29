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
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff41',
          fontFamily: 'monospace',
          position: 'relative',
          border: '2px solid #00ff41',
        }}
      >
        {/* Matrix rain effect background simulation */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,255,65,0.05) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 0,
        }} />
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
          padding: '40px',
          border: '1px solid #00ff41',
          background: 'rgba(0,0,0,0.8)',
          boxShadow: '0 0 50px rgba(0,255,65,0.2)',
        }}>
          <div style={{ 
            fontSize: 30, 
            marginBottom: 20, 
            color: '#00ff41',
            letterSpacing: '4px' 
          }}>
            &gt; SYSTEM_PROFILE_LOADED
          </div>
          
          <div style={{ 
            fontSize: 90, 
            fontWeight: 'bold', 
            marginBottom: 20,
            color: '#ffffff',
            textShadow: '0 0 20px #00ff41',
            letterSpacing: '-2px'
          }}>
            {profileData.name}
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: 30
          }}>
            <div style={{ fontSize: 40, color: '#00ffff' }}>
              {profileData.role}
            </div>
            <div style={{ fontSize: 40, color: '#00ff41' }}>/ /</div>
            <div style={{ fontSize: 40, color: '#ff00ff' }}>
              Full Stack Dev
            </div>
          </div>

          <div style={{ 
            fontSize: 24, 
            color: '#00ff41', 
            marginTop: 20,
            background: 'rgba(0,255,65,0.1)',
            padding: '10px 20px',
            borderRadius: '4px',
            border: '1px solid rgba(0,255,65,0.3)',
          }}>
            root@portfolio:~$ ./view_skills.sh --all
          </div>
        </div>

        {/* Corner accents */}
        <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: '4px solid #00ff41', borderLeft: '4px solid #00ff41' }} />
        <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: '4px solid #00ff41', borderRight: '4px solid #00ff41' }} />
        <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: '4px solid #00ff41', borderLeft: '4px solid #00ff41' }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: '4px solid #00ff41', borderRight: '4px solid #00ff41' }} />
      </div>
    ),
    {
      ...size,
    }
  )
}

