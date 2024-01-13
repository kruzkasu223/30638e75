import { BASE_API_URL } from "./constants.js"

export const fetcher = async (url, init) => {
  const response = await fetch(BASE_API_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  })
  if (!response.ok) {
    throw new Error((await response?.json())?.message)
  }
  return response.json()
}
