import './index.css'

const AppointmentItem = props => {
  const {details, isTrigger} = props
  const {title, date, id, isStarred} = details
  const url = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const handleClick = () => {
    isTrigger(id)
  }

  return (
    <li className="item-container">
      <div className="head-container">
        <h1 className="item-title"> {title} </h1>
        <button type="button" className="img-btn" onClick={handleClick}>
          <img src={url} className="img-card" alt="star" />
        </button>
      </div>
      <p className="item-date"> Date: {date} </p>
    </li>
  )
}

export default AppointmentItem
