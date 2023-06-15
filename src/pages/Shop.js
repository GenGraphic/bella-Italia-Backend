import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Table from 'react-bootstrap/table';
import Container from 'react-bootstrap/Container';
import EditScreen from '../comp/EditScreen';

const Shop = () => {
    const [shopItems, setShopItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [edit, setEdit] = useState(false);
    const [idToEdit, setIdToEdit] = useState();
    const navigator = useNavigate();
   

    const handleEditScreen = (id) => {
        setIdToEdit(id);
        setEdit(true);
    }

    useEffect(() => {
        isUserLogedIn();
        handleFetchData();
    }, [])

    //check if the user is loged in
    //function that runs when the page is loaded
    const isUserLogedIn = () => {
            //api request to logout the use
            fetch('https://bellaitaliaa.com/api/checkStatus.php')
                .then(response => response.json())
                .then(data => {
                    if(data.success === false) {
                        navigator('/');
                    }else {
                        console.log('Some error');
                    }
                }) 
                .catch(error => {
                    console.log(error);
                })
    }

    //get items from db
    const handleFetchData = () => {
        fetch('https://bellaitaliaa.com/api/get_shopItems.php')
            .then(response => response.json())
            .then(data => {
                setShopItems(data);
            })
            .catch(error => {
                console.log("Error: ,", error);
        })
    }

    //delete line from db Table
    const removeItem = (idToRemove) => {
        const formData = new FormData();
        formData.append('id', idToRemove);

        fetch('https://bellaitaliaa.com/api/delete_item.php', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          window.location.reload(false);
        })
        .catch(error => {
          console.log(error);
          // Handle error or display an error message
        });
      }
      

    const handleRemoveItem = (id) => {
        if( window.confirm('Bist du dir Sicher?')) {
            removeItem(id);
            console.log('Thing was removed from the database.');
        } else {
            console.log('Thing was not removed from the database.', id);
        }
    }

  return (
    <>
    {edit && 
        <EditScreen id={idToEdit} toggleScreen={setEdit}/>
    }

    <Container>
        <h1>Aktuelle Artikle:</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Bezeichnung</th>
                    <th>Image Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Video Link</th>
                    <th>Im Lager</th>
                    <th>Sold Out?</th>
                    <th>Aktion</th>
                </tr>
            </thead>
            <tbody>
                {shopItems.map((items) => {
                    return (
                        <tr key={items.item_id}>
                            <td>{items.item_id}</td>
                            <td>{items.name}</td>
                            <td>{items.image}</td>
                            <td>{items.price}</td>
                            <td>{items.description}</td>
                            <td>{items.video}</td>
                            <td>{items.stock}</td>
                            <td>{items.soldOut}</td>
                            <td className=''>
                                <img onClick={() => handleRemoveItem(items.item_id)} src={require('../images/remove.png')} alt='Remove element' width={20} />
                                <img onClick={() => handleEditScreen(items.item_id)} src={require('../images/edit.png')} alt='Remove element' width={20} />
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </Table>
    </Container>
    </>
  )
}

export default Shop
