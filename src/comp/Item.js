import React, {useState, useEffect, useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemsContext from '../context/ItemsContext';


const Item = ({id, calculateTotal}) => {
    const [totalItem, setTotalItem] = useState(0.00);
    const [menge, setMenge] = useState(0);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState();

    const { editItem } = useContext(ItemsContext);

    const [dubBool, setDumBoll] = useState(false) 

    //when menge or the price is being modified, the total is being calculated
    useEffect(() => {
        const totalPrice = Number(menge) * Number(price);

        setTotalItem(totalPrice);

    }, [menge, price])


    //everytime the input fields are used, the list beeing changed
    useEffect(() => {
      editItem(id, name, menge, price, totalItem); //change the value in  items Context
    },[totalItem, menge, price, name])

  return (
    <Container fluid className='mt-2 mb-2 border-bottom'>
        <Row className='justify-content-between d-flex flex-row'>
            <Col className='col-1'>
              <p className='m-0'>{id}.</p>
            </Col>
            <Col className='col-5'>
              <input className='w-100' type='text' placeholder='Bezeichnung' onChange={(text) => setName(text.target.value)}/>
            </Col>
            <Col className='col-2'>
              <input 
                onChange={(text) => setMenge(text.target.value)}
                className='w-50' 
                type='number' 
                placeholder='Anzahl'
                min='0'
              />
            </Col>
            <Col className='col-2'>
              <input
                onChange={(text) => setPrice(text.target.value)} 
                className='w-50' 
                type='number' 
                placeholder='Einzelpreis'
                min='0'  
              />
            </Col>
            <Col className='col-2 text-end'>
              <p className='m-0'>{totalItem.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'})}</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Item