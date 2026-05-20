import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  {
    id: "erp", name: "Gestar ERP", category: "Contabilidad",
    desc: "Sistema contable completo adaptado a la normativa panameña. ITBMS, CSS y nómina integrados desde el primer día.",
    icon: "◈", color: "#00E5A0",
    features: ["Contabilidad de doble partida", "Facturación y registro de ventas", "Nómina CSS + ISR + Décimo", "Dashboard ejecutivo con IA"],
    price: "Desde B/. 49/mes",
    url: "https://erp.gestarsoft.com",
  },
  {
    id: "lex", name: "GestarLex", category: "Gestión Legal",
    desc: "Software para firmas de abogados adaptado a la Ley 402 de 2023 y la práctica legal panameña.",
    icon: "⚖", color: "#FFB930",
    features: ["Términos procesales Ley 402", "Calendario judicial con alertas", "Control de poderes", "Facturación de honorarios"],
    price: "Desde B/. 39.99/mes",
    url: "https://lex.gestarsoft.com",
  },
  {
    id: "corp", name: "GestarCorp", category: "Gobierno Corporativo",
    desc: "Gestión societaria completa. Libros, actas, beneficiarios finales y agente residente digital.",
    icon: "⊡", color: "#7C6BFF",
    features: ["Libro de actas digital", "Beneficiarios finales Ley 52", "Agente residente incluido", "Generador de documentos"],
    price: "B/. 39/mes · B/. 350/año con agente residente",
    highlight: true,
    url: "https://corp.gestarsoft.com",
  },
  {
    id: "ph-manager", name: "PH Manager", category: "Propiedades Horizontales",
    desc: "Administra edificios y condominios. Control de morosos, cuotas y asambleas bajo la Ley 31.",
    icon: "⊞", color: "#FF6B6B",
    features: ["Control de morosos", "Cuotas automáticas", "Actas de asamblea", "Portal del propietario"],
    price: "Desde B/. 49/mes",
    url: "https://ph.gestarsoft.com",
  },
];

const TESTIMONIALS = [
  { name: "Lcda. Carmen H.", role: "Contadora, Ciudad de Panamá", text: "Cerré el mes en dos horas. Antes me tomaba dos días. La nómina con CSS integrado es lo mejor que he visto.", avatar: "CH", color: "#00E5A0" },
  { name: "Lic. Roberto D.", role: "Abogado, firma propia", text: "El calendario de términos con la Ley 402 me salvó de perder un plazo fatal. No lo cambio por nada.", avatar: "RD", color: "#FFB930" },
  { name: "Ing. Mariana S.", role: "Administradora de PH", text: "Mis morosos bajaron 60% en el primer mes. Los propietarios pagan más rápido con el estado de cuenta automático.", avatar: "MS", color: "#7C6BFF" },
];

const WA_NUMBER = "50765143637";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useIntersection(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ─── Modal base ─── */
function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0D1117", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 22, padding: "32px 28px",
          maxWidth: 540, width: "100%", maxHeight: "88vh", overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255,255,255,0.06)", border: "none",
            borderRadius: 8, width: 32, height: 32, cursor: "pointer",
            color: "rgba(255,255,255,0.5)", fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "inherit",
          }}
        >✕</button>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#EEF2FF", marginBottom: 24, paddingRight: 40, letterSpacing: "-0.02em" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* ─── Demo modal ─── */
function DemoModal({ open, onClose }) {
  const [form, setForm] = useState({ nombre: "", empresa: "", producto: "", telefono: "" });
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const lines = [
      "Hola GestarSoft, me interesa solicitar una demo.",
      "",
      `Nombre: ${form.nombre}`,
      form.empresa ? `Empresa: ${form.empresa}` : null,
      form.producto ? `Producto: ${form.producto}` : null,
      `Teléfono: ${form.telefono}`,
    ].filter(l => l !== null).join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
    onClose();
  }

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
    padding: "11px 14px", fontSize: 14, color: "#EEF2FF",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };
  const labelStyle = {
    fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.07em", textTransform: "uppercase",
    display: "block", marginBottom: 7,
  };

  return (
    <Modal open={open} onClose={onClose} title="Solicitar demo gratis">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Nombre completo *</label>
          <input required placeholder="Juan Pérez" value={form.nombre} onChange={set("nombre")} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Empresa</label>
          <input placeholder="Mi Empresa S.A." value={form.empresa} onChange={set("empresa")} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Teléfono *</label>
          <input required placeholder="+507 6000-0000" value={form.telefono} onChange={set("telefono")} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>Producto de interés</label>
          <select
            value={form.producto}
            onChange={set("producto")}
            style={{ ...inputStyle, cursor: "pointer", color: form.producto ? "#EEF2FF" : "rgba(255,255,255,0.3)" }}
          >
            <option value="">Seleccionar...</option>
            <option value="Gestar ERP (Contabilidad)">Gestar ERP — Contabilidad</option>
            <option value="GestarLex (Gestión Legal)">GestarLex — Gestión Legal</option>
            <option value="GestarCorp (Gobierno Corporativo)">GestarCorp — Gobierno Corporativo</option>
            <option value="PH Manager (Propiedades Horizontales)">PH Manager — Propiedades Horizontales</option>
            <option value="Todos los productos">Todos los productos</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            width: "100%", background: "linear-gradient(135deg, #00E5A0, #00B87A)",
            borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800,
            color: "#07090F", border: "none", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Enviar por WhatsApp →
        </button>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 12 }}>
          Te abrirá WhatsApp con el mensaje listo. Respondemos en menos de 24 horas.
        </p>
      </form>
    </Modal>
  );
}

/* ─── Terms modal ─── */
function TermsModal({ open, onClose }) {
  const p = { fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 18 };
  const h = { fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 8, marginTop: 24 };
  return (
    <Modal open={open} onClose={onClose} title="Términos de Servicio">
      <p style={{ ...p, marginTop: 0 }}>Última actualización: mayo 2026. Al usar cualquier producto de GestarSoft, aceptas los siguientes términos.</p>
      <h3 style={h}>1. Descripción del servicio</h3>
      <p style={p}>GestarSoft ofrece software de gestión empresarial en modalidad SaaS (Software como Servicio) a través de sus plataformas: Gestar ERP, GestarLex, GestarCorp y PH Manager. El acceso se otorga mediante suscripción mensual o anual.</p>
      <h3 style={h}>2. Uso aceptable</h3>
      <p style={p}>El usuario se compromete a utilizar el servicio exclusivamente para fines legales y conforme a la legislación vigente de la República de Panamá. Queda prohibido el uso del software para actividades ilícitas, fraude o cualquier acción que viole derechos de terceros.</p>
      <h3 style={h}>3. Pagos y cancelación</h3>
      <p style={p}>Las suscripciones se facturan de forma mensual o anual según el plan seleccionado. No hay contratos de permanencia. Puedes cancelar en cualquier momento desde tu cuenta; el servicio continuará activo hasta el fin del período pagado. No se realizan reembolsos por períodos parciales.</p>
      <h3 style={h}>4. Disponibilidad</h3>
      <p style={p}>GestarSoft se esfuerza por mantener una disponibilidad del 99% mensual. Nos reservamos el derecho de realizar mantenimientos programados con notificación previa. No somos responsables por interrupciones causadas por terceros (proveedores de hosting, internet, etc.).</p>
      <h3 style={h}>5. Propiedad intelectual</h3>
      <p style={p}>Todo el software, código, diseños, marcas y contenido son propiedad exclusiva de GestarSoft. El usuario recibe una licencia de uso no exclusiva y no transferible durante la vigencia de su suscripción.</p>
      <h3 style={h}>6. Limitación de responsabilidad</h3>
      <p style={p}>GestarSoft no será responsable por daños indirectos, lucro cesante ni pérdida de datos derivados del uso o imposibilidad de uso del servicio. La responsabilidad máxima no excederá el monto pagado en los últimos 3 meses.</p>
      <h3 style={h}>7. Ley aplicable</h3>
      <p style={p}>Estos términos se rigen por las leyes de la República de Panamá. Cualquier disputa se someterá a la jurisdicción de los tribunales de la Ciudad de Panamá.</p>
      <h3 style={h}>8. Contacto</h3>
      <p style={{ ...p, marginBottom: 0 }}>Para consultas sobre estos términos, escríbenos a través de WhatsApp al +507 6514-3637.</p>
    </Modal>
  );
}

/* ─── Privacy modal ─── */
function PrivacyModal({ open, onClose }) {
  const p = { fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 18 };
  const h = { fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 8, marginTop: 24 };
  return (
    <Modal open={open} onClose={onClose} title="Política de Privacidad">
      <p style={{ ...p, marginTop: 0 }}>Última actualización: mayo 2026. En GestarSoft valoramos tu privacidad y protegemos tus datos conforme a la Ley 81 de 2019 de Panamá (Ley de Protección de Datos Personales).</p>
      <h3 style={h}>1. Datos que recopilamos</h3>
      <p style={p}>Recopilamos datos que tú nos proporcionas directamente: nombre, correo electrónico, teléfono, información de empresa y datos ingresados en la plataforma (facturas, clientes, expedientes, etc.). También recopilamos datos de uso y acceso para mejorar el servicio.</p>
      <h3 style={h}>2. Cómo usamos tus datos</h3>
      <p style={p}>Usamos tu información para: prestar y mejorar el servicio, enviarte notificaciones relacionadas con tu cuenta, cumplir con obligaciones legales y brindarte soporte técnico. No vendemos ni compartimos tus datos con terceros con fines comerciales.</p>
      <h3 style={h}>3. Almacenamiento y seguridad</h3>
      <p style={p}>Tus datos se almacenan en servidores seguros con cifrado en tránsito (HTTPS/TLS) y en reposo. Aplicamos controles de acceso estrictos y revisamos nuestras medidas de seguridad periódicamente.</p>
      <h3 style={h}>4. Retención de datos</h3>
      <p style={p}>Conservamos tus datos mientras tu cuenta esté activa. Al cancelar tu suscripción, puedes solicitar la eliminación de tus datos. Algunos datos pueden conservarse por obligaciones legales o fiscales.</p>
      <h3 style={h}>5. Tus derechos</h3>
      <p style={p}>Conforme a la Ley 81, tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales. Para ejercer estos derechos, contáctanos por WhatsApp al +507 6514-3637.</p>
      <h3 style={h}>6. Cookies</h3>
      <p style={p}>Usamos cookies técnicas necesarias para el funcionamiento del servicio (sesión, autenticación). No usamos cookies de seguimiento publicitario de terceros.</p>
      <h3 style={h}>7. Cambios a esta política</h3>
      <p style={{ ...p, marginBottom: 0 }}>Podemos actualizar esta política ocasionalmente. Te notificaremos por correo o dentro de la plataforma ante cambios significativos. El uso continuo del servicio implica aceptación de la política vigente.</p>
    </Modal>
  );
}

/* ─── Product card ─── */
function ProductCard({ product, index }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const [hovered, setHovered] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${product.color}07` : product.highlight ? "rgba(124,107,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1.5px solid ${hovered ? product.color + "50" : product.highlight ? "rgba(124,107,255,0.25)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: isMobile ? 18 : 22,
        padding: isMobile ? "22px 20px" : "30px 28px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: visible ? "translateY(0)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        position: "relative", overflow: "hidden",
      }}
    >
      {hovered && !isMobile && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }} />}

      {product.highlight && (
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "linear-gradient(135deg, #7C6BFF, #5B4BE0)",
          borderRadius: 20, padding: "3px 10px",
          fontSize: 9, fontWeight: 800, color: "#fff",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>⭐ Popular</div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: isMobile ? 42 : 48, height: isMobile ? 42 : 48,
          borderRadius: 13, flexShrink: 0,
          background: `${product.color}14`, border: `1px solid ${product.color}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isMobile ? 17 : 20, color: product.color,
        }}>{product.icon}</div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: product.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{product.category}</div>
          <h3 style={{ fontSize: isMobile ? 16 : 19, fontWeight: 800, color: "#EEF2FF", letterSpacing: "-0.02em" }}>{product.name}</h3>
        </div>
      </div>

      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, marginBottom: 18 }}>{product.desc}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 22 }}>
        {product.features.map(f => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: product.color, flexShrink: 0, opacity: 0.8 }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.48)" }}>{f}</span>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 12 : 0,
        paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: product.color, fontFamily: "'DM Mono', monospace" }}>{product.price}</span>
        <a href={product.url} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 6,
          background: `${product.color}14`, border: `1px solid ${product.color}28`,
          borderRadius: 10, padding: "8px 16px",
          fontSize: 12, fontWeight: 700, color: product.color,
          alignSelf: isMobile ? "flex-end" : "auto",
          textDecoration: "none",
        }}>
          Comenzar <span style={{ fontSize: 14 }}>→</span>
        </a>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function GestarSoftHome() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w < 1024;
  const whyRef = useRef(null);
  const whyVisible = useIntersection(whyRef);
  const testimonialsRef = useRef(null);
  const testimonialsVisible = useIntersection(testimonialsRef);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (scrollY > 10) setMenuOpen(false);
  }, [scrollY]);

  function openDemo() { setMenuOpen(false); setDemoOpen(true); }

  const NAV_LINKS = [
    { label: "Productos", action: () => { setMenuOpen(false); scrollTo("productos"); } },
    { label: "Precios",   action: () => { setMenuOpen(false); scrollTo("productos"); } },
    { label: "Nosotros",  action: () => { setMenuOpen(false); scrollTo("nosotros"); } },
    { label: "Contacto",  action: () => { setMenuOpen(false); scrollTo("contacto"); } },
  ];

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#07090F",
      color: "#EEF2FF",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradientMove { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .anim-1 { animation: slideUp 0.7s cubic-bezier(0.4,0,0.2,1) 0s both; }
        .anim-2 { animation: slideUp 0.7s cubic-bezier(0.4,0,0.2,1) 0.12s both; }
        .anim-3 { animation: slideUp 0.7s cubic-bezier(0.4,0,0.2,1) 0.24s both; }
        .anim-4 { animation: slideUp 0.7s cubic-bezier(0.4,0,0.2,1) 0.36s both; }
        .btn-primary { transition: all 0.2s ease; cursor: pointer; border: none; font-family: inherit; -webkit-tap-highlight-color: transparent; }
        .btn-primary:hover { transform: translateY(-2px); filter: brightness(1.06); }
        .btn-primary:active { transform: scale(0.97); }
        .btn-ghost { transition: all 0.2s ease; cursor: pointer; font-family: inherit; -webkit-tap-highlight-color: transparent; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.22) !important; }
        .btn-ghost:active { transform: scale(0.97); }
        .nav-link { transition: color 0.15s; cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .nav-link:hover { color: #00E5A0 !important; }
        .mobile-menu { animation: fadeIn 0.2s ease forwards; }
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-wrap: wrap !important; }
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .footer-row { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .cta-buttons { flex-direction: column !important; }
          .cta-buttons button { width: 100% !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .products-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Modals */}
      <DemoModal    open={demoOpen}    onClose={() => setDemoOpen(false)} />
      <TermsModal   open={termsOpen}   onClose={() => setTermsOpen(false)} />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />

      {/* ══════════ NAVBAR ══════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 40 || menuOpen ? "rgba(7,9,15,0.97)" : "transparent",
        backdropFilter: scrollY > 40 || menuOpen ? "blur(24px)" : "none",
        borderBottom: scrollY > 40 && !menuOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          padding: isMobile ? "14px 20px" : "16px 60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="gestarsoft-logo.png"
              alt="GestarSoft"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
              style={{ height: isMobile ? 90 : 180, width: "auto", objectFit: "contain", filter: "brightness(1.15) contrast(1.05)" }}
            />
            <div style={{ display: "none", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg, #00E5A0 0%, #7C6BFF 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: "#07090F", flexShrink: 0,
              }}>G</div>
              <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.025em" }}>
                Gestar<span style={{ color: "#00E5A0" }}>Soft</span>
              </span>
            </div>
          </div>

          {/* Desktop nav links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 28 }}>
              {NAV_LINKS.map(l => (
                <span key={l.label} className="nav-link" onClick={l.action} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.42)" }}>{l.label}</span>
              ))}
            </div>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <button onClick={openDemo} className="btn-primary" style={{
              background: "linear-gradient(135deg, #00E5A0, #00B87A)",
              borderRadius: 10, padding: "9px 20px",
              fontSize: 13, fontWeight: 800, color: "#07090F",
              boxShadow: "0 4px 16px rgba(0,229,160,0.28)",
            }}>Demo gratis</button>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 9, width: 38, height: 38, cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
                padding: 0,
              }}
            >
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: menuOpen ? (i === 1 ? 0 : 18) : 18, height: 1.5,
                  background: "#EEF2FF", borderRadius: 2,
                  transition: "all 0.2s ease",
                  transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(4px, 4px)" : i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none") : "none",
                }} />
              ))}
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && menuOpen && (
          <div className="mobile-menu" style={{ padding: "16px 20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
              {NAV_LINKS.map(l => (
                <div key={l.label} className="nav-link" onClick={l.action} style={{
                  fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.6)",
                  padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>{l.label}</div>
              ))}
            </div>
            <button onClick={openDemo} className="btn-primary" style={{
              background: "linear-gradient(135deg, #00E5A0, #00B87A)",
              borderRadius: 12, padding: "13px",
              fontSize: 14, fontWeight: 800, color: "#07090F", width: "100%",
              boxShadow: "0 4px 16px rgba(0,229,160,0.3)",
            }}>Solicitar demo gratis</button>
          </div>
        )}
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: isMobile ? "100px 20px 60px" : "120px 60px 80px",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(0,229,160,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.02) 1px, transparent 1px)`,
            backgroundSize: isMobile ? "40px 40px" : "58px 58px",
          }} />
          <div style={{
            position: "absolute", top: "15%", left: isMobile ? "-10%" : "4%",
            width: isMobile ? 300 : 560, height: isMobile ? 300 : 560, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 65%)",
            filter: "blur(50px)", animation: "float 9s ease infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", right: isMobile ? "-10%" : "4%",
            width: isMobile ? 250 : 440, height: isMobile ? 250 : 440, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,107,255,0.08) 0%, transparent 65%)",
            filter: "blur(50px)", animation: "float 12s ease infinite reverse",
          }} />
        </div>

        <div style={{ maxWidth: 820, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="anim-1" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,229,160,0.07)", border: "1px solid rgba(0,229,160,0.18)",
            borderRadius: 20, padding: "6px 16px", marginBottom: isMobile ? 22 : 28,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5A0", animation: "pulse 2s ease infinite" }} />
            <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#00E5A0" }}>
              🇵🇦 Construido para Panamá
            </span>
          </div>

          <h1 className="anim-2" style={{
            fontSize: isMobile ? "clamp(32px, 8vw, 44px)" : "clamp(38px, 6vw, 72px)",
            fontWeight: 800, lineHeight: 1.08,
            letterSpacing: "-0.03em", marginBottom: isMobile ? 18 : 24, color: "#EEF2FF",
          }}>
            La plataforma de gestión<br />empresarial diseñada para<br />
            <span style={{
              background: "linear-gradient(90deg, #00E5A0 0%, #7C6BFF 55%, #FFB930 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "gradientMove 5s ease infinite",
            }}>la realidad panameña</span>
          </h1>

          <p className="anim-3" style={{
            fontSize: isMobile ? 14 : 17, color: "rgba(255,255,255,0.4)", lineHeight: 1.72,
            maxWidth: 520, margin: "0 auto", marginBottom: isMobile ? 32 : 44,
          }}>
            Software empresarial construido sobre la legislación panameña real —
            contabilidad, derecho, gobierno corporativo y administración de propiedades.
          </p>

          <div className="anim-4 cta-buttons" style={{
            display: "flex", gap: 10, justifyContent: "center",
            flexWrap: "wrap", marginBottom: isMobile ? 44 : 60,
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}>
            <button onClick={() => scrollTo("productos")} className="btn-primary" style={{
              background: "linear-gradient(135deg, #00E5A0, #00B87A)",
              borderRadius: 13, padding: isMobile ? "15px 0" : "15px 40px",
              fontSize: 15, fontWeight: 800, color: "#07090F",
              boxShadow: "0 8px 28px rgba(0,229,160,0.3)",
              width: isMobile ? "100%" : "auto",
            }}>Ver los productos →</button>
            <button onClick={openDemo} className="btn-ghost" style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 13, padding: isMobile ? "15px 0" : "15px 34px",
              fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.55)",
              width: isMobile ? "100%" : "auto",
            }}>Solicitar demo</button>
          </div>

          <div className="anim-4 stats-row" style={{
            display: "flex", justifyContent: "center",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14, overflow: "hidden",
            flexWrap: isMobile ? "wrap" : "nowrap",
            maxWidth: isMobile ? "100%" : "fit-content", margin: "0 auto",
          }}>
            {[
              { value: "4",     label: "Productos activos" },
              { value: "100%",  label: "Normativa Panamá" },
              { value: "24/7",  label: "Asistente IA" },
              { value: "B/.$0", label: "Sin contratos" },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: isMobile ? "14px 20px" : "18px 32px",
                borderRight: isMobile ? (i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none") : (i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none"),
                borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                flex: isMobile ? "0 0 50%" : "auto", textAlign: "center",
              }}>
                <div style={{ fontSize: isMobile ? 22 : 26, fontWeight: 800, color: "#00E5A0", fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em", marginBottom: 3 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "12px 0", overflow: "hidden", background: "rgba(0,229,160,0.012)",
      }}>
        <div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", animation: "marquee 18s linear infinite" }}>
          {[...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((p, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.1em", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
            }}>
              <span style={{ color: p.color + "70" }}>{p.icon}</span>
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ PRODUCTS ══════════ */}
      <section id="productos" style={{ padding: isMobile ? "64px 20px" : "96px 60px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,229,160,0.07)", border: "1px solid rgba(0,229,160,0.16)",
              borderRadius: 20, padding: "5px 14px", marginBottom: 16,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00E5A0", animation: "pulse 1.8s ease infinite" }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: "#00E5A0", letterSpacing: "0.1em", textTransform: "uppercase" }}>Disponibles ahora</span>
            </div>
            <h2 style={{
              fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(26px, 4vw, 42px)",
              fontWeight: 800, letterSpacing: "-0.025em", color: "#EEF2FF", marginBottom: 10,
            }}>Una solución para cada<br />necesidad panameña</h2>
            <p style={{ fontSize: isMobile ? 13 : 15, color: "rgba(255,255,255,0.36)", maxWidth: 440 }}>
              Cada producto construido sobre la legislación y normativa vigente de Panamá.
            </p>
          </div>
          <div className="products-grid" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr",
            gap: isMobile ? 14 : 16,
          }}>
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY ══════════ */}
      <section
        id="nosotros"
        ref={whyRef}
        style={{
          padding: isMobile ? "64px 20px" : "96px 60px",
          background: "rgba(255,255,255,0.012)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
          gap: isMobile ? 48 : 72, alignItems: "center",
        }}>
          <div style={{
            transform: whyVisible ? "translateY(0)" : "translateY(24px)",
            opacity: whyVisible ? 1 : 0,
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <div style={{
              display: "inline-block", background: "rgba(124,107,255,0.08)",
              border: "1px solid rgba(124,107,255,0.18)", borderRadius: 20,
              padding: "5px 14px", marginBottom: 20,
              fontSize: 10, fontWeight: 700, color: "#7C6BFF",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>¿Por qué GestarSoft?</div>

            <h2 style={{
              fontSize: isMobile ? "clamp(22px, 6vw, 30px)" : "clamp(24px, 3.5vw, 38px)",
              fontWeight: 800, letterSpacing: "-0.025em",
              marginBottom: 16, color: "#EEF2FF", lineHeight: 1.15,
            }}>
              Diseñado desde el inicio<br />para la realidad panameña
            </h2>

            <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: 28 }}>
              Cada módulo fue construido con la legislación, la fiscalidad y la práctica
              empresarial de Panamá como punto de partida.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "◈", text: "ITBMS, CSS y formularios DGI en cada módulo", color: "#00E5A0" },
                { icon: "✦", text: "Asistente IA financiero y legal en español", color: "#7C6BFF" },
                { icon: "⊕", text: "Sin permanencia — cancela cuando quieras", color: "#FFB930" },
                { icon: "◎", text: "Soporte directo en Panamá el mismo día", color: "#FF6B6B" },
              ].map((item, i) => (
                <div key={item.text} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "10px 12px", borderRadius: 12,
                  transform: whyVisible ? "translateY(0)" : "translateY(16px)",
                  opacity: whyVisible ? 1 : 0,
                  transition: "all 0.5s ease",
                  transitionDelay: `${0.1 + i * 0.08}s`,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    background: `${item.color}12`, border: `1px solid ${item.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, color: item.color,
                  }}>{item.icon}</div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.52)", lineHeight: 1.55, paddingTop: 7 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mock */}
          <div style={{
            position: "relative",
            transform: whyVisible ? "translateY(0)" : "translateY(24px)",
            opacity: whyVisible ? 1 : 0,
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, padding: isMobile ? 18 : 24, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #00E5A0 50%, transparent)" }} />
              <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 16 }}>
                {["#FF6B6B", "#FFB930", "#00E5A0"].map(c => (
                  <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
                ))}
                <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 4, height: 16, marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>app.gestarsoft.com</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                {[
                  { l: "Ingresos", v: "B/. 48,720", c: "#00E5A0", w: "72%" },
                  { l: "Gastos",   v: "B/. 21,340", c: "#FF6B6B", w: "44%" },
                  { l: "CxC",      v: "B/. 15,880", c: "#7C6BFF", w: "58%" },
                  { l: "ITBMS",    v: "B/. 3,410",  c: "#FFB930", w: "28%" },
                ].map(k => (
                  <div key={k.l} style={{ background: `${k.c}07`, border: `1px solid ${k.c}14`, borderRadius: 10, padding: "11px 12px" }}>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.22)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>{k.l}</div>
                    <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 800, color: "#EEF2FF", fontFamily: "'DM Mono', monospace", marginBottom: 7 }}>{k.v}</div>
                    <div style={{ height: 2, background: `${k.c}18`, borderRadius: 1 }}>
                      <div style={{ height: "100%", width: k.w, background: k.c, borderRadius: 1 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.12)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: "linear-gradient(135deg, #00E5A0, #7C6BFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#07090F", fontWeight: 800 }}>✦</div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#00E5A0", textTransform: "uppercase", letterSpacing: "0.07em" }}>Asistente IA</span>
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>
                  "Tu ITBMS vence en 12 días. El estimado es B/. 3,410. ¿Preparo el Formulario 430?"
                </p>
              </div>
            </div>
            {!isMobile && (
              <>
                <div style={{ position: "absolute", top: -12, right: -12, background: "linear-gradient(135deg, #00E5A0, #00B87A)", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 800, color: "#07090F", boxShadow: "0 6px 18px rgba(0,229,160,0.36)" }}>✓ DGI Integrado</div>
                <div style={{ position: "absolute", bottom: -12, left: -12, background: "linear-gradient(135deg, #7C6BFF, #5B4BE0)", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 800, color: "#fff", boxShadow: "0 6px 18px rgba(124,107,255,0.34)" }}>⚡ IA Incluida</div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section ref={testimonialsRef} style={{ padding: isMobile ? "64px 20px" : "96px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
            <h2 style={{
              fontSize: isMobile ? "clamp(22px, 6vw, 30px)" : "clamp(24px, 3.5vw, 38px)",
              fontWeight: 800, letterSpacing: "-0.025em", color: "#EEF2FF", marginBottom: 8,
            }}>Lo que dicen nuestros clientes</h2>
            <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.32)" }}>Empresas panameñas que ya usan GestarSoft</p>
          </div>
          <div className="testimonials-grid" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 16,
          }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} style={{
                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18, padding: isMobile ? "22px 20px" : "26px 24px",
                transform: testimonialsVisible ? "translateY(0)" : "translateY(20px)",
                opacity: testimonialsVisible ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
                transitionDelay: `${i * 0.1}s`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${t.color}50, transparent)` }} />
                <div style={{ fontSize: 16, color: t.color, marginBottom: 12, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}90)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, color: "#07090F",
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#EEF2FF" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <section id="contacto" style={{
        padding: isMobile ? "64px 20px" : "96px 60px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: isMobile ? 300 : 600, height: 200, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,229,160,0.05) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{
            fontSize: isMobile ? "clamp(26px, 7vw, 36px)" : "clamp(28px, 4.5vw, 50px)",
            fontWeight: 800, letterSpacing: "-0.03em",
            marginBottom: 14, color: "#EEF2FF", lineHeight: 1.1,
          }}>
            Empieza hoy.<br />
            <span style={{ background: "linear-gradient(90deg, #00E5A0, #7C6BFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sin contratos.
            </span>
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 15, color: "rgba(255,255,255,0.36)", marginBottom: 34, lineHeight: 1.7 }}>
            Solicita una demo y descubre cómo GestarSoft simplifica tu operación desde el primer día.
          </p>
          <div className="cta-buttons" style={{ display: "flex", gap: 10, justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
            <button onClick={openDemo} className="btn-primary" style={{
              background: "linear-gradient(135deg, #00E5A0, #00B87A)",
              borderRadius: 13, padding: "15px 40px",
              fontSize: 15, fontWeight: 800, color: "#07090F",
              boxShadow: "0 8px 28px rgba(0,229,160,0.3)",
              width: isMobile ? "100%" : "auto",
            }}>Solicitar demo →</button>
            <button onClick={() => scrollTo("productos")} className="btn-ghost" style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 13, padding: "15px 32px",
              fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.52)",
              width: isMobile ? "100%" : "auto",
            }}>Ver precios</button>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.16)", marginTop: 14 }}>
            Sin tarjeta de crédito · Sin contrato · Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ padding: isMobile ? "28px 20px" : "32px 60px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="footer-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="gestarsoft-logo.png" alt="GestarSoft" style={{ height: 70, width: "auto", objectFit: "contain", opacity: 0.6, filter: "brightness(1.2)" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.25)" }}>
              Ciudad de Panamá, República de Panamá
            </span>
          </div>

          {!isMobile && (
            <div style={{ display: "flex", gap: 20 }}>
              <span onClick={() => setTermsOpen(true)}   className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600 }}>Términos</span>
              <span onClick={() => setPrivacyOpen(true)} className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600 }}>Privacidad</span>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600, textDecoration: "none" }}>Soporte</a>
              <a href="https://www.linkedin.com/company/gestarsoft" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600, textDecoration: "none" }}>LinkedIn</a>
            </div>
          )}

          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.1)" }}>© 2026 GestarSoft</span>
        </div>

        {isMobile && (
          <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
            <span onClick={() => setTermsOpen(true)}   className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600 }}>Términos</span>
            <span onClick={() => setPrivacyOpen(true)} className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600 }}>Privacidad</span>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600, textDecoration: "none" }}>Soporte</a>
            <a href="https://www.linkedin.com/company/gestarsoft" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontWeight: 600, textDecoration: "none" }}>LinkedIn</a>
          </div>
        )}
      </footer>
    </div>
  );
}
