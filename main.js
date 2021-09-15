// const API_ENDPOINT = "http://localhost:3000/graphql";
const API_ENDPOINT = "https://gumroad-assignment.herokuapp.com/graphql";
const projectsWrapper = document.querySelector(".projects-wrapper");

const getAllProjects = async () => {
  const projects = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetAllProducts{
          getAllProducts {
            id
            name
            ratings {
              content
              rating
              timestamp
            }
            timestamp 
          }
        }`,
    }),
  });
  const { data } = await projects.json();
  return data;
};

const onProjectClicked = (id) => {
  window.location.href = "/review.html#" + id;
};

getAllProjects().then(({ getAllProducts }) => {
  getAllProducts.forEach((product) => {
    projectsWrapper.innerHTML += `
      <div class="project" onclick="onProjectClicked('${product.id}')"> 
          <h3>${product.name}</h3> 
      </div>
    `;
  });
});
