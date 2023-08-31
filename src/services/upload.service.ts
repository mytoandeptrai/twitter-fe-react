import { axiosClient } from '@/apis'
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET_IMAGE,
  CLOUDINARY_URL,
  EEndpoints,
  EUploadFileType
} from '@/constants'
import axios from 'axios'
import { EventBusName, onPushEventBusHandler } from './event-bus.service'

export const useUploadService = () => {
  const uploadImage = async (file: File) => {
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('type', EUploadFileType.Tweet)
      const url = `${EEndpoints.Upload}/image`

      const response = await axiosClient.post(url, formData)
      return response?.data?.url || ''
    } catch (error) {
      console.log('🚀 ~ file: upload.service.ts:8 ~ uploadImage ~ error:', error)
    }
  }

  const uploadImages = async (files: FileList | never[]) => {
    if (!files || !files?.length) return
    return Promise.all(
      Array.from(files).map(async (file) => {
        return uploadImage(file)
      })
    )
  }

  const uploadMedia = async (file: File, type: EUploadFileType = EUploadFileType.Tweet) => {
    try {
      const formData = new FormData()
      formData.append('files', file)
      formData.append('type', type)
      const url = EEndpoints.Upload
      const response = await axiosClient.post(url, formData)
      return response?.data?.[0] || ''
    } catch (error: any) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: error?.response?.data?.message
      })
      return ''
    }
  }

  const uploadMedias = async (files: File[], type: EUploadFileType = EUploadFileType.Tweet): Promise<string[]> => {
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file)
      })
      formData.append('type', type)
      const url = EEndpoints.Upload

      const response = await axiosClient.post(url, formData)
      return response?.data || []
    } catch (error: any) {
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: error?.response?.data?.message
      })
      return []
    }
  }

  const uploadImageToCloud = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET_IMAGE)
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME)
    const response = await axios.post(CLOUDINARY_URL, formData)
    return response.data?.secure_url || ''
  }

  const uploadMultiImagesToCloud = async (files: File[]) => {
    const mediaUrls = await Promise.all(
      Array.from(files).map(async (file: File) => {
        return await uploadImageToCloud(file)
      })
    )
    return mediaUrls
  }

  return {
    uploadImage,
    uploadImages,
    uploadMedia,
    uploadMedias,

    uploadImageToCloud,
    uploadMultiImagesToCloud
  }
}
