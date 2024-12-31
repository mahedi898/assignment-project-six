// load spinner show 

const showLoadingSpinner = () => {
  document.getElementById("loadingSpinner").classList.remove("hidden");
};

// load spinner hidden 

const hideLoadingSpinner = () => {
  document.getElementById("loadingSpinner").classList.add("hidden");
};

// create loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// load categories card

const loadCategoriesCard = (id) => {
  showLoadingSpinner();

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
    
      removeActiveClass();
      activeBtn.classList.add("active");

      setTimeout(() => {
        displayCard(data.data);
        hideLoadingSpinner();
      }, 2000); 
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        hideLoadingSpinner();
      }, 2000);
    });
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const btn of buttons) {
    btn.classList.remove("active")
  }

}

// displayCategories function

const displayCategories = (categories) => {
  const category = document.getElementById("category");
  categories.forEach((item) => {
    // console.log(item);
    // create a button
    const div = document.createElement("div");
    div.classList = "flex item-center";
    div.innerHTML = `
        <button id="btn-${item.category}" onclick="loadCategoriesCard('${item.category}')" class="btn btn-lg px-10 category-btn">
        <img class="w-9" src=${item.category_icon} />
        ${item.category}
        </button>
        `;
    category.appendChild(div);
  });
};

// create loadCard
const loadCard = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayCard(data.pets))
    .catch((error) => console.log(error));
};


// load details function

const loadDetails = async (details) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${details}`
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.petData)

}

// display details function 

const displayDetails = (cards) => {
  // console.log(cards);

  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img class="rounded-xl w-96 mx-auto"  src="${cards.image}"/>
  <div class=" space-y-1 mt-2 text-sm">
  <h2 class="font-extrabold text-lg ">${cards.category}</h2>
        <div class="flex gap-9">
        <div>
        <div class="flex gap-2"><img src="images/Frame (3).png" alt=""> 
        ${cards.breed ? `Breed: ${cards.breed}` : "Not available"}
        </div>
        <div class="flex gap-2"><img src="images/Frame.png" alt="">
        Birth: ${cards.date_of_birth ? cards.date_of_birth : "Not available"}
        </div>
        </div>
        <div>
        <div class="flex gap-2"><img src="images/Frame (2).png" alt="">
        Gender: ${cards.gender ? cards.gender : "Not available"}
        </div>
        <div class="flex gap-2"><img src="images/Frame (1).png" alt="">
        Price: ${cards.price ? cards.price : "Not available"}
        </div>
        </div>
        </div>
        <div class="font-bold text-sm">
        Details Information
        <div class="font-normal text-xs">
        ${cards.pet_details}
        </div>
        </div>
  </div>
  `
  document.getElementById("showModal").click();

}

// display history img function

const displayHistoryCategory = async (images) => {

  const url = `https://openapi.programming-hero.com/api/peddy/pet/${images}`
  const res = await fetch(url);
  const data = await res.json();
  displayHistoryImg(data.petData)

}

// display history img function

const displayHistoryImg = (allImg) => {
  // console.log(allImg.image);
  const imgContainer = document.getElementById("card-img");
  if (imgContainer.children.length >= 20) {
    return; 
  }
  const div = document.createElement("div")
  div.classList = "avatar ml-6"
  div.innerHTML = `
      <div class="w-24 rounded">
    <img src="${allImg.image}" />
  </div>
      `
  imgContainer.appendChild(div)

}
// Adopt button style

const adoptButton = () =>{
  const btn = document.getElementById("showModalAdopt")
  const modal = document.getElementById("customModalAdopt")
  const countdownText = document.getElementById("countdownText")
  
  
  

  document.getElementById("showModalAdopt").click();
  

}

// displayCard function

const displayCard = (card) => {
  const cardAllContent = document.getElementById("all-card");
  cardAllContent.innerHTML = "";

  if (card.length === 0) {
    cardAllContent.classList.remove("grid");
    cardAllContent.innerHTML = `
        <div class="w-[80%] min-h-96 mx-auto flex flex-col gap-5 justify-center items-center">
        <img src="images/error.webp"/>
        <h1 class="text-4xl font-bold">
        No Information Available
        </h1>
        <p class="text-center">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.
        </p>
        </div>
        `;
  } else {
    cardAllContent.classList.add("grid");
  }

  card.forEach((cards) => {
    // console.log(cards);
    const div = document.createElement("div");
    div.classList =
      "card card-compact border-gray-300 shadow-xl rounded-lg border-[1px]";
    div.innerHTML = `
        <div class="p-5">
        <img class="rounded-xl" src="${cards.image}" alt="Paddy" />
        </div>
        <div class="card-body">
            <h2 class="card-title font-extrabold ">${cards.category}</h2>
            <div class="flex gap-2"><img src="images/Frame (3).png" alt=""> 
            ${cards.breed ? `Breed: ${cards.breed}` : "Not available"}
            </div>
            <div class="flex gap-2"><img src="images/Frame.png" alt="">
            Birth: ${cards.date_of_birth ? cards.date_of_birth : "Not available"
      }
            </div>
            <div class="flex gap-2"><img src="images/Frame (2).png" alt="">
            Gender: ${cards.gender ? cards.gender : "Not available"}
            </div>
            <div class="flex gap-2"><img src="images/Frame (1).png" alt="">
            Price: ${cards.price ? cards.price : "Not available"}
            </div>
            <div class="divider"></div>
            <div class="card-actions justify-center">
                <button onclick="displayHistoryCategory(${cards.petId})" class="btn btn-outline btn-success"><img src="images/Frame 1171276315.png" alt=""></button>
                <button onclick="adoptButton()" class="btn btn-outline btn-success">Adopt</button>
                <button onclick="loadDetails(${cards.petId})" class="btn btn-outline btn-success">Details</button>
            </div>
        </div>
        `;
    cardAllContent.appendChild(div);
  });
};

loadCategories();
loadCard();
