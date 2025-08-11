const urlParams = new URLSearchParams(window.location.search);
const itemName = urlParams.get("itemName");
const itemIndex = urlParams.get("itemIndex");

const apiUrl = `hhttps://pcbuilder-546878159726.asia-east1.run.app/api/v1/${itemName}`;

const container = document.getElementById("parts-container");
const searchInput = document.getElementById("search-input");

let apiList = [];
let filteredList = [];

async function fetchApi() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Failed to fetch API");
    apiList = await res.json();
    filteredList = apiList;
    renderList();
  } catch (e) {
    alert("Error loading parts: " + e.message);
  }
}

function renderList() {
  container.innerHTML = "";
  filteredList.forEach((item) => {
    const part = item.parts;
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = part.partname;
    card.appendChild(title);

    const subtitle = document.createElement("div");
    subtitle.className = "subtitle";
    subtitle.textContent = `Price: ₱${part.partprice}`;
    card.appendChild(subtitle);

    const btn = document.createElement("button");
    btn.textContent = "Add";
    btn.onclick = () => {
      // Trả dữ liệu về trang /build với query param
      window.location.href = `/build?selectedIndex=${itemIndex}&partname=${encodeURIComponent(part.partname)}&price=${part.partprice}`;
    };
    card.appendChild(btn);

    container.appendChild(card);
  });
}

function filterSearch(query) {
  filteredList = apiList.filter(item => 
    item.parts.partname.toLowerCase().includes(query.toLowerCase())
  );
  renderList();
}

searchInput.addEventListener("input", (e) => {
  filterSearch(e.target.value);
});

document.getElementById("header").textContent = `Choose ${itemName}`;

fetchApi();
