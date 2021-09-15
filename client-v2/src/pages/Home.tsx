import { useQuery, useSubscription } from "@apollo/client";
import { GET_ALL_PRODUCTS, NEW_PRODUCT_ADDED_SUB } from "../utils/queries";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import AddNewProduct from "../components/AddNewProduct";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const history = useHistory();
  const [projects, setProjects] = useState<any>();
  const [openModal, setModal] = useState(false);

  const { loading, error } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: ({ getAllProducts }) => {
      setProjects(getAllProducts);
    },
  });

  const {} = useSubscription(NEW_PRODUCT_ADDED_SUB, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      setProjects((prev: any) => {
        return [data.newProductAdded, ...prev];
      });
    },
  });

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  const handleProjectClicked = (productId: number, product: any) => {
    history.push({
      pathname: `/ratings/${productId}`,
      state: { product },
    });
  };

  const wrapperVariant = {
    initial: {},
    animate: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const prodVariant = {
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
    <section className="container">
      <header>
        <h2>All Products</h2>
      </header>
      <motion.div
        className="projects-wrapper"
        initial="initial"
        animate="animate"
        variants={wrapperVariant}
      >
        {projects?.map((p: any, idx: any) => (
          <motion.div
            key={idx}
            className="project"
            onClick={(e: any) => {
              handleProjectClicked(+p.id, p);
            }}
            variants={prodVariant}
          >
            <h3>{p.name}</h3>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {openModal && <AddNewProduct setModal={setModal} />}
      </AnimatePresence>
      <div className="add-new-product-btn" onClick={() => setModal(true)}>
        Add Product
      </div>
    </section>
  );
};

export default Home;
