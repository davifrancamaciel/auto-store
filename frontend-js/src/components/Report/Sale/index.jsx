import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { FiPrinter } from 'react-icons/fi'

import BackPage from '../../BackPage'

import { Container, Header, Page, PdfContainer } from './styles'

const Report = ({ sale, expensesList, totalExpenseValue }) => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'CONTRATO DE VENDAS'
  })

  return (
    <Container>
      <header>
        <button onClick={handlePrint}>
          <FiPrinter /> <span>Imprimir contrato</span>
        </button>
        <BackPage />
      </header>

      <PdfContainer>
        <Page ref={componentRef}>
          <Header>
            <img src={sale.company.url} alt='' />
            <div>
              <h1>CONTRATO DE VENDA DE VEÍCULOS</h1>
              <p>
                {sale.company.street}, {sale.company.complement} ‐{' '}
                {sale.company.city}, {sale.company.state},{' '}
                {sale.company.zip_code}
              </p>
              <p>
                CNPJ {sale.company.cnpj} ‐ Fone {sale.company.whatsapp}
              </p>
              <p>{sale.company.site}</p>
            </div>
          </Header>
          <div className='as-client'>
            <h2>DADOS DO CLIENTE</h2>
            <div>
              <div>
                <p>
                  Nome:<span>{sale.user.name}</span>
                </p>
              </div>
              <div>
                <p>
                  Email:<span>{sale.user.email}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Telefones:
                  <span>
                    {sale.user.whatsapp} / {sale.user.phone}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Data de nascimento:<span>{sale.user.birth_date}</span>
                </p>
              </div>
            </div>

            <div>
              <div>
                <p>
                  CPF:<span>{sale.user.cpf_cnpj}</span>
                </p>
              </div>
              <div>
                <p>
                  RG:<span>{sale.user.rg}</span>
                </p>
              </div>
              <div>
                <p>
                  CNH:<span>{sale.user.cnh}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Profissão:<span>{sale.user.profession}</span>
                </p>
              </div>
              <div>
                <p>
                  Origem da Venda:<span>{sale.origin}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Cep:<span>{sale.user.zip_code}</span>
                </p>
              </div>
              <div>
                <p>
                  Cidade/UF:
                  <span>
                    {sale.user.city}/{sale.user.state}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Bairro:<span>{sale.user.neighborhood}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Endereço:
                  <span>
                    {sale.user.street} {sale.user.complement}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='as-vehicle'>
            <h2>DADOS DO VEÍCULO</h2>
            <div>
              <div>
                <p>
                  Marca:<span>{sale.vehicle.brand} </span>
                </p>
              </div>
              <div>
                <p>
                  Modelo:
                  <span>
                    {sale.vehicle.model} {sale.vehicle.type}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Ano:
                  <span>
                    {sale.vehicle.year}/{sale.vehicle.year_model}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Cor:<span>{sale.vehicle.color}</span>
                </p>
              </div>
              <div>
                <p>
                  Renavam:<span>{sale.vehicle.renavan}</span>
                </p>
              </div>
              <div>
                <p>
                  Placa:
                  <span className='as-to-uppercase'>{sale.vehicle.board}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Opcionais:<span>{sale.vehicle.optional}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Quilometragem atual:<span>{sale.vehicle.km}</span>
                </p>
              </div>
              <div>
                <p>
                  Próxima troca de óleo:<span>{sale.next_exchange_oil}</span>
                </p>
              </div>
            </div>
          </div>

          <div className='as-vehicle'>
            <h2>DOCUMENTAÇÃO / MULTAS</h2>
            <div>
              <div>
                <p>
                  Último CRLV:<span>{sale.last_crlv}</span>
                </p>
              </div>

              <div>
                <p>
                  IPVA PAGO:<span>{sale.paid_out_ipva}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Recibo (CRV) Entregue:<span>{sale.delivered_receipt}</span>
                </p>
                <p>
                  Checklist de entrega realizado:
                  <span>{sale.checklist_delivery}</span>
                </p>
              </div>
              <div>
                <p>
                  Recibo (CRV) a entregar:<span>{sale.delivery_receipt}</span>
                </p>
                <p>
                  Duda Baixa Alienação:<span>{sale.alienation_low}</span>
                </p>
              </div>
              <div>
                <p>
                  Check auto:<span>{sale.checklist_auto}</span>
                </p>
                <p>
                  Laudo Cautelar:<span>{sale.report_precautionary}</span>
                </p>
              </div>
            </div>

            <div>
              <div>
                <p>
                  Nada Consta:<span>{sale.there_anything}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Abatidas do valor da venda (cliente pagar):
                  <span>{sale.discounted_sale_value}</span>
                </p>
              </div>
              <div>
                <p>
                  Não abatidas (Loja pagar):
                  <span>{sale.not_discounted_sale_value}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <ul>
                  <li>
                    <p>Auto de Infração</p>
                    <p>Valor</p>
                  </li>
                  <li>
                    <p>Auto de Infração</p>
                    <p>Valor</p>
                  </li>
                </ul>
                <ul>
                  {expensesList.map(expense => (
                    <li key={expense.id}>
                      <p>{expense.description}</p>
                      <p>{expense.value}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className='as-vehicle'>
            <h2>VALORES E FORMA DE PAGAMENTO</h2>
            <div>
              <div>
                <p>
                  VALOR DO VEÍCULO:<span>{sale.value}</span>
                </p>
              </div>
              <div>
                <p>
                  Entrada:
                  <span>
                    {sale.input_value} {sale.input_value_description}
                  </span>
                </p>
                <p>
                  Veículo/Troca:
                  <span>
                    {sale.vehicle_input_value}{' '}
                    {sale.vehicle_input_value_description}
                  </span>
                </p>
                <p>
                  Valor a Financiar atual:
                  <span>
                    {sale.financed_value} {sale.financed_value_financial}{' '}
                    {sale.financed_value_description}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='as-vehicle'>
            <h2>INFORMAÇÕES ADICIONAIS</h2>
            <div>
              <div>
                <p>
                  <span>{sale.additional_note}</span>
                </p>
              </div>
            </div>
          </div>

          <p>
            Declaro que adquiri o veículo acima e estou de acordo com as
            condições da negociação, assumindo a partir desta data e hora a
            responsabilidade por qualquer ocorrência de qualquer natureza com o
            mesmo (acidentes, multas, etc). Declaro que o veículo está em
            perfeitas condições e estou ciente que terei a garantia a partir
            desta data com{' '}
            <strong>validade de 90 dias corridos ou 5.000km</strong> apenas da
            parte <strong>mecânica do motor e câmbio de marcha</strong>, não
            compreendendo a garantia de desgastes natural tais como embreagem,
            freios, pneus, escapamento, bateria, amortecedores e outros. Caso
            necessite de reparos no prazo da garantia o comprador deverá
            comunicar a loja imediatamente, não contemplando ressarcimento de
            gastos sem prévia autorização da Loja.
          </p>
          <p>
            Será automatimente cancelada a garantia por uso indevido, falta de
            revisão, colisão, alteração de caracteristicas originais no veículo
            (inclue GNV) ou venda para terceiros. Estou ciente que terei o prazo
            legal de 30(trinta) dias após o preenchimento do CRV para transferir
            o mesmo junto ao Detran. Autorizo ainda neste ato utilizar minha
            imagem/foto para uso em propagandas.
          </p>
          <p>
            Estou ciente que todas as custas de transferência incluindo Taxas de
            licenciamento serão acardas com meus recursos.
          </p>

          <div className='as-footer'>
            <p>
              {sale.company.city} {sale.sale_date}
            </p>
            <div>
              <div>
                <hr />
                <p>
                  <i>{sale.user.name}</i>
                </p>
              </div>
              <div>
                <hr />
                <p>
                  <i>{sale.company.name}</i>
                </p>
              </div>
            </div>
          </div>
        </Page>
      </PdfContainer>
    </Container>
  )
}

export default Report
