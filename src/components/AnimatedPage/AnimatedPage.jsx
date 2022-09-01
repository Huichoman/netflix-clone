import { motion } from "framer-motion";

export const AnimatedPage = ({ children }) => {
  return (
    // <motion.div
    //   variants={animations}
    //   initial="initial"
    //   animate="animate"
    //   exit="exit"
    //   transition={{ duration: 1 }}
    // >

    <motion.div
      className="container text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};
