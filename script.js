// =======================
// متغير للصورة
// =======================
let imageData = "";

// =======================
// قراءة الصورة
// =======================
document.getElementById("image").addEventListener("change", function (e) {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageData = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// =======================
// توليد CV
// =======================
function generateCV() {
  const name = getVal("name", "Your Name");
  const job = getVal("job", "Your Job Title");
  const email = getVal("email", "example@email.com");
  const phone = getVal("phone", "+123456789");
  const summary = getVal("summary", "");
  const skills = getVal("skills", "");
  const experience = getVal("experience", "");
  const education = getVal("education", "");
  const color = document.getElementById("color").value;
  const template = document.getElementById("template").value;

  let cvHTML = "";

  // =======================
  // 💎 Modern Template
  // =======================
  if (template === "modern") {
    cvHTML = `
    <div class="cv modern" style="--main-color:${color}">

      <div class="left">
        <img src="${imageData || "https://i.imgur.com/6VBx3io.png"}" alt="profile">

        <h2>${name}</h2>
        <p>${job}</p>

        <div class="section">
          <h3>Contact</h3>
          <p>${email}</p>
          <p>${phone}</p>
        </div>

        ${
          skills
            ? `<div class="section">
                <h3>Skills</h3>
                <p>${skills}</p>
              </div>`
            : ""
        }
      </div>

      <div class="right">
        ${sections(summary, experience, education)}
      </div>

    </div>
    `;
  }

  // =======================
  // 🧾 Classic Template
  // =======================
  else if (template === "classic") {
    cvHTML = `
    <div class="cv classic" style="--main-color:${color}">

      <h1>${name}</h1>
      <h2>${job}</h2>

      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>

      ${sections(summary, experience, education)}

      ${
        skills
          ? `<div class="section">
              <h3>Skills</h3>
              <p>${skills}</p>
            </div>`
          : ""
      }

    </div>
    `;
  }

  // =======================
  // ✨ Minimal Template
  // =======================
  else if (template === "minimal") {
    cvHTML = `
    <div class="cv minimal" style="--main-color:${color}">

      <h1>${name}</h1>
      <h2>${job}</h2>
      <p>${email} | ${phone}</p>

      ${sections(summary, experience, education)}

      ${
        skills
          ? `<div class="section">
              <h3>Skills</h3>
              <p>${skills}</p>
            </div>`
          : ""
      }

    </div>
    `;
  }

  // =======================
  // عرض النتيجة
  // =======================
  document.getElementById("cv").innerHTML = cvHTML;
}

// =======================
// الأقسام
// =======================
function sections(summary, exp, edu) {
  return `
    ${
      summary
        ? `<div class="section"><h3>Profile</h3><p>${summary}</p></div>`
        : ""
    }

    ${
      exp
        ? `<div class="section"><h3>Experience</h3><p>${exp}</p></div>`
        : ""
    }

    ${
      edu
        ? `<div class="section"><h3>Education</h3><p>${edu}</p></div>`
        : ""
    }
  `;
}

// =======================
// جلب القيم
// =======================
function getVal(id, def) {
  const el = document.getElementById(id);
  return el && el.value.trim() !== "" ? el.value : def;
}

// =======================
// AI Summary
// =======================
function generateAI() {
  let job = getVal("job", "professional");

  document.getElementById("summary").value =
    `Motivated ${job} with strong skills and a passion for growth. 
Experienced in delivering high-quality work and achieving results.`;
}

// =======================
// تحميل صورة
// =======================
function downloadImage() {
  html2canvas(document.getElementById("cv"), { scale: 2 }).then((canvas) => {
    let a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "cv.png";
    a.click();
  });
}

// =======================
// تحميل PDF
// =======================
async function downloadPDF() {
  const { jsPDF } = window.jspdf;

  const element = document.getElementById("cv");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY
  });

  const img = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "pt", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);

  const newWidth = canvas.width * ratio;
  const newHeight = canvas.height * ratio;

  pdf.addImage(img, "PNG", 0, 0, newWidth, newHeight);
  pdf.save("cv.pdf");
}