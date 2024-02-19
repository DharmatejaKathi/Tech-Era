import {Link} from 'react-router-dom'

import './index.css'

const CourseList = props => {
  const {listDetails} = props
  const {logoUrl, name, id} = listDetails
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="list">
        <img className="logo" src={logoUrl} alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseList
