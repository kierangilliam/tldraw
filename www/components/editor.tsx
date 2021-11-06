import { TLDraw, TLDrawState, Data, useFileSystem } from '@tldraw/tldraw'
import * as gtag from '-utils/gtag'
import React from 'react'

interface EditorProps {
  id?: string
}

export default function Editor({ id = 'home' }: EditorProps) {
  // Put the tlstate into the window, for debugging.
  const handleMount = React.useCallback((tlstate: TLDrawState) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.tlstate = tlstate
  }, [])

  // Send events to gtag as actions.
  const handleChange = React.useCallback(
    (_tlstate: TLDrawState, _state: Data, reason: string) => {
      if (reason.startsWith('command')) {
        gtag.event({
          action: reason,
          category: 'editor',
          label: `page:${id}`,
          value: 0,
        })
      }
    },
    [id]
  )

  const fileSystemEvents = useFileSystem()

  return (
    <div className="tldraw">
      <TLDraw
        id={id}
        onMount={handleMount}
        onChange={handleChange}
        autofocus
        {...fileSystemEvents}
      />
    </div>
  )
}