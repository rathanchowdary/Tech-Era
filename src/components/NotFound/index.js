import Header from '../Header'

const NotFound = () => (
  <div className="d-flex flex-column">
    <Header />
    <img
      className="w-25"
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found.</p>
  </div>
)

export default NotFound
