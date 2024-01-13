import React, { useState } from "react"
import ReactDOM from "react-dom"
import Header from "./Header.jsx"
import { Footer } from "./Footer.jsx"
import { Pages } from "./Pages.jsx"

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

ReactDOM.render(<App />, document.getElementById("app"))

export default App
