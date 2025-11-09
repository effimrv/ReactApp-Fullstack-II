const INICIAL_PRODUCTOS = [
  {
    id: 1,
    nombre: "PlayStation 5",
    precio: 499990,
    categoria: "consolas",
    imagen: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
    descripcion: "Consola de última generación con gráficos 4K",
    rating: 4.2,
    stock: 15,
    reviews: []
  },
  {
    id: 2,
    nombre: "Nintendo Switch OLED",
    precio: 399990,
    categoria: "consolas", 
    imagen: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
    descripcion: "Consola híbrida con pantalla OLED",
    rating: 3.8,
    stock: 25,
    reviews: []
  },
  {
    id: 3,
    nombre: "Mouse Gamer Logitech",
    precio: 49990,
    categoria: "perifericos",
    imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    descripcion: "Mouse profesional para gaming",
    rating: 4.1,
    stock: 50,
    reviews: []
  },
  {
    id: 4,
    nombre: "Xbox Series X",
    precio: 529990,
    categoria: "consolas",
    imagen: "https://home.ripley.cl/store/Attachment/WOP/D172/2000381174756/2000381174756_2.jpg",
    descripcion: "Potencia de 12 teraflops y compatibilidad con 8K",
    rating: 3.9,
    stock: 12,
    reviews: []
  },
  {
    id: 5,
    nombre: "Teclado Mecánico RGB",
    precio: 89990,
    categoria: "perifericos",
    imagen: "https://http2.mlstatic.com/D_Q_NP_881451-MLA95845609549_102025-F.webp",
    descripcion: "Teclado mecánico con switches azules y RGB",
    rating: 3.6,
    stock: 30,
    reviews: []
  },
  {
    id: 6,
    nombre: "Steam Deck",
    precio: 599990,
    categoria: "consolas",
    imagen: "https://http2.mlstatic.com/D_Q_NP_925474-MLU78977771517_092024-F.webp",
    descripcion: "Consola portátil para jugar tu biblioteca de Steam",
    rating: 3.7,
    stock: 8,
    reviews: []
  },
  {
    id: 7,
    nombre: "Auriculares Wireless",
    precio: 129990,
    categoria: "perifericos",
    imagen: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    descripcion: "Sonido surround 7.1 y cancelación de ruido",
    rating: 4.0,
    stock: 20,
    reviews: []
  },
  {
    id: 8,
    nombre: "PlayStation VR2",
    precio: 699990,
    categoria: "realidad-virtual",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_946299-MLA95234000906_102025-F.webp",
    descripcion: "Gafas de realidad virtual para PS5",
    rating: 3.5,
    stock: 10,
    reviews: []
  },
  {
    id: 9,
    nombre: "Monitor Gamer 240Hz",
    precio: 449990,
    categoria: "monitores",
    imagen: "https://www.alcaplus.cl/media/2025/04/276c0abc-4a03-4542-afc6-e95c7133eef1-155430-1200-1200-1-1200x1200.jpeg",
    descripcion: "Monitor QHD 27 pulgadas con 240Hz",
    rating: 4.3,
    stock: 15,
    reviews: []
  },
  {
    id: 10,
    nombre: "Meta Quest 3",
    precio: 799990,
    categoria: "realidad-virtual",
    imagen: "https://media.falabella.com/falabellaCL/144416189_01/w=800,h=800,fit=pad",
    descripcion: "Gafas VR todo-en-uno con color passthrough",
    rating: 3.8,
    stock: 18,
    reviews: []
  },
  {
    id: 11,
    nombre: "Silla Gamer Ergonómica",
    precio: 299990,
    categoria: "accesorios",
    imagen: "https://http2.mlstatic.com/D_Q_NP_933773-MLA96118033003_102025-F.webp",
    descripcion: "Silla ergonómica con soporte lumbar",
    rating: 3.4,
    stock: 12,
    reviews: []
  },
  {
    id: 12,
    nombre: "Alfombrilla XL RGB",
    precio: 34990,
    categoria: "accesorios",
    imagen: "https://http2.mlstatic.com/D_Q_NP_925105-MLA95734971672_102025-F.webp",
    descripcion: "Alfombrilla gaming con iluminación RGB",
    rating: 3.9,
    stock: 40,
    reviews: []
  },
  {
    id: 13,
    nombre: "Webcam 4K",
    precio: 79990,
    categoria: "perifericos",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_963591-MLA96136985867_102025-F.webp",
    descripcion: "Cámara web 4K para streaming y videollamadas",
    rating: 4.1,
    stock: 25,
    reviews: []
  }
];

export const categorias = [
  { id: 'todos', nombre: 'Todos los Productos' },
  { id: 'consolas', nombre: 'Consolas' },
  { id: 'perifericos', nombre: 'Periféricos' },
  { id: 'realidad-virtual', nombre: 'Realidad Virtual' },
  { id: 'monitores', nombre: 'Monitores' },
  { id: 'accesorios', nombre: 'Accesorios' }
];
const STORAGE_KEY = 'levelupgamer_productos_v1';

// Inicializar productos en localStorage si no existen
const cargarProductos = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fallthrough
  }
  // guardar iniciales
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INICIAL_PRODUCTOS));
  return INICIAL_PRODUCTOS.slice();
};

let productos = cargarProductos();

const guardarProductos = (lista) => {
  productos = lista;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
};

export const obtenerProductos = () => productos.slice();
export const obtenerProductoPorId = (id) => productos.find(p => p.id === parseInt(id));
export const obtenerProductosPorCategoria = (categoria) => 
  categoria === 'todos' ? productos.slice() : productos.filter(p => p.categoria === categoria);

export const agregarProducto = (producto) => {
  const nuevo = { ...producto, id: productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1 };
  const lista = [...productos, nuevo];
  guardarProductos(lista);
  return nuevo;
};

export const actualizarProducto = (id, cambios) => {
  const lista = productos.map(p => p.id === parseInt(id) ? { ...p, ...cambios } : p);
  guardarProductos(lista);
  return obtenerProductoPorId(id);
};

export const eliminarProducto = (id) => {
  const lista = productos.filter(p => p.id !== parseInt(id));
  guardarProductos(lista);
  return true;
};