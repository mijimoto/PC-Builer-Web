const allItems = [
  {"item": "Operating System", "name": "os", "added": false, "partname": "", "price": 0.0},
  {"item": "Wireless Network Card", "name": "wirelessnetworkcard", "added": false, "partname": "", "price": 0.0},
  {"item": "Wired Network Card", "name": "wirednetworkcard", "added": false, "partname": "", "price": 0.0},
  {"item": "Webcam", "name": "webcam", "added": false, "partname": "", "price": 0.0},
  {"item": "Video Card", "name": "videocard", "added": false, "partname": "", "price": 0.0},
  {"item": "UPS", "name": "ups", "added": false, "partname": "", "price": 0.0},
  {"item": "Thermal-paste", "name": "thermalpaste", "added": false, "partname": "", "price": 0.0},
  {"item": "Speakers", "name": "speakers", "added": false, "partname": "", "price": 0.0},
  {"item": "Soundcard", "name": "soundcard", "added": false, "partname": "", "price": 0.0},
  {"item": "Power Supply", "name": "powersupply", "added": false, "partname": "", "price": 0.0},
  {"item": "Optical Drive", "name": "opticaldrive", "added": false, "partname": "", "price": 0.0},
  {"item": "Mouse", "name": "mouse", "added": false, "partname": "", "price": 0.0},
  {"item": "Motherboard", "name": "motherboard", "added": false, "partname": "", "price": 0.0},
  {"item": "Monitor", "name": "monitor", "added": false, "partname": "", "price": 0.0},
  {"item": "Memory", "name": "memory", "added": false, "partname": "", "price": 0.0},
  {"item": "Keyboard", "name": "keyboard", "added": false, "partname": "", "price": 0.0},
  {"item": "Internal Hard Drive", "name": "internalharddrive", "added": false, "partname": "", "price": 0.0},
  {"item": "Headphones", "name": "headphones", "added": false, "partname": "", "price": 0.0},
  {"item": "Fan Controller", "name": "fancontroller", "added": false, "partname": "", "price": 0.0},
  {"item": "External Hard Drive", "name": "externalharddrive", "added": false, "partname": "", "price": 0.0},
  {"item": "Cpu Cooler", "name": "cpucooler", "added": false, "partname": "", "price": 0.0},
  {"item": "Cpu", "name": "cpu", "added": false, "partname": "", "price": 0.0},
  {"item": "Cases", "name": "cases", "added": false, "partname": "", "price": 0.0},
  {"item": "Case Fan", "name": "casefan", "added": false, "partname": "", "price": 0.0},
  {"item": "Case Accessory", "name": "caseaccessory", "added": false, "partname": "", "price": 0.0},
];

const container = document.getElementById("parts-container");

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
      subtitle.innerHTML = `
        Name: ${item.partname}<br />
        Price: ₱${item.price.toFixed(2)}
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
        allItems[i].added = false;
        allItems[i].partname = "";
        allItems[i].price = 0;
        render();
      };
    } else {
      btn.textContent = "Add";
      btn.className = "add";
      btn.onclick = () => {
        // Khi bấm Add, chuyển hướng sang trang chọn linh kiện /item
        window.location.href = `/item?itemName=${encodeURIComponent(item.name)}&itemIndex=${i}`;
      };
    }
    card.appendChild(btn);

    container.appendChild(card);
  });
}

// Đọc dữ liệu trả về từ URL (khi người dùng chọn linh kiện ở trang /item)
function updateFromUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedIndex = urlParams.get("selectedIndex");
  const partname = urlParams.get("partname");
  const price = urlParams.get("price");

  if (selectedIndex !== null && partname && price) {
    const index = parseInt(selectedIndex, 10);
    if (allItems[index]) {
      allItems[index].partname = decodeURIComponent(partname);
      allItems[index].price = parseFloat(price);
      allItems[index].added = true;
    }
    // Xóa params sau khi đọc
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

updateFromUrlParams();
render();
