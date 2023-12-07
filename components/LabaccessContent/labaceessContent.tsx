import * as React from 'react'
import ReactTable from 'react-table'
import TableData from './Table'

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="labaccess-content-container">
        <h1>All Labs</h1>
        <TableData />
      </div>
    )
  }
}
