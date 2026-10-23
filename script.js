// Edit this object when the company's official contact details are available.
const COMPANY = {
  name: "ADIJAYA", // Company name to be displayed on the website.
  whatsapp: "081290851533", // Format: country code + number, digits only.
  email: "",
  address: "Bogor, Jawa Barat"
};

const PRODUCTS = [
  { name: "Pasir ayak", description: "Pasir ayak berwarna abu-abu terang untuk kebutuhan pekerjaan konstruksi. Tanyakan spesifikasi dan ketersediaannya.", image: "pasir ayak.jpeg", alt: "Tumpukan pasir ayak berwarna abu-abu terang", price: "Hubungi kami untuk harga terbaru" },
  { name: "Pasir Celup", description: "Pasir berwarna cokelat kekuningan untuk kebutuhan pekerjaan konstruksi. Tanyakan spesifikasi dan ketersediaannya.", image: "pasir celup.jpg", alt: "Tumpukan pasir celup berwarna cokelat kekuningan", price: "Hubungi kami untuk harga terbaru" },
  { name: "Batu", description: "Batu berukuran besar untuk memenuhi kebutuhan material pada pekerjaan konstruksi.", image: "batu.jpg", alt: "Tumpukan batu berukuran besar", price: "Hubungi kami untuk harga terbaru" },
  { name: "Seplit", description: "Batu pecah berukuran kecil untuk kebutuhan material konstruksi dan pekerjaan beton.", image: "seplit.jpeg", alt: "Tumpukan batu pecah berukuran kecil", price: "Hubungi kami untuk harga terbaru" },
  { name: "Makadam", description: "Material batu untuk pekerjaan jalan dan kebutuhan lapisan dasar. Tanyakan spesifikasi dan ketersediaannya.", image: "makadam.jpeg", alt: "Tumpukan material batu untuk pekerjaan jalan", price: "Hubungi kami untuk harga terbaru" }
];

const whatsappNumber = COMPANY.whatsapp.replace(/\D/g, "").replace(/^0/, "62");

document.querySelectorAll("[data-company-name]").forEach((element) => {
  element.textContent = COMPANY.name;
});
document.title = `${COMPANY.name} | Supplier Pasir & Material Bangunan Bogor`;
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.content = `${COMPANY.name} menyediakan Pasir ayak, Pasir Celup, Batu, Seplit, dan Makadam untuk proyek di Bogor. Hubungi kami untuk ketersediaan dan penawaran.`;
}
document.querySelectorAll("[data-company-email]").forEach((element) => {
  element.textContent = COMPANY.email || "Email belum diatur";
});
document.querySelectorAll("[data-company-address]").forEach((element) => {
  element.textContent = COMPANY.address || "Alamat belum diatur";
});
document.querySelectorAll("[data-whatsapp], .contact-whatsapp").forEach((link) => {
  if (whatsappNumber) {
    if (link.classList.contains("contact-whatsapp")) {
      link.textContent = `+${whatsappNumber}`;
    }
    link.href = `https://wa.me/${whatsappNumber}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const statusElement = document.querySelector("#form-status");
      if (statusElement) {
        statusElement.textContent = "Nomor WhatsApp belum dikonfigurasi. Pemilik website perlu mengisi COMPANY.whatsapp di script.js.";
      }
      const offerSection = document.querySelector("#penawaran");
      if (offerSection) {
        offerSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

const productGrid = document.querySelector("#product-grid");
const productSelect = document.querySelector("#quote-product");
if (productGrid) {
  PRODUCTS.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}" loading="lazy">
        <span class="product-number">MATERIAL 0${index + 1}</span>
      </div>
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-card-bottom">
          <span class="product-price">${product.price}</span>
          <a href="#penawaran" data-product="${product.name}">Tanyakan harga ↗</a>
        </div>
      </div>`;
    productGrid.append(card);

    if (productSelect) {
      const option = document.createElement("option");
      option.value = product.name;
      option.textContent = product.name;
      productSelect.append(option);
    }
  });

  productGrid.addEventListener("click", (event) => {
    const productLink = event.target.closest("[data-product]");
    if (productLink && productSelect) {
      productSelect.value = productLink.dataset.product;
    }
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Buka menu navigasi" : "Tutup menu navigasi");
    primaryNav.classList.toggle("is-open", !isExpanded);
  });
  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu navigasi");
      primaryNav.classList.remove("is-open");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu navigasi");
      primaryNav.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}

const quoteForm = document.querySelector("#quote-form");
const formStatus = document.querySelector("#form-status");
if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formStatus) formStatus.textContent = "";
    if (!quoteForm.reportValidity()) return;
    if (!whatsappNumber) {
      if (formStatus) {
        formStatus.textContent = "Nomor WhatsApp belum dikonfigurasi. Pemilik website perlu mengisi COMPANY.whatsapp di script.js sebelum formulir dapat dikirim.";
      }
      const offerSection = document.querySelector("#penawaran");
      if (offerSection) {
        offerSection.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const formData = new FormData(quoteForm);
    const fields = [
      ["Nama", formData.get("customerName")],
      ["Perusahaan / proyek", formData.get("projectName") || "-"],
      ["Jenis pelanggan", formData.get("customerType")],
      ["Material", formData.get("product")],
      ["Jumlah / volume", formData.get("quantity")],
      ["Lokasi pengiriman", formData.get("deliveryLocation")],
      ["Tanggal kebutuhan", formData.get("requiredDate") || "-"],
      ["Catatan", formData.get("notes") || "-"]
    ];
    const message = `Halo ${COMPANY.name}, saya ingin meminta penawaran material:\n\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (formStatus) {
      formStatus.textContent = "Pesan telah disiapkan. Tinjau dan kirimkan melalui WhatsApp.";
    }
  });
}
