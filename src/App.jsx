import React, { useEffect, useMemo, useState } from "react";
import { ShoppingCart, Trash2, Send, Search } from "lucide-react";

const WHATSAPP_NUMBER = "34670619113";

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
      "AGUA GOURMET CON GAS 1.5L",
    ],
  },
  {
    name: "REFRESCOS LATAS",
    products: [
      "COCA COLA LATA 33CL",
      "COCA COLA ZERO LATA 33CL",
      "COCA COLA ZERO S/CAF 33CL",
      "FANTA NARANJA LATA 33CL",
      "FANTA LIMON LATA 33CL",
      "AQUARIUS NARANJA LATA 33CL",
      "AQUARIUS LIMON LATA 33CL",
      "SEVEN UP LATA 33CL",
      "PEPSI COLA LATA 33CL",
      "NESTEA MARACUYA LATA",
      "NESTEA LIMON LATA",
      "NESTEA FRUTOS ROJOS LATA",
      "TONICA LATA 33CL",
      "SIMON LIFE NARANJA LATA 33CL",
      "SIMON LIFE MANGO LATA 33CL",
      "T. VERANO LIMON CASERA LATA",
    ],
  },
  {
    name: "REFRESCOS 2L / 1.5L",
    products: [
      "COCA COLA 2L",
      "COCA COLA ZERO 2L",
      "COCA ZERO S/CAFEINA 2L",
      "FANTA NARANJA 2L",
      "FANTA LIMON 2L",
      "SEVEN UP 2L",
      "REVOLTOSA COLA 2L",
      "REVOLTOSA NARANJA 2L",
      "REVOLTOSA LIMON 2L",
      "CASERA LIMON 1.5L",
      "CASERA NARANJA 1.5L",
      "CASERA BLANCA 1.5L",
      "AQUARIUS NARANJA 1.5L",
      "AQUARIUS BLANCO 1.5L",
      "NESTEA MARACUYA 1.5L",
      "NESTEA 1.5L",
      "NESTEA FRUTOS ROJOS 1.5L",
      "SIMON LIFE NARANJA 1.5L",
      "SIMON LIFE MANDARINA 1.5L",
      "SIMON LIFE MANGO 1.5L",
      "PEPSI COLA 1.75L",
      "TONICA SCHWEPPES 1L",
      "LIMON&NADA MINUTE MAID 1L",
    ],
  },
  {
    name: "ZUMOS",
    products: [
      "BIOFRUTA PASCUAL TROPICAL P3",
      "BIOFRUTA PASCUAL PACIFICO P3",
      "BIOFRUTA PASCUAL IBIZA P3",
      "BIOFRUTA PASCUAL 1L TROPI",
      "FUNC. D.SIMON TROPICAL P6",
      "FUNC. D.SIMON CARIBE P6",
      "FUNC. D.SIMON MEDITERRANEO P6",
      "ZUMO D.SIMON PIÑA P6 200",
      "ZUMO D.SIMON MELOCOTON P6 200",
      "ROSTOY MELOCOTON 33CL",
      "ROSTOY PIÑA COCO 33CL",
      "ZUMO JUVER PIÑA 850ML",
      "ZUMO JUVER MELOCOTON 850ML",
      "ZUMO JUVER NARANJA 850ML",
    ],
  },
  {
    name: "KUYX 3L",
    products: [
      "KUYX NARANJA 3L",
      "KUYX TROPICAL 3L",
      "KUYX MANDARINA 3L",
      "KUYX FRUTOS DEL BOSQUE 3L",
      "KUYX PIÑA 3L",
      "KUYX PIÑA COCO 3L",
      "KUYX OCEANICO 3L",
    ],
  },
  {
    name: "KUYX 330ML",
    products: [
      "KUYX 330ML NARANJA",
      "KUYX 330ML MANDARINA",
      "KUYX 330ML TROPICAL",
      "KUYX 330ML PIÑA",
      "KUYX 330ML OCEANICO",
      "KUYX 330ML MANGO",
      "KUYX 330ML FRUTOS ROJOS",
    ],
  },
  {
    name: "ENERGÉTICAS",
    products: [
      "CAMALEON 250ML",
      "CAMALEON GRANDE 50CL",
      "POWER KING 25CL",
      "POWER KING GRANDE 50CL",
      "RED BULL 250ML",
      "RED BULL SIN AZUCAR 250ML",
      "MONSTER VERDE LATA 50CL",
      "MONSTER ULTRA WHITE 50CL",
      "MONSTER ZERO VERDE 50CL",
      "MONSTER MANGO 50CL",
      "MONSTER AZUL 50CL",
      "BURN LATA 500ML",
      "LOCURA LATA 50CL",
      "LOCURA COCO LATA 50CL",
      "LOCURA ENERGY DRINK PEQUEÑO",
      "ENERDRINK COCO Y PIÑA",
      "ENERDRINK FRESA SALVAJE",
      "ENERDRINK MORA",
      "ENERDRINK MANZANA",
      "ENERDRINK TARTA QUESO",
      "ENERDRINK COCO LOCO",
      "POWERADE ICE 50CL",
      "POWERADE BLOOD 50CL",
      "ENERYETI PIRULETA 500ML",
    ],
  },
  {
    name: "CERVEZAS",
    products: [
      "CERVEZA CRUZCAMPO LATA 33CL",
      "CERVEZA ESTRELLA SUR LATA",
      "ESTRELLA 0.0 LATA 33CL",
      "CRUZCAMPO S/A LATA 33CL",
      "RADLER LIMON CRUZCAMPO LATA",
      "HEINEKEN LATA 33CL",
      "CERVEZA CRUZCAMPO 50CL",
      "ESTRELLA SUR 50CL LATA GRANDE",
      "CERVEZA CRUZCAMPO 1L",
      "CERVEZA CRUZ DEL SUR 1L",
      "CERVEZA ESTRELLA 1L",
      "CERVEZA ESTRELLA 0.0 1L",
      "CRUZCAMPO ROSCA 1L",
      "CRUZCAMPO 750ML",
      "CRUZCAMPO PACK 6",
      "CRUZCAMPO BOTELLIN CAJA 24",
      "CRUZCAMPO BOTELLIN CAJA 20",
      "CRUZCAMPO SIN ALCOHOL PACK",
      "ESTRELLA DEL SUR PACK 6",
    ],
  },
  {
    name: "VINOS Y LICORES",
    products: [
      "VINO BLANCO GRAN DUQUE 1L",
      "VINO TINTO GRAN DUQUE 1L",
      "VINO BLANCO RIVILLA 2L",
      "VINO TINTO RIVILLA 2L",
      "VINO TINTO DON SIMON 1L",
      "VINO BLANCO DON SIMON 1L",
      "VINO RIOJA SEÑORES 3/4",
      "TINTO VERANO CASERA 1.5L",
      "RON CACIQUE 70CL",
      "RON BARCELO AÑEJO 70CL",
      "RON NEGRITA 70CL",
      "WHISKY WHITE LABEL 70CL",
      "WHISKY BALLANTINES 70CL",
      "WHISKY J&B 70CL",
      "GINEBRA LARIOS 1L",
      "GINEBRA BEEFEATER 70CL",
      "BRANDY TERRY 1L",
      "ANIS CASTELLANA 70CL",
      "LICOR MIURA 70CL",
      "MINI WHISKY WHITE LABEL",
      "MINI J. WALKER ROJA",
      "MINI RON BARCELO",
      "MINI BALLANTINES",
    ],
  },
  {
    name: "LÁCTEOS",
    products: [
      "LECHE COVAP ENTERA 1L",
      "LECHE COVAP SEMIDESNATADA 1L",
      "LECHE COVAP SIN LACTOSA ENTERA 1L",
      "LECHE COVAP SIN LACTOSA SEMI 1L",
      "LECHE PULEVA ENTERA 1L",
      "LECHE PULEVA SEMI 1L",
      "BATIDO PULEVA CACAO 1L",
      "BATIDO PULEVA FRESA 1L",
      "BATIDO PULEVA VAINILLA 1L",
      "BAT.PULEVA CACAO P6 200",
      "BAT.PULEVA FRESA P6 200",
      "BAT.PULEVA VAINILLA P6 200",
      "CAFE FRIO LANDESSA CAPUCHINO",
      "CAFE FRIO LANDESSA CON LECHE",
      "CAFE FRIO LANDESSA SOLO",
      "CAFE FRIO LANDESSA CARAMELO",
      "CAFE FRIO LANDESSA VAINILLA",
      "MARGARINA TULIPAN 225G",
      "MARGARINA TULIPAN 400G",
      "NATA COCINA RENY PICOT 200ML",
    ],
  },
  {
    name: "ALIMENTACIÓN",
    products: [
      "ACEITE GIRASOL ROSIL 1L",
      "ACEITE GIRASOL ROSIL 5L",
      "ACEITE OLIVA VIRGEN ROSIL 1L",
      "AZUCAR 1KG",
      "SAL FINA 1KG",
      "SAL GRUESA CHALUPA 1KG",
      "TOMATE FRITO ORLANDO 400G",
      "TOMATE FRITO ORLANDO 800G",
      "TOMATE FRITO ORLANDO 350G",
      "TOMATE FRITO MARTINETE 810G",
      "TOMATE FRITO MARTINETE 400G",
      "TOMATE TRITURADO MARTINETE 810G",
      "TOMATE TRITURADO MARTINETE 400G",
      "YATEKOMO POLLO 60G",
      "CALDO G.BLANCA POLLO 1L",
      "GARBANZOS FRASCO 560G",
      "PAN RALLADO PANAERAS 300G",
      "ARROZ BRILLANTE 1KG",
      "ARROZ BRILLANTE 500G",
      "MAYONESA YBARRA 450G",
      "KETCHUP ORLANDO 265G",
    ],
  },
  {
    name: "APERITIVOS",
    products: [
      "PIPAS SEVILLANAS",
      "REBUJINAS SEVILLANAS 120G",
      "RISKETOS 120G",
      "BUSCALIOS BARBACOA",
      "TOSTAITOS SEVILLANOS",
      "PATATAS HISPALANA 140G",
      "PRINGLES CREAM ONION 70G",
      "PRINGLES ORIGINAL 70G",
      "PRINGLES ORIGINAL 165G",
      "BOLAS MATCHBALL 105G",
      "REVUELTO CARTUJANO 120G",
      "PATATAS RUEDAS 100G",
      "TOTAS ESTILO CASERO 100G",
      "TOTAS CAMPESINA 100G",
      "GOFRE CON CHOCO 110G",
      "PALOMITA KETCHUP MOSTAZA 8U",
    ],
  },
  {
    name: "LIMPIEZA",
    products: [
      "LEJIA PINO PERFUMADA KIRIKO 2L",
      "LEJIA AMARILLA KIRIKO 2L",
      "LEJIA LAVADORA KIRIKO 2L",
      "LEJIA + DETERGENTE KIRIKO 2L",
      "LEJIA LIMON PERFUMADA KIRIKO 2L",
      "DETERGENTE KIRIKO MARSELLA 3L",
      "DETERGENTE KIRIKO BASICO 2.8L",
      "LAVAVAJILLAS FLOTA 1.1L",
      "FLOTA VAJILLAS 750ML",
      "FREGASUELOS PINO KIRIKO 1.5L",
      "FREGASUELOS DAMA NOCHE 1.5L",
      "FREGASUELOS J.MARSELLA 1.5L",
      "FREGASUELOS SPA 1.5L",
      "LIMPIACRISTALES KIRIKO 500ML",
      "PAPEL HIGIENICO FAMADIS 6R",
      "HIGIENICO ECONOMICO P12",
      "SECAMANO BUENO",
      "TOALLITAS BEBE 120U",
      "ESCOBA PRIMER PRECIO",
      "PASTA COLGATE 75ML",
    ],
  },
  {
    name: "VARIOS",
    products: [
      "ANDALUZA CAJA 47U",
      "ANDALUZA GOURMET CAJA 54U",
      "VIENA ARTESANA CAJA 65U",
      "HUEVOS P12 L",
      "BANDEJA T89 NEGRA",
      "BOLSA VERDE OFERTA 42X53",
      "BOLSA BLANCA 42X53 1KG",
      "ROLLO COMPOSTABLE 30X40 1KG",
      "BOLSA BASURA COMUNIDAD 180L",
      "BOLSA BASURA NORMAL 30L",
      "BOLSAS PANADERIA 30X43",
      "SERVILLETA DOBLE BLANCA P2",
      "ARENA GATO MIC&FRIENDS 5KG",
      "VASO PLASTICO 350CC",
      "PAPEL OCB 100U",
      "CARBON",
      "PAPEL ALUMINIO IND",
      "FILM INDUSTRIAL 200M",
      "PASTILLAS ENCENDIDO",
      "ESTUCHES DE LOS REYES",
    ],
  },
  {
    name: "CHARCUTERÍA",
    products: [
      "CHOPPED TERNERA CAMPOFRIO KG",
      "CHOPPED CERDO CAMPOFRIO KG",
      "QUESO GOUDA BARRA KG",
      "QUESO SEMI PUROVI 1.50E",
      "POLLO RELLENO CARLOTEÑA KG",
      "POLLO RELLENO BLANCE KG",
      "LOMO AL HORNO FAMADESA KG",
      "MAGRETA AL AJILLO FAMADESA KG",
      "JAMON COCIDO 1A KG",
      "PALETA REVILLA KG",
      "PECHUGA PAVO NOEL KG",
      "PECHUGA PAVOFRIO KG",
      "CHORIZO EXTRA VILLAR KG",
      "CHORIZO TRADICIONAL KG",
      "CHORIZO CULAR IBERICO KG",
      "SALCHICHON TURON KG",
      "CHOPPED BEEF CAMPOFRIO 95G",
      "CHOPPED CERDO CAMPOFRIO 95G",
      "MORTADELA SICILIANA 95G",
      "MORTADELA C/A CAMPOFRIO 95G",
      "JAMON CURADO NAVIDUL 50G",
      "PECHUGA PAVO CAMPOFRIO 70G",
      "JAMON COCIDO EXTRA 75G",
      "CHORIZO REVILLA 65G",
      "CHORIZO PAMPLONA REVILLA 65G",
      "SALAMI REVILLA 65G",
      "SALCHICHON REVILLA 65G",
      "TAQUITOS NAVIDUL 50G",
      "BACON O.MAYER 100G",
      "SALCHICHAS CAMPOFRIO FRANKFURT",
      "OFERTAS PIZZAS C.FRIO",
      "PIZZA CAMPOFRIO 4 QUESOS",
      "PIZZA CAMPOFRIO JAMON QUESO",
      "PIZZA CAMPOFRIO BOLOÑESA",
      "PIZZA CAMPOFRIO CARBONARA",
      "PIZZA CAMPOFRIO BARBACOA",
      "PIZZA JAMON BACON CEBOLLA",
      "PIZZA PEPPERONI CAMPOFRIO",
      "PIZZA POLLO KANSAS",
      "PIZZA POLLO MOSTAZA MIEL",
      "PIZZA SALSA MEXICANA",
    ],
  },
];

const products = departments.flatMap((department) =>
  department.products.map((name) => ({
    id: `${department.name}-${name}`,
    name,
    department: department.name,
  }))
);

export default function App() {
  useEffect(() => {
    let viewport = document.querySelector("meta[name=viewport]");

    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.setAttribute("name", "viewport");
      document.head.appendChild(viewport);
    }

    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    );
  }, []);

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
        ),
      }))
      .filter((department) => department.products.length > 0);
  }, [search]);

  const selectedItems = useMemo(() => {
    return products
      .map((product) => ({
        ...product,
        cajas: Number(quantities[product.id]?.cajas || 0),
        unidades: Number(quantities[product.id]?.unidades || 0),
      }))
      .filter((product) => product.cajas > 0 || product.unidades > 0);
  }, [quantities]);

  const updateQuantity = (productId, field, value) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    setQuantities((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        [field]: cleanValue,
      },
    }));
  };

  const closeKeyboardOnEnter = (event) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
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

    selectedItems.forEach((item) => {
      const parts = [];
      if (item.cajas > 0) parts.push(`*${item.cajas} cajas*`);
      if (item.unidades > 0) parts.push(`*${item.unidades} unidades*`);

      lines.push(`- ${item.name}: ${parts.join(" / ")}`);
      lines.push("");
    });

    lines.push("");

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
          <div style={styles.searchAndSendRow}>
            <div style={styles.searchBoxCompact}>
              <Search size={20} style={styles.searchIcon} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar..."
                style={styles.searchInput}
              />
            </div>

            <button onClick={sendOrder} style={styles.stickyWhatsappButton}>
              <Send size={18} /> WhatsApp
            </button>
          </div>
        </div>

        {filteredDepartments.map((department) => (
          <section key={department.name} style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>{department.name}</h2>
            </div>

            <div style={styles.gridHeader}>
              <div>Cajas</div>
              <div>Unid.</div>
              <div style={{ textAlign: "left" }}>Artículo</div>
            </div>

            {department.products.map((productName) => {
              const productId = `${department.name}-${productName}`;

              return (
                <div key={productId} style={styles.row}>
                  <input
                    inputMode="numeric"
                    enterKeyHint="done"
                    value={quantities[productId]?.cajas || ""}
                    onChange={(event) =>
                      updateQuantity(productId, "cajas", event.target.value)
                    }
                    onKeyDown={closeKeyboardOnEnter}
                    placeholder="0"
                    style={styles.qtyInput}
                  />

                  <input
                    inputMode="numeric"
                    enterKeyHint="done"
                    value={quantities[productId]?.unidades || ""}
                    onChange={(event) =>
                      updateQuantity(productId, "unidades", event.target.value)
                    }
                    onKeyDown={closeKeyboardOnEnter}
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
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
    marginBottom: "16px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  iconBox: {
    background: "#0f172a",
    color: "white",
    borderRadius: "16px",
    padding: "12px",
    display: "flex",
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
  subtitle: {
    margin: "6px 0 0",
    color: "#475569",
    fontSize: "14px",
  },
  cardSticky: {
    position: "sticky",
    top: "8px",
    zIndex: 10,
    background: "white",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "18px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  card: {
    background: "white",
    padding: "18px",
    borderRadius: "18px",
    marginTop: "18px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "6px",
    marginTop: "8px",
  },
  input: {
    width: "100%",
    padding: "11px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  searchBox: {
    position: "relative",
  },
  searchAndSendRow: {
    display: "grid",
    gridTemplateColumns: "1fr 118px",
    gap: "8px",
    alignItems: "center",
  },
  searchBoxCompact: {
    position: "relative",
    minWidth: 0,
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "11px",
    color: "#64748b",
  },
  searchInput: {
    width: "100%",
    padding: "11px 12px 11px 40px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  section: {
    background: "white",
    borderRadius: "18px",
    overflow: "hidden",
    marginBottom: "18px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  sectionHeader: {
    background: "#0f172a",
    color: "white",
    padding: "12px 16px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    textTransform: "uppercase",
  },
  gridHeader: {
    display: "grid",
    gridTemplateColumns: "80px 80px 1fr",
    gap: "8px",
    background: "#e2e8f0",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "80px 80px 1fr",
    gap: "8px",
    alignItems: "center",
    padding: "9px 10px",
    borderTop: "1px solid #e2e8f0",
  },
  qtyInput: {
    width: "100%",
    padding: "8px 4px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  productName: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
  },
  textarea: {
    width: "100%",
    padding: "11px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  summary: {
    background: "#e2e8f0",
    padding: "12px",
    borderRadius: "12px",
    margin: "14px 0",
    fontSize: "14px",
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
    marginBottom: "10px",
  },
  stickyWhatsappButton: {
    width: "100%",
    height: "44px",
    border: "none",
    borderRadius: "12px",
    background: "#22c55e",
    color: "white",
    fontSize: "13px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    whiteSpace: "nowrap",
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
    gap: "8px",
  },
};
