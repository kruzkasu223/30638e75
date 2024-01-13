import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity } from "./Activity.jsx"
import { Archive } from "./Archive.jsx"

const pages = [<Activity />, <Archive />]

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
  return (
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
        style={{
          position: "absolute",
          padding: "16px",
        }}
      >
        {pages[page]}
      </motion.div>
    </AnimatePresence>
  )
}
