# Hero App 🦸‍♂️

Aplicación de héroes con **React**, **TanStack Query** y manejo de **query params** en React Router.  
Este proyecto me sirve como práctica de **data fetching optimizado**, **caché de queries** y **filtros con URL**.

---

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone url_repo
   cd HerosApp
2. Renombra el archivo .env.example a .env y agrega tu access token
3. Instala las dependencias:
    ```bash
    npm install
4. Corre el proyecto:
   ```bash
   npm run dev
# 📦 Tecnologías principales

+ React⚛️
+ TanStack Query
 (para manejo de datos y caché)
+ React Router DOM
 (para navegación y query params)
+ TailwindCSS + shadcn/ui (para UI)


# 📚 Apuntes de aprendizaje
### TanStack Query

+ useQuery:  ejecuta la petición HTTP y guarda la data en caché.
+ queryKey: clave única para identificar la query.
+ queryFn: función que trae los datos.
+ staleTime: tiempo en que la data se considera fresca (no se vuelve a pedir al servidor).

La data cacheada se comparte entre componentes → evita peticiones duplicadas.

### Ejemplo:
```js
const { data: heroesResponse } = useQuery({
  queryKey: ['heroes'],
  queryFn: () => getHeroesByIdsAction(),
  staleTime: 1000 * 60 * 5, // 5 minutos
})
```

### React Router — Search Params

Sirven para manejar filtros/estado desde la URL.

Ejemplo básico:

```js
const [searchParams, setSearchParams] = useSearchParams()

const isActive = searchParams.get('tab') ?? 'all'

// validar que el tab sea uno válido
const selectActiveTab = useMemo(() => {
  const validTabs = ["all", "favorites", "heroes", "villains"]
  return validTabs.includes(isActive) ? isActive : 'all'
}, [isActive])

// cambiar de tab
onClick={() => setSearchParams(prev => {
  prev.set('tab', 'favorites')
  return prev
})}