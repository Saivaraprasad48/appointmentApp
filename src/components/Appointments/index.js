import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    InitialAppointments: [],
    isFilterActive: false,
  }

  setDate = event => {
    this.setState({date: event.target.value})
  }

  setTitle = event => {
    this.setState({title: event.target.value})
  }

  triggerBtn = () => {
    const {title, date} = this.state
    const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: v4(),
      title,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      InitialAppointments: [...prevState.InitialAppointments, newAppointment],
      title: '',
      date: '',
    }))
  }

  isTrigger = id => {
    this.setState(prevState => ({
      InitialAppointments: prevState.InitialAppointments.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  triggerState = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentsList = () => {
    const {InitialAppointments, isFilterActive} = this.state

    if (isFilterActive) {
      return InitialAppointments.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return InitialAppointments
  }

  render() {
    const {isFilterActive, title, date} = this.state
    const getUpdatedDataList = this.getFilteredAppointmentsList()
    const styleStarred = isFilterActive ? 'active' : ' '

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading"> Add Appointments </h1>
          <div className="responsive-container">
            <div className="form">
              <label htmlFor="title" className="label">
                {' '}
                TITLE{' '}
              </label>
              <br />
              <input
                id="title"
                type="input"
                placeholder="Title"
                className="title-input "
                onChange={this.setTitle}
                value={title}
              />
              <br />
              <label htmlFor="date" className="label">
                {' '}
                DATE{' '}
              </label>
              <br />
              <input
                onChange={this.setDate}
                id="date"
                type="date"
                className="title-input pointer"
                Value={date}
              />
              <br />
              <button type="button" className="btn" onClick={this.triggerBtn}>
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr />
          <div className="appointment-container">
            <h1 className="app-container"> Appointments </h1>
            <button
              type="button"
              className={`starred ${styleStarred}`}
              onClick={this.triggerState}
            >
              {' '}
              Starred{' '}
            </button>
          </div>
          <ul className="list">
            {getUpdatedDataList.map(each => (
              <AppointmentItem
                key={each.id}
                isTrigger={this.isTrigger}
                details={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
