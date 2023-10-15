import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import React, { memo, useEffect } from 'react'
import styled from 'styled-components'

type Props = {
  story: any
  customStyles?: string
}

const StoryImageViewer = ({ story, customStyles }: Props) => {
  const { editor, onReady } = useFabricJSEditor()

  useEffect(() => {
    if (editor && story) {
      const canvasWidth = editor?.canvas.getWidth()
      const canvasHeight = editor?.canvas.getHeight()

      editor?.canvas.loadFromJSON(story, () => {
        // change url of image object
        const obj = editor?.canvas.getObjects()
        obj?.forEach((o: any) => {
          if (o.type === 'image') {
            o.scaleToHeight((canvasWidth || 100) * 0.8)
            o.scaleToHeight((canvasHeight || 100) * 0.8)
            editor?.canvas.centerObject(o)
          }
        })
        editor?.canvas.requestRenderAll()
        editor?.canvas.renderAll()
        editor?.canvas.calcOffset()
      })
    }

    return () => {}
  }, [editor, story])

  return (
    <StyledRoot active={!!story}>
      <StyledCanvas>
        <FabricJSCanvas onReady={onReady} />
      </StyledCanvas>
    </StyledRoot>
  )
}

export default memo(StoryImageViewer)

const StyledRoot = styled('div')<{ active: boolean }>`
  width: 100%;
  height: 100%;
  display: ${({ active }) => (active ? 'block' : 'none')};
  cursor: pointer;
`

const StyledCanvas = styled.div`
  width: 100%;
  height: 100%;
`
