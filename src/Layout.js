import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import NoteList from "./NoteList";
import { v4 as uuidv4 } from "uuid";
import { currentDate } from "./utils";
import Login from "./Login";
import { useGoogleLogin ,googleLogout} from "@react-oauth/google";
import axios from "axios";

const localStorageKey = "lotion-v1";

function Layout() {
  const navigate = useNavigate();
  const mainContainerRef = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(-1);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (mainContainerRef.current) {
      const height = mainContainerRef.current.offsetHeight;
      mainContainerRef.current.style.maxHeight = `${height}px`;
    }
    const existing = localStorage.getItem(localStorageKey);
    if (existing) {
      try {
        setNotes(JSON.parse(existing));
      } catch {
        setNotes([]);
      }
    }
  }, []);

  useEffect (()=>{
    const asyncEffect = async() => {
      if (email){
        let promise = null;
        promise = await fetch(`https://vf7yt7dtbvny4xzibsvx57rkza0ssjvp.lambda-url.ca-central-1.on.aws/?e-mail=${email}`, {
          method: "GET",
        });
        if (promise.status === 200){
          const note = await promise.json();
          setNotes(note);
        }
      }
    };
    asyncEffect();
    
  },[email])

  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    setEmail(res.data.email)
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);

useEffect(() => {
  const userFromStorage = localStorage.getItem('user');
  if (userFromStorage && !profile) {
    const userObj = JSON.parse(userFromStorage);
    setUser(userObj);
    setProfile(true);
  }
}, [setUser, profile]);












  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (currentNote < 0) {
      return;
    }
    if (!editMode) {
      navigate(`/notes/${currentNote + 1}`);
      return;
    }
    navigate(`/notes/${currentNote + 1}/edit`);
  }, [notes]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed", error)
  })

  const logOut = () => {
    googleLogout();
    localStorage.removeItem("user");
    setProfile(null);
    setUser(null);
    setEmail(null);
};

  const saveNote = async (note, index) => {
    note.body = note.body.replaceAll("<p><br></p>", "");
    setNotes([
      ...notes.slice(0, index),
      { ...note },
      ...notes.slice(index + 1),
    ]);
    console.log(profile.email);
    console.log('Hi')

    const res = await fetch("https://pvucpztu4i4gp32kzcvgplsmgy0iswnv.lambda-url.ca-central-1.on.aws/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...note, "e-mail":profile.email}),
      
    });
    
    try {
      const jsonRes = await res.json();
      console.log(jsonRes);
    } catch (error) {
      console.error(error);
    }
    




    setCurrentNote(index);
    setEditMode(false);
  };

  const deleteNote = async (index) => {
    const id = notes[index].id;
    
    setEditMode(false);

    const res = await fetch("https://2554vovcisooct7masmag2zvdu0eyssd.lambda-url.ca-central-1.on.aws/",{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {id:id, "e-mail":profile.email}
      ),
    });
    setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
    setCurrentNote(0);

    try {
      const jsonRes = await res.json();
      console.log(jsonRes);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = () => {
    setNotes([
      {
        id: uuidv4(),
        title: "Untitled",
        body: "",
        when: currentDate(),
      },
      ...notes,
    ]);
    setEditMode(true);
    setCurrentNote(0);
  };

  return (
    <div id="container">
      <header>
        <aside>
          <button id="menu-button" onClick={() => setCollapse(!collapse)}>
            &#9776;
          </button>
        </aside>
        <div id="app-header">
          <h1>
            <Link to="/notes">Lotion</Link>
          </h1>
          <h6 id="app-moto">Like Notion, but worse.</h6>
        </div>
        <aside>&nbsp;</aside>
        <button onClick={()=> logOut() }>Logout, {email} </button>
      </header>
      {!profile ? (<Login 
       email = {email}
       setEmail= {setEmail}
       profile = {profile}
       setProfile = {setProfile}
       user = {user}
       setUser = {setUser}
       
       
       /> ):(
        <>
        <div id="main-container" ref={mainContainerRef}>
        <aside id="sidebar" className={collapse ? "hidden" : null}>
          <header>
            <div id="notes-list-heading">
              <h2>Notes</h2>
              <button id="new-note-button" onClick={addNote}>
                +
              </button>
            </div>
          </header>
          <div id="notes-holder">
            <NoteList notes={notes} />
          </div>
        </aside>
        <div id="write-box">
          <Outlet context={[notes, saveNote, deleteNote]} />
        </div>
      </div>
    
      </>


      )}
      </div>
      
  );
}

export default Layout;