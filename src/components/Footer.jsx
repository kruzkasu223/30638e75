import { IconArchive, IconPhone } from "@tabler/icons-react"
import React from "react"
import "../css/footer.css"
import { motion } from "framer-motion"

export const Footer = ({ paginate, page }) => {
  return (
    <footer>
      <button onClick={() => page !== 0 && paginate(-1)}>
        <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconPhone />
          Activity
        </motion.span>
      </button>

      <button onClick={() => page !== 1 && paginate(1)}>
        <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconArchive />
          Archive
        </motion.span>
      </button>

      <div className="switch" data-selected={!!page}>
        <motion.div
          className="handle"
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      </div>
    </footer>
  )
}
