// import logo from './logo.svg';
import './App.css';
import { Button, Form ,Toast} from 'react-bootstrap';
import {  useState } from "react"
const axios = require('axios');

function App() {


  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);


  function sendMessage(e) {
    e.preventDefault();

    console.log("text: ", text);

    setMessages((prev) => {
      return [{ sender: "user", text: text }, ...prev];
    });

    axios.post(`http://localhost:5000/talktochatbot`, {
      text: text
    })
      .then((response) => {
        console.log("response", response.data.text);

        setMessages((prev) => {
          return [{ sender: "bot", text: response.data.text }, ...prev];
        });
        e.target.reset();
        setText("");

      }).catch(error => {
        console.log("error: ", error);

        setMessages((prev) => {
          return [{ sender: "bot", text: "dummy response from chatbot" }, ...prev,];
        });
        e.target.reset();
        setText("");

      })
  }

  return (
    <div>

      <Form onSubmit={sendMessage} required>
        <Form.Group
          style={{
            display: "flex",
            justifyContent: "space-between"
          }} className="mb-3" controlId="formBasicEmail" required>

          <Form.Control
            onChange={(e) => { setText(e.target.value) }}
            type="text" required
            placeholder="Enter your message"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>

      <br />
      <br />
      <br />

      <div style={{ display: "flex", flexDirection: "column" }}>

        {messages?.map((eachMessage, eachMessageIndex) => (
          <div key={`${eachMessageIndex}-message`} style={{
            display: "flex",
            justifyContent: (eachMessage.sender === "user") ? "flex-end" : "flex-start"
          }}>


<div>
              <Toast className='user_data'>
                <Toast.Header>
                  {/* <img src="holder.js/20x20?text=%20"  alt="" /> */}
                  <strong className="me-auto"></strong>
                  <small>just now</small>
                </Toast.Header>
                <Toast.Body variant="success">{eachMessage.text}</Toast.Body>
              </Toast>
            </div>
            {/* <div>{eachMessage.text}</div> */}
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;
