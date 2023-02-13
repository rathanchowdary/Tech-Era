import {Link} from 'react-router-dom'
import './index.css'

const Courses = props => {
  const {course} = props

  const {id, name, logoUrl} = course

  return (
    <li className="mb-4 d-flex w-25">
      <Link className="d-flex align-items-center w-25" to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <h1 className="heading ml-3">{name}</h1>
      </Link>
    </li>
  )
}

export default Courses
