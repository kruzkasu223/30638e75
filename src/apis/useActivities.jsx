import { useQuery } from "react-query"
import { fetcher } from "../utils/fetcher.js"

export const useActivities = () => {
  const query = useQuery("activities", ({ signal }) =>
    fetcher("/activities", {
      method: "GET",
      signal,
    })
  )

  return query
}
