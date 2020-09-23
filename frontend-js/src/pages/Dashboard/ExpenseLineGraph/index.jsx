import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import { formatPrice } from '../../../Utils/formatPrice'
import api from '../../../services/api'

const options = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return formatPrice(tooltipItem.value)
      }
    }
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          tooltipFormat: 'DD/MM/YYYY',//''ll',
         
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format('0a')
          }
        }
      }
    ]
  }
}

const buildChartData = data => {
  return data.map(item => ({
    y: Number(item.value),
    x: item.date
  }))
}

function LineGraph ({ ...props }) {
  const [data, setData] = useState({})

  useEffect(() => {
    async function loadExpenses () {
      const response = await api.get('dashboard-expenses-graph')
      let dataFormated = buildChartData(response.data)

      setData(dataFormated)
    }

    loadExpenses()
  }, [])

  return (
    <div>
      {data?.length > 0 && (
        <div className={props.className}>
          <h3>Despesas</h3>
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: 'rgb(47,135,191)',
                  borderColor: '#ff8d08',
                  data: data
                }
              ]
            }}
            options={options}
          />
        </div>
      )}
    </div>
  )
}

export default LineGraph
