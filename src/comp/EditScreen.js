import React, {useEffect, useState} from 'react';

import styles from '../css/editScrenn.module.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EditScreen = ({toggleScreen, id}) => {
    const [itemToEdit, setItemToEdit] = useState({});

    //var to populate the fields
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description ,setDescription] = useState('');
    const [soldOut, setSoldOut] = useState(0);
    const [video, setVideo] = useState('');
    const [image, setImage] = useState('');

    //fecch data from db and sort with ID
    useEffect(() => {
        fecthIDData(id);
    }, [])

    useEffect(() => {
        asignValuesFields();
    }, [itemToEdit])

    //take the itemToEdit obj and asign its value to each field value
    //when inputs are changed and submited, the values changed to be sent to db
    const asignValuesFields = () => {
        setTitle(itemToEdit.name);
        setPrice(itemToEdit.price);
        setDescription(itemToEdit.description);
        setSoldOut(itemToEdit.soldOut);
        setVideo(itemToEdit.video);
        setImage(itemToEdit.image); 
    }

    //get data from db and asign get the item with right id (itemToEdit)
    const fecthIDData = (id) => {
        fetch('https://bellaitaliaa.com/api/get_shopItems.php')
            .then(response => response.json())
            .then(result => {
                // Assuming the API returns an array of objects,
                // find the element with the desired ID
                const element = result.find(item => item.item_id === id);
                setItemToEdit(element);
            })
            .catch(error => {
                console.log(error);
            });
    };

    //send the new data to the API to be updated in DB
    const editProduckt = () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('soldOut', soldOut);
        formData.append('video', video);
        formData.append('image', image);

        fetch('https://bellaitaliaa.com/api/edit_item.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.succes);
                window.location.reload(false);
                // Handle success or display a success message
            })
            .catch(error => {
                console.log(error)
            })
    }

  return (
    <div className={styles.body}>
        <Container className={styles.cont}>
            <Row className={styles.topBar}>
                <Col>
                    <h6>Edit Screnn</h6>
                </Col>
                <Col className='text-end'>
                    <img onClick={() => toggleScreen(false)} src={require('../images/close.png')} width={15} height={15}/>
                </Col>
            </Row>

            <Row className='d-flex justify-content-between m-5'>
                <Col className='col-auto gap-5 d-flex flex-column justify-content-between'>
                    <label htmlFor="name">Title:</label>
                    <label htmlFor="Price">Price:</label>
                    <label htmlFor="Description">Beschreibung:</label>
                    <label htmlFor="SoldOut">Sold out</label>
                    <label htmlFor="Image">Bild:</label>
                    <label htmlFor="Video">Video</label>

                </Col>
                <Col className='col gap-5 d-flex flex-column'>
                    {Object.keys(itemToEdit).length > 0 && ( // Check if itemToEdit is not empty
                    <>
                        <input name='name' type='text' defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input name='Price' type='number' defaultValue={price} onChange={(e) => setPrice(e.target.value)}/>
                        <textarea rows={5} name='Description' type='text' defaultValue={description} onChange={(e) => setDescription(e.target.value)}/>
                        <input name='SoldOut' type='number' defaultValue={soldOut} onChange={(e) => setSoldOut(e.target.value)}/>
                        <input type='file' defaultValue={image} name='Image' onChange={(e) => setImage(e.target.files[0])}/>
                        <input type='file' defaultValue={video} name='Video' onChange={(e) => setVideo(e.target.files[0])}/>
                    </>
                    )}
                </Col>
            </Row>

            <Button onClick={editProduckt}>Senden</Button>
        </Container>
    </div>
  )
}

export default EditScreen
