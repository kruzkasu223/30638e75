import dayjs from "dayjs"

export const getCallTitle = (direction, call_type) => {
  if (call_type === "missed") {
    if (direction === "inbound") return "Missed Incoming Call"
    if (direction === "outbound") return "Missed Outgoing Call"
  }
  if (call_type === "voicemail") return "Voicemail"
  if (call_type === "answered") {
    if (direction === "inbound") return "Incoming Call"
    if (direction === "outbound") return "Outgoing Call"
  }
  return "Unknown call"
}

export const groupCallData = (data) => {
  if (!data) return

  const groupedByDate = data.reduce((result, call) => {
    const callDate = dayjs(call.created_at).format("MMMM D YYYY")
    if (!result[callDate]) {
      result[callDate] = []
    }
    result[callDate].push(call)
    return result
  }, {})

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) =>
      dayjs(b, "MMMM D YYYY").valueOf() - dayjs(a, "MMMM D YYYY").valueOf()
  )

  return sortedDates.reduce((arr, date) => {
    arr.push(date, ...groupedByDate[date])
    return arr
  }, [])
}
