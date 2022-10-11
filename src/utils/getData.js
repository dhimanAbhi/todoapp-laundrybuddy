import {collection, addDoc, getDocs} from 'firebase/firestore'
import { database } from '../firebaseConfig';



const userAccessToken = localStorage.getItem('userAccessToken')
const collectionRef = collection(database, 'todoData')

 const allItemsData = {itemData:null}

 allItemsData.promise = getDocs(collectionRef)
                        .then((response) => {
                            let data = response.docs.map(item => {
                                if(item.data().userAccessToken === userAccessToken)
                                    return item.data()
                            })
                            
                            allItemsData.itemData =  data
                        })
                        .catch((err) => {
                            console.log(err)
                        })
    

    export default allItemsData

