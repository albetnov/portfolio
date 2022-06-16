const checkForStorage = () => {
  if (typeof Storage === "undefined") {
    alert(
      "localStorage not available. Saving language setting is not possible"
    );
    alert(
      "localStorage tidak tersedia. Menyimpan konfigurasi bahasa tidak bisa dilakukan"
    );
    return false;
  }
  return true;
};

const LANG_KEY = "AlbetPortfolioLangKey";
const RENDER_PAGE = "RenderPage";

document.addEventListener(RENDER_PAGE, () => {
  console.log("Rendering Page...");
  applyLang();
});

const getLang = (forceOverride = null) => {
  if (!checkForStorage()) {
    if (!forceOverride) {
      return forceOverride;
    }
    return "en";
  } else {
    if (localStorage.getItem(LANG_KEY) === null) {
      localStorage.setItem(LANG_KEY, "en");
    }
    return localStorage.getItem(LANG_KEY);
  }
};

const setLang = (lang = null) => {
  if (!checkForStorage()) {
    getLang(lang);
  }
  if (!lang && (lang == "id" || lang == "en")) {
    localStorage.setItem(LANG_KEY, lang);
    document.dispatchEvent(new Event(RENDER_PAGE));
  }
  if (getLang() == "en") {
    localStorage.setItem(LANG_KEY, "id");
    document.dispatchEvent(new Event(RENDER_PAGE));
  } else {
    localStorage.setItem(LANG_KEY, "en");
    document.dispatchEvent(new Event(RENDER_PAGE));
  }
};

const setNavbars = (navbar) => {
  const content = {
    en: ["Home", "About", "Resume", "Projects", "Contact", "en"],
    id: [
      "Halaman Utama",
      "Tentang Saya",
      "Resume",
      "Projek",
      "Hubungi Saya",
      "id",
    ],
  };

  for (let i = 0; i < navbar.length; i++) {
    if (content[getLang()][i] === "en") {
      navbar[i].innerHTML = `<img
          width="25"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACpUlEQVRYhe2U3WoTQRTHfzM7u8lmk9gUbaTWVhK1pSBaRayiqO/QO+99Db3zEfoQ3vgGftFi/cAqgkaNprYR7VfibrLN7iY7XkRvvFBIlCDkB8PAcM75n5lzzsCQIQNGLCyWbvYT4PbKrSNYVqVXfwXcSJqSVhSTUJKg3d1jrenEGtPonv20+dW2X5QUcOpwihcbPtN5m2o9ZMQ2iDqasKMZSRlUayHH8zar603mJh0elT3OTDkslz0Igu7qNYFYw9NKk/lCmpdVn+KBJJtehG1K0kmDL99CZg7avNzwmS9kWHrvcnk6y72SC0B09WrNrNfdnhMwpGB8xGR1vcnRMZu1nYCD+0yCtma32WY8Z/H6i8/sIZtnlQZnj6RZfu8yX8jw6INHdO1azkylcj0n0Ik1lpJoIGlKkqZEAFKAqQRKCJSUpCyDII6xLUkUQ9IUAPi+j+/7veqjANZ2As4V0ryq7lHYn2CrEZFQkkzCYKMWcmwsybNKg4vFLA/feVyZznLvTffV7aWlGvl8fyWYHbd58rFJcSxBeavF/rRJ0I75ttdh1FG8+tztjeWyx4lDKe6XXE5NOjz/1MS5cyeHZfVXgvXdEEMKqrUQrQWbXogQAgFUayECwUYtxBCCT7sBpiFZ2/nR+f1OAYDX6nB60qH0tcXhUYu638Y0BKYhqPsdJnIWpa97nJ5yWPnY4HwxzdI7D/hLU3ChmOFxpcHJCYfyVot81iSIYvaimIlRi/Jmi7lJh5UPDS4dy/DgrcuVmSx337h9T4FYWCxpQwpirX9vCGgNUgo6scb4sS8ujPaqDYA6Xyvd7yeA9XlqxvD9Vq/+Ql+//vur/2MUnjdIfRRzc2uDTEBo/Yfu+8eo7e3tQeqjbNcdcAmGU6BUXx/RkCH/Pd8Bi78rY3z6G84AAAAASUVORK5CYII="
        />`;
      navbar[i].setAttribute("title", "Ganti ke Bahasa Indonesia");
    } else if (content[getLang()][i] === "id") {
      navbar[i].innerHTML = `<img
        width="25"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAZklEQVRoge3WsQmAQBBE0TsbEMF2rN52BLECDURzuWA8eC/acH82pQBAx+pznEs5k498Vdf79yH9SCsBaQLSBKQJSBOQJiCt+4B3Tm/70dWcnqfRnP4FAWkC0gSkCUgTkCYAAGhwAfKcBzv0ZMG+AAAAAElFTkSuQmCC"
      />`;
      navbar[i].setAttribute("title", "Switch to English");
    } else {
      navbar[i].innerHTML = `<span>${content[getLang()][i]}</span>`;
    }
  }

  navbar[navbar.length - 1].addEventListener("click", setLang);
};

const setHero = () => {
  const content = {
    en: ["Hey I am", "I'm a"],
    id: ["Halo! Saya", "Saya adalah"],
  };

  document.querySelector(".subheading").innerText = content[getLang()][0];
  document.querySelector("#selfInfoText").innerText = content[getLang()][1];
};

const setAbout = () => {
  const about = document.querySelector("#about-content");
  const content = {
    en: {
      aboutHeading: [
        "About",
        "About Me",
        "Hi! I am Albet Novendo. I like to develop apps such as Web Apps. I started to learn Web Development when i still at High School. Since then, i gradually improve my skill until now and still improving.",
      ],
      myBio: [
        "<span>Name:</span> <span>Albet Novendo</span>",
        "<span>Date of birth:</span> <span>November 23, 2004</span>",
        "<span>Address:</span> <span>Batam, Indonesia</span>",
        "<span>Email:</span> <span>albetnovendo99@gmail.com</span>",
        "<span>Phone: </span> <span>+62 822 8344 8874</span>",
      ],
      aboutProjects: [
        "Over",
        "0",
        'Project complete. You can see the details in My <a href="https://github.com/albetnov">Github</a>',
      ],
      aboutButton: "Download CV",
    },
    id: {
      aboutHeading: [
        "Tentang",
        "Tentang Saya",
        "Hi! Saya Albet Novendo. Saya suka membuat Aplikasi Web. Saya mulai mempelejari Pengembangan Web semenjak saya di Sekolah Kejuruan. Semenjak itu, saya terus belajar dan mengembangkan kemampuan saya secara bertahap sampai sekarang dan juga untuk kedepannya.",
      ],
      myBio: [
        "<span>Nama:</span> <span>Albet Novendo</span>",
        "<span>Tanggal Lahir:</span> <span>November 23, 2004</span>",
        "<span>Alamat:</span> <span>Batam, Indonesia</span>",
        "<span>Email:</span> <span>albetnovendo99@gmail.com</span>",
        "<span>Nomor HP: </span> <span>+62 822 8344 8874</span>",
      ],
      aboutProjects: [
        "Sudah sebanyak",
        "0",
        'Projek yang saya selesaikan Anda bisa melihat lebih banyak di <a href="https://github.com/albetnov">Github</a> saya',
      ],
      aboutButton: "Unduh CV Saya",
    },
  };

  for (let i = 0; i < about.children.length - 1; i++) {
    about.children[i].innerText = content[getLang()].aboutHeading[i];
  }

  const lastElement = about.children[about.children.length - 1];

  for (let i = 0; i < lastElement.children.length; i++) {
    lastElement.children[i].innerHTML = content[getLang()].myBio[i];
  }

  const aboutDetails = document.querySelector("#about-details");
  const aboutProjects = aboutDetails.children[0];

  for (let i = 0; i < aboutProjects.children.length; i++) {
    aboutProjects.children[i].innerHTML = content[getLang()].aboutProjects[i];
  }

  aboutDetails.children[1].children[0].innerText =
    content[getLang()].aboutButton;
};

const setResumeNavigation = () => {
  const navigation = document.querySelector("#navi");
  const getUl = navigation.children[0];

  const content = {
    en: ["Education", "Experience", "Skills"],
    id: ["Pendidikan", "Pengalaman", "Kemampuan"],
  };

  for (let i = 0; i < getUl.children.length; i++) {
    getUl.children[i].children[0].innerHTML = content[getLang()][i];
  }
};

const setEducation = () => {
  const getEducation = document.querySelector("#page-1");
  const h2Lists = getEducation.getElementsByTagName("h2");

  const content = {
    en: [
      "Education",
      "Computer Engineering | High School",
      "Junior High School",
      "Elementary School",
    ],
    id: [
      "Pendidikan",
      "Rekayasa Perangkat Lunak | Sekolah Kejuruan",
      "Sekolah Menegah Pertama",
      "Sekolah Dasar",
    ],
  };

  for (let i = 0; i < h2Lists.length; i++) {
    h2Lists[i].innerText = content[getLang()][i];
  }
};

const setExperience = () => {
  const getExperience = document.querySelector("#page-2");
  const h2Lists = getExperience.getElementsByTagName("h2");

  const content = {
    en: [
      "Experience",
      "Intern",
      "I worked as Web Developer Intern in PT Pundi Mas Berjaya for 6 Months.",
    ],
    id: [
      "Pengalaman",
      "Magang",
      "Saya magang sebagai Web Developer di PT Pundi Mas Berjaya selama 6 Bulan.",
    ],
  };

  for (let i = 0; i < h2Lists.length; i++) {
    h2Lists[i].innerText = content[getLang()][i];
  }

  const paragraph = getExperience.getElementsByTagName("p");
  paragraph.innerText = content[getLang()][2];
};

const setSkills = () => {
  const getSkills = document.querySelector("#page-3");
  const spanLists = getSkills.getElementsByTagName("span");

  const content = {
    en: ["Years Experience", "Year Experiece", "Months Experience"],
    id: ["Tahun Pengalaman", "Tahun Pengalaman", "Bulan Pengalaman"],
  };

  const years = ["3", "3", "2", "2", "2", "1", "3+"];

  for (let i = 0; i < spanLists.length; i++) {
    let addon = content[getLang()][0];
    if (years[i] === "1") {
      addon = content[getLang()][1];
    } else if (years[i] === "3+") {
      addon = content[getLang()][2];
    }
    spanLists[i].innerText = years[i] + " " + addon;
  }
};

const setProjects = () => {
  const getProjects = document.querySelector("#projects-section");
  const linkLists = getProjects.getElementsByTagName("a");
  const spanLists = getProjects.getElementsByTagName("span");

  const content = {
    projects: {
      en: [
        "Alumni Tracking/Information System",
        "Restaurant Cashier Management System",
        "Landing Page Builder",
        "Phone Number Sharing Platform",
        "Simple Laundry Management",
      ],
      id: [
        "Sistem Informasi Alumni",
        "Sistem Manajemen Kasir Restaurant",
        "Pembuat Halaman Utama",
        "Platform Berbagi Nomor Telepon",
        "Manajemen Laundri Sederhana",
      ],
    },
    links: {
      title: ["Alumnifo", "StarBug", "WebProfile", "Telefon", "Laundeni"],
      link: [
        "https://github.com/albetnov/alumnifo",
        "https://github.com/albetnov/starbug",
        "https://github.com/albetnov/webprofile",
        "https://github.com/albetnov/telefon",
        "https://github.com/albetnov/laundeni",
      ],
    },
    visitMore: {
      en: `And Many More at my
      <a href="https://github.com/albetnov">Github </a>Page`,
      id: `Dan banyak lagi di
      <a href="https://github.com/albetnov">Github </a>Saya.`,
    },
    heading: {
      en: [
        "Projects",
        "Our Projects",
        "Some Projects Highlight i has done before",
      ],
      id: [
        "Projek",
        "Projek Kami",
        "Beberapa projek yang sudah saya kerjakan sebelumnya.",
      ],
    },
  };

  getProjects.getElementsByTagName("h1")[0].innerText =
    content.heading[getLang()][0];
  const h2 = getProjects.getElementsByTagName("h2");
  h2[0].innerText = content.heading[getLang()][1];
  h2[0].nextElementSibling.innerText = content.heading[getLang()][2];

  for (let i = 0; i < spanLists.length; i++) {
    spanLists[i].innerText = content.projects[getLang()][i];
    linkLists[i].innerText = content.links.title[i];
    linkLists[i].href = content.links.link[i];
  }

  const visitMore = getProjects.querySelector("p.text-center");
  visitMore.innerHTML = content.visitMore[getLang()];
};

const applyLang = () => {
  const lang = getLang();
  document.body.setAttribute("lang", lang);

  const getNavbars = document.querySelectorAll(".nav-link");

  setNavbars(getNavbars);
  setHero();
  setAbout();
  setResumeNavigation();
  setEducation();
  setExperience();
  setSkills();
  setProjects();
};

document.addEventListener("DOMContentLoaded", () =>
  document.dispatchEvent(new Event(RENDER_PAGE))
);
