import { memo } from 'react'

const genericMemoComponent: <T>(component: T) => T = memo

export default genericMemoComponent
