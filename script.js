// ===== Nav active state (langsung, tanpa animasi) =====
const sections = ['beranda', 'tentang', 'project', 'kontak'];
const navLinks = document.querySelectorAll('.nav-link');

function spy() {
  const top = window.scrollY;
  let current = 'beranda';
  sections.forEach(id => {
    const s = document.getElementById(id);
    if (s && top >= s.offsetTop - 200) current = id;
  });
  navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.nav === current));
}
const toTopBtn = document.getElementById('toTop');
function toggleTop() { toTopBtn.classList.toggle('show', window.scrollY > 600); }
window.addEventListener('scroll', () => { spy(); handleNav(); toggleTop(); }, { passive: true });
spy();
toggleTop();

// ===== Navbar auto-hide: sembunyi saat scroll ke bawah, muncul saat scroll ke atas =====
const header = document.getElementById('siteHeader');
let lastY = window.scrollY;
function handleNav() {
  const y = window.scrollY;
  if (open) { header.classList.remove('nav-hidden'); lastY = y; return; } // menu mobile buka = tetap tampil
  if (y > 160 && y > lastY + 4) header.classList.add('nav-hidden'); // scroll ke bawah
  else if (y < lastY - 4 || y <= 160) header.classList.remove('nav-hidden'); // scroll ke atas / dekat beranda
  lastY = y;
}

// ===== Mobile menu =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let open = false;
function setMenu(v) {
  open = v;
  menuBtn.classList.toggle('open', v);
  mobileMenu.classList.toggle('show', v);
  document.body.style.overflow = v ? 'hidden' : '';
}
menuBtn.addEventListener('click', () => setMenu(!open));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ===== Multilingual (i18n) Support =====
let currentLang = 'id';
let isProjectExpanded = false;
let currentFilter = 'all';

const TRANSLATIONS = {
  id: {
    nav_home: 'Beranda',
    nav_about: 'Tentang',
    nav_projects: 'Project',
    nav_contact: 'Kontak',
    nav_drawer_title: 'Navigasi',
    hero_greeting: 'Halo, saya Closof',
    hero_title: 'Halo, saya Closof<br><span class="font-serif italic font-normal text-[clamp(1.9rem,5vw,3rem)]">Fullstack &amp; Software Developer.</span>',
    hero_desc: 'Saya membangun aplikasi web <span class="text-ink font-medium">end-to-end</span> — backend solid, frontend cepat.',
    hero_btn_projects: 'Lihat Project',
    hero_btn_contact: 'Hubungi saya →',
    about_title: 'Tentang saya',
    about_desc_1: 'Saya Closof — Software &amp; Fullstack Developer dengan 3 tahun pengalaman membangun aplikasi web, mobile, dan desktop: dari database, API, hingga antarmuka.',
    about_desc_2: 'Fokus saya: aplikasi yang cepat, aman, dan mudah dirawat. Tanpa kompleksitas yang tidak perlu.',
    about_tech_title: 'Tech Stack',
    projects_title: 'Project',
    projects_subtitle: 'Berikut beberapa project yang pernah dikembangkan.',
    projects_tech_title: 'Tech yang dipakai di project ini',
    projects_toggle_more: 'Lainnya',
    projects_toggle_close: 'Tutup',
    filter_all: 'Semua',
    filter_web: 'Web',
    filter_mobile: 'Mobile',
    filter_desktop: 'Desktop & Sistem',
    filter_ai: 'AI & LLM',
    copy_email_btn: 'Salin',
    copy_email_copied: 'Tersalin!',
    copy_toast_success: 'Email berhasil disalin ke clipboard!',
    project_link_demo: 'Lihat Disini',
    project_link_github: 'Lihat github',
    contact_title: 'Contact',
    contact_subtitle: 'Sampaikan kebutuhan Anda melalui salah satu pilihan saluran di bawah ini.',
    footer_text: '© 2026 <span class="inline-flex items-center gap-1 text-ink font-medium"><span>Closof Developer</span><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified" title="Verified"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.4-.2 2.91.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.93 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.51.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" fill="#1D9BF0"/><path d="M10.54 16.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" fill="#ffffff"/></svg></span> — Fullstack &amp; Software Developer',
    page_title: 'Closof Dev — Fullstack & Software Developer',
    page_desc: 'Portofolio simple, modern & smooth — Closof Dev, Fullstack & Software Developer.'
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    nav_drawer_title: 'Navigation',
    hero_greeting: 'Hi, I am Closof',
    hero_title: 'Hi, I am Closof<br><span class="font-serif italic font-normal text-[clamp(1.9rem,5vw,3rem)]">Fullstack &amp; Software Developer.</span>',
    hero_desc: 'I build <span class="text-ink font-medium">end-to-end</span> web applications — solid backend, fast frontend.',
    hero_btn_projects: 'View Projects',
    hero_btn_contact: 'Get in touch →',
    about_title: 'About me',
    about_desc_1: "I'm Closof — Software &amp; Fullstack Developer with 3 years of experience building web, mobile, and desktop applications: from databases and APIs to user interfaces.",
    about_desc_2: 'My focus: fast, secure, and maintainable applications. Without unnecessary complexity.',
    about_tech_title: 'Tech Stack',
    projects_title: 'Projects',
    projects_subtitle: 'Here are some projects I have developed.',
    projects_tech_title: 'Technologies used in these projects',
    projects_toggle_more: 'More',
    projects_toggle_close: 'Close',
    filter_all: 'All',
    filter_web: 'Web',
    filter_mobile: 'Mobile',
    filter_desktop: 'Desktop & System',
    filter_ai: 'AI & LLM',
    copy_email_btn: 'Copy',
    copy_email_copied: 'Copied!',
    copy_toast_success: 'Email copied to clipboard!',
    project_link_demo: 'Live Demo',
    project_link_github: 'View GitHub',
    contact_title: 'Contact',
    contact_subtitle: 'Feel free to reach out through any of the channels below.',
    footer_text: '© 2026 <span class="inline-flex items-center gap-1 text-ink font-medium"><span>Closof Developer</span><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified" title="Verified"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.4-.2 2.91.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.93 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.51.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" fill="#1D9BF0"/><path d="M10.54 16.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" fill="#ffffff"/></svg></span> — Fullstack &amp; Software Developer',
    page_title: 'Closof Dev — Fullstack & Software Developer',
    page_desc: 'Simple, modern & smooth portfolio — Closof Dev, Fullstack & Software Developer.'
  }
};

// ===== PROJECTS: tinggal edit array ini saja =====
// image: 'path.png' untuk 1 gambar utama
// images: ['path1.png', 'path2.png'] untuk multi-gambar (thumbnail muncul otomatis di halaman project.html)
// demo: isi URL untuk tampilkan "Lihat Disini", null / "" untuk sembunyikan
// github: isi URL untuk tampilkan "Lihat github", null / "" untuk sembunyikan
// fit: 'contain' = gambar full utuh natural tidak kepotong, 'cover' = penuhi frame 16:10 tapi kepotong
const PROJECTS = [
  {
    title: 'Low-Resource LLM Accelerator',
    category: 'ai',
    image: './media/llm-kuantized.png',
    desc: 'Engine inferensi LLM ringan yang dirancang untuk menjalankan model AI pada perangkat dengan resource terbatas. Dapat berjalan hanya menggunakan CPU dengan penggunaan RAM rendah dan performa generasi yang tetap responsif.',
    desc_en: 'A lightweight LLM inference engine designed to run AI models on resource-constrained devices. Runs entirely on CPU with low RAM footprint while keeping generation responsive.',
    demo: null,
    github: null,
    tech: [
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
  },

  {
    title: 'Block Office — 3D Workspace & Simulation',
    category: 'desktop',
    image: './media/block-office.png',
    desc: 'Simulasi ruang kerja virtual 3D yang dibangun tanpa game engine pihak ketiga. Mendukung multiplayer real-time, NPC berbasis state machine, percakapan antar karakter, serta interaksi dinamis di berbagai area kantor.',
    desc_en: 'A 3D virtual workspace simulation built without third-party game engines. Features real-time multiplayer, state machine-based NPCs, interactive conversations, and dynamic interactions across office zones.',
    demo: null,
    github: null,
    tech: [
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'OpenGL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'CMake', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg' },
    ],
  },

  {
    title: 'GiziScan: Multimodal Nutrition Analyzer',
    category: 'ai',
    image: './media/gizi-scan.png',
    desc: 'Aplikasi analisis makanan berbasis AI Vision yang mengidentifikasi komponen makanan dari gambar lalu memperkirakan jumlah dan kandungan gizinya. Hasil analisis mencakup kalori, makronutrien, serta profil glikemik setiap komponen.',
    desc_en: 'An AI Vision-powered food nutrition analysis application that identifies meal components from images, estimating portion sizes, macronutrients, calories, and glycemic profiles.',
    demo: null,
    github: null,
    tech: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Vision LLM API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
      { name: 'CLI / Terminal', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
  },

  {
    title: 'Portfolio Websites',
    category: 'web',
    image: 'media/porto-closof-v1/beranda.png',
    images: ['media/porto-closof-v1/beranda.png', 'media/porto-closof-v1/tentang.png', 'media/porto-closof-v1/project.png', 'media/porto-closof-v1/contact.png'],
    fit: 'cover',
    desc: 'Website portofolio developer untuk menampilkan berbagai project web, mobile, dan desktop dalam satu halaman. Dirancang dengan tampilan sederhana dan responsif agar informasi project serta kemampuan teknis mudah dipahami.',
    desc_en: 'A developer portfolio website showcasing web, mobile, and desktop projects on a single page. Clean, responsive, and crafted for clear presentation of technical skills.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },

  {
    title: 'TrixHUB Real-Time Dashboard',
    category: 'web',
    image: './media/trixhub.png',
    desc: 'Platform dashboard untuk memantau inventaris dan data pemain secara real-time. Dilengkapi autentikasi, filter data, pagination, REST API, serta cache sementara untuk menjaga proses monitoring tetap cepat dan ringan.',
    desc_en: 'A real-time dashboard platform for monitoring inventory and player data. Features authentication, data filters, pagination, REST APIs, and temporary caching for fast monitoring.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
  },

  {
    title: 'VibeCode Desktop',
    category: 'desktop',
    image: './media/vibecode-desktop.png',
    desc: 'Aplikasi coding desktop yang menghadirkan workspace modern dengan monitoring request model AI dan penggunaan token secara real-time. Dilengkapi panel fleksibel, navigasi project, serta dukungan lintas platform Windows, macOS, dan Linux.',
    desc_en: 'A modern desktop coding environment featuring real-time AI model request monitoring and token usage tracking. Includes flexible panels, project navigation, and cross-platform support.',
    demo: null,
    github: null,
    tech: [
      { name: 'SolidJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidjs/solidjs-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'Tauri', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tauri/tauri-original.svg' },
      { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
      { name: 'Bun', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg' },
    ],
  },

  {
    title: 'Happy Birthday Websites',
    category: 'web',
    image: 'media/hbd-website.png',
    desc: 'Website ucapan ulang tahun interaktif yang dikemas seperti surat digital dengan beberapa halaman. Memiliki animasi amplop, transisi halaman, efek partikel, dan berbagai interaksi kecil untuk membuat pengalaman membaca lebih personal.',
    desc_en: 'An interactive digital birthday letter website with envelope opening animations, page transitions, particle effects, and delightful interactions for a personal experience.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },

  {
    title: 'Sistem Inventaris Sekolah',
    category: 'web',
    title_en: 'School Inventory System',
    image: './media/gudang-sekolah.png',
    desc: 'Sistem inventaris sekolah untuk mengelola barang, stok gudang, peminjaman, dan distribusi aset antar jurusan. Mendukung barcode scanner, import data, pencatatan aktivitas, multi-role user, serta sinkronisasi stok secara otomatis.',
    desc_en: 'School inventory management system to handle assets, warehouse stock, borrowing, and distribution across departments. Features barcode scanning, data import, and automatic stock syncing.',
    demo: null,
    github: null,
    tech: [
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'Swagger', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg' },
    ],
  },

  {
    title: 'Desktop Realtime Chat',
    category: 'desktop',
    image: './media/desktop-chat.png',
    desc: 'Aplikasi komunikasi real-time yang tersedia melalui client desktop WinForms dan mobile .NET MAUI. Mendukung pesan pribadi, grup, lampiran media, presence, typing indicator, read receipt, serta enkripsi pesan menggunakan AES-256-GCM.',
    desc_en: 'Real-time messaging application available via WinForms desktop and .NET MAUI mobile clients. Features direct & group chats, media attachments, presence, read receipts, and AES-256-GCM encryption.',
    demo: null,
    github: null,
    tech: [
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    ],
  },

  {
    title: 'Tic Tac Toe JavaScript',
    category: 'web',
    image: 'media/js-tictactoe.png',
    desc: 'Game Tic Tac Toe dua pemain berbasis browser dengan pengelolaan giliran dan sistem skor. Dilengkapi deteksi kemenangan atau seri, indikator pemain aktif, reset permainan, serta notifikasi interaktif.',
    desc_en: 'Two-player browser-based Tic Tac Toe game with turn management and score tracking. Features win/draw detection, active player indicator, instant reset, and interactive alerts.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },

  {
    title: 'GrowFlix GTPS',
    category: 'desktop',
    image: null,
    desc: 'Game server berbasis C++ yang menggabungkan layanan game dan dashboard pengelolaan item dalam satu aplikasi. Mendukung komunikasi UDP, penyimpanan player dan world, konfigurasi reward, serta pengelolaan data melalui web.',
    desc_en: 'C++ game server integrating gameplay services and item management dashboard into a single application. Supports UDP networking, player/world storage, and web-based administration.',
    demo: null,
    github: null,
    tech: [
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'CMake', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg' },
    ],
  },

  {
    title: 'POS Mobile App',
    category: 'mobile',
    image: 'media/pos-app-pojok.png',
    desc: 'Aplikasi kasir Android untuk mengelola produk, transaksi, laporan penjualan, dan aktivitas beberapa toko. Mendukung penggunaan offline, sinkronisasi cloud, barcode scanner, grafik laporan, serta pembuatan struk dan PDF.',
    desc_en: 'Android point-of-sale app for managing products, transactions, sales reports, and multi-store operations. Features offline support, cloud sync, barcode scanning, and PDF receipt export.',
    demo: null,
    github: null,
    tech: [
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
      { name: 'Gradle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg' },
    ],
  },

  {
    title: 'Real-Time Chat Websites',
    category: 'web',
    image: 'media/web-chat.png',
    desc: 'Aplikasi chat berbasis web dengan komunikasi real-time melalui WebSocket. Memiliki fitur pengguna online, typing indicator, edit dan hapus pesan, pengiriman gambar, emoji, friend request, serta notifikasi interaktif.',
    desc_en: 'WebSocket-powered real-time web chat app featuring online presence, typing indicators, message editing & deletion, image attachments, emoji support, and friend requests.',
    demo: null,
    github: null,
    tech: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Socket.IO', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },

  {
    title: 'Terminal Chat Agent',
    category: 'ai',
    image: 'media/ai-cli.png',
    desc: 'AI chat berbasis terminal yang mendukung streaming respons dan agentic tool calling secara langsung dari CLI. Agent dapat membaca file, menjalankan shell command, melakukan pencarian teks, mengakses web, dan menyimpan riwayat sesi.',
    desc_en: 'Terminal-based AI chat supporting streaming responses and agentic tool calling from the CLI. Capable of reading files, executing shell commands, web access, and session history persistence.',
    demo: null,
    github: null,
    tech: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },

  {
    title: 'Kantor Chat AI Realtime',
    category: 'ai',
    title_en: 'Office Real-Time AI Chat',
    image: 'media/kantor-chat.png',
    desc: 'Platform komunikasi internal kantor yang dapat berjalan melalui jaringan LAN tanpa bergantung pada internet. Mendukung multi-room chat, file sharing, presence pengguna, AI assistant, streaming respons, serta dashboard admin dan audit log.',
    desc_en: 'On-premise office communication platform running over LAN without internet dependence. Features multi-room chat, file sharing, user presence, AI assistant, and admin audit logs.',
    demo: null,
    github: null,
    tech: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    ],
  },

  {
    title: 'Dynamic Island Android Overlay',
    category: 'mobile',
    image: '',
    desc: 'Aplikasi Android yang menghadirkan konsep Dynamic Island melalui overlay interaktif di atas aplikasi lain. Mendukung notifikasi, musik, charging, timer, stopwatch, download, dan AI chat dengan ukuran pill yang menyesuaikan aktivitas.',
    desc_en: 'Android application implementing dynamic island overlay interactions across any app. Supports notifications, music player, battery status, timers, and mini AI chat pill views.',
    demo: null,
    github: null,
    tech: [
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
      { name: 'Jetpack Compose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
      { name: 'Gradle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    ],
  },

  {
    title: 'VaporNode Cloud',
    category: 'web',
    image: 'media/vapornode.png',
    desc: 'Landing page layanan Cloud VPS dengan tampilan modern dan katalog beberapa pilihan server berdasarkan kebutuhan pengguna. Memiliki detail paket, informasi infrastruktur, alur pemilihan plan, serta desain responsif untuk desktop dan mobile.',
    desc_en: 'Cloud VPS landing page with modern aesthetics and server catalog tailored to varied hosting needs. Features pricing plans, infrastructure specs, and responsive layouts.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },

  {
    title: 'AI Diagram Studio',
    category: 'ai',
    image: 'media/closof-drawio.png',
    desc: 'Aplikasi pembuatan diagram berbasis browser dengan infinite canvas dan lebih dari 150 shape dari berbagai kategori. Mendukung drag-and-drop, undo/redo, auto-layout, export SVG/PNG, serta AI assistant untuk membantu membuat diagram.',
    desc_en: 'Browser-based diagramming app with infinite canvas and 150+ shapes. Features drag-and-drop, undo/redo, auto-layout, SVG/PNG export, and an integrated AI assistant.',
    demo: null,
    github: null,
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    ],
  },

  {
    title: 'Immersive 3D Developer Portfolio',
    category: 'web',
    image: 'media/portofolio-v2.png',
    desc: 'Website portofolio developer dengan pengalaman visual yang lebih interaktif melalui elemen 3D, parallax, carousel, animated counter, dan skill progress. Tetap dibuat ringan tanpa framework frontend besar dan responsif di berbagai ukuran layar.',
    desc_en: 'Interactive developer portfolio featuring 3D visuals, parallax scrolling, carousels, animated counters, and skill progress. Lightweight and responsive without heavy frameworks.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },

  {
    title: 'Clipora UI Prototype',
    category: 'web',
    image: 'media/auto-clip-web-glm.png',
    desc: 'Prototype dashboard Auto Clip Studio untuk mengeksplorasi antarmuka aplikasi pengolahan video otomatis. Seluruh proses disimulasikan di sisi frontend, mulai dari waveform, progress processing, statistik, hingga library hasil clip.',
    desc_en: 'Prototype dashboard for Auto Clip Studio exploring automated video processing workflows. Simulates audio waveforms, processing progress, analytics, and clip library management.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },

  {
    title: 'Nexus Dashboard UI',
    category: 'web',
      image: 'media/ecommerce-dashboard-glm.png',
    desc: 'Prototype dashboard operasional e-commerce dengan tampilan dark mode dan berbagai informasi bisnis dalam satu halaman. Menampilkan KPI, revenue chart, traffic, transaksi terbaru, serta live activity menggunakan data simulasi client-side.',
    desc_en: 'E-commerce operational dashboard with sleek dark mode aesthetics. Displays KPIs, revenue charts, traffic metrics, recent transactions, and simulated live activity.',
    demo: null,
    github: null,
    tech: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },

  {
    title: 'Struk Designer Builder',
    category: 'web',
    title_en: 'Receipt Designer & Builder',
    image: 'media/struk-app.png',
    desc: 'Editor visual untuk membuat template struk thermal tanpa perlu menulis layout secara manual. Mendukung drag-and-drop, resize, snap-to-grid, data binding, template siap pakai, serta export ke berbagai format aplikasi dan printer.',
    desc_en: 'Visual drag-and-drop thermal receipt editor eliminating manual layout coding. Features resizing, snap-to-grid, data binding, pre-built templates, and printer export.',
    demo: null,
    github: null,
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },

  {
    title: 'Website PPDB Sekolah',
    category: 'web',
    title_en: 'School Admission Portal',
    image: 'media/web-ppdb.png',
    desc: 'Platform PPDB online yang menangani proses pendaftaran siswa dari halaman informasi hingga dashboard peserta. Mendukung registrasi, login, profil pendaftar, autentikasi token, dan pengelolaan data melalui backend REST API.',
    desc_en: 'Online student admissions portal managing the entire enrollment workflow from public info to applicant dashboards, authentication, and REST API backend integration.',
    demo: null,
    github: null,
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },

  {
    title: 'World Maker 2D Builder',
    category: 'web',
    image: 'media/world-maker-gt.png',
    desc: 'Platform untuk membuat, menyimpan, dan membagikan dunia pixel-art 2D melalui editor berbasis canvas. Dilengkapi cloud save, template komunitas, autentikasi, chat real-time, presence pengguna, serta dashboard analitik admin.',
    desc_en: 'Canvas-based editor for creating, saving, and sharing 2D pixel-art worlds. Features cloud save, community templates, authentication, real-time chat, and admin analytics.',
    demo: null,
    github: null,
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Socket.IO', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    ],
  },

  {
    title: 'Nafsgram Social Media',
    category: 'web',
    image: 'media/nafsgram.png',
    desc: 'Aplikasi media sosial dengan pengalaman penggunaan yang terinspirasi dari Instagram. Memiliki feed, stories, highlights, posting, notifikasi, edit profil, dark mode, serta struktur frontend modular untuk pengelolaan data pengguna.',
    desc_en: 'Social media application inspired by Instagram featuring feeds, stories, highlights, posts, notifications, profile customization, dark mode, and modular frontend architecture.',
    demo: null,
    github: null,
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    ],
  },

  {
    title: 'Caven AI Gateway Platform',
    category: 'ai',
    image: 'media/cavenai.png',
    desc: 'Platform AI gateway yang menyatukan berbagai provider model ke dalam satu API kompatibel OpenAI. Menyediakan subscription, kuota token, rate limiting, playground pengguna, pembayaran QRIS, serta dashboard admin untuk monitoring layanan.',
    desc_en: 'Unified AI gateway aggregating multiple LLM providers into a single OpenAI-compatible API. Features subscriptions, token quotas, rate limiting, playground, and QRIS payments.',
    demo: null,
    github: null,
    tech: [
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    ],
  },

  {
    title: 'GTPS AI Chat Platform',
    category: 'ai',
    image: 'media/gtpsai.png',
    desc: 'Platform chat AI multi-provider yang memungkinkan pengguna berpindah model dalam satu aplikasi. Mendukung streaming respons, attachment, RAG untuk mengambil konteks dokumen, sistem subscription, kuota penggunaan, OTP email, serta dashboard admin.',
    desc_en: 'Multi-provider AI chat platform enabling seamless model switching. Features streaming responses, file attachments, RAG document search, subscriptions, and admin dashboard.',
    demo: null,
    github: null,
    tech: [
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    ],
  },

  {
    title: 'Sistem Rental Kendaraan',
    category: 'desktop',
    title_en: 'Vehicle Rental System',
    image: 'media/vehiclerental.png',
    desc: 'Aplikasi desktop untuk mengelola proses rental kendaraan dari reservasi hingga penyelesaian transaksi. Sistem mencakup manajemen kendaraan dan driver, role pengguna, pembayaran, inspeksi kendaraan, transaksi aktif, serta dashboard informasi.',
    desc_en: 'Desktop application for managing vehicle rental operations from bookings to payment. Features fleet & driver management, vehicle inspections, role permissions, and analytics.',
    demo: null,
    github: null,
    tech: [
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
    ],
  },

  {
    title: 'Website Kelulusan Sekolah',
    category: 'web',
    title_en: 'School Graduation Portal',
    image: 'media/web-kelulusan.png',
    desc: 'Portal pengumuman kelulusan yang memungkinkan siswa mengecek hasil menggunakan NISN secara langsung. Admin dapat mengelola data siswa, melakukan import massal dari Excel, serta memantau seluruh data melalui dashboard.',
    desc_en: 'Student graduation announcement portal allowing instant NISN lookup. Includes bulk student data import from Excel and an administrative management dashboard.',
    demo: null,
    github: null,
    tech: [
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' },
    ],
  },

  {
    title: 'Real-Time OSIS Voting Dashboard',
    category: 'web',
    title_en: 'Real-Time Student Election Dashboard',
    image: 'media/quick-vote.png',
    desc: 'Dashboard voting OSIS untuk menampilkan jumlah suara dan perolehan masing-masing pasangan calon secara langsung. Dilengkapi visualisasi chart, persentase suara, avatar kandidat, serta penyimpanan data lokal untuk menjaga hasil tetap tersimpan.',
    desc_en: 'Student council election dashboard displaying real-time vote tallies and candidate statistics with animated charts, percentage breakdowns, candidate profiles, and local storage.',
    demo: null,
    github: null,
    tech: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    ],
  },

  {
    title: 'IT Software Course Platform',
    category: 'web',
    image: 'media/itsoft-course.png',
    desc: 'Platform belajar untuk persiapan LKS bidang IT Software Solutions for Business dengan materi Desktop, Software Design, dan Mobile. Menyediakan modul bertahap, kuis, problemset, arsip soal LKS, dashboard analitik, serta tracking progres belajar.',
    desc_en: 'Learning platform for national skills competitions (LKS IT Software Solutions) covering Desktop, Software Design, and Mobile. Includes modules, quizzes, and progress tracking.',
    demo: null,
    github: null,
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Golang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    ],
  },

  {
    title: 'NafChat AI Mobile App',
    category: 'mobile',
    image: null,
    desc: 'Aplikasi chat AI mobile dengan tampilan modern untuk membantu kebutuhan coding, ide, belajar, dan pertanyaan sehari-hari. Dibangun dengan pendekatan local-first, alur onboarding yang sederhana, serta antarmuka responsif untuk pengalaman penggunaan yang mulus.',
    desc_en: 'Mobile AI chat app crafted for coding, ideation, and daily learning. Built with a local-first philosophy, simple onboarding, and responsive interface for a seamless experience.',
    demo: null,
    github: null,
    tech: [
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    ],
  },
    {
  title: 'Website Classic UI/UX Design',
  category: 'ai',
  image: null,
  desc: 'SKILL.md untuk AI agent yang berfokus pada perancangan UI/UX bergaya klasik, terstruktur, dan profesional. Mengatur penggunaan tipografi, palet warna, layout, spacing, border, serta komponen antarmuka agar menghasilkan desain yang konsisten dan tidak terlalu bergaya modern.',
  demo: null,
  github: null,
  tech: [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  ],
},
{
  title: 'Nusantara Muslimah Marketplace',
  category: 'web',
  image: 'media/nusantara-muslimah-market/beranda.png',
  images: ['media/nusantara-muslimah-market/beranda.png', 'media/nusantara-muslimah-market/kategori.png', 'media/nusantara-muslimah-market/produk.png', 'media/nusantara-muslimah-market/keunggulan.png', 'media/nusantara-muslimah-market/contact.png', 'media/nusantara-muslimah-market/keranjang.png'],
  desc: 'Marketplace fashion dan kebutuhan muslimah yang dibuat dengan fokus pada tampilan yang rapi, responsif, dan mudah digunakan. Website ini menyediakan berbagai kategori produk, fitur pencarian dan filter, keranjang belanja, hingga proses checkout. Dibangun menggunakan HTML, Tailwind CSS, dan JavaScript dengan beberapa fitur seperti lazy loading gambar, navigasi interaktif, serta fallback untuk gambar yang gagal dimuat.',
  demo: null,
  github: null,
  tech: [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Google Fonts', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
  ],
},
{
  title: 'Company Profile Computer Store',
  category: 'web',
  image: 'media/laptop-store-company-profile/beranda.png',
  desc: 'Dibuat untuk toko laptop di Mangga Dua yang sering kalah harga sama Tokopedia/Shopee. Saya bangun company profile satu file yang langsung jawab keraguan pembeli: katalog 5 unit terlaris, garansi resmi 1-3 tahun, servis gratis, dan pengadaan corporate 10+ unit. Pakai HTML semantic + Tailwind CDN + Vanilla JS untuk counter animasi, FAQ accordion, slider testimoni, dan validasi form. Hasilnya: struktur 500+ stok / 50+ brand / 3 cabang kebaca jelas di HP maupun desktop, plus meta SEO dan OG yang siap dipasang iklan.',
  demo: null,
  github: null,
  tech: [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  ],
}
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const projectActiveThumbMap = new Map();

function renderCard(p, i, isFiltering = false) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.id;
  const fitCls = p.fit === 'cover' ? 'aspect-[16/10] object-cover' : 'h-auto object-contain';
  const links = [];
  const demoLabel = dict.project_link_demo || 'Lihat Disini';
  const githubLabel = dict.project_link_github || 'Lihat github';
  if (p.demo) links.push(`<a href="${esc(p.demo)}" target="_blank" rel="noopener" class="inline-block text-[14px] font-medium underline underline-offset-4">${demoLabel}</a>`);
  if (p.github) links.push(`<a href="${esc(p.github)}" target="_blank" rel="noopener" class="inline-block text-[14px] font-medium underline underline-offset-4">${githubLabel}</a>`);
  const linksHtml = links.length ? `<div class="mt-1 flex flex-col items-start gap-1">${links.join('')}</div>` : '';
  const techHtml = (p.tech || []).map(t => `<img src="${esc(t.icon)}" alt="${esc(t.name)}" title="${esc(t.name)}" loading="lazy" />`).join('');

  const displayTitle = (currentLang === 'en' && p.title_en) ? p.title_en : p.title;
  const displayDesc = (currentLang === 'en' && p.desc_en) ? p.desc_en : p.desc;

  const animCls = isFiltering ? 'filter-enter' : '';
  const animStyle = isFiltering ? `style="animation-delay: ${Math.min(i * 45, 260)}ms;"` : '';

  // Dukungan koleksi gambar / thumbnail multi-foto
  const projectImages = (Array.isArray(p.images) && p.images.length > 0)
    ? p.images
    : (p.image ? [p.image] : []);
  const activeThumbIdx = projectActiveThumbMap.get(p.title) || 0;
  const currentBannerSrc = (projectImages.length > activeThumbIdx)
    ? projectImages[activeThumbIdx]
    : (projectImages[0] || p.image || null);

  const imgHtml = currentBannerSrc ? `
      <div class="overflow-hidden bg-white rounded-none project-img-wrap">
        <img src="${esc(currentBannerSrc)}" alt="${esc(displayTitle)}" loading="lazy" onerror="this.closest('.project-img-wrap').remove()" class="w-full ${fitCls} bg-white block project-img" />
      </div>` : '';

  const thumbsHtml = (projectImages.length > 1) ? `
      <div class="project-thumbs" role="tablist" aria-label="Pilihan foto ${esc(displayTitle)}">
        ${projectImages.map((imgSrc, idx) => `
          <button type="button" 
            class="project-thumb-btn ${idx === activeThumbIdx ? 'is-active' : ''}" 
            data-img="${esc(imgSrc)}"
            data-idx="${idx}"
            data-title="${esc(p.title)}"
            aria-label="Pilih foto ${idx + 1}"
            role="tab"
            aria-selected="${idx === activeThumbIdx ? 'true' : 'false'}">
            <img src="${esc(imgSrc)}" alt="Thumbnail ${idx + 1}" loading="lazy" />
          </button>
        `).join('')}
      </div>` : '';

  const titleMarginTop = imgHtml ? (thumbsHtml ? 'mt-3.5' : 'mt-5') : '';

  return `
    <article class="project-card reveal ${animCls}" ${animStyle}>
      ${imgHtml}
      ${thumbsHtml}
      <h3 class="font-semibold text-[20px] tracking-tight ${titleMarginTop}">${esc(displayTitle)}</h3>
      ${linksHtml}
      <p class="text-muted text-[15px] mt-2 leading-relaxed">${esc(displayDesc)}</p>
      <div class="proj-icons">${techHtml}</div>
    </article>`;
}

const INITIAL_PROJECT_COUNT = 2;

function renderProjects(isFiltering = false) {
  const grid = document.getElementById('projectGrid');
  const extraGrid = document.getElementById('projectGridExtra');
  const extraWrap = document.getElementById('projectExtraWrap');
  const toggleWrap = document.getElementById('projectToggleWrap');
  const toggleBtn = document.getElementById('projectToggleBtn');
  const toggleText = document.getElementById('projectToggleText');
  if (!grid) return;

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

  const filteredProjects = currentFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === currentFilter);

  const initialProjects = filteredProjects.slice(0, INITIAL_PROJECT_COUNT);
  const extraProjects = filteredProjects.slice(INITIAL_PROJECT_COUNT);

  grid.innerHTML = initialProjects.map((p, i) => renderCard(p, i, isFiltering)).join('');

  if (extraGrid) {
    extraGrid.innerHTML = extraProjects.map((p, i) => renderCard(p, i + INITIAL_PROJECT_COUNT, isFiltering)).join('');
  }

  if (toggleWrap) {
    toggleWrap.style.display = extraProjects.length > 0 ? '' : 'none';
  }

  if (extraWrap) {
    if (extraProjects.length === 0) {
      extraWrap.style.display = 'none';
    } else {
      extraWrap.style.display = '';
      if (!isProjectExpanded) {
        extraWrap.classList.remove('is-expanded');
        extraWrap.style.maxHeight = PEEK_HEIGHT + 'px';
      }
    }
  }

  if (toggleBtn && toggleText) {
    toggleBtn.setAttribute('aria-expanded', isProjectExpanded ? 'true' : 'false');
    toggleText.textContent = isProjectExpanded ? dict.projects_toggle_close : dict.projects_toggle_more;
  }
}

// ===== Hitung Total Proyek Per Kategori =====
function getFilterCounts() {
  const counts = { all: PROJECTS.length, web: 0, mobile: 0, desktop: 0, ai: 0 };
  PROJECTS.forEach(p => {
    if (counts[p.category] !== undefined) {
      counts[p.category]++;
    }
  });
  return counts;
}

function updateFilterCounts() {
  const counts = getFilterCounts();
  document.querySelectorAll('#projectFilters .filter-tab').forEach(tab => {
    const f = tab.getAttribute('data-filter');
    const countEl = tab.querySelector('.filter-count');
    if (countEl && counts[f] !== undefined) {
      countEl.textContent = counts[f];
    }
  });
}

// ===== Filter Kategori Proyek dengan Transisi Smooth & Staggered =====
let filterAnimTimeout = null;

function initProjectFilters() {
  const container = document.getElementById('projectFilters');
  if (!container) return;

  updateFilterCounts();

  const filterTabs = container.querySelectorAll('.filter-tab');
  filterTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-filter') || 'all';
      if (currentFilter === selected) return;

      currentFilter = selected;

      filterTabs.forEach(tab => {
        tab.classList.toggle('is-active', tab.getAttribute('data-filter') === selected);
      });

      // Reset state expand saat ganti filter
      isProjectExpanded = false;
      const extraWrap = document.getElementById('projectExtraWrap');
      const toggleWrap = document.getElementById('projectToggleWrap');
      if (extraWrap) {
        extraWrap.classList.remove('is-expanded');
        extraWrap.style.maxHeight = PEEK_HEIGHT + 'px';
      }
      if (toggleWrap) {
        toggleWrap.classList.remove('is-expanded');
      }

      // Smooth transisi kartu saat ganti tab filter
      const grid = document.getElementById('projectGrid');
      const extraGrid = document.getElementById('projectGridExtra');

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        renderProjects(false);
        return;
      }

      if (filterAnimTimeout) clearTimeout(filterAnimTimeout);

      if (grid) grid.classList.add('grid-filter-leave');
      if (extraGrid) extraGrid.classList.add('grid-filter-leave');

      filterAnimTimeout = setTimeout(() => {
        renderProjects(true);
        if (grid) grid.classList.remove('grid-filter-leave');
        if (extraGrid) extraGrid.classList.remove('grid-filter-leave');
      }, 160);
    });
  });
}

// ===== 1-Click Copy Email & Floating Toast =====
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast) return;

  if (toastMsg && message) {
    toastMsg.textContent = message;
  }

  toast.classList.add('is-visible');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2600);
}

function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBadge = document.getElementById('copyEmailBadge');
  if (!copyBtn) return;

  let revertTimeout = null;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || 'closof@gmail.com';
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (e) {
        success = false;
      }
    }

    if (success) {
      copyBtn.classList.add('is-copied');
      if (copyBadge) {
        copyBadge.textContent = dict.copy_email_copied || 'Tersalin!';
      }
      showToast(dict.copy_toast_success || 'Email berhasil disalin ke clipboard!');

      if (revertTimeout) clearTimeout(revertTimeout);
      revertTimeout = setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        if (copyBadge) {
          copyBadge.textContent = dict.copy_email_btn || 'Salin';
        }
      }, 2400);
    }
  });
}

// ===== Toggle Expand / Collapse Projects (Peek & Blur Transition) =====
const PEEK_HEIGHT = 120;

function initProjectToggle() {
  const toggleBtn = document.getElementById('projectToggleBtn');
  const extraWrap = document.getElementById('projectExtraWrap');
  const toggleWrap = document.getElementById('projectToggleWrap');
  const toggleText = document.getElementById('projectToggleText');
  if (!toggleBtn || !extraWrap) return;

  toggleBtn.addEventListener('click', () => {
    isProjectExpanded = !isProjectExpanded;
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

    if (isProjectExpanded) {
      // 1. Berikan ruang penuh langsung agar scroll ke bawah tidak terpotong oleh batasan tinggi
      extraWrap.classList.add('is-expanded');
      extraWrap.style.maxHeight = 'none';
      if (toggleWrap) toggleWrap.classList.add('is-expanded');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (toggleText) toggleText.textContent = dict.projects_toggle_close;

      // 2. Hitung posisi kartu paling akhir
      const extraGrid = document.getElementById('projectGridExtra');
      const lastCard = extraGrid ? extraGrid.lastElementChild : null;
      const extraWrapTop = extraWrap.getBoundingClientRect().top + window.scrollY;
      const targetY = lastCard
        ? Math.max(0, extraWrapTop + lastCard.offsetTop - 100)
        : Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // 3. Scroll meluncur halus ke kartu terakhir dengan durasi nyaman (1250ms)
      smoothScrollTo(targetY, 1250);
    } else {
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (toggleText) toggleText.textContent = dict.projects_toggle_more;
      if (toggleWrap) toggleWrap.classList.remove('is-expanded');

      // Set tinggi saat ini terlebih dahulu agar transisi CSS collapse berjalan mulus tanpa scroll otomatis
      const currentHeight = extraWrap.scrollHeight;
      extraWrap.style.maxHeight = currentHeight + 'px';
      extraWrap.offsetHeight; // Force reflow

      requestAnimationFrame(() => {
        extraWrap.classList.remove('is-expanded');
        extraWrap.style.maxHeight = PEEK_HEIGHT + 'px';
      });
    }
  });
}

// ===== Tech stack gabungan dari semua project (statis, tidak slide) =====
function renderProjectTechStack() {
  const wrap = document.getElementById('projectTechStack');
  if (!wrap) return;
  const seen = new Map();
  PROJECTS.forEach(p => (p.tech || []).forEach(t => {
    if (t && t.name && !seen.has(t.name)) seen.set(t.name, t);
  }));
  wrap.innerHTML = [...seen.values()].map(t => `
    <div class="stack-tile" title="${esc(t.name)}">
      <img src="${esc(t.icon)}" alt="${esc(t.name)}" loading="lazy" onerror="this.closest('div').remove()" />
      <span>${esc(t.name)}</span>
    </div>`).join('');
}

// ===== Fluid Morphing & Size Transition saat Pergantian Bahasa (Solid 100%, Tanpa Efek Transparan) =====
function morphIslandNav(callback, shouldAnimate = true) {
  const nav = document.getElementById('islandNav');
  if (!nav || !shouldAnimate || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    callback();
    return;
  }

  // 1. Ambil ukuran lebar awal sebelum teks berganti
  const oldWidth = nav.offsetWidth;

  // 2. Jalankan pembaruan teks / konten bahasa secara langsung
  callback();

  // 3. Ambil ukuran lebar baru setelah teks berganti
  const newWidth = nav.offsetWidth;

  if (Math.abs(oldWidth - newWidth) > 1) {
    // Kunci ukuran sementara ke ukuran awal
    nav.style.width = oldWidth + 'px';
    nav.offsetHeight; // Force browser reflow

    // Animasikan perubahan lebar ke ukuran baru dengan kurva smooth
    requestAnimationFrame(() => {
      nav.style.width = newWidth + 'px';
    });

    const cleanup = (e) => {
      if (e.target === nav && e.propertyName === 'width') {
        nav.style.width = '';
        nav.removeEventListener('transitionend', cleanup);
      }
    };
    nav.addEventListener('transitionend', cleanup);
    // Pengaman timeout jika transitionend tidak tertrigger
    setTimeout(() => {
      nav.style.width = '';
    }, 480);
  }
}

// ===== Penerapan Bahasa (i18n) dengan Animasi Morphing Ukuran & Scroll Kompensasi =====
function applyLanguage(lang, shouldAnimate = true) {
  const targetLang = (lang === 'en') ? 'en' : 'id';

  // 1. Catat posisi section saat ini jika pengguna sedang membaca konten di bawah
  let activeSectionEl = null;
  let sectionOffsetTop = 0;
  if (shouldAnimate && window.scrollY > 80) {
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 250 && rect.bottom >= 120) {
          activeSectionEl = el;
          sectionOffsetTop = rect.top;
          break;
        }
      }
    }
  }

  // 2. Jalankan perubahan bahasa di dalam morphIslandNav (konten tetap solid 100%)
  morphIslandNav(() => {
    currentLang = targetLang;
    try {
      localStorage.setItem('porto_lang', currentLang);
    } catch (e) {}

    document.documentElement.lang = currentLang;

    const currentLabel = document.getElementById('langCurrentText');
    if (currentLabel) {
      currentLabel.textContent = currentLang.toUpperCase();
    }

    document.querySelectorAll('.lang-option').forEach(opt => {
      const isActive = opt.getAttribute('data-lang') === currentLang;
      opt.classList.toggle('is-active', isActive);
      opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.id;

    // Update Page Title and Meta Description
    if (dict.page_title) document.title = dict.page_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.page_desc) metaDesc.setAttribute('content', dict.page_desc);

    // Update data-i18n text
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.id === 'projectToggleText') {
          el.textContent = isProjectExpanded ? dict.projects_toggle_close : dict.projects_toggle_more;
        } else if (el.id === 'copyEmailBadge' && el.closest('.copy-email-pill')?.classList.contains('is-copied')) {
          el.textContent = dict.copy_email_copied || 'Tersalin!';
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update data-i18n-html text
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Re-render project cards
    renderProjects(false);
    updateFilterCounts();

    // Update aria-label toTop button
    if (toTopBtn) {
      toTopBtn.setAttribute('aria-label', currentLang === 'en' ? 'Back to top' : 'Kembali ke atas');
    }

    // 3. Kompensasi scroll halus agar posisi baca pengguna tetap stabil & tidak melompat
    if (shouldAnimate && activeSectionEl) {
      const newRect = activeSectionEl.getBoundingClientRect();
      const diffY = newRect.top - sectionOffsetTop;
      if (Math.abs(diffY) > 3) {
        const targetScrollY = Math.max(0, window.scrollY + diffY);
        smoothScrollTo(targetScrollY, 400);
      }
    }
  }, shouldAnimate);
}

function initLanguage() {
  const langPicker = document.getElementById('langPicker');
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  if (!langPicker || !langBtn || !langMenu) return;

  function closeMenu() {
    langMenu.classList.remove('is-open');
    langBtn.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    langMenu.classList.add('is-open');
    langBtn.setAttribute('aria-expanded', 'true');
  }

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const chosen = btn.getAttribute('data-lang');
      if (chosen) {
        applyLanguage(chosen, true); // Animasi morphing aktif saat diklik pengguna
      }
      closeMenu();
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!langPicker.contains(e.target)) {
      closeMenu();
    }
  });

  // Close when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langMenu.classList.contains('is-open')) {
      closeMenu();
      langBtn.focus();
    }
  });

  // Load language preference from localStorage or default to 'id'
  let savedLang = 'id';
  try {
    const stored = localStorage.getItem('porto_lang');
    if (stored === 'en' || stored === 'id') savedLang = stored;
  } catch (e) {}

  applyLanguage(savedLang, false);
}

// ===== Hero Typing Animation (Typewriter Effect Berulang) =====
const TYPING_WORDS = [
  'Fullstack & Software Developer.',
  'Fullstack Developer.',
  'Software Developer.',
  'AI Enthusiast.'
];

let typeTimeout = null;
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeWriter() {
  const targetEl = document.getElementById('heroTyping');
  if (!targetEl) return;

  const currentWord = TYPING_WORDS[wordIdx % TYPING_WORDS.length];

  if (!isDeleting) {
    charIdx++;
    targetEl.textContent = currentWord.substring(0, charIdx);

    if (charIdx === currentWord.length) {
      // Selesai mengetik seluruh teks, jeda sejenak untuk dibaca
      isDeleting = true;
      typeTimeout = setTimeout(typeWriter, 2000);
      return;
    }
    // Kecepatan mengetik alami (~65-85ms per huruf)
    const speed = 70 + Math.random() * 20;
    typeTimeout = setTimeout(typeWriter, speed);
  } else {
    charIdx--;
    targetEl.textContent = currentWord.substring(0, charIdx);

    if (charIdx === 0) {
      // Selesai menghapus, jeda sejenak lalu lanjut ke teks berikutnya
      isDeleting = false;
      wordIdx = (wordIdx + 1) % TYPING_WORDS.length;
      typeTimeout = setTimeout(typeWriter, 500);
      return;
    }
    // Kecepatan menghapus lebih cepat (~30ms per huruf)
    typeTimeout = setTimeout(typeWriter, 30);
  }
}

function initTypewriter() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targetEl = document.getElementById('heroTyping');
    if (targetEl) targetEl.textContent = TYPING_WORDS[0];
    return;
  }
  if (typeTimeout) clearTimeout(typeTimeout);
  wordIdx = 0;
  charIdx = 0;
  isDeleting = false;
  const targetEl = document.getElementById('heroTyping');
  if (targetEl) targetEl.textContent = '';
  typeTimeout = setTimeout(typeWriter, 400);
}

// Inisialisasi awal
renderProjects();
initProjectToggle();
initProjectFilters();
initCopyEmail();
renderProjectTechStack();
initLanguage();
initTypewriter();

// ===== Auto-scroll halus KHUSUS klik navbar / anchor / toggle (scroll mouse tetap normal) =====
let smoothRaf = null;

function smoothScrollTo(targetY, customDur, onComplete) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY);
    if (onComplete) onComplete();
    return;
  }
  if (smoothRaf) cancelAnimationFrame(smoothRaf);
  const startY = window.scrollY;
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) {
    if (onComplete) onComplete();
    return;
  }

  // Durasi responsif berbasis akar jarak agar kecepatan scroll stabil dan tidak terburu-buru
  const dur = customDur || Math.min(1300, Math.max(650, Math.sqrt(Math.abs(dist)) * 22));
  const t0 = performance.now();

  // Kurva ease-in-out cubic yang sangat halus & empuk saat mendarat
  const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = now => {
    const elapsed = now - t0;
    const p = Math.min(elapsed / dur, 1);
    window.scrollTo(0, startY + dist * easeInOutCubic(p));

    if (p < 1) {
      smoothRaf = requestAnimationFrame(step);
    } else {
      smoothRaf = null;
      if (onComplete) onComplete();
    }
  };
  smoothRaf = requestAnimationFrame(step);
}
window.addEventListener('wheel', () => { if (smoothRaf) cancelAnimationFrame(smoothRaf); }, { passive: true });
window.addEventListener('touchmove', () => { if (smoothRaf) cancelAnimationFrame(smoothRaf); }, { passive: true });

// delegasi klik agar berlaku untuk link statis maupun hasil render JS
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (hash && hash.length > 1) {
    const el = document.querySelector(hash);
    if (el) {
      e.preventDefault();
      if (open) setMenu(false);
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      setTimeout(() => smoothScrollTo(y), 0);
    }
  }
});

// ===== Transisi Gambar Project yang Halus & Smooth (Fluid Height Morphing & Zero-Lag Dissolve Crossfade) =====
async function smoothSwitchProjectImage(card, newSrc) {
  const wrap = card.querySelector('.project-img-wrap');
  if (!wrap) return;

  const currentImg = wrap.querySelector('.project-img:not(.project-img-incoming)');
  if (!currentImg) return;
  if (currentImg.getAttribute('src') === newSrc) return;

  // Cek prefers-reduced-motion
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    currentImg.setAttribute('src', newSrc);
    return;
  }

  // Preload gambar baru jika belum lengkap di cache (tanpa delay jika sudah ter-cache)
  const preloadImg = new Image();
  preloadImg.src = newSrc;
  if (!preloadImg.complete) {
    try {
      if (preloadImg.decode) await preloadImg.decode();
      else await new Promise(r => { preloadImg.onload = preloadImg.onerror = r; });
    } catch (e) {}
  }

  // Cek apakah target gambar masih relevan saat selesai decode
  if (currentImg.getAttribute('src') === newSrc) return;

  // Bersihkan elemen incoming & timer sebelumnya jika ada klik cepat
  wrap.querySelectorAll('.project-img-incoming').forEach(el => el.remove());
  if (wrap._morphTimer) {
    clearTimeout(wrap._morphTimer);
    wrap._morphTimer = null;
  }

  // 1. Ukur dimensi container & hitung target tinggi baru secara presisi
  const wrapWidth = wrap.getBoundingClientRect().width;
  const oldHeight = wrap.getBoundingClientRect().height;
  const isCover = currentImg.classList.contains('object-cover');

  let targetHeight = oldHeight;
  if (!isCover && preloadImg.naturalWidth > 0 && preloadImg.naturalHeight > 0) {
    targetHeight = Math.round(wrapWidth * (preloadImg.naturalHeight / preloadImg.naturalWidth));
  }

  // 2. Kunci tinggi awal wrapper
  wrap.style.height = `${oldHeight}px`;
  wrap.style.position = 'relative';
  wrap.style.overflow = 'hidden';

  // 3. Posisikan gambar saat ini secara absolute dengan ukuran tetap (FIXED HEIGHT)
  // Menjaga ukuran tetap mencegah browser me-rescale bitmap gambar pada setiap frame animasi
  currentImg.style.position = 'absolute';
  currentImg.style.top = '0';
  currentImg.style.left = '0';
  currentImg.style.width = '100%';
  currentImg.style.height = `${oldHeight}px`;
  currentImg.style.objectFit = isCover ? 'cover' : 'contain';
  currentImg.style.transition = 'opacity 0.36s cubic-bezier(0.16, 1, 0.3, 1)';

  // 4. Siapkan gambar incoming di lapisan atas dengan ukuran target tetap (FIXED HEIGHT)
  const incomingImg = currentImg.cloneNode(true);
  incomingImg.classList.add('project-img-incoming');
  incomingImg.setAttribute('src', newSrc);
  incomingImg.style.position = 'absolute';
  incomingImg.style.top = '0';
  incomingImg.style.left = '0';
  incomingImg.style.width = '100%';
  incomingImg.style.height = `${targetHeight}px`;
  incomingImg.style.objectFit = isCover ? 'cover' : 'contain';
  incomingImg.style.opacity = '0';
  incomingImg.style.transition = 'opacity 0.36s cubic-bezier(0.16, 1, 0.3, 1)';
  incomingImg.style.pointerEvents = 'none';

  wrap.appendChild(incomingImg);

  // Paksa reflow browser tepat sebelum memulai animasi
  void wrap.offsetHeight;

  // 5. Animasikan perubahan tinggi wrapper dan dissolve crossfade secara bersamaan
  wrap.style.transition = 'height 0.36s cubic-bezier(0.16, 1, 0.3, 1)';
  wrap.style.height = `${targetHeight}px`;

  incomingImg.style.opacity = '1';
  currentImg.style.opacity = '0';

  // 6. Saat transisi selesai, kembalikan gambar dan wrapper ke alur normal tanpa jump
  wrap._morphTimer = setTimeout(() => {
    if (incomingImg.parentElement === wrap) {
      currentImg.remove();
      incomingImg.classList.remove('project-img-incoming');
      incomingImg.style.position = '';
      incomingImg.style.top = '';
      incomingImg.style.left = '';
      incomingImg.style.width = '';
      incomingImg.style.height = '';
      incomingImg.style.objectFit = '';
      incomingImg.style.opacity = '';
      incomingImg.style.transition = '';
      incomingImg.style.pointerEvents = '';
      // Nonaktifkan transition terlebih dahulu agar tidak terjadi interpolasi ke 'auto'
      wrap.style.transition = 'none';
      wrap.style.height = '';
      void wrap.offsetHeight;
      wrap.style.transition = '';
      wrap._morphTimer = null;
    }
  }, 380);
}

// ===== Delegasi Klik Thumbnail Foto Project =====
document.addEventListener('click', e => {
  const thumbBtn = e.target.closest('.project-thumb-btn');
  if (!thumbBtn) return;
  const card = thumbBtn.closest('.project-card');
  if (!card) return;

  const newSrc = thumbBtn.getAttribute('data-img');
  const title = thumbBtn.getAttribute('data-title');
  const idx = parseInt(thumbBtn.getAttribute('data-idx') || '0', 10);

  if (title) {
    projectActiveThumbMap.set(title, idx);
  }

  if (newSrc) {
    smoothSwitchProjectImage(card, newSrc);
  }

  card.querySelectorAll('.project-thumb-btn').forEach(btn => {
    const isActive = (btn === thumbBtn);
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
});

// ===== Kembali ke atas (Smooth Scroll) =====
toTopBtn.addEventListener('click', () => {
  smoothScrollTo(0, 800);
});

// ===== Tech stack marquee: gandakan isi agar loop mulus =====
const stackTrack = document.querySelector('.stack-track');
if (stackTrack) {
  stackTrack.innerHTML += stackTrack.innerHTML;
  const half = stackTrack.children.length / 2;
  for (let i = half; i < stackTrack.children.length; i++) stackTrack.children[i].setAttribute('aria-hidden', 'true');
  stackTrack.classList.add('animate');
}
