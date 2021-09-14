import { useMutation } from "@apollo/client";
import { useState } from "react";
import closeIcon from "../images/x.svg";
import { CREATE_NEW_RATING } from "../utils/queries";
import starSelected from "../images/star.svg";
import starDark from "../images/star-dark.svg";
import { motion } from "framer-motion";

const AddNewRating = ({
  productId,
  setModal,
}: {
  productId: number;
  setModal: any;
}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const [createNewRatingMutation] = useMutation(CREATE_NEW_RATING);

  const handleSubmit = (e: any) => {
    console.log({ content, productId, rating });
    createNewRatingMutation({ variables: { content, productId, rating } });
    setModal(false);
  };

  const handleStarClicked = (index: number) => {
    setRating(index + 1);
  };

  const handleStarHovered = (index: number) => {
    setRating(index + 1);
  };

  const getStars = (length: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="star"
        onClick={() => handleStarClicked(index)}
        onMouseOver={() => handleStarHovered(index)}
      >
        <img src={index < length ? starSelected : starDark} alt="star" />
      </div>
    ));
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
    <div id="ratings-modal" className="modal-wrapper">
      <motion.div
        className="new-product"
        variants={modalVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="header">
          <h3>What's your rating?</h3>
          <div onClick={() => setModal(false)}>
            <img src={closeIcon} alt="closeIcon" />
          </div>
        </div>
        <h4>Rating</h4>
        <div className="stars">{getStars(rating)}</div>
        <h4>Review</h4>
        <input
          type="text"
          className="input-text"
          placeholder="Start typing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="submit-btn" onClick={handleSubmit}>
          Submit Review
        </div>
      </motion.div>
    </div>
  );
};

export default AddNewRating;
