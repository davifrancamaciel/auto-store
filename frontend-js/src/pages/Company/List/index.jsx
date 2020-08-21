import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import {
  parseISO,
  formatDistance,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore
} from 'date-fns'
import pt from 'date-fns/locale/pt'
import { utcToZonedTime } from 'date-fns-tz'

import Container from '../../../components/Container'
import ShowConfirm from '../../../components/ShowConfirm'
import NoData from '../../../components/NoData'
import LoadMore from '../../../components/LoadMore'

import ListItem from './ListItem'
import Search from './Search'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'

import { Main, Ul } from '../../../components/ListContainer/styles'

const CompanyList = () => {
  const profile = useSelector(state => state.user.profile)

  const [companies, setCompanies] = useState([])
  const [search, setSearch] = useState()
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function loadCompanies () {
      try {
        setLoading(true)

        const response = await api.get('companies', {
          params: { ...search, page }
        })

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const comaniesFormated = response.data.rows.map(company => {
          const checkDate = setMilliseconds(
            setSeconds(
              setMinutes(setHours(parseISO(company.expires_at), 0), 0),
              0
            ),
            0
          )
          const compareDate = utcToZonedTime(checkDate, timezone)

          const expired = isBefore(compareDate, new Date())
          return {
            ...company,
            image: getImage(company.image, company.name),
            expired,
            expires_at: `Expira${expired ? 'da' : ''} ${formatDistance(
              parseISO(company.expires_at),
              new Date(),
              { addSuffix: true, locale: pt }
            )}`
          }
        })

        if (page > 1) setCompanies([...companies, ...comaniesFormated])
        else setCompanies(comaniesFormated)

        setTotal(response.data.count)
        setNoData(comaniesFormated.length == 0)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    if (!profile.company_provider) {
      history.push('/dashboard')
      showToast.error('Usuário sem permissão para acessar lista de lojas.')
      return
    }

    loadCompanies()
  }, [search, page])

  async function handleDelete (item) {
    ShowConfirm('Atenção', `Confirma a remoção da loja ${item.name}?`, () =>
      handleDeleteConfirm(item.id)
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`companies/${id}`)

      showToast.success('Loja excluída com sucesso!')
      const updateCompanies = companies.filter(c => c.id !== id)
      setCompanies(updateCompanies)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      showToast.error(
        'Verfique se a loja ainda está vinculada a usuarios, clientes, despesas e etc... '
      )
      getValidationErrors(error)
    }
  }

  function handleUpdate (id) {
    history.push(`/company/edit/${id}`)
  }

  return (
    <Container title='Lojas' loading={loading ? Boolean(loading) : undefined}>
      <Search onSearch={setSearch} setPage={setPage} />
      <span>
        <Link to='/company/create'>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>

      {noData && <NoData text={`Não há dados para exibir :(`} />}
      <Main>
        <Ul>
          {companies.map(company => (
            <ListItem
              item={company}
              key={company.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </Ul>
      </Main>

      <LoadMore
        onClick={() => setPage(page + 1)}
        total={total}
        loadedItens={companies.length}
      />
    </Container>
  )
}

export default CompanyList
