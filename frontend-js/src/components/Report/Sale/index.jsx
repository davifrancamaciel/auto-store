import React, { createRef } from 'react'
import Pdf from 'react-to-pdf'
import { FiDownload } from 'react-icons/fi'

import BackPage from '../../BackPage'

import { Container, Header, Page, PdfContainer } from './styles'
const ref = createRef()
const Report = ({ sale }) => {
  return (
    <Container>
      <Pdf targetRef={ref} filename='CONTRATO-DE-VENDA.pdf'>
        {({ toPdf }) => (
          <header>
            <button onClick={toPdf}>
              <FiDownload /> <span>Baixar contrato</span>
            </button>
            <BackPage />
          </header>
        )}
      </Pdf>
      <PdfContainer>
        <Page ref={ref}>
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
                <p>
                  Endereço:
                  <span>
                    {sale.user.street} {sale.user.complement}
                  </span>
                </p>
                <p>
                  Bairro:<span>{sale.user.neighborhood}</span>
                </p>
                <p>
                  Telefones:
                  <span>
                    {sale.user.whatsapp} / {sale.user.phone}
                  </span>
                </p>
                <p>
                  Email:<span>{sale.user.email}</span>
                </p>
              </div>
              <div>
                <p>
                  Cep:<span>{sale.user.zip_code}</span>
                </p>
                <p>
                  Cidade/UF:
                  <span>
                    {sale.user.city}/{sale.user.state}
                  </span>
                </p>
                <p>
                  Profissão:<span>{sale.user.profession}</span>
                </p>
                <p>
                  Origem da Venda:<span>{sale.origin}</span>
                </p>
              </div>
              <div>
                <p>
                  CPF:<span>{sale.user.cpf_cnpj}</span>
                </p>
                <p>
                  RG:<span>{sale.user.rg}</span>
                </p>
                <p>
                  Data de nascimento:<span>{sale.user.birth_date}</span>
                </p>
                <p>
                  CNH:<span>{sale.user.cnh}</span>
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
                <p>
                  Placa:<span>{sale.vehicle.board}</span>
                </p>
                <p>
                  Renavam:<span>{sale.vehicle.renavan}</span>
                </p>
              </div>
              <div>
                <p>
                  Modelo:
                  <span>
                    {sale.vehicle.model} {sale.vehicle.type}
                  </span>
                </p>
                <p>
                  Opcionais:<span>{sale.vehicle.optional}</span>
                </p>
                <p>
                  Quilometragem atual:<span>{sale.vehicle.km}</span>
                </p>
              </div>
              <div>
                <p>
                  Ano:
                  <span>
                    {sale.vehicle.year}/{sale.vehicle.year_model}
                  </span>
                </p>
                <p>
                  Cor:<span>{sale.vehicle.color}</span>
                </p>
                <p>
                  Próxima troca de Óleo:<span>{sale.next_exchange_oil}</span>
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
                <p>
                  IPVA PAGO:<span>{sale.paid_out_ipva}</span>
                </p>
              </div>
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
              <div>
                <p>
                  Abatidas do Valor do Carro (Loja a pagar):
                  <span>{sale.discounted_sale_value}</span>
                </p>
              </div>
              <div>
                <p>
                  Não abatidas (Cliente a pagar):
                  <span>{sale.not_discounted_sale_value}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Auto de Infração</th>
                      <th> Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Auto de Infração</th>
                      <th> Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Auto de Infração</th>
                      <th> Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='as-vehicle'>
            <h2>VALORES E FORMA DE PGTO</h2>
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
