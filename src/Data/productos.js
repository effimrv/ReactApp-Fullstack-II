export const productos = [
  {
    id: 1,
    nombre: "PlayStation 5",
    precio: 499990,
    categoria: "consolas",
    imagen: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
    descripcion: "Consola de última generación con gráficos 4K",
    rating: 4.5,
    stock: 15
  },
  {
    id: 2,
    nombre: "Nintendo Switch OLED",
    precio: 399990,
    categoria: "consolas", 
    imagen: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
    descripcion: "Consola híbrida con pantalla OLED",
    rating: 4.3,
    stock: 25
  },
  {
    id: 3,
    nombre: "Mouse Gamer Logitech",
    precio: 49990,
    categoria: "perifericos",
    imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    descripcion: "Mouse profesional para gaming",
    rating: 4.7,
    stock: 50
  },
  {
    id: 4,
    nombre: "Xbox Series X",
    precio: 529990,
    categoria: "consolas",
    imagen: "https://images.unsplash.com/photo-1621259182978-fbf83265f8c5?w=400&h=300&fit=crop",
    descripcion: "Potencia de 12 teraflops y compatibilidad con 8K",
    rating: 4.6,
    stock: 12
  },
  {
    id: 5,
    nombre: "Teclado Mecánico RGB",
    precio: 89990,
    categoria: "perifericos",
    imagen: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    descripcion: "Teclado mecánico con switches azules y RGB",
    rating: 4.4,
    stock: 30
  },
  {
    id: 6,
    nombre: "Steam Deck",
    precio: 599990,
    categoria: "consolas",
    imagen: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop",
    descripcion: "Consola portátil para jugar tu biblioteca de Steam",
    rating: 4.2,
    stock: 8
  },
  {
    id: 7,
    nombre: "Auriculares Wireless",
    precio: 129990,
    categoria: "perifericos",
    imagen: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    descripcion: "Sonido surround 7.1 y cancelación de ruido",
    rating: 4.5,
    stock: 20
  },
  {
    id: 8,
    nombre: "PlayStation VR2",
    precio: 699990,
    categoria: "realidad-virtual",
    imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
    descripcion: "Gafas de realidad virtual para PS5",
    rating: 4.3,
    stock: 10
  },
  {
    id: 9,
    nombre: "Monitor Gamer 240Hz",
    precio: 449990,
    categoria: "monitores",
    imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
    descripcion: "Monitor QHD 27 pulgadas con 240Hz",
    rating: 4.8,
    stock: 15
  },
  {
    id: 10,
    nombre: "Meta Quest 3",
    precio: 799990,
    categoria: "realidad-virtual",
    imagen: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop",
    descripcion: "Gafas VR todo-en-uno con color passthrough",
    rating: 4.4,
    stock: 18
  },
  {
    id: 11,
    nombre: "Silla Gamer Ergonómica",
    precio: 299990,
    categoria: "accesorios",
    imagen: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    descripcion: "Silla ergonómica con soporte lumbar",
    rating: 4.6,
    stock: 12
  },
  {
    id: 12,
    nombre: "Alfombrilla XL RGB",
    precio: 34990,
    categoria: "accesorios",
    imagen: "https://images.unsplash.com/photo-1591030434469-3d78c7b12820?w=400&h=300&fit=crop",
    descripcion: "Alfombrilla gaming con iluminación RGB",
    rating: 4.2,
    stock: 40
  },
  {
    id: 13,
    nombre: "Webcam 4K",
    precio: 79990,
    categoria: "perifericos",
    imagen: "https://images.unsplash.com/photo-1558089687-b785ad8f6f3e?w=400&h=300&fit=crop",
    descripcion: "Cámara web 4K para streaming y videollamadas",
    rating: 4.3,
    stock: 25
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

export const obtenerProductos = () => productos;
export const obtenerProductoPorId = (id) => productos.find(p => p.id === parseInt(id));
export const obtenerProductosPorCategoria = (categoria) => 
  categoria === 'todos' ? productos : productos.filter(p => p.categoria === categoria);