import React, { useMemo, useState } from "react";
import { ShoppingCart, Trash2, Send, Search } from "lucide-react";

const WHATSAPP_NUMBER = "34670619113";

// Pega aquí tu mismo array completo de departments
const departments = [
  {
    name: "AGUA",
    products: [
      "AGUA FUENTELAJARA 1.5L",
      "AGUA LANJARON 1.5L PACK 6",
      "AGUA FUENTELAJARA 0.5L",
      "AGUA LANJARON 0.5L",
      "AGUA VALTORRE 0.5L PITORRO",
      "AGUA VALTORRE GARRAFA 5L",
      "AGUA SOLAN CABRAS 1.5L",
      "SOLAN CABRAS 500ML",
      "AGUA GOURMET CON GAS 0.5L",
      "AGUA GOURMET CON GAS 1.5L"
    ]
  }
];

const products = departments.flatMap((department) =>
  department.products.map((name) => ({
    id: `${department.name}-${name}`,
    name,
    department: department.name
  }))
);

export default function App() {
  const [quantities, setQuantities] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");

  const filteredDepartments = useMemo(() => {
    return departments
      .map((department) => ({
        ...department,
        products: department.products.filter((product) =>
          product.toLowerCase().includes(search.toLowerCase())
        )
      }))
      .filter((department) => department.products.length > 0);
  }, [search]);

  const selectedItems = useMemo(() => {
    return products
      .map((product) => ({
        ...product,
        unidades: Number(quantities[product.id]?.unidades || 0),
        cajas: Number(quantities[product.id]?.cajas || 0)
      }))
      .filter((product) => product.unidades > 0 || product.cajas > 0);
  }, [quantities]);

  const updateQuantity = (productId, field, value) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    setQuantities((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        [field]: cleanValue
      }
    }));
  };

  const clearOrder = () => {
    setQuantities({});
    setCustomerName("");
    setNotes("");
  };

  const createWhatsAppMessage = () => {
    const lines = ["Nuevo pedido", ""];

    if (customerName.trim()) {
      lines.push(`Cliente: ${customerName.trim()}`, "");
    }

    departments.forEach((department) => {
      const selectedDepartmentItems = selectedItems.filter(
        (item) => item.department === department.name
      );

      if (selectedDepartmentItems.length > 0) {
        lines.push(`--- ${department.name} ---`);

        selectedDepartmentItems.forEach((item) => {
          const parts = [];
          if (item.unidades > 0) parts.push(`${item.unidades} unidades`);
          if (item.cajas > 0) parts.push(`${item.cajas} cajas`);
          lines.push(`${item.name}: ${parts.join(" / ")}`);
        });

        lines.push("");
      }
    });

    if (notes.trim()) {
      lines.push(`Observaciones: ${notes.trim()}`, "");
    }

    lines.push("Enviado desde el formulario de pedidos");
    return encodeURIComponent(lines.join("\n"));
  };

  const sendOrder = () => {
    if (selectedItems.length === 0) {
      alert("Introduce al menos una cantidad antes de enviar el pedido.");
      return;
    }

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${createWhatsAppMessage()}`,
      "_blank"
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.iconBox}>
            <ShoppingCart size={28} />
          </div>
          <div>
            <h1 style={styles.title}>Pedido online Cash Lojo</h1>
            <p style={styles.subtitle}>
              Escribe cantidades en Unidades o Cajas y envía el pedido por WhatsApp.
            </p>
          </div>
        </header>

        <div style={styles.cardSticky}>
          <label style={styles.label}>Nombre o referencia del cliente</label>
          <input
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Opcional"
            style={styles.input}
          />

          <label style={styles.label}>Buscar artículo</label>
          <div style={styles.searchBox}>
            <Search size={20} style={styles.searchIcon} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Escribe para buscar..."
              style={styles.searchInput}
            />
          </div>
        </div>

        {filteredDepartments.map((department) => (
          <section key={department.name} style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>{department.name}</h2>
            </div>

            <div style={styles.gridHeader}>
              <div>Unid.</div>
              <div>Cajas</div>
              <div style={{ textAlign: "left" }}>Artículo</div>
            </div>

            {department.products.map((productName) => {
              const productId = `${department.name}-${productName}`;

              return (
                <div key={productId} style={styles.row}>
                  <input
                    inputMode="numeric"
                    value={quantities[productId]?.unidades || ""}
                    onChange={(event) =>
                      updateQuantity(productId, "unidades", event.target.value)
                    }
                    placeholder="0"
                    style={styles.qtyInput}
                  />

                  <input
                    inputMode="numeric"
                    value={quantities[productId]?.cajas || ""}
                    onChange={(event) =>
                      updateQuantity(productId, "cajas", event.target.value)
                    }
                    placeholder="0"
                    style={styles.qtyInput}
                  />

                  <p style={styles.productName}>{productName}</p>
                </div>
              );
            })}
          </section>
        ))}

        <div style={styles.card}>
          <label style={styles.label}>Observaciones</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Opcional"
            rows={3}
            style={styles.textarea}
          />

          <div style={styles.summary}>
            <strong>Resumen:</strong> {selectedItems.length} artículos con cantidad.
          </div>

          <button onClick={sendOrder} style={styles.primaryButton}>
            <Send size={20} /> Enviar por WhatsApp
          </button>

          <button onClick={clearOrder} style={styles.secondaryButton}>
            <Trash2 size={20} /> Borrar pedido
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    padding: "16px",
    color: "#0f172a",
    fontFamily: "Arial, sans-serif"
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto"
  },
  header: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
    marginBottom: "16px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
  },
  iconBox: {
    background: "#0f172a",
    color: "white",
    borderRadius: "16px",
    padding: "12px",
    display: "flex"
  },
  title: {
    margin: 0,
    fontSize: "24px"
  },
  subtitle: {
    margin: "6px 0 0",
    color: "#475569",
    fontSize: "14px"
  },
  cardSticky: {
    position: "sticky",
    top: "8px",
    zIndex: 10,
    background: "white",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "18px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
  },
  card: {
    background: "white",
    padding: "18px",
    borderRadius: "18px",
    marginTop: "18px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
  },
  label: {
    display: "block",
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "6px",
    marginTop: "8px"
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box"
  },
  searchBox: {
    position: "relative"
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "12px",
    color: "#64748b"
  },
  searchInput: {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box"
  },
  section: {
    background: "white",
    borderRadius: "18px",
    overflow: "hidden",
    marginBottom: "18px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
  },
  sectionHeader: {
    background: "#0f172a",
    color: "white",
    padding: "12px 16px"
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    textTransform: "uppercase"
  },
  gridHeader: {
    display: "grid",
    gridTemplateColumns: "72px 72px 1fr",
    gap: "8px",
    background: "#e2e8f0",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "72px 72px 1fr",
    gap: "8px",
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid #e2e8f0"
  },
  qtyInput: {
    width: "100%",
    padding: "10px 4px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    boxSizing: "border-box"
  },
  productName: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "600"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box"
  },
  summary: {
    background: "#e2e8f0",
    padding: "12px",
    borderRadius: "12px",
    margin: "14px 0"
  },
  primaryButton: {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "12px",
    background: "#0f172a",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "10px"
  },
  secondaryButton: {
    width: "100%",
    height: "50px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    background: "white",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }
};
