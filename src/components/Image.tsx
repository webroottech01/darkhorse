import React from 'react'
import { css } from 'styled-components'
import Icon from './Icon'
import { Shimmer } from './Shimmer'

type ImageProps = {
  alt?: string
  src?: string
  height?: string | number
  width?: string | number
  fallback?: React.ReactNode
  className?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
}

export default function Image(props: ImageProps) {
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  return (
    <div
      css={css`
        border-radius: 4px;
        border: 1px solid transparent;
        overflow: hidden;
        flex-shrink: 0;
        outline: none;
        position: relative;
        width: min-content;

        img,
        div {
          border-radius: 4px;
        }
      `}
      className={props.className}
    >
      <img
        onError={() => setStatus('error')}
        onLoadStart={() => setStatus('loading')}
        onLoad={() => {
          setStatus('success')

          if (props.onLoad) props.onLoad()
        }}
        alt={props.alt}
        width={props.width}
        height={props.height}
        loading={props.loading ?? 'lazy'}
        css={css`
          object-fit: cover;
          display: block;
          opacity: ${status === 'success' ? 1 : 0};
          transition: opacity 200ms ease-out;
        `}
        aria-hidden={props.alt ? undefined : true}
        src={props.src}
      />
      {status === 'error' && props.fallback ? props.fallback : null}
      <Shimmer
        aria-hidden
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          ${status === 'error' && 'background: var(--gray-light);'}
          opacity: ${status === 'success' ? 0 : 1};
          transition: opacity 200ms ease-out;
        `}
      >
        {/* {status === 'error' ? 'Error loading image' : null} */}
      </Shimmer>
    </div>
  )
}
