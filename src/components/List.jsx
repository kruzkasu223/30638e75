import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  IconArchive,
  IconArchiveOff,
  IconPhone,
  IconPhoneCall,
  IconPhoneIncoming,
  IconPhoneOutgoing,
} from "@tabler/icons-react"
import { getCallTitle, DASH } from "../utils"
import dayjs from "dayjs"
import "../css/list.css"

const variantsContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const variantsItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const List = ({ data, archiveCall }) => {
  return (
    <AnimatePresence>
      <motion.ul
        className="list customScroll"
        variants={variantsContainer}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {data?.map((item) =>
            typeof item === "string" ? (
              <DateListItem item={item} key={item} />
            ) : (
              <ListItem item={item} key={item.id} archiveCall={archiveCall} />
            )
          )}
        </AnimatePresence>
      </motion.ul>
    </AnimatePresence>
  )
}

const DateListItem = ({ item }) => {
  return (
    <motion.li
      className="data-list-item"
      variants={variantsItem}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <div />
      {item}
      <div />
    </motion.li>
  )
}

const ListItem = ({ item, archiveCall }) => {
  return (
    <motion.li
      className="list-item"
      variants={variantsItem}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <div title={getCallTitle(item?.direction, item?.call_type)}>
        <CallIcon direction={item?.direction} call_type={item?.call_type} />
      </div>

      <div className="call-details">
        <div>
          <div className="caller">{item?.from || DASH}</div>
          <div className="callee">
            called {item?.direction === "inbound" ? "on" : "from"}{" "}
            <strong>{item?.to || DASH}</strong> at{" "}
            <strong>{dayjs(item?.created_at).format("hh:mm A") || DASH}</strong>
          </div>
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="archive-button"
            onClick={() =>
              archiveCall.mutate({
                id: item.id,
                is_archived: !item.is_archived,
              })
            }
            disabled={archiveCall.isPending}
            title={item.is_archived ? "Unarchive call" : "Archive call"}
          >
            {item.is_archived ? (
              <IconArchiveOff size={16} />
            ) : (
              <IconArchive size={16} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.li>
  )
}

const CallIcon = ({ direction, call_type }) => {
  if (call_type === "missed") {
    if (direction === "inbound") return <IconPhoneIncoming color="red" />
    if (direction === "outbound") return <IconPhoneOutgoing color="red" />
  }
  if (call_type === "voicemail") return <IconPhoneCall color="green" />
  if (call_type === "answered") {
    if (direction === "inbound") return <IconPhoneIncoming color="green" />
    if (direction === "outbound") return <IconPhoneOutgoing color="green" />
  }
  return <IconPhone />
}
