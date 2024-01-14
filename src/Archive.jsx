import React from "react"
import { motion } from "framer-motion"
import { List } from "./List.jsx"
import { IconArchiveOff } from "@tabler/icons-react"
import { Empty } from "./Empty.jsx"

export const Archive = ({ data, archiveCall, unarchiveAll }) => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Archive</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="archive-button"
          onClick={() => unarchiveAll.mutate()}
          disabled={unarchiveAll.isPending || !data?.length}
        >
          <IconArchiveOff size={16} />
          Unarchive All
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
