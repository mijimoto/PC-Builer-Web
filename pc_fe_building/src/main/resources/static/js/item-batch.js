(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemName = (urlParams.get("itemName") || "cpu").toLowerCase();
  const itemIndex = urlParams.get("itemIndex") || 0;

  // DOM
  const container = document.getElementById("parts-container");
  const searchInput = document.getElementById("search-input");
  const header = document.getElementById("header");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageSizeSelect = document.getElementById("page-size");
  const pageInfo = document.getElementById("page-info");
  const statusMsg = document.getElementById("status-msg");

  header.textContent = `Choose ${itemName}`;

  // Pagination & state
  let pageNumber = 1;
  let totalCount = null; // optional if backend returns total count (not implemented here)
  let pageSize = parseInt(pageSizeSelect.value, 10);
  let currentResults = [];

  // Read JWT from localStorage (key used earlier in this project)
  const jwt = localStorage.getItem("jwt"); // <-- uses "jwt" key (consistent with your login code)
  // If your key is different use localStorage.getItem("<your-key>");

  // debounce helper
  function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Build URL with query params expected by your controller/stored proc
  function buildUrl(searchName = "", pn = 1, ps = 20, sortBy = "PartName", sortDir = "ASC") {
    const url = new URL(`https://pcbuilder-546878159726.asia-east1.run.app/api/v1/${itemName}`);
    url.searchParams.append("pageNumber", pn);
    url.searchParams.append("pageSize", ps);
    if (searchName) url.searchParams.append("searchName", searchName);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("sortDirection", sortDir);
    return url.toString();
  }

  async function fetchApi(search = "", pn = 1, ps = 20) {
    statusMsg.textContent = "Loading...";
    container.innerHTML = "";
    try {
      const url = buildUrl(search, pn, ps);
      const headers = {};
      if (jwt) headers["Authorization"] = `Bearer ${jwt}`;

      const res = await fetch(url, { method: "GET", headers });

      if (!res.ok) {
        if (res.status === 401) {
          statusMsg.textContent = "Unauthorized. Please login.";
          // optionally redirect to login: window.location.href = '/login';
          return;
        }
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText} - ${text}`);
      }

      const data = await res.json();
      // data is expected to be a list of DTOs [{partid, parts: {partid, partname, partprice}, ...}, ...]
      currentResults = Array.isArray(data) ? data : [];
      renderList();
      statusMsg.textContent = "";
    } catch (err) {
      console.error("fetchApi error:", err);
      statusMsg.textContent = `Error loading parts: ${err.message}`;
      container.innerHTML = `<div class="empty">Failed to load parts.</div>`;
    }
  }

  function renderList() {
    container.innerHTML = "";
    if (!currentResults.length) {
      container.innerHTML = `<div class="empty">No parts found.</div>`;
      pageInfo.textContent = `Page ${pageNumber} — 0 results`;
      return;
    }

    currentResults.forEach(item => {
      const part = item.parts || item; // fallback if DTO shape varies
      const card = document.createElement("div");
      card.className = "card";

      const meta = document.createElement("div");
      meta.className = "meta";

      const title = document.createElement("div");
      title.className = "title";
      title.textContent = part.partname || part.PartName || "Unnamed";

      const subtitle = document.createElement("div");
      subtitle.className = "subtitle";
      // part price might be BigDecimal string or number
      const price = part.partprice ?? part.PartPrice ?? "";
      subtitle.textContent = price !== "" ? `Price: ₱${price}` : "Price: N/A";

      meta.appendChild(title);
      meta.appendChild(subtitle);

      const btn = document.createElement("button");
      btn.textContent = "Add";
      btn.addEventListener("click", () => {
        const pname = encodeURIComponent(part.partname ?? part.PartName ?? "");
        const pprice = encodeURIComponent(price);
        // redirect to build page with selected info
        window.location.href = `/build?selectedIndex=${itemIndex}&partname=${pname}&price=${pprice}`;
      });

      card.appendChild(meta);
      card.appendChild(btn);
      container.appendChild(card);
    });

    pageInfo.textContent = `Page ${pageNumber} — ${currentResults.length} item(s)`;
  }

  // Event handlers
  const doSearch = debounce((e) => {
    pageNumber = 1; // reset page
    fetchApi(e.target.value.trim(), pageNumber, pageSize);
  }, 300);

  searchInput.addEventListener("input", doSearch);

  prevBtn.addEventListener("click", () => {
    if (pageNumber > 1) {
      pageNumber -= 1;
      fetchApi(searchInput.value.trim(), pageNumber, pageSize);
    }
  });

  nextBtn.addEventListener("click", () => {
    // we don't know total pages unless backend returns total; still allow next
    pageNumber += 1;
    fetchApi(searchInput.value.trim(), pageNumber, pageSize);
  });

  pageSizeSelect.addEventListener("change", (e) => {
    pageSize = parseInt(e.target.value, 10);
    pageNumber = 1;
    fetchApi(searchInput.value.trim(), pageNumber, pageSize);
  });

  // initial load
  fetchApi("", pageNumber, pageSize);
})();
