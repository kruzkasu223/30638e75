import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Archive, Loader } from "."
import { useActivities } from "../apis/index.js"
import "../css/pages.css"
import { groupCallData } from "../utils"
import { Toaster } from "react-hot-toast"

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

export const Pages = ({ page, direction }) => {
  const { activities, archiveCall, archiveAll, unarchiveAll } = useActivities()
  const activitiesData = useMemo(
    () => groupCallData(activities?.data?.filter((item) => !item.is_archived)),
    [activities?.data]
  )
  const archivedData = useMemo(
    () => groupCallData(activities?.data?.filter((item) => item.is_archived)),
    [activities?.data]
  )

  return (
    <>
      {!!activities?.isLoading && <Loader />}

      <Toaster position="top-right" reverseOrder={false} />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="page-wrapper"
        >
          {page ? (
            <Archive
              data={archivedData}
              archiveCall={archiveCall}
              unarchiveAll={unarchiveAll}
            />
          ) : (
            <Activity
              data={activitiesData}
              archiveCall={archiveCall}
              archiveAll={archiveAll}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
