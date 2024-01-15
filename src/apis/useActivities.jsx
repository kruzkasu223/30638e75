import { useMutation, useQuery } from "@tanstack/react-query"
import { fetcher } from "../utils"
import toast from "react-hot-toast"

export const useActivities = () => {
  const activities = useQuery({
    queryKey: ["activities"],
    queryFn: ({ signal }) =>
      fetcher("/activities", {
        method: "GET",
        signal,
      }),
  })

  const archiveCall = useMutation({
    mutationFn: ({ id, is_archived }) =>
      fetcher(
        `/activities/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ is_archived }),
        },
        true
      ),
    onSuccess: activities.refetch,
    onError: (error) => toast.error(error?.message || "Error!!!"),
  })

  const archiveAll = useMutation({
    mutationFn: () =>
      archiveAllFetcher(
        activities?.data
          ?.filter((item) => !item.is_archived)
          ?.map((item) => item.id)
      ),
    onSuccess: activities.refetch,
    onError: (error) => toast.error(error?.message || "Error!!!"),
  })

  const unarchiveAll = useMutation({
    mutationFn: () =>
      fetcher(
        `/reset`,
        {
          method: "PATCH",
        },
        true
      ),
    onSuccess: activities.refetch,
    onError: (error) => toast.error(error?.message || "Error!!!"),
  })

  return { activities, archiveCall, archiveAll, unarchiveAll }
}

const archiveAllFetcher = (ids) =>
  Promise.allSettled(
    ids.map((id) =>
      fetcher(
        `/activities/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ is_archived: true }),
        },
        true
      )
    )
  )
