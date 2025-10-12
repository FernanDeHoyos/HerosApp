import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router";

interface props {
  totalPages: number
}
export const CustomPagination = ({ totalPages }: props) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = searchParams.get('page') ?? "1"
  const page = isNaN(+queryPage) ? 1 : +queryPage

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }

  const getPages = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (page > 4) {
        pages.push("...")
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (page < totalPages - 3) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages
  }
  

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button onClick={() => handlePageChange(page - 1)} variant="outline" size="sm" disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      
      {getPages().map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={index}
            onClick={() => handlePageChange(p as number)}
            variant={page === p ? "default" : "outline"}
            size="sm"
          >
            {p}
          </Button>
        )
      )}


      <Button onClick={() => handlePageChange(page + 1)} variant="outline" disabled={page === totalPages} size="sm">
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

