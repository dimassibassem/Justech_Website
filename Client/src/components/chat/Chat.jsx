import React, {useId, useRef, useState} from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
//
// import 'firebase/compat/analytics';
//
//
//
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat() {
    const [user] = useAuthState(auth);
    console.log(user);
    return (
        <div className="App">
            <header>
                <h1>⚛️🔥💬</h1>
                <SignOut/>
            </header>

            <section>
                {user ? <ChatRoom/> : <SignIn/>}
            </section>

        </div>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <button type="button" className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button type="button" className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}


function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(50);

    const [messages] = useCollectionData(query, {idField: 'id'});

   const filtredMessages = messages?.filter((msg) => msg.to === auth.currentUser.email || msg.from === auth.currentUser.email);

    console.log(messages);

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const {uid, photoURL, email, displayName} = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            displayName,
            uid,
            photoURL,
            from: email,
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL
        })

        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }
    const id = useId()
    return (<>
        <main>

            {filtredMessages && filtredMessages.map((msg, index) => <ChatMessage key={`${index + id}`} message={msg}/>)}

            <span ref={dummy}/>

        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice"/>

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}


function ChatMessage({message}) {
    const {text, uid, photoURL} = message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<div className={`message ${messageClass}`}>
        <img src={photoURL} alt=""/>
        <p>{text}</p>
    </div>)
}

export default Chat;
