import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { useState } from "react";
import closeIcon from "../images/x.svg";
import { CREATE_NEW_PRODUCT } from "../utils/queries";

const AddNewProduct = ({ setModal }: { setModal: any }) => {
  const [name, setName] = useState("");

  const [createNewProdMutation] = useMutation(CREATE_NEW_PRODUCT);

  const handleSubmit = (e: any) => {
    createNewProdMutation({ variables: { name } });
    setModal(false);
  };

  const modalVariant = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.1 },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div className="modal-wrapper">
      <motion.div
        className="new-product"
        variants={modalVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="header">
          <h3>Add new product</h3>
          <div onClick={() => setModal(false)}>
            <img src={closeIcon} alt="closeIcon" />
          </div>
        </div>
        <input
          type="text"
          className="input-text"
          placeholder="Name of product..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="submit-btn" onClick={handleSubmit}>
          Submit
        </div>
      </motion.div>
    </div>
  );
};

export default AddNewProduct;
