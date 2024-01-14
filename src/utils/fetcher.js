import { BASE_API_URL } from "./constants.js"

export const fetcher = async (url, init, isTextResponse) => {
  const response = await fetch(BASE_API_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  })
  if (!response.ok) {
    throw new Error(
      (await (isTextResponse ? response?.text() : response?.json()))?.message
    )
  }
  return isTextResponse ? response?.text() : response?.json()
}
