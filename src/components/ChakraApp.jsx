import React, { useState ,useEffect, useRef} from 'react';
//vstack --> its a div as flex and cloumn direction
import {Box,Container,VStack,Button,Input,HStack} from '@chakra-ui/react'
import Message from './Message';
import {GoogleAuthProvider,signInWithPopup,getAuth,onAuthStateChanged,signOut} from 'firebase/auth'
import {getFirestore,addDoc, collection, serverTimestamp,onSnapshot,query,orderBy} from 'firebase/firestore'
import app from '../firebase';

const auth = getAuth(app)
const db = getFirestore(app)

const signInWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    // .then(res=>console.log('res:',res))
    // .catch(err=>console.log('error in google',err))
}

const logoutHandler = ()=> signOut(auth)


// ****************** CHAT - APP ****************************
const ChakraApp = () => {
    const [user,setUser] = useState(false)
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const divForScroll = useRef(null)

    //onAUthStateChange is use only after component mount

    useEffect(() => {
    const q = query(collection(db,"Messages"),orderBy("createdAt","asc"))

     const unsubscribe =  onAuthStateChanged(auth,(data)=>{
        setUser(data)
      })

    const unsubscribeForMessage =  onSnapshot(q,(snap)=>{
        setMessages(snap.docs.map(item=>{
          const id = item.id
          return {id, ...item.data()}

        }))

     })

      return ()=>{
        unsubscribe();
        unsubscribeForMessage();
      }
    }, [])

    const submitHandler = async(e) => {
      e.preventDefault();
      try {
        setMessage("");
        await addDoc(collection(db,"Messages"),{
          text:message,
          uid:user.uid,
          uri:user.photoURL,
          createdAt:serverTimestamp()
        }) //"Messages" -> is collection name
        divForScroll.current.scrollIntoView({behavior:'smooth'});
      } 
      catch (err) {
        alert(err)
      }
    }
  return <Box bg={'red.100'}>
    {user?(<Container bg={"white"} h={"100vh"}>
        <VStack h={"full"} padding={'4'}> {/* 4 ---> 16px*/}
            <Button colorScheme={'red'} w={'full'} onClick={logoutHandler}>Logout</Button>

            <VStack h="full" w='full' overflowY="auto">
              {messages.map(message=>(
                <Message key={message.id} text={message.text} uri={message.uri} user={message.uid === user.uid ?"me":"other"}/>
              ))}
             
              <div ref={divForScroll}></div>
            </VStack>
            <form style={{width:'100%'}} onSubmit={submitHandler}>
                <HStack>
                <Input value = {message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter a Message...'/>
                <Button colorScheme={'purple'} type='submit'>send</Button>
                </HStack>
            </form>
        </VStack>
    </Container>):(
    <VStack h={'100vh'} justifyContent='center' >
        <Button onClick={()=>signInWithGoogle()} colorScheme={'purple'}>Sign In with Google</Button>
    </VStack>
    )}
  </Box>
}

export default ChakraApp