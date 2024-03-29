import React from "react"
import { motion } from "framer-motion"
import { List, Empty } from "."
import { IconArchive } from "@tabler/icons-react"

export const Activity = ({ data, archiveCall, archiveAll }) => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Activity</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="archive-button"
          onClick={() => archiveAll.mutate()}
          disabled={archiveAll.isPending || !data?.length}
        >
          <IconArchive size={16} />
          Archive All
        </motion.button>
      </div>

      {data?.length ? (
        <List data={data} archiveCall={archiveCall} />
      ) : (
        <Empty />
      )}
    </div>
  )
}
