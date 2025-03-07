import ListsComponent from "@/components/ListsComponent"
import { Suspense } from "react"

export default function Lists() {
  return (
    <Suspense>
      <ListsComponent />
    </Suspense>
  )
}
