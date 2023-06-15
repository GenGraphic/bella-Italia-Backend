import React, {createContext, useState} from "react";

const ItemsContext = createContext();

export function ItemsProvider ({children}) {
    const [totalNetto, setTotalNetto] = useState();  

    const [itemsArray, setItemsArray] = useState([
        {
            id: 1,
            name: 'Muster',
            number: 0,
            price: 0,
            total: 0,
        },
        
    ]);

    //add new empty item in list
    const handleNewItem = () => {
        const newList = itemsArray;        

        setItemsArray((prevState) => [...prevState, 
            {
                id: itemsArray.length + 1,
                name: '',
                number: 0,
                price: 0,
                total: 0
            }
        ]);
    };

    //edit this element
    const editItem = (id, newName, newMenge, newPrice, newTotal) => {
        itemsArray.find(x => x.id === id).name = newName;
        itemsArray.find(x => x.id === id).number = newMenge;
        itemsArray.find(x => x.id === id).price = newPrice;
        itemsArray.find(x => x.id === id).total = newTotal;
        
        let newNetto = 0;

        itemsArray.map((item) =>{
            newNetto = newNetto + item.total;
        })

        setTotalNetto(newNetto);
    }

    return (
        <ItemsContext.Provider value={{itemsArray, setItemsArray, handleNewItem, editItem, totalNetto}}>{children}</ItemsContext.Provider>
    )
}

export default ItemsContext;