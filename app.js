const STORAGE_KEY_DATA = "jobpilot_dataset_v1";
const STORAGE_KEY_STATUS = "jobpilot_statuses_v1";

const DEMO_DATA = {
  generatedAt: "2026-11-15",
  candidate: {
    name: "Franco Pietrafesa",
    email: "francopietra01@gmail.com",
    phone: "+011 3669 2718",
    location: "Buenos Aires, Argentina",
    linkedin: "https://www.linkedin.com/in/franco-pietrafesa/"
  },
  jobs: [
    {
      id: "demo-qa-1",
      role: "QA",
      title: "Senior QA Engineer (API & GraphQL) — Remoto LATAM",
      company: "Fintech LATAM (Ejemplo)",
      author: "Recruiter Tech",
      postedAt: "Hace 2 horas · Baja interacción (3 comentarios)",
      location: "Remoto LATAM / Argentina",
      url: "https://www.linkedin.com/jobs/",
      contactEmail: "",
      outreachMessage:
        "Hola! Vi tu publicación buscando QA Engineer para LATAM y me interesa muchísimo. Tengo más de 4 años de experiencia en testing manual, end-to-end y validación de APIs REST y GraphQL (Postman, Playwright, Cypress, Jira), trabajando en entornos ágiles con equipos de producto. Te dejo mi CV adaptado al puesto. ¡Saludos! Franco Pietrafesa",
      cv: {
        headline: "Senior Manual QA Engineer | REST & GraphQL API Testing",
        summary:
          "QA Engineer con más de 4 años de experiencia en testing manual y funcional de aplicaciones SaaS y web, especializado en validación de APIs REST y GraphQL, diseño de casos de prueba y gestión del ciclo de vida de defectos en entornos Agile/Scrum.",
        highlights: [
          "Telefónica (Mar 2023 – Actualidad) · QA / Cloud Engineer / BA: Pruebas funcionales, regresión, smoke y exploratorias sobre productos SaaS; validación de APIs REST y GraphQL en Postman.",
          "TestRigor (Ene 2024 – Oct 2025) · QA Analyst: Actividades QA manuales y automatizadas, validación de queries/mutations GraphQL y seguimiento de defectos en Jira.",
          "Rappi, S.A. (Mar 2022 – Dic 2022) · QA Analyst: Testing funcional y regresión en Scrum, validación de datos con SQL."
        ],
        stack: "Playwright, Cypress, Selenium, TestRigor, Postman, GraphQL, REST API, Jira, Xray, SQL, GitLab CI"
      }
    },
    {
      id: "demo-support-1",
      role: "Tech Support Specialist",
      title: "Technical Support Specialist L2/L3 — SaaS & APIs",
      company: "CloudOps SaaS (Ejemplo)",
      author: "Hiring Manager",
      postedAt: "Hace 4 horas · Baja interacción (1 comentario)",
      location: "Argentina / Remoto",
      url: "https://www.linkedin.com/jobs/",
      contactEmail: "talent@example.com",
      outreachMessage:
        "Hola! Vi tu post buscando Technical Support Specialist y creo que mi perfil encaja muy bien. Actualmente en Telefónica configuro y mantengo servidores y bases de datos, analizo anomalías productivas, redacto reportes de incidentes y valido APIs REST/GraphQL con Postman, Splunk, Grafana y Kibana. Adjunto mi CV adaptado. ¡Muchas gracias!",
      cv: {
        headline: "Technical Support Specialist | SaaS, APIs & Cloud Infrastructure",
        summary:
          "Especialista con sólida experiencia en soporte técnico avanzado, análisis de incidentes en producción, validación de APIs REST/GraphQL, mantenimiento de servidores y bases de datos, y monitoreo con Splunk, Grafana y Kibana.",
        highlights: [
          "Telefónica (Mar 2023 – Actualidad) · Cloud Engineer / QA: Configuración y mantenimiento de servidores y conexiones de bases de datos; análisis de anomalías y elaboración de reportes de incidentes.",
          "Rappi, S.A. (May 2022 – Ago 2022) · Software Engineer Backend: Automatización de tareas, mantenimiento de librerías de servidor y soporte de debugging en JavaScript.",
          "TestRigor (Ene 2024 – Oct 2025) · QA Analyst: Reproducción documentada de fallos complejos y colaboración directa con equipos de desarrollo."
        ],
        stack: "Splunk, Grafana, Kibana, Postman, REST/GraphQL, MySQL, PostgreSQL, MongoDB, Redis, Bash, AWS, Azure, GCP"
      }
    },
    {
      id: "demo-devops-1",
      role: "DevOps",
      title: "Junior/SSR Cloud & DevOps Engineer — LATAM",
      company: "InfraScale (Ejemplo)",
      author: "Tech Lead",
      postedAt: "Hace 1 hora · Baja interacción (2 comentarios)",
      location: "Remoto LATAM",
      url: "https://www.linkedin.com/jobs/",
      contactEmail: "",
      outreachMessage:
        "Hola! Vi tu publicación sobre la búsqueda de Cloud / DevOps Engineer en LATAM. Cuento con experiencia práctica en despliegue y mantenimiento de servidores y bases de datos en Telefónica, pipelines CI/CD con GitLab CI y Jenkins, Docker y plataformas AWS, Azure y GCP. Te comparto mi CV adaptado al rol. ¡Saludos!",
      cv: {
        headline: "Cloud & DevOps Engineer | CI/CD, Docker & Multi-Cloud",
        summary:
          "Ingeniero con experiencia en operación de infraestructura cloud, despliegue y mantenimiento de servidores y bases de datos, automatización de tareas y aseguramiento de calidad en pipelines de entrega continua.",
        highlights: [
          "Telefónica (Mar 2023 – Actualidad) · Cloud Engineer / QA: Despliegue y mantenimiento de servidores y bases de datos para garantizar disponibilidad; soporte de release readiness.",
          "Rappi, S.A. (May 2022 – Ago 2022) · Software Engineer Backend: Automatización de tareas de desarrollo y gestión de librerías de servidor.",
          "Educación: Ingeniería en Computación (UNTREF) + Diplomatura en Python (Univ. Tecnológica de Michigan)."
        ],
        stack: "AWS, Azure, GCP, Docker, GitLab CI, Jenkins, Bash, Python, Node.js, PostgreSQL, MySQL, Grafana, Splunk"
      }
    }
  ]
};

let state = {
  dataset: loadDataset(),
  statuses: loadStatuses(),
  roleFilter: "ALL",
  statusFilter: "ALL",
  search: "",
  selectedId: null
};

function loadDataset() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DATA);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore storage errors and use demo data
  }
  return DEMO_DATA;
}

function loadStatuses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATUS);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore storage errors
  }
  return {};
}

function saveStatuses() {
  localStorage.setItem(STORAGE_KEY_STATUS, JSON.stringify(state.statuses));
}

function getJobStatus(job) {
  return state.statuses[job.id] || "pending";
}

function setJobStatus(jobId, status) {
  state.statuses[jobId] = status;
  saveStatuses();
  render();
  showToast(`Estado actualizado a: ${statusLabel(status)}`);
}

function statusLabel(status) {
  if (status === "sent") return "Enviada";
  if (status === "discarded") return "Descartada";
  return "Pendiente";
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFilteredJobs() {
  const q = state.search.trim().toLowerCase();
  return (state.dataset.jobs || []).filter((job) => {
    const status = getJobStatus(job);
    if (state.roleFilter !== "ALL" && job.role !== state.roleFilter) return false;
    if (state.statusFilter !== "ALL" && status !== state.statusFilter) return false;
    if (q) {
      const haystack = `${job.title} ${job.company} ${job.role} ${job.cv?.stack || ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function renderStats() {
  const jobs = state.dataset.jobs || [];
  const pending = jobs.filter((j) => getJobStatus(j) === "pending").length;
  const sent = jobs.filter((j) => getJobStatus(j) === "sent").length;

  document.getElementById("statTotal").textContent = jobs.length;
  document.getElementById("statPending").textContent = pending;
  document.getElementById("statSent").textContent = sent;
  document.getElementById("statDate").textContent = state.dataset.generatedAt || "—";
}

function renderJobList(filtered) {
  const listEl = document.getElementById("jobList");
  if (!filtered.length) {
    listEl.innerHTML = `<div class="job-card"><p class="job-meta">No hay ofertas que coincidan con los filtros.</p></div>`;
    return;
  }

  listEl.innerHTML = filtered
    .map((job) => {
      const status = getJobStatus(job);
      const selectedClass = job.id === state.selectedId ? "selected" : "";
      return `
        <article class="job-card ${selectedClass}" data-id="${escapeHtml(job.id)}">
          <div class="job-card-top">
            <span class="badge">${escapeHtml(job.role)}</span>
            <span class="badge status-${status}">${statusLabel(status)}</span>
          </div>
          <h3 class="job-title">${escapeHtml(job.title)}</h3>
          <p class="job-meta">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</p>
          <p class="job-meta">${escapeHtml(job.postedAt)}</p>
        </article>
      `;
    })
    .join("");

  listEl.querySelectorAll(".job-card[data-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedId = card.dataset.id;
      render();
    });
  });
}

function buildCvHtml(job) {
  const c = state.dataset.candidate || DEMO_DATA.candidate;
  const cv = job.cv || {};
  const highlights = (cv.highlights || [])
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return `
    <div class="cv-preview">
      <h1>${escapeHtml(c.name)}</h1>
      <div class="cv-role">${escapeHtml(cv.headline || job.role)}</div>
      <div class="cv-contact">
        ${escapeHtml(c.phone)} · ${escapeHtml(c.email)} · ${escapeHtml(c.location)} · ${escapeHtml(c.linkedin)}
      </div>

      <h4>Resumen Profesional</h4>
      <p>${escapeHtml(cv.summary || "")}</p>

      <h4>Experiencia Relevante para el Puesto</h4>
      <ul>${highlights}</ul>

      <h4>Stack Técnico Destacado</h4>
      <p>${escapeHtml(cv.stack || "")}</p>

      <h4>Educación e Idiomas</h4>
      <ul>
        <li>Ingeniería en Computación — Universidad Nacional Tres de Febrero (2020 – Presente)</li>
        <li>Diplomatura en Python — Universidad Tecnológica de Michigan | SQL in Data Science — Univ. de California</li>
        <li>Español (Nativo) · Inglés (Avanzado C1) · Portugués (Básico)</li>
      </ul>
    </div>
  `;
}

function buildCvPlainText(job) {
  const c = state.dataset.candidate || DEMO_DATA.candidate;
  const cv = job.cv || {};
  const highlights = (cv.highlights || []).map((item) => `• ${item}`).join("\n");

  return [
    "----------------------------------------",
    `CV ADAPTADO — ${c.name}`,
    cv.headline || job.role,
    `${c.phone} | ${c.email} | ${c.location}`,
    `LinkedIn: ${c.linkedin}`,
    "",
    "RESUMEN PROFESIONAL",
    cv.summary || "",
    "",
    "EXPERIENCIA RELEVANTE",
    highlights,
    "",
    "STACK TÉCNICO DESTACADO",
    cv.stack || "",
    "",
    "EDUCACIÓN E IDIOMAS",
    "• Ingeniería en Computación — UNTREF (2020 – Presente)",
    "• Diplomatura en Python (Univ. Tecnológica de Michigan) | SQL in Data Science (Univ. de California)",
    "• Español (Nativo) | Inglés (Avanzado C1) | Portugués (Básico)",
    "----------------------------------------"
  ].join("\n");
}

function generateCvPdf(job) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    return null;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const c = state.dataset.candidate || DEMO_DATA.candidate;
  const cv = job.cv || {};

  const margin = 16;
  const maxWidth = 178;
  let y = 18;

  const addWrapped = (text, fontSize, style = "normal", color = [30, 41, 59], gap = 4) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(String(text || ""), maxWidth);
    if (y + lines.length * (fontSize * 0.42) > 280) {
      doc.addPage();
      y = 18;
    }
    doc.text(lines, margin, y);
    y += lines.length * (fontSize * 0.42) + gap;
  };

  addWrapped(c.name, 18, "bold", [15, 23, 42], 2);
  addWrapped((cv.headline || job.role).toUpperCase(), 9.5, "bold", [71, 85, 105], 2);
  addWrapped(`${c.phone}  ·  ${c.email}  ·  ${c.location}`, 9, "normal", [71, 85, 105], 1.5);
  addWrapped(c.linkedin, 9, "normal", [37, 99, 235], 6);

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y - 2, margin + maxWidth, y - 2);
  y += 3;

  addWrapped("RESUMEN PROFESIONAL", 10.5, "bold", [15, 23, 42], 2);
  addWrapped(cv.summary || "", 9.5, "normal", [30, 41, 59], 5);

  addWrapped("EXPERIENCIA RELEVANTE PARA EL PUESTO", 10.5, "bold", [15, 23, 42], 2);
  (cv.highlights || []).forEach((item) => {
    addWrapped(`• ${item}`, 9.5, "normal", [30, 41, 59], 2.5);
  });
  y += 2.5;

  addWrapped("STACK TÉCNICO DESTACADO", 10.5, "bold", [15, 23, 42], 2);
  addWrapped(cv.stack || "", 9.5, "normal", [30, 41, 59], 5);

  addWrapped("EDUCACIÓN E IDIOMAS", 10.5, "bold", [15, 23, 42], 2);
  addWrapped("• Ingeniería en Computación — Universidad Nacional Tres de Febrero (2020 – Presente)", 9.5, "normal", [30, 41, 59], 2);
  addWrapped("• Diplomatura en Python — Univ. Tecnológica de Michigan | SQL in Data Science — Univ. de California", 9.5, "normal", [30, 41, 59], 2);
  addWrapped("• Español (Nativo) · Inglés (Avanzado C1) · Portugués (Básico)", 9.5, "normal", [30, 41, 59], 2);

  const safeRole = String(job.role || "cv").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filename = `CV-Franco-Pietrafesa-${safeRole}.pdf`;
  const dataUri = doc.output("datauristring");
  const base64 = dataUri.split(",")[1];

  return { doc, base64, filename };
}

function renderDetail(filtered) {
  const panel = document.getElementById("detailPanel");
  const job =
    filtered.find((j) => j.id === state.selectedId) ||
    filtered[0] ||
    null;

  if (!job) {
    panel.innerHTML = `
      <div class="empty-state">
        <h2>Sin resultados</h2>
        <p>Probá cambiar los filtros o cargá un archivo <code>jobs.json</code> del día.</p>
      </div>
    `;
    return;
  }

  state.selectedId = job.id;
  const cvHtml = buildCvHtml(job);
  const emailBody = `${job.outreachMessage}\n\n${buildCvPlainText(job)}`;
  const mailtoHref = `mailto:${encodeURIComponent(job.contactEmail || "")}?subject=${encodeURIComponent(
    `Postulación ${job.title} - Franco Pietrafesa`
  )}&body=${encodeURIComponent(emailBody)}`;

  panel.innerHTML = `
    <div class="detail-header">
      <div>
        <h2>${escapeHtml(job.title)}</h2>
        <p class="job-meta">${escapeHtml(job.company)} · ${escapeHtml(job.location)} · ${escapeHtml(job.postedAt)}</p>
      </div>
      <span class="badge status-${getJobStatus(job)}">${statusLabel(getJobStatus(job))}</span>
    </div>

    <div class="action-bar">
      <a class="btn btn-primary" href="${escapeHtml(job.url)}" target="_blank" rel="noopener noreferrer">
        🔗 Abrir post en LinkedIn
      </a>
      <button class="btn btn-secondary" id="copyMsgBtn">📋 Copiar mensaje</button>
      <button class="btn btn-secondary" id="printCvBtn">⬇️ Descargar CV (PDF)</button>
      <button class="btn btn-success" id="markSentBtn">✅ Marcar Enviada</button>
      <button class="btn btn-ghost" id="markDiscardedBtn">✖ Descartar</button>
    </div>

    <div class="email-send-row">
      <input
        id="recipientEmailInput"
        type="email"
        placeholder="Email del reclutador (ej. rrhh@empresa.com)"
        value="${escapeHtml(job.contactEmail || "")}"
      />
      <button class="btn btn-primary" id="sendEmailPdfBtn">✉️ Enviar texto + CV (PDF)</button>
      <a class="btn btn-ghost" href="${mailtoHref}" title="Abrir en tu cliente de correo">mailto:</a>
    </div>

    <div class="section-block">
      <h3>Mensaje personalizado listo para copiar</h3>
      <div class="message-box">${escapeHtml(job.outreachMessage)}</div>
    </div>

    <div class="section-block">
      <h3>Vista previa del CV adaptado (${escapeHtml(job.role)})</h3>
      ${cvHtml}
    </div>
  `;

  document.getElementById("copyMsgBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(job.outreachMessage);
      showToast("Mensaje copiado al portapapeles");
    } catch {
      showToast("No se pudo copiar automáticamente; seleccionalo manualmente.");
    }
  });

  document.getElementById("printCvBtn").addEventListener("click", () => {
    const pdf = generateCvPdf(job);
    if (pdf) {
      pdf.doc.save(pdf.filename);
      showToast(`Descargado: ${pdf.filename}`);
    } else {
      document.getElementById("printCvContainer").innerHTML = cvHtml;
      window.print();
    }
  });

  document.getElementById("sendEmailPdfBtn").addEventListener("click", async () => {
    const to = document.getElementById("recipientEmailInput").value.trim();
    if (!to) {
      showToast("Ingresá el email del reclutador antes de enviar.");
      document.getElementById("recipientEmailInput").focus();
      return;
    }

    const pdf = generateCvPdf(job);
    if (!pdf) {
      showToast("No se pudo generar el PDF (verificá tu conexión para cargar jsPDF).");
      return;
    }

    const btn = document.getElementById("sendEmailPdfBtn");
    btn.disabled = true;
    btn.textContent = "Enviando...";

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject: `Postulación ${job.title} - Franco Pietrafesa`,
          message: job.outreachMessage,
          pdfBase64: pdf.base64,
          filename: pdf.filename
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Error HTTP ${res.status}`);
      }
      setJobStatus(job.id, "sent");
      showToast(`Email + ${pdf.filename} enviado a ${to}`);
    } catch (err) {
      pdf.doc.save(pdf.filename);
      showToast(`No se pudo enviar vía API (${err.message}). Se descargó el PDF para adjuntarlo.`);
    } finally {
      btn.disabled = false;
      btn.textContent = "✉️ Enviar texto + CV (PDF)";
    }
  });

  document.getElementById("markSentBtn").addEventListener("click", () => {
    setJobStatus(job.id, "sent");
  });

  document.getElementById("markDiscardedBtn").addEventListener("click", () => {
    setJobStatus(job.id, "discarded");
  });
}

function render() {
  renderStats();
  const filtered = getFilteredJobs();
  renderJobList(filtered);
  renderDetail(filtered);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll("#roleTabs .tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#roleTabs .tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    state.roleFilter = tab.dataset.role;
    render();
  });
});

document.getElementById("statusFilter").addEventListener("change", (e) => {
  state.statusFilter = e.target.value;
  render();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

document.getElementById("jsonFileInput").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed.jobs)) {
      throw new Error("Formato inválido: falta el arreglo 'jobs'.");
    }
    state.dataset = parsed;
    state.selectedId = parsed.jobs[0]?.id || null;
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(parsed));
    render();
    showToast(`Cargadas ${parsed.jobs.length} ofertas (${parsed.generatedAt || "hoy"})`);
  } catch (err) {
    showToast(`Error al leer JSON: ${err.message}`);
  }
});

async function loadRemoteJobsJson() {
  try {
    const res = await fetch(`./jobs.json?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return;
    const parsed = await res.json();
    if (!Array.isArray(parsed.jobs)) return;
    state.dataset = parsed;
    state.selectedId = parsed.jobs[0]?.id || null;
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(parsed));
    render();
  } catch {
    // Ignore when opened via file:// or before jobs.json exists
  }
}

render();
loadRemoteJobsJson();
