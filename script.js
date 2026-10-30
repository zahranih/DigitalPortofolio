// 1. VALIDASI FORM KONTAK

// Mengambil elemen HTML berdasarkan ID
const contactForm = document.getElementById("contact-form");

const namaInput = document.getElementById("nama");
const emailInput = document.getElementById("email");
const pesanInput = document.getElementById("pesan");

const formMessage = document.getElementById("form-message");
const submittedData = document.getElementById("submitted-data");

// Menangani proses pengiriman formulir
contactForm.addEventListener("submit", function (event) {
  // Mencegah halaman dimuat ulang saat form dikirim
  event.preventDefault();

  // Mengambil nilai input dan menghapus spasi di awal/akhir
  const nama = namaInput.value.trim();
  const email = emailInput.value.trim();
  const pesan = pesanInput.value.trim();

  // Menghapus notifikasi sebelumnya
  formMessage.textContent = "";
  formMessage.className = "form-message";

  // Menyembunyikan hasil pengiriman sebelumnya
  submittedData.hidden = true;

  // Validasi pertama: semua kolom wajib diisi
  if (nama === "" || email === "" || pesan === "") {
    showMessage("Semua kolom wajib diisi sebelum mengirim pesan.", "error");

    return;
  }

  // Validasi kedua: memeriksa format email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showMessage("Format email belum valid. Contoh: nama@email.com", "error");

    return;
  }

  // Menampilkan data yang sudah lolos validasi
  document.getElementById("result-nama").textContent = nama;

  document.getElementById("result-email").textContent = email;

  document.getElementById("result-pesan").textContent = pesan;

  // Menampilkan kotak ringkasan data
  submittedData.hidden = false;

  // Menampilkan notifikasi berhasil
  showMessage(
    "Validasi berhasil! Data pesan ditampilkan di bawah formulir.",
    "success",
  );

  // Mengosongkan formulir setelah berhasil
  contactForm.reset();
});

// Fungsi untuk menampilkan notifikasi
function showMessage(message, type) {
  formMessage.textContent = message;

  formMessage.className = "form-message " + type;
}

// 2. FITUR DARK MODE

const themeToggle = document.getElementById("theme-toggle");

// Memeriksa apakah pilihan tema sebelumnya tersimpan
const savedTheme = localStorage.getItem("portfolio-theme");

// Memulihkan tema saat halaman dibuka
if (savedTheme === "light") {
  document.body.classList.add("light-mode");

  updateThemeButton(true);
} else {
  updateThemeButton(false);
}

// Menangani klik tombol tema
themeToggle.addEventListener("click", function () {
  // Mengganti tema dengan menambah atau menghapus class
  document.body.classList.toggle("light-mode");

  // Memeriksa apakah mode terang sedang aktif
  const lightModeActive = document.body.classList.contains("light-mode");

  // Menyimpan pilihan tema pada browser
  if (lightModeActive) {
    localStorage.setItem("portfolio-theme", "light");
  } else {
    localStorage.setItem("portfolio-theme", "dark");
  }

  // Memperbarui ikon dan atribut aksesibilitas tombol
  updateThemeButton(lightModeActive);
});

// Fungsi untuk memperbarui tampilan tombol tema
function updateThemeButton(lightModeActive) {
  if (lightModeActive) {
    themeToggle.textContent = "☾";

    themeToggle.setAttribute("aria-label", "Aktifkan mode gelap");

    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    themeToggle.textContent = "☀";

    themeToggle.setAttribute("aria-label", "Aktifkan mode terang");

    themeToggle.setAttribute("aria-pressed", "false");
  }
}

// 3. NAVIGASI AKTIF

// Mengambil semua tautan navigasi
const navLinks = document.querySelectorAll(".nav-link");

// Memperbarui tampilan tautan saat diklik
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    // Menghapus class active dari semua menu
    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    // Memberi class active pada menu yang diklik
    link.classList.add("active");
  });
});
