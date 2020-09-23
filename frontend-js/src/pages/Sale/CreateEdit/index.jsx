import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from '@rocketseat/unform'

import Container from '../../../components/_layouts/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'

import showToast from '../../../Utils/showToast'
import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import { priceToNumber } from '../../../Utils/formatPrice'

import Client from './Client'
import Vehicle from './Vehicle'
// import { Container } from './styles';

const SaleCreateEdit = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState({})
  const [vehicle, setVehicle] = useState({})
  const [sale, setSale] = useState({})

  return (
    <Container title={`Venda de veículos`}>
      <FormContainer loading={loading} large>
        <Form>
          <Client setClient={setClient} client_id={sale.client_id} />
          <Vehicle setVehicle={setVehicle} vehicle_id={sale.vehicle_id} />
          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default SaleCreateEdit
