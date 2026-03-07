export type SocialPlatform = "linkedin" | "instagram" | "github";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  handle: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  startYear: number;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  year: number;
  role: "Fullstack";
  image: string;
  link?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const profile: Profile = {
  name: "Muchlis Adhi Wiratama",
  role: "Web Developer / Fullstack Developer",
  location: "Yogyakarta, Indonesia",
  startYear: 2017,
};

export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/muchlisadhi/",
    handle: "muchlisadhi",
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: "https://instagram.com/muchlis.adhi",
    handle: "@muchlis.adhi",
  },
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/MuchlisAdhi/",
    handle: "MuchlisAdhi",
  },
];

export const projects: Project[] = [
  {
    title: "Vendor Management System Plaza Indonesia",
    description:
      "Sistem untuk mengelola data vendor mulai dari registrasi hingga survei kelayakan vendor sebelum bergabung sebagai mitra pemasok PT Plaza Indonesia.",
    techStack: [
      "Backend VB .Net",
      "Frontend HTML + CSS + Bootstrap",
      "Microsoft SQL Server",
    ],
    year: 2018,
    role: "Fullstack",
    image: "/projects/vendor-plaza-indo-1.png",
  },
  {
    title: "CMS Pergikuliner",
    description:
      "Direktori dan situs ulasan terlengkap yang mencakup tempat makan enak di Jakarta, Bogor, Depok, Tangerang, Bekasi, Bandung, dan Surabaya.",
    techStack: [
      "Backend Ruby On Rails",
      "Frontend ERB Templates",
      "Database MySQL",
    ],
    year: 2019,
    role: "Fullstack",
    image: "/projects/pergikuliner-1.jpg",
  },
  {
    title: "Residential Management System",
    description:
      "Sistem Manajemen Hunian, kelola administrasi data penghuni secara lengkap mulai dari data tagihan IPL, air, listrik, hingga pembayaran invoice.",
    techStack: [
      "Backend VB .Net",
      "Frontend HTML + CSS + Bootstrap",
      "Database Microsoft SQL Server",
    ],
    year: 2021,
    role: "Fullstack",
    image:
      "/projects/residential-1.png",
    link: "https://www.residential.erp360.id/",
  },
  {
    title: "Sales Management System",
    description:
      "Sistem inventori stok unit, online booking, dan administrasi penjualan properti.",
    techStack: [
      "Backend VB .Net",
      "Frontend HTML + CSS + Bootstrap",
      "Database Microsoft SQL Server",
    ],
    year: 2022,
    role: "Fullstack",
    image:
      "/projects/salessystem-1.png",
    link: "https://www.properti.erp360.id/",
  },
  {
    title: "HRIS (Human Resource Information System)",
    description:
      "Sistem informasi manajemen karyawan PT. Tunas Mulya Poultry.",
    techStack: [
      "Backend ASP .Net MVC",
      "Frontend Razor",
      "Database PostgreSQL",
    ],
    year: 2024,
    role: "Fullstack",
    image: "/projects/hris-portal-main.png",
    link: "https://portal.sidoagunggroup.com/Authorization/Login",
  },
  {
    title: "Katalog Produk PT SidoAgung Farm",
    description:
      "Informasi katalog produk pakan dengan halaman publik dan dasbor manajemen serta dukungan offline mode untuk akses tanpa koneksi di aplikasi PWA.",
    techStack: [
      "Backend Laravel",
      "Frontend Publik Blade + Preline UI",
      "Frontend Admin Volt Bootstrap 5",
      "Database MySQL",
    ],
    year: 2026,
    role: "Fullstack",
    image: "/projects/sidoagungfarm-catalog-main.png",
    link: "https://www.product.sidoagungfarm.com/",
  },
  {
    title: "Company Profile Papandayan",
    description:
      "Perusahaan yang bergerak di bidangbudidaya ayam broiler dengan mengedepankan pola kemitraan bersama peternak untuk menghadirkan pertumbuhan berkelanjutan.",
    techStack: [
      "Backend Laravel",
      "Frontend Farmland Agriculture & Poultry Farm Template",
      "Database MySQL",
    ],
    year: 2026,
    role: "Fullstack",
    image: "/projects/papandayan-1.png",
    link: "https://papandayan.co.id/",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frameworks & Languages",
    items: [
      "VB.Net",
      "ASP.Net MVC",
      "Ruby On Rails",
      "JavaScript",
      "Node.js",
      "HTML/CSS",
      "Laravel",
    ],
  },
  {
    title: "Databases",
    items: ["MySQL", "Microsoft SQL Server", "PostgreSQL"],
  },
  {
    title: "Backend & Deployment",
    items: ["REST API", "Windows Server deployment", ".NET Framework", "CPanel"],
  },
  {
    title: "Soft Skills",
    items: ["Teamwork", "Problem solving"],
  },
];

export function getStats(currentYear = new Date().getFullYear()): StatItem[] {
  const yearsOfExperience = Math.max(currentYear - profile.startYear, 0);

  return [
    { label: "Years of work experience", value: `${yearsOfExperience}+` },
    { label: "Featured projects", value: String(projects.length) },
    { label: "Companies", value: "5" },
  ];
}
