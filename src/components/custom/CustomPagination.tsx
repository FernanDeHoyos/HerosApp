import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface props {
    totalPages: number
}
export const CustomPagination = ({totalPages}: props) => {
    const pages = 1 as number;

  return (
   <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled={pages === 1}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        {
            Array.from({length: totalPages}).map((_,index) => (
          <Button 
          key={index}
          variant={pages === index + 1 ? 'default' : 'outline'} size="sm">
            {index + 1}
          </Button>
            ))
        }
          

          <Button variant="outline" disabled={pages === totalPages} size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
  )
}

