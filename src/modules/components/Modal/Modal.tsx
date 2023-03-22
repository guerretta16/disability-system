import React from "react";
import styles from "./modal.module.css";
import exit from "../../../assets/img/cancel.png";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode
  handleCloseModal: () => void
}

const Modal = ({ children, handleCloseModal }: Props) => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity: 1}} className={styles.container}>
      <motion.div initial={{y: -200}} animate={{y:0}} className={styles.modal}>
        <div className={styles.header}>
          <img onClick={handleCloseModal} className={styles.exit} src={exit} alt="exit" />
        </div>
        <div className={styles.body}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
