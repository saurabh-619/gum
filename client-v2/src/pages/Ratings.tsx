import { FC, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router";
import {
  GET_ALL_RATINGS_OF_A_PRODUCT,
  GET_A_PRODUCT,
  NEW_RATING_ADDED_SUB,
} from "../utils/queries";
import starSelected from "../images/star.svg";
import starDark from "../images/star-dark.svg";
import AddNewRating from "../components/AddNewRating";
import { AnimatePresence, motion } from "framer-motion";

const Ratings: FC = (props: any) => {
  const [product, setProduct] = useState<any>();

  const [ratings, setRatings] = useState<any>();
  const [avg, setAvg] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);

  const { id }: { id: string } = useParams();

  const calculateAvg = (newRatings: any) => {
    return newRatings.length === 0
      ? 0
      : (
          newRatings.reduce(
            (prev: any, { rating }: { rating: any }) => (prev += rating),
            0
          ) / newRatings.length
        ).toPrecision(2);
  };

  const { loading: prodLoading } = useQuery(GET_A_PRODUCT, {
    variables: { productId: parseFloat(id) },
    onCompleted: ({ getAProduct: product }: any) => {
      setProduct(product);
    },
  });

  const { loading, error } = useQuery(GET_ALL_RATINGS_OF_A_PRODUCT, {
    variables: { productId: parseFloat(id) },
    onCompleted: ({ getAllRatingsOfAProduct: newRatings }: any) => {
      setRatings(newRatings);
      setAvg(() => calculateAvg(newRatings));
    },
  });

  const {} = useSubscription(NEW_RATING_ADDED_SUB, {
    variables: { productId: parseFloat(id) },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      setRatings((prev: any) => {
        const newRatings = [data.newRatingAdded, ...prev];
        setAvg(() => calculateAvg(newRatings));
        return newRatings;
      });
    },
  });

  const getStars = (length: number, color = "primary") => {
    return Array.from({ length }).map((_, index) => (
      <div key={index} className="star">
        <img src={color === "primary" ? starSelected : starDark} alt="star" />
      </div>
    ));
  };

  if (loading || prodLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  const wrapperVariant = {
    initial: {},
    animate: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const ratingVariant = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  return (
    <div>
      <section className="container">
        <div className="rating">
          <h2 className="title">{product?.name}</h2>
          <div className="total-rating-wrapper">
            <div className="left">
              <h2 className="total-rating">{avg}</h2>
              <div className="total-stars">
                {getStars(Math.ceil(avg))}
                {getStars(Math.ceil(5 - Math.ceil(avg)), "secondary")}
              </div>
            </div>
            <div className="add-review-btn" onClick={() => setOpenModal(true)}>
              Add review
            </div>
          </div>
        </div>
        <div className="border-bt"></div>
        <div className="content">
          <h3>Reviews</h3>
          <motion.div
            className="review-wrapper"
            animate="animate"
            initial="initial"
            variants={wrapperVariant}
          >
            {ratings &&
              ratings.map((rating: any, index: any) => (
                <motion.div
                  key={index}
                  className="review"
                  variants={ratingVariant}
                >
                  <div className="stars">
                    {getStars(Math.floor(rating.rating))}
                    {getStars(
                      Math.ceil(5 - Math.floor(rating.rating)),
                      "secondary"
                    )}
                  </div>
                  <div className="rating-number">{rating.rating}, </div>
                  <div className="comment">{rating.content}</div>
                </motion.div>
              ))}
          </motion.div>
        </div>
        <AnimatePresence>
          {openModal && (
            <AddNewRating productId={product.id} setModal={setOpenModal} />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Ratings;
