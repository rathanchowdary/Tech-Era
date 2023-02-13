import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Courses from '../Courses'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {data: [], status: 'loading'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')

    if (response.ok === true) {
      const coursesData = await response.json()

      const {courses, total} = coursesData

      const updatedCourses = courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      this.setState({
        data: {courses: updatedCourses, total},
        status: 'success',
      })
    } else {
      this.setState({status: 'failed'})
    }
  }

  loading = () => (
    <div
      data-testid="loader"
      className="d-flex flex-row justify-content-center"
    >
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  success = () => {
    const {data} = this.state
    return (
      <>
        <Header />
        <div>
          <h1 className="ml-4 mb-4 mt-4">Courses</h1>
          <ul className="ul">
            {data.courses.map(each => (
              <Courses key={each.id} course={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  failed = () => (
    <div className="d-flex flex-column">
      <Header />
      <img
        className="w-25"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.getData()} className="w-25" type="button">
        Retry
      </button>
    </div>
  )

  renderData = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.loading()
      case 'success':
        return this.success()
      case 'failed':
        return this.failed()
      default:
        return null
    }
  }

  render() {
    return this.renderData()
  }
}

export default Home
