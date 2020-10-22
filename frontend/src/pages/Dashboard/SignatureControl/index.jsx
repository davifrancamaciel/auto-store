import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  parseISO,
  formatDistance,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore
} from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import pt from 'date-fns/locale/pt'

import { signOut } from '../../../store/modules/auth/actions'
import showToast from '../../../Utils/showToast'
import addDays from '../../../Utils/addDays'

import { InfoDays } from './styles'

function SignatureControl ({ company }) {
  const dispatch = useDispatch()
  const [companyFormated, setCompanyFormated] = useState({})

  useEffect(() => {
    if (!company.expires_at) return

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const checkDate = setMilliseconds(
      setSeconds(setMinutes(setHours(parseISO(company.expires_at), 0), 0), 0),
      0
    )

    const compareDate = utcToZonedTime(checkDate, timezone)
    let companyFormatedObj = {
      name: company.name,
      expireWarning: isBefore(compareDate, addDays(10)),
      expired: isBefore(compareDate, new Date()),
      expiresFormated: `${formatDistance(
        parseISO(company.expires_at),
        new Date(),
        {
          addSuffix: false,
          locale: pt
        }
      )}`
    }
    console.log(companyFormatedObj)
    setCompanyFormated(companyFormatedObj)
  }, [company])

  useEffect(() => {
    verifySatusSignature(companyFormated)
  }, [companyFormated])

  function verifySatusSignature (companyFormated) {
    if (companyFormated && companyFormated.expired) {
      showToast.error(
        'O tempo de utilização do sistema Gestão flex expirou. Entre em contato conosco e renove sua assinatura.'
      )
      dispatch(signOut())
    }
  }

  return (
    <h2>
      Olá, {companyFormated.name} sua assinatura expira em{' '}
      <InfoDays expireWarning={companyFormated.expireWarning}>
        {companyFormated.expiresFormated}
      </InfoDays>
    </h2>
  )
}

export default SignatureControl

SignatureControl.propTypes = {
  company: PropTypes.object
}

SignatureControl.defautProps = {
  company: { expires_at: new Date(), name: '' }
}
