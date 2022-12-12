import axiosClient from './axiosClient'

export const sampleApi = {
  getActivity() {
    const url = '/activity'
    return axiosClient.get(url)
  }
}
