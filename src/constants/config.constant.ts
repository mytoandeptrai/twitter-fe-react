export const getEnv = (key: string, ignore = false): string => {
  const value = process.env[key]
  if (!ignore && value === undefined) {
    console.error(`[ENV] ${key} not found!`)
  }

  return value || ''
}

export const API_URL_DEV = getEnv('REACT_APP_API_URL_DEV')
export const API_URL_PRODUCTION = getEnv('REACT_APP_API_URL_PRODUCTION')
export const DEVELOPMENT = getEnv('REACT_APP_DEVELOPMENT')
export const SOCKET_URL = getEnv('REACT_APP_SOCKET_URL')
export const DEFAULT_BACKGROUND_URL = getEnv('REACT_APP_DEFAULT_BACKGROUND_URL')
export const DEFAULT_URL_GROUP = getEnv('REACT_APP_DEFAULT_URL_GROUP')

export const CLOUDINARY_CLOUD_NAME = getEnv('REACT_APP_CLOUDINARY_CLOUD_NAME')
export const CLOUDINARY_UPLOAD_PRESET_IMAGE = getEnv('REACT_APP_CLOUDINARY_UPLOAD_PRESET_IMAGE')
export const CLOUDINARY_UPLOAD_PRESET_VIDEO = getEnv('REACT_APP_CLOUDINARY_UPLOAD_PRESET_VIDEO')
export const CLOUDINARY_URL = getEnv('REACT_APP_CLOUDINARY_URL').replace('{cloudinary_name}', CLOUDINARY_CLOUD_NAME)
