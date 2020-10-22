import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { Container } from './styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const orderByOptionsDefault = [
  { value: 'createdAt', label: 'Data de cadastro' }
]

export default function Order ({
  onChangeOrder,
  orderOptions,
  setPage,
  provider
}) {
  const classes = useStyles()

  const [sorting, setSorting] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [orderOptionsList, setOrderOptionsList] = useState([])

  useEffect(() => {
    setSorting('')
    setOrderBy('')
  }, [provider])

  useEffect(() => {
    orderOptions &&
      setOrderOptionsList([...orderByOptionsDefault, ...orderOptions])
  }, [provider])

  useEffect(() => {
    if (orderBy || sorting) {
      onChangeOrder({
        orderBy,
        sorting
      })
      setPage(1)
    }
  }, [orderBy, sorting])

  return (
    <Container>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Ordernar por</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={orderBy}
          onChange={event => setOrderBy(event.target.value)}
        >
          {orderOptionsList.map(o => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Ordenar de</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={sorting}
          onChange={event => setSorting(event.target.value)}
        >
          <MenuItem value={'desc'}>Maior para menor</MenuItem>
          <MenuItem value={'asc'}>Menor para maior</MenuItem>
        </Select>
      </FormControl>
    </Container>
  )
}
