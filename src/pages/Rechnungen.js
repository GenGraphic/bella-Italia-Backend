import React, {useContext, useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Item from '../comp/Item';
import ItemsContext from '../context/ItemsContext';
import RechnungPDF from '../comp/RechnungPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import styles from '../css/rechnung.module.css';
import { useNavigate } from 'react-router-dom';



const RechnungPage = () => {
  const router = useNavigate();
  const { itemsArray, handleNewItem, totalNetto } = useContext(ItemsContext);

  //this is for the PDFLink so it only load only once
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    isUserLogedIn();
    setIsClient(true)
  }, []);

  //check if the user is loged in
    //function that runs when the page is loaded
    const isUserLogedIn = () => {
      //api request to logout the use
      fetch('https://bellaitaliaa.com/api/checkStatus.php')
          .then(response => response.json())
          .then(data => {
              if(data.success === false) {
                  router('/');
              }else {
                  console.log('Some error');
              }
          }) 
          .catch(error => {
              console.log(error);
          })
    }

  //daten for Rechnung Element
  const [reciverName, setReciverName] = useState('Musterman');
  const [reciverStreetNr, setReciverStreetNr] = useState('Musterstreet');
  const [PLZOrt, setPLZOrt] = useState('00000, Musterort');
  const [datum, setDatum] = useState('12/12/2012');
  const [rechnungNr, setRechnungNr] = useState('01');
  const [tax, setTax] = useState(0);
  const [toPay, setToPay] = useState(0);

  //If totalNetto(is being calculated in Context) change, than calculate the tax
  useEffect(() => {
    setTax((19/100) * totalNetto);
  }, [totalNetto])
  //now if the tax changes, than recalculate the big total
  useEffect(() => {
    setToPay(totalNetto + tax)
  }, [tax])


  return (
    <>
        
        <Container>
          <Row>
            <Col>
              <h1>RECHNUNG</h1>
            </Col>
            <Col className='d-flex justify-content-end'>
              <img src={require("../images/logo.png")} alt='Logo' width={100}/>
            </Col>
          </Row>

          <Row>
            <Col className='d-flex flex-column'>
              <h4>An:</h4>
              <input type='text' placeholder='Name' onChange={(txt) => setReciverName(txt.target.value)}/>
              <input type='text' placeholder='Straße, Hausnummer' onChange={(txt) => setReciverStreetNr(txt.target.value)}/>
              <input type='text' placeholder='PLZ. Ort' onChange={(txt) => setPLZOrt(txt.target.value)}/>
            </Col>
            <Col className='d-flex flex-column align-items-end'>
              <h3>Von:</h3>
              <h5>Bella Italia</h5>
              <p className='m-0'>Siebenbürgerstr. 2d</p>
              <p className='m-0'>85368, Moosburg an der Isar</p>
            </Col>
          </Row>

          <Row className='mt-5'>
            <Col className='d-flex flex-column align-items-end'>
              <div>
                <label>Datum:</label>
                <input type='text' placeholder='dd/mm/yyy' onChange={(txt) => setDatum(txt.target.value)}/>
              </div>
              <div>
                <label>Rechnung Nummer:</label>
                <input type='number' placeholder='01' onChange={(txt) => setRechnungNr(txt.target.value)}/>
              </div>
            </Col>
          </Row>

          <Row className='mt-5'>
            <Col>
              <p>Sehr geehrter Kunde,</p>
              <p>vielen Dank, fur Ihren Auftrag. Vereinbarungsgemäß berechnen wir Ihnen hiermit folgende Leistungen:</p>
            </Col>
          </Row>
        </Container>

        <Container >
          <Row className={['p-1 justify-content-between d-flex flex-row', styles.header]}>
            <Col className='col-1'>
              <p className='m-0'>Position</p>
            </Col>
            <Col className='col-5'>
              <p className='m-0'>Bezeichnung</p>
            </Col>
            <Col className='col-2'>
              <p className='m-0'>Anzahl</p>
            </Col>
            <Col className='col-2'>
              <p className='m-0'>Einzelpreis</p>
            </Col>
            <Col className='col-2 text-end'>
              <p className='m-0'>Gesamtpreis</p>
            </Col>
          </Row>
          <Row>
            <Col className="col-12"> 
              <div id='ItemList'>
                {itemsArray.map((item) => {
                  return (
                    <Item
                    key={item.id}
                    id={item.id}
                    />
                  )
                })

                }
              </div> 
              
            </Col>

            <button type="button" className="btn btn-primary w-25" onClick={handleNewItem}>Add +</button>
          </Row>

          <Row>
            <Col className='col-12 d-flex justify-content-between border-bottom'>
              <p className='m-0'>Nettopreis</p>
              <p className='m-0'>{Number(totalNetto).toFixed(2)}€</p>
            </Col>
            <Col className='col-12 d-flex justify-content-between border-bottom'>
              <p className='m-0'>Zzgl 19% Ust.</p>
              <p className='m-0'>{Number(tax).toFixed(2)}€</p>
            </Col>
            <Col className={['col-12 d-flex justify-content-between', styles.tableBase]}>
              <p>Rechnungsbetrag</p>
              <p>{Number(toPay).toFixed(2)}€</p>
            </Col>
          </Row>
        </Container>

        <Container className='mt-5'>
          <Row>
            <p>
              Bitte überweisen sie den Rechnungsbetrag innerhalb von 14 Tagen auf unser unten genanntes Konto.
            </p>
            <p>
              Für weitere Fragen stehen Ihnen sehr gerne zur Verfügung.
            </p>
            <p>
              Mit freundlichen Grüßen<br/>
              Bella Italia
            </p>
          </Row>
        </Container>

        <Container className='mt-5'>
          <Row>
            <Col>
              <p className='m-0 blockquote-footer'>Bella Italia</p>
              <p className='m-0 blockquote-footer'>Siebenbürgerstr. 2d</p>
              <p className='m-0 blockquote-footer'>85360, Moosburg an der Isar</p>
              <p className='m-0 blockquote-footer'>bellaitaliaa@outlook.com</p>
            </Col>
            <Col>
              <p className='m-0 blockquote-footer'>Sparkasse Moosburg</p>
              <p className='m-0 blockquote-footer'>IBAN: DE67 7435 1740 0043 1818 64</p>
              <p className='m-0 blockquote-footer'>BIC: BYLADEM1MSB</p>
              <p className='m-0 blockquote-footer'>Sevdaim Bajrami</p>
            </Col>
            <Col>
              <p className='m-0 blockquote-footer'>St.-Nr: 115/202/41940</p>
              <p className='m-0 blockquote-footer'>ID: DE273707814</p>
              <p className='m-0 blockquote-footer'>Geschäftsführer: Sevdaim Bajrami</p>
              <p className='m-0 blockquote-footer'>www.bellaitaliaa.com</p>
            </Col>
          </Row>
        </Container>

        {isClient &&
          <Container>
            <Row>
              <PDFDownloadLink document={
              <RechnungPDF 
                reciverName={reciverName}
                reciverStreetNr={reciverStreetNr}
                PLZOrt={PLZOrt}
                datum={datum}
                rechnungNr={rechnungNr}
                itemsList={itemsArray}
                nettoPrice={totalNetto}
                tax={tax}
                toPay={toPay}
              />} fileName='Rechnung'>
                {({loading}) => (loading ? 
                  <Button>Loading document...</Button>
                  : 
                  <Button>Download</Button>
                  )}

              </PDFDownloadLink>
            </Row>
          </Container>
        }
        
    </>
  )
}

export default RechnungPage
