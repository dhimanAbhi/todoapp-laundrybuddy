import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function TodoApp() {
    const [newItem, setNewItem] = useState('')
    const [editItem, setEditItem] = useState('')
    const [itemList, setItemList] = useState([])
    
    const addItem = () => {

        if(!newItem){
            alert("Please add some task!")
        }
        else{
            setItemList([...itemList, {
                id: itemList.length,
                value: newItem,
                editState: false,
                toggleIcon: false
            }])    
        }
        setNewItem('')
    }

    const deleteItem = (index) => {
        setItemList(itemList.filter( el => el.id !== index ))
    }

    const beforeEditItem = (index, itemValues) => {

        if(editItem===''){
            setEditItem(itemList[index].value)
        }
        setItemList(itemList.map(item => {
            if(item.id === index)
            {
                return itemValues
            }
            return {...item, editState:false, toggleIcon:false }
        }))

    }


    useEffect(() => {
        console.log(itemList)
    },[itemList])


  return (
    <>
    <Title>Todo App</Title>
    <AddItem>
        <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}  />
        <button onClick={addItem}><Add /></button>
    </AddItem>
    <ItemList>
        {
            itemList ? 
                itemList.map(item => (
                    <Item key={item.id}>
                        {
                            

                            item.editState?
                            <input type="text" value={editItem} onChange={e => setEditItem(e.target.value)}  />
                            :
                            <div>{item.value}</div>
                        }
                        <ModifyItem>
                            {
                                item.toggleIcon ?
                                    <button onClick={() => beforeEditItem(item.id, {...item, editState:false, toggleIcon:false })} ><EditDone /></button>    
                                :
                                    <button onClick={() => beforeEditItem(item.id, {...item, value: editItem, editState:true, toggleIcon:true })} ><Edit /></button>
                            }
                            <button onClick={() => deleteItem(item.id)}><Delete/></button>
                        </ModifyItem>
                    </Item>
                )):''
        }
    </ItemList>
</>
    
  )
}

const Main = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    min-height: 500px;
    width: 650px;
    background-color: #ff206e;
    border-radius:3%;
    margin-bottom:70px;
    input{
        margin: 20px 0px;
    }
`
const Title = styled.div`
    font-size:54px;
    font-weight:bold;
    margin: 15px 0 30px 0;
`

const AddItem = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    background-color:#ffecd1;
    height:35px;
    width:220px;
    padding: 0px 6px 0px 10px;
    margin: 30px 0px;
    border-radius: 4px;
    input{
        background-color:#ffecd1;
        border: 0px;
        color: #343a40;
    }

    input:focus{
        border: none;
        outline:none;
    }


    button{
        cursor:pointer;
        display:flex;
        align-items:center;
        background-color: #001f54;
        border: 0px;
        color:#fff;
        padding:0;
        border-radius:2px;
        transition: 0.2s all;
    }

    button:hover{
        background-color:#00549e;
        color:#fff;
    }

`

const Add = styled(AddIcon)``

const ItemList = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

const Item = styled(AddItem)`
    display:flex;
    justify-content:space-between;
    background-color:#001f54;
    color:#fff;
    margin:17px 0 0 0;
    
    div{
        overflow:hidden;
    }
`
const ModifyItem = styled.div`
    display:flex;
    
    button{
        transform: scale(0.8);
    }

    button:hover{
        background-color:#001f54;
        color:#00ffff;
    }
`

const Edit = styled(EditIcon)``
const EditDone = styled(DoneOutlineIcon)`

`
const Delete = styled(DeleteForeverIcon)``

export default TodoApp