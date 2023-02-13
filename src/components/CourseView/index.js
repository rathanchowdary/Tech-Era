import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

class CourseView extends Component {
  state = {status: 'loading', data: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    if (response.ok === true) {
      const detailedData = await response.json()

      const courseDetails = detailedData.course_details

      const updatedData = {
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
      }

      this.setState({data: updatedData, status: 'success'})
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
        <div className="d-flex">
          <img src={data.imageUrl} alt={data.name} />
          <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
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

export default CourseView
