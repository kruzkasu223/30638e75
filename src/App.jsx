import React, { useState } from "react"
import ReactDOM from "react-dom"
import Header from "./Header.jsx"
import { Footer } from "./Footer.jsx"
import { Pages } from "./Pages.jsx"
import { QueryClient, QueryClientProvider } from "react-query"

const App = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <div className="container">
      <Header />
      <main className="container-view">
        <Pages page={page} setPage={setPage} direction={direction} />
      </main>
      <Footer paginate={paginate} page={page} />
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("app")
)

export default App
