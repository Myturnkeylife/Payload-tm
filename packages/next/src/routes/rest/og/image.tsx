import React from 'react'

export const OGImage: React.FC<{
  Icon: React.ComponentType<any>
  description?: string
  fontFamily?: string
  leader?: string
  title?: string
}> = ({ Icon, description, fontFamily = 'Arial, sans-serif', leader, title }) => {
  return (
    <div
      style={{
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily,
        height: '100%',
        justifyContent: 'space-between',
        padding: '100px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          fontSize: 50,
          height: '100%',
        }}
      >
        {leader && (
          <div
            style={{
              fontSize: 30,
              marginBottom: 10,
            }}
          >
            {leader}
          </div>
        )}
        <p
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            fontSize: 90,
            lineHeight: 1,
            marginBottom: 0,
            marginTop: 0,
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </p>
        {description && (
          <p
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
              flexGrow: 1,
              fontSize: 30,
              lineHeight: 1,
              marginBottom: 0,
              marginTop: 40,
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div
        style={{
          alignItems: 'flex-end',
          display: 'flex',
          flexShrink: 0,
          height: '38px',
          justifyContent: 'center',
          width: '38px',
        }}
      >
        <Icon fill="white" />
      </div>
    </div>
  )
}
