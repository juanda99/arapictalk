import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import { boardDataAtom } from '../store/atoms/boardState';
import type { BoardData } from '../core/types';

// Mock del JSON que nos devolvería la "IA"
const mockSupermarketData: BoardData = {
  actividad: "Ir al supermercado",
  formato: "Estructura de Columnas Expandida",
  columnas: [
    {
      tipo: "Personas",
      contenido: ["Yo", "Tú", "Mamá", "Papá", "Cajero", "Cajera", "Guardia", "Reponedor", "Reponedora", "Cliente", "Abuelo", "Abuela", "Dependiente", "Dependienta"]
    },
    {
      tipo: "Lugares",
      contenido: ["Pasillo", "Caja", "Entrada", "Salida", "Parking", "Frutería", "Carnicería", "Panadería", "Pescadería", "Charcutería", "Neveras", "Congelados", "Baño", "Mostrador", "Ascensor"]
    },
    {
      tipo: "Acciones",
      contenido: ["Ir", "Mirar", "Buscar", "Encontrar", "Comprar", "Pagar", "Poner", "Sacar", "Ayudar", "Esperar", "Empujar", "Pesar", "Escanear", "Abrir", "Cerrar", "Coger", "Dejar", "Elegir", "Pedir", "Guardar", "Caminar", "Hacer cola", "Llevar", "Traer"]
    },
    {
      tipo: "Palabras Núcleo",
      contenido: ["Quiero", "Necesito", "Dame", "Toma", "Sí", "No", "Más", "Terminado", "Ver", "Hay", "No hay", "Otro", "Este", "Ese", "Igual", "Diferente"]
    },
    {
      tipo: "Alimentos (Sólidos)",
      contenido: ["Pan", "Carne", "Pollo", "Pescado", "Fruta", "Verdura", "Huevos", "Queso", "Yogurt", "Pasta", "Arroz", "Legumbres", "Galletas", "Cereales", "Chocolate", "Jamón", "Pizza", "Patatas", "Helado", "Embutido", "Harina", "Azúcar", "Sal"]
    },
    {
      tipo: "Bebidas",
      contenido: ["Agua", "Leche", "Jugo", "Zumo", "Refresco", "Batido", "Café", "Té", "Cerveza", "Vino", "Agua con gas"]
    },
    {
      tipo: "Hogar y Limpieza",
      contenido: ["Jabón", "Detergente", "Suavizante", "Lavavajillas", "Papel higiénico", "Papel de cocina", "Bayeta", "Esponja", "Bolsa", "Basura", "Escoba", "Cubo", "Limpiacristales", "Insecticida"]
    },
    {
      tipo: "Cuidado Personal",
      contenido: ["Champú", "Gel", "Desodorante", "Pasta de dientes", "Cepillo", "Peine", "Cuchilla", "Compresa", "Pañales", "Toallitas", "Crema", "Colonia"]
    },
    {
      tipo: "Objetos y Tecnología",
      contenido: ["Carrito", "Cesta", "Ticket", "Lista", "Báscula", "Escáner", "Pantalla", "Nevera", "Estante", "Monedero", "Bolsa de tela", "Bolsa de plástico"]
    },
    {
      tipo: "Dinero y Pago",
      contenido: ["Dinero", "Monedas", "Billete", "Tarjeta", "Pagar", "Cambio", "Precio", "Caro", "Barato", "Oferta", "Descuento", "Gratis", "Pagar con móvil"]
    },
    {
      tipo: "Atributos y Tiempo",
      contenido: ["Grande", "Pequeño", "Frío", "Caliente", "Rico", "Feo", "Sucio", "Limpio", "Lleno", "Vacío", "Mucho", "Poco", "Nada", "Todo", "Primero", "Después", "Ahora", "Luego", "Rápido", "Despacio"]
    },
    {
      tipo: "Sensaciones y Regulación",
      contenido: ["Feliz", "Cansado", "Enojado", "Asustado", "Tranquilo", "Mal", "Bien", "Mucho ruido", "Mucha luz", "Mucha gente", "Tocar", "Oler", "Hambre", "Sed", "Quiero irme", "Necesito un descanso", "Espacio"]
    }
  ]
};

export const Landing: React.FC = () => {
  const { t } = useTranslation();
  const setBoardData = useSetAtom(boardDataAtom);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsGenerating(true);
    
    // Simulamos la llamada a la IA con un delay
    setTimeout(() => {
      setBoardData(mockSupermarketData);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem' }}>
      <h1>{t('appTitle')}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '500px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('dynamicInputPlaceholder')}
          style={{ padding: '1rem', fontSize: '1.2rem', borderRadius: '8px', border: '2px solid #ccc' }}
          disabled={isGenerating}
        />
        <button 
          type="submit" 
          disabled={isGenerating || !input.trim()}
          style={{ padding: '1rem', fontSize: '1.2rem', borderRadius: '8px', border: 'none', backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}
        >
          {isGenerating ? t('loading') : t('generateBoard')}
        </button>
      </form>
    </div>
  );
};
