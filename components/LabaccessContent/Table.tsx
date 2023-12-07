import React from 'react'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enableIFrame: false,
      iframeLink: '',
    }
  }

  handleIframe = () => {
    this.setState({
      enableIFrame: true,
      iframeLink: '',
    })
  }

  render() {
    let data = [
      {
        col1: '1',
        col2: '2',
        col3: '3',
        col4: '4',
        col5: '5',
        col6: '6',
        col7: (
          <button
            style={{ marginLeft: '3em', padding: '0.3em' }}
            onClick={this.handleIframe.bind(this)}
          >
            goto lab
          </button>
        ),
      },
    ]
    const columns = [
      {
        Header: 'ID',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Lab Name',
        accessor: 'col2',
      },
      {
        Header: 'First Name',
        accessor: 'col3',
      },
      {
        Header: 'Last Name',
        accessor: 'col4',
      },
      {
        Header: 'Team Name',
        accessor: 'col5',
      },
      {
        Header: 'Email Id',
        accessor: 'col6',
      },
      {
        Header: 'Access Links',
        accessor: 'col7',
        filterable: false,
      },
    ]
    return (
      <div>
        <ReactTable
          sortable={false}
          filterable={true}
          data={data}
          columns={columns}
          defaultPageSize={10}
          pageSizeOptions={[10, 50, 100]}
        />
        {this.state.enableIFrame ? (
          <div style={{ marginTop: '5em' }}>
            <iframe
              src="https://cloudlabs.nuvepro.com/"
              height="600"
              width="100%"
              frameBorder="0"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}
