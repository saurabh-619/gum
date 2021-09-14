const API_ENDPOINT = "http://localhost:3000/graphql";

const productId = window.location.hash.split("#")[1];
const product = window.location.productData;

const titleEle = document.querySelector(".title");
const ratingWrapperEle = document.querySelector(".total-rating-wrapper");
const reviewWrapperEle = document.querySelector(".review-wrapper");

const getProduct = async () => {
  const product = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetAProduct($productId:Float!){ 
            getAProduct(productId:$productId) {
                  id
                  name
                  timestamp
            } 
        }`,
      variables: {
        productId: +productId,
      },
    }),
  });
  const { data } = await product.json();
  return data;
};

const getAllRatings = async () => {
  const projects = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetAllRatingsOfAProduct($productId:Float!){ 
            getAllRatingsOfAProduct(productId:$productId) {
                product {
                    id
                    name
                    timestamp
                }
                content
                rating
                timestamp
            } 
        }`,
      variables: {
        productId: +productId,
      },
    }),
  });
  const { data } = await projects.json();
  return data;
};

// Title
getProduct().then(({ getAProduct }) => {
  titleEle.textContent = getAProduct.name;
});

const alertNewReview = () => {
  alert(
    "This feature added in V2 version of these assignment as per problem statement."
  );
};

getAllRatings().then(({ getAllRatingsOfAProduct: ratings }) => {
  let avg = (
    ratings.reduce((prev, { rating }) => (prev += rating), 0) / ratings.length
  ).toPrecision(2);
  avg = isNaN(avg) ? 0 : avg;

  ratingWrapperEle.innerHTML += `
                <div class="left">
                  <h2 class="total-rating">${avg}</h2>
                  <div class="total-stars"></div>
                </div>
                <div class="add-review-btn" onclick="alertNewReview()">Add review</div>
    `;

  // Total stars

  const starWrapperEle = document.querySelector(".total-stars");

  Array.from({ length: Math.floor(avg) }).forEach((_, index) => {
    starWrapperEle.innerHTML += `
                  <div class="star">
                    <img src="/assets/star.svg" alt="star" />
                  </div>`;
  });

  Array.from({ length: 5 - Math.floor(avg) }).forEach((_, index) => {
    starWrapperEle.innerHTML += `
                  <div class="star">
                    <img src="/assets/star-dark.svg" alt="star" />
                  </div>`;
  });

  // Reviews stars

  ratings.forEach((rating, index) => {
    reviewWrapperEle.innerHTML += `
            <div id=${index} class="review">
                <div class="stars"></div>
                <div class="rating-number">${rating.rating}, </div>
                <div class="comment">${rating.content}</div>
            </div>
      `;
  });

  const reviewsEle = document.querySelectorAll(".review .stars");

  reviewsEle.forEach((review, index) => {
    // const reviewStarWrapperEle = document.querySelector(`#${index} .stars`);
    Array.from({ length: ratings[index].rating }).forEach((_, index) => {
      review.innerHTML += `
                  <div class="star">
                    <img src="/assets/star.svg" alt="star" />
                  </div>`;
    });

    Array.from({ length: 5 - ratings[index].rating }).forEach((_, index) => {
      review.innerHTML += `
                  <div class="star">
                    <img src="/assets/star-dark.svg" alt="star" />
                  </div>`;
    });
  });
});
