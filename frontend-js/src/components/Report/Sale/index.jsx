import React from 'react'
import Pdf from 'react-to-pdf'

import { Container, Header, Page } from './styles'
const ref = React.createRef()
const Report = ({ sale }) => {
  return (
    <Container>
      <Pdf targetRef={ref} filename='code-example.pdf'>
        {({ toPdf }) => <button onClick={toPdf}>Gerar Pdf</button>}
      </Pdf>
      <Page ref={ref}>
        <Header>
          <img src={sale.company.url} alt='' />
          <div>
            <h1>CONTRATO DE VENDA DE VEÍCULOS</h1>
            <p>
              {sale.company.street}, {sale.company.complement} ‐{' '}
              {sale.company.city}, {sale.company.state}, {sale.company.zip_code}
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
              <p>Nome:{sale.user.name}</p>
              <p>
                Endereço:{sale.user.street} {sale.user.complement}
              </p>
              <p>Bairro:{sale.user.neighborhood}</p>
              <p>
                Telefones:{sale.user.whatsapp} / {sale.user.phone}
              </p>
              <p>Email:{sale.user.email}</p>
            </div>
            <div>
              <p>Cep:{sale.user.zip_code}</p>
              <p>
                Cidade/UF:{sale.user.city}/{sale.user.state}
              </p>
              <p>Profissão:{sale.user.profession}</p>
              <p>Origem da Venda:{sale.origin}</p>
            </div>
            <div>
              <p>CPF:{sale.user.cpf_cnpj}</p>
              <p>RG:{sale.user.rg}</p>
              <p>Data de nascimento:{sale.user.birth_date}</p>
              <p>CNH:{sale.user.cnh}</p>
            </div>
          </div>
        </div>

        <div className='as-vehicle'>
          <h2>DADOS DO VEÍCULO</h2>
          <div>
            <div>
              <p>Marca:{sale.vehicle.brand} </p>
              <p>Placa:{sale.vehicle.board}</p>
              <p>Renavam:{sale.vehicle.renavan}</p>
            </div>
            <div>
              <p>
                Modelo:{sale.vehicle.model} {sale.vehicle.type}
              </p>
              <p>Opcionais:{sale.vehicle.optional}</p>
              <p>Quilometragem atual:{sale.vehicle.km}</p>
            </div>
            <div>
              <p>
                Ano:{sale.vehicle.year}/{sale.vehicle.year_model}
              </p>
              <p>Cor:{sale.vehicle.color}</p>
              <p>Próxima troca de Óleo:{sale.next_exchange_oil}</p>
            </div>
          </div>
        </div>

        <div className='as-vehicle'>
          <h2>DOCUMENTAÇÃO / MULTAS</h2>
          <div>
            <div>
              <p>Último CRLV:{sale.last_crlv} </p>
              <p>IPVA PAGO:{sale.paid_out_ipva}</p>
            </div>
            <div>
              <p>Recibo (CRV) Entregue: {sale.delivered_receipt}</p>
              <p>Checklist de entrega realizado: {sale.checklist_delivery}</p>              
            </div>
            <div>
              <p>Recibo (CRV) a entregar:{sale.delivery_receipt}</p>
              <p>Duda Baixa Alienação:{sale.alienation_low}</p>              
            </div>
            <div>
              <p>Check auto:{sale.checklist_auto}</p>
              <p>Laudo Cautelar:{sale.report_precautionary}</p>              
            </div>
          </div>
          

          <div>
            <div>
              <p>Nada Consta:{sale.there_anything}</p>
            </div>
            <div>
              <p>Abatidas do Valor do Carro (Loja a pagar):{sale.discounted_sale_value}</p>
            </div>
            <div>
              <p>Não abatidas (Cliente a pagar){sale.not_discounted_sale_value}</p>
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
              <p>VALOR DO VEÍCULO:{sale.value}</p>
            </div>
            <div>
              <p>
                {' '}
                Entrada:{sale.vehicle_input_value}{' '}
                {sale.vehicle_input_value_description}
              </p>
              <p>
                Veículo/Troca:{sale.input_value} {sale.input_value_description}
              </p>
              <p>
                Valor a Financiar atual:{sale.financed_value}{' '}
                {sale.financed_value_financial}{' '}
                {sale.financed_value_description}
              </p>
            </div>
          </div>
        </div>
        <div className='as-vehicle'>
          <h2>INFORMAÇÕES ADICIONAIS</h2>
          <div>
            <div>
              <p>{sale.additional_note}</p>
            </div>
          </div>
        </div>
        <p>
          Declaro que adquiri o veículo acima e estou de acordo com as condições
          da negociação, assumindo a partir desta data e hora a responsabilidade
          por qualquer ocorrência de qualquer natureza com o mesmo (acidentes,
          multas, etc). Declaro que o veículo está em perfeitas condições e
          estou ciente que terei a garantia a partir desta data com validade de
          90 dias corridos ou 5.000km apenas da parte mecânica do motor e câmbio
          de marcha, não compreendendo a garantia de desgastes natural tais como
          embreagem, freios, pneus, escapamento, bateria, amortecedores e
          outros. Caso necessite de reparos no prazo da garantia o comprador
          deverá comunicar a loja imediatamente, não contemplando ressarcimento
          de gastos sem prévia autorização da Loja.
        </p>
        <p>
          Será automatimente cancelada a garantia por uso indevido, falta de
          revisão, colisão, alteração de caracteristicas originais no veículo
          (inclue GNV) ou venda para terceiros. Estou ciente que terei o prazo
          legal de 30(trinta) dias após o preenchimento do CRV para transferir o
          mesmo junto ao Detran. Autorizo ainda neste ato utilizar minha
          imagem/foto para uso em propagandas.
        </p>
        <p>
          Estou ciente que todas as custas de transferência incluindo Taxas de
          licenciamento serão acardas com meus recursos.
        </p>
      </Page>
    </Container>
  )
}

export default Report
