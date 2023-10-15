import { useUploadService } from '@/services'
import { useFabricJSEditor, FabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CANVAS_EDITOR_CONFIG } from '../story-form-image.config'

type Props = {
  onCancel: () => void
  onSubmit: (text: string, file?: string) => void
}

export const useStoryFormImage = ({ onCancel, onSubmit }: Props) => {
  const { t } = useTranslation()
  const { editor, onReady } = useFabricJSEditor()
  const { uploadImageToCloud } = useUploadService()

  const [textBoxCounter, setTextBoxCounter] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [isUploadFile, setIsUploadFile] = useState(false)

  const isDisabledSaveButton = useMemo(() => {
    return !file || isUploadFile
  }, [file, isUploadFile])

  const isFileImageType = useCallback((file: File) => {
    const imageRegex = /image.*/
    return file.type.match(imageRegex)
  }, [])

  const onFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, editor: FabricJSEditor | undefined) => {
      const file = event?.target?.files?.[0]
      if (file && isFileImageType(file) && editor) {
        fabric.Image.fromURL(URL.createObjectURL(file), function (img) {
          const canvasWidth = editor?.canvas.getWidth() || 0
          const canvasHeight = editor?.canvas.getHeight() || 0
          editor?.canvas.add(img)
          const obj = editor?.canvas.getObjects()

          obj?.forEach((o) => {
            if (o.type === 'image' && o.height && o.width) {
              o.selectable = false
              o.scaleToHeight((canvasWidth || 100) * 0.8)
              o.scaleToHeight((canvasHeight || 100) * 0.8)
            }
          })
          editor?.canvas.centerObject(img)
          setFile(file)
        })
      }
    },
    [isFileImageType]
  )

  const onTextBoxCounterChange = useCallback((newCounter: number) => setTextBoxCounter(newCounter), [])

  const onDeleteSelectionsInCanvas = useCallback(() => {
    let deletedTextBoxCounter = 0
    editor?.canvas.getActiveObjects().forEach((object) => {
      deletedTextBoxCounter += object?.type === 'textbox' ? 1 : 0
      editor?.canvas.remove(object)
    })
    setTextBoxCounter(Math.max(0, textBoxCounter - deletedTextBoxCounter))
  }, [editor?.canvas, textBoxCounter])

  const onAddTextToCanvas = useCallback(
    (editor: FabricJSEditor | undefined) => {
      if (editor) {
        const text = `${t('common.text.typeSomething')} ...`
        editor?.canvas.add(new fabric.Textbox(text, CANVAS_EDITOR_CONFIG))
        setTextBoxCounter((v) => v + 1)
        editor?.canvas.renderAll()
      }
    },
    [t]
  )

  const onTextColorChange = useCallback((e: ChangeEvent<HTMLInputElement>, editor: FabricJSEditor | undefined) => {
    const color = e.target.value
    if (editor) {
      editor?.canvas.getActiveObjects().forEach((object) => {
        if (object.type === 'textbox') {
          object.set('fill', color)
        }
      })
      editor?.canvas.renderAll()
    }
  }, [])

  const onSaveToServer = useCallback(
    async (editor: FabricJSEditor | undefined, file: File | null) => {
      if (editor && file) {
        setIsUploadFile(true)
        const uploadedImage = await uploadImageToCloud(file)
        if (!uploadedImage) {
          setIsUploadFile(false)
        }
        const obj = editor?.canvas.getObjects()
        obj?.forEach((o: any) => {
          if (o.type === 'image') {
            o.setSrc(uploadedImage, () => {
              const objects = editor?.canvas.toJSON()
              objects && onSubmit(JSON.stringify(objects))
              setIsUploadFile(false)
            })
          }
        })
      }
    },
    [onSubmit, uploadImageToCloud]
  )

  const onCancelAll = useCallback(async () => {
    editor?.deleteAll()
    await Promise.all([setTextBoxCounter(0), setFile(null)])
  }, [editor])

  return {
    editor,
    textBoxCounter,
    file,
    isDisabledSaveButton,

    onReady,
    onFileChange,
    onTextBoxCounterChange,
    onDeleteSelectionsInCanvas,
    onAddTextToCanvas,
    onTextColorChange,
    onSaveToServer,
    onCancelAll
  }
}
