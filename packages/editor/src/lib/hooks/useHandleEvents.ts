import { TLShapeId } from '@tldraw/tlschema'
import * as React from 'react'
import { createHandleEvents } from '../events/createHandleEvents'
import { useApp } from './useApp'

export function useHandleEvents(id: TLShapeId, handleId: string) {
	const app = useApp()

	return React.useMemo(() => createHandleEvents(app, id, handleId), [app, id, handleId])
}
