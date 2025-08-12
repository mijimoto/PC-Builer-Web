// build-page-persistent-with-nulls-and-total.js

// default items (baseline)
const DEFAULT_ITEMS = [
  {"item": "Operating System", "name": "os", "added": false, "partname": "", "price": null},
  {"item": "Wireless Network Card", "name": "wirelessnetworkcard", "added": false, "partname": "", "price": null},
  {"item": "Wired Network Card", "name": "wirednetworkcard", "added": false, "partname": "", "price": null},
  {"item": "Webcam", "name": "webcam", "added": false, "partname": "", "price": null},
  {"item": "Video Card", "name": "videocard", "added": false, "partname": "", "price": null},
  {"item": "UPS", "name": "ups", "added": false, "partname": "", "price": null},
  {"item": "Thermal-paste", "name": "thermalpaste", "added": false, "partname": "", "price": null},
  {"item": "Speakers", "name": "speakers", "added": false, "partname": "", "price": null},
  {"item": "Soundcard", "name": "soundcard", "added": false, "partname": "", "price": null},
  {"item": "Power Supply", "name": "powersupply", "added": false, "partname": "", "price": null},
  {"item": "Optical Drive", "name": "opticaldrive", "added": false, "partname": "", "price": null},
  {"item": "Mouse", "name": "mouse", "added": false, "partname": "", "price": null},
  {"item": "Motherboard", "name": "motherboard", "added": false, "partname": "", "price": null},
  {"item": "Monitor", "name": "monitor", "added": false, "partname": "", "price": null},
  {"item": "Memory", "name": "memory", "added": false, "partname": "", "price": null},
  {"item": "Keyboard", "name": "keyboard", "added": false, "partname": "", "price": null},
  {"item": "Internal Hard Drive", "name": "internalharddrive", "added": false, "partname": "", "price": null},
  {"item": "Headphones", "name": "headphones", "added": false, "partname": "", "price": null},
  {"item": "Fan Controller", "name": "fancontroller", "added": false, "partname": "", "price": null},
  {"item": "External Hard Drive", "name": "externalharddrive", "added": false, "partname": "", "price": null},
  {"item": "Cpu Cooler", "name": "cpucooler", "added": false, "partname": "", "price": null},
  {"item": "Cpu", "name": "cpu", "added": false, "partname": "", "price": null},
  {"item": "Cases", "name": "cases", "added": false, "partname": "", "price": null},
  {"item": "Case Fan", "name": "casefan", "added": false, "partname": "", "price": null},
  {"item": "Case Accessory", "name": "caseaccessory", "added": false, "partname": "", "price": null},
];

const STORAGE_KEY = "buildSelectionsByName";

function loadSelections() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    console.warn("Failed to parse selections:", e);
    return {};
  }
}
function saveSelections(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.warn("Failed to save selections:", e);
  }
}

let allItems = [];
function initAllItemsFromDefaults() {
  const selections = loadSelections();
  allItems = DEFAULT_ITEMS.map(d => {
    const sel = selections[d.name];
    if (sel) {
      // keep price null if saved as null
      return {
        ...d,
        added: true,
        partname: sel.partname ?? "",
        price: (sel.price === null || sel.price === undefined) ? null : Number(sel.price),
      };
    } else {
      return { ...d };
    }
  });
}

// init
initAllItemsFromDefaults();

const container = document.getElementById("parts-container");

// helper to escape HTML when inserting user/back-end strings
function escapeHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function render() {
  container.innerHTML = "";
  allItems.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card";

    const leading = document.createElement("div");
    leading.className = "leading-icon";
    leading.textContent = "🖥️";
    card.appendChild(leading);

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.item;
    content.appendChild(title);

    const subtitle = document.createElement("div");
    subtitle.className = "subtitle";
    if (item.added) {
      const priceText = (item.price === null || item.price === undefined) ? "N/A" : `₱${Number(item.price).toFixed(2)}`;
      subtitle.innerHTML = `
        Name: ${escapeHtml(item.partname)}<br />
        Price: ${escapeHtml(priceText)}
      `;
    } else {
      subtitle.textContent = `Add a ${item.item}`;
    }
    content.appendChild(subtitle);
    card.appendChild(content);

    const btn = document.createElement("button");
    if (item.added) {
      btn.textContent = "Remove";
      btn.className = "remove";
      btn.onclick = () => {
        // update in-memory
        allItems[i].added = false;
        allItems[i].partname = "";
        allItems[i].price = null;
        // update persisted selections map by name
        const selections = loadSelections();
        delete selections[item.name];
        saveSelections(selections);
        render();
      };
    } else {
      btn.textContent = "Add";
      btn.className = "add";
      btn.onclick = () => {
        window.location.href = `/item?itemName=${encodeURIComponent(item.name)}&itemIndex=${i}`;
      };
    }
    card.appendChild(btn);

    container.appendChild(card);
  });
}

// Process returned selection from /item page.
// NOTE: price may be absent — that's allowed and stored as null.
function updateFromUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedIndex = urlParams.get("selectedIndex");
  const partname = urlParams.get("partname");
  const price = urlParams.get("price");

  if (selectedIndex !== null && partname !== null) {
    const index = parseInt(selectedIndex, 10);
    if (!Number.isNaN(index) && DEFAULT_ITEMS[index]) {
      const itemNameKey = DEFAULT_ITEMS[index].name;
      const decodedName = decodeURIComponent(partname);

      // decide price value: numeric -> number, otherwise null
      let priceVal = null;
      if (price !== null && price !== undefined && price !== "") {
        const num = Number(price);
        if (!Number.isNaN(num)) priceVal = num;
        else priceVal = null;
      } else {
        priceVal = null;
      }

      const selections = loadSelections();
      selections[itemNameKey] = { partname: decodedName, price: priceVal };
      saveSelections(selections);

      // re-init working items from defaults + selections and render
      initAllItemsFromDefaults();

      // remove params so they don't get processed again
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

// initial processing + render
updateFromUrlParams();
render();
// Clear All button behavior
const clearBtn = document.getElementById("clearAllBtn");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    const confirmed = confirm("Remove all selected parts? This will clear your saved selections.");
    if (!confirmed) return;

    // Option A: remove the storage key entirely
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to remove selections:", e);
      // fallback: overwrite with empty object
      saveSelections({});
    }

    // Re-initialize working list and rerender
    initAllItemsFromDefaults();
    render();

    // Optional quick visual feedback: briefly flash export button or alert
    // alert("All selections cleared.");
  });
}

// Export to PDF with total calculation (requires jspdf loaded)
const exportBtn = document.getElementById("exportPdfBtn");
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor("#00ffff");
    doc.text("PC Build Parts Summary", 14, 20);

    doc.setFontSize(12);
    doc.setTextColor("#000000");

    let y = 30;

    // headers
    doc.setFont(undefined, "bold");
    doc.text("Item", 14, y);
    doc.text("Part Name", 80, y);
    doc.text("Price (₱)", 160, y);
    doc.setFont(undefined, "normal");
    y += 8;

    let total = 0;

    allItems.forEach(item => {
      const partName = item.added ? (item.partname || "(unnamed)") : "(Not added)";
      const priceVal = (item.added && item.price !== null && item.price !== undefined) ? Number(item.price) : null;
      const priceText = priceVal === null ? "N/A" : Number(priceVal).toFixed(2);

      const splitPartName = doc.splitTextToSize(partName, 70);

      doc.text(item.item, 14, y);
      doc.text(splitPartName, 80, y);
      doc.text(priceText, 160, y, { align: "right" });

      if (priceVal !== null) total += priceVal;

      y += 8 * splitPartName.length;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    // draw a separator and total
    if (y + 20 > 280) { doc.addPage(); y = 20; }
    y += 8;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, y, 196, y);
    y += 8;

    doc.setFont(undefined, "bold");
    doc.text("Total (sum of known prices):", 80, y);
    doc.text(`₱${Number(total).toFixed(2)}`, 160, y, { align: "right" });

    doc.save("pc-build-parts-summary.pdf");
  });
}
