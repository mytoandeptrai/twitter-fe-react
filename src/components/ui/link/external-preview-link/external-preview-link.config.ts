import { axiosClient } from '@/apis'
import { EEndpoints } from '@/constants'

const getLinkPreview = async (url: string) => {
  const endpoint = `${EEndpoints.LinkPreview}?url=${url}`
  const response = await axiosClient.get(endpoint)
  const data = response?.data?.data || {}

  return {
    title: data?.meta?.title || '',
    description: data?.meta?.description || '',
    image: data?.og?.image || '',
    siteName: data?.og?.site_name || '',
    hostname: data?.og?.url || ''
  }
}

export { getLinkPreview }
