💬 Project 59 – Chat UI + Messages API | Real-time Chat Interface | Single Repo
<p align="left"> <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white" alt="React 19.0.0"> <img src="https://img.shields.io/badge/Java-21-E76F00?logo=openjdk&logoColor=white" alt="Java 21"> <img src="https://img.shields.io/badge/Spring%20Boot-3.3.3-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot 3.3.3"> <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-38BDF8?logo=tailwindcss&logoColor=white" alt="TailwindCSS"> <img src="https://img.shields.io/badge/Axios-REST%20Client-D4AF00?logo=axios&logoColor=white" alt="Axios REST Client"> <img src="https://img.shields.io/badge/Apache%20Tomcat-10.1.30-D4AF00?logo=apachetomcat&logoColor=white" alt="Apache Tomcat 10.1.30"> <img src="https://img.shields.io/badge/Status-Completed-20B000" alt="Completed"> </p>

📖 Project Overview
Real-time Chat Interface is Project 59 of Tier 6 – Frontend Mastery with React, developed using React 19, Spring Boot 3.3.3, TailwindCSS 3.4.1, and Axios in a single monorepo.

React frontend running on port 3000 communicates with Spring Boot REST API running on port 9199 via Axios HTTP client.

Backend provides REST endpoints for:

/api/chat/messages GET
/api/chat/messages POST
/api/chat/messages/{id} DELETE
/api/chat/stats GET
/api/chat/test GET
The frontend visualizes the backend data with:

Chat sidebar with stats
Active chats list
Chat header with online status
Message bubbles - self and other
Auto reply from receiver
Type a message input
Send button
WhatsApp style background
Double tick read receipts
Real-time API updates
This single repository contains both backend and frontend, eliminating double repository management.

One clone gives the complete full-stack application.

Bug Fixed: AxiosError: Network Error was caused when the React frontend running on port 3000 could not access the Spring Boot backend running on port 9199. This was fixed by ensuring Spring Boot runs on port 9199, adding @CrossOrigin(origins = "*") in ChatController, and using Axios baseURL http://localhost:9199/api.

The embedded Git issue 160000 from previous projects was also fixed by deleting nested .git folders and keeping the project as a single repository.

✨ Features
Ravi's Chat
59/100 Project label
Chat sidebar
Messages Statistics
Online Users Statistics
Active Chats list
Alice - Project Partner
Online status
Active now indicator
Chat header
6 messages count
Message bubbles UI
Self messages - Right side green
Other messages - Left side white
WhatsApp style chat background
Hey 59! How's chat UI? message
Project 59 Working! message
Hello messages
Super! Working great! auto reply
Cool! Let's build 60 next! auto reply
Time stamps 09:20, 09:21, 11:10
Double tick ✓✓ read receipts
Type a message input
Send button
Auto scroll to latest message
Random auto replies
Got it! 👍
Nice! 59/100 🔥
Real-time chat updates
Live API integration
Axios REST API integration
CORS handling
React Hooks
useState
useEffect
useRef
Flexbox
Responsive chat layout
Rounded message bubbles
Single repository architecture
Backend + Frontend together
Spring Boot REST API
React frontend
CRUD-style chat operations
GET Messages API
POST Messages API
DELETE Messages API
GET Stats API
GET Test API
🛠 Technologies Used
React 19.0.0
Java 21
Spring Boot 3.3.3
TailwindCSS 3.4.1
CSS
Axios 1.6+
Spring Web
REST API
Maven 3.9+
JavaScript ES6+
Node.js
npm
Apache Tomcat 10.1.30
VS Code
STS
Eclipse IDE
📂 Project Structure - Single Repo
text
59-chat-ui/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── raviteja/
│   │       │           └── chat/
│   │       │               ├── ChatApplication.java
│   │       │               │
│   │       │               └── controller/
│   │       │                   └── ChatController.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   └── ChatUI.jsx
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   │
│   ├── package.json
│   └── package-lock.json
│
├── screenshots/
│   ├── demo1.png
│   ├── demo2.png
│   └── demo3.png
│
├── .gitignore
└── README.md
▶ How to Run - Single Repo
1⃣ Clone the Repository
bash
git clone https://github.com/raviteja-dev950/59-chat-ui.git
cd 59-chat-ui
2⃣ Run Backend First - Port 9199
Open STS / Eclipse IDE.

Import the backend folder as an Existing Maven Project.

Verify:

text
backend/src/main/resources/application.properties
Use:

properties
server.port=9199
spring.application.name=chat-api
3⃣ ChatController.java
Verify:

java
package com.raviteja.chat.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins="*")
public class ChatController {
    List<Map<String,Object>> messages=new ArrayList<>();

    public ChatController(){
        Map<String,Object> m1=new HashMap<>();
        m1.put("id",1); m1.put("user","Alice"); m1.put("text","Hey 59! How's chat UI? 🥰");
        m1.put("type","other"); m1.put("time","09:20");
        messages.add(m1);

        Map<String,Object> m2=new HashMap<>();
        m2.put("id",2); m2.put("user","You"); m2.put("text","Project 59 Working! 🔥");
        m2.put("type","self"); m2.put("time","09:21");
        messages.add(m2);
    }

    @GetMapping("/messages")
    public List<Map<String,Object>> getMessages(){ return messages; }

    @GetMapping("/test")
    public String test(){ return "WORKING 59!"; }

    @PostMapping("/messages")
    public Map<String,Object> sendMessage(@RequestBody Map<String, String> payload){
        Map<String,Object> msg=new HashMap<>();
        msg.put("id", messages.size()+1);
        msg.put("user", "You");
        msg.put("text", payload.get("text"));
        msg.put("type", "self");
        msg.put("time", java.time.LocalTime.now().toString().substring(0,5));
        messages.add(msg);
        return msg;
    }

    @GetMapping("/stats")
    public Map<String,Object> getStats(){
        Map<String,Object> stats=new HashMap<>();
        stats.put("totalMessages", messages.size());
        stats.put("onlineUsers", 2);
        stats.put("activeChats", 1);
        stats.put("unread", 1);
        return stats;
    }

    @DeleteMapping("/messages/{id}")
    public String deleteMessage(@PathVariable int id){
        messages.removeIf(m -> (int)m.get("id") == id);
        return "Deleted";
    }
}
4⃣ Run Backend
Right-click the project.

Select:

text
Run As → Spring Boot App
Check the console:

text
Tomcat initialized with port 9199 (http)
Tomcat started on port 9199 (http) with context path '/'
Started ChatApplication
Open:

text
http://localhost:9199/api/chat/test
Open:

text
http://localhost:9199/api/chat/messages
The backend should return JSON responses.

5⃣ Run Frontend - Port 3000
Open a new terminal.

bash
cd frontend
npm install
npm install axios
npm start
The React application will start on:

text
http://localhost:3000
6⃣ Axios API Configuration
Verify:

text
frontend/src/api/api.js
Use:

javascript
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9199/api"
});

export default api;
🔄 Application Flow
text
User
  │
  ▼
React Chat UI
localhost:3000
  │
  ▼
ChatUI.jsx
  │
  ├── useState
  ├── useEffect
  ├── useRef
  ├── Axios
  └── Chat Logic
  │
  ├── GET /api/chat/messages
  ├── POST /api/chat/messages
  ├── DELETE /api/chat/messages/{id}
  ├── GET /api/chat/stats
  └── GET /api/chat/test
  │
  ▼
Spring Boot REST API
localhost:9199
  │
  ▼
ChatController
  │
  ├── Messages
  ├── Stats
  └── Test
  │
  ▼
React Chat Interface
  │
  ├── Sidebar Stats
  ├── Active Chats
  ├── Chat Header
  ├── Message Bubbles
  │   ├── Self - Right Green
  │   └── Other - Left White
  │
  ▼
Type Message
  │
  ├── Hello
  └── What are you Doing?
  │
  ▼
POST Message
  │
  ▼
Auto Reply from Alice
  │
  ├── Super! Working great!
  └── Cool! Let's build 60 next!
  │
  ▼
Chat Updates
📊 Chat Statistics
Statistic	Value	Color
Messages	6	Blue
Online	2	Green
Active Chats	1	-
💬 Default Messages
ID	User	Text	Type	Time
1	Alice	Hey 59! How's chat UI? 🥰	other	09:20
2	You	Project 59 Working! 🔥	self	09:21
➕ Send New Message
Example:

text
Text: Hello
After clicking Send:

text
ID: 3
User: You
Text: Hello
Type: self
Time: 11:10
Auto reply after 1 second:

text
ID: 4
User: Alice
Text: Super! Working great!
Type: other
Time: 11:10
🗑 Delete Message
Call:

text
DELETE /api/chat/messages/3
The message is removed from the list.

📸 Screenshots
Demo 1 - Frontend Chat UI
React Chat UI running on:

text
http://localhost:3000
Image unavailable. Please retry the request.

Demo 2 - Backend Chat Messages API
Spring Boot Chat Messages API running on:

text
http://localhost:9199/api/chat/messages
Image unavailable. Please retry the request.

Demo 3 - Backend Chat Test API
Spring Boot Chat Test API running on:

text
http://localhost:9199/api/chat/test
Image unavailable. Please retry the request.

🧪 API Testing Examples
GET Test
bash
curl http://localhost:9199/api/chat/test
GET Messages
bash
curl http://localhost:9199/api/chat/messages
POST Send Message
bash
curl -X POST http://localhost:9199/api/chat/messages -H "Content-Type: application/json" -d "{\"text\":\"Hello\"}"
DELETE Message
bash
curl -X DELETE http://localhost:9199/api/chat/messages/3
GET Stats
bash
curl http://localhost:9199/api/chat/stats
📡 API Endpoints
Method	Endpoint	Description
GET	/api/chat/test	Test API is working
GET	/api/chat/messages	Get all chat messages
POST	/api/chat/messages	Send a new message
DELETE	/api/chat/messages/{id}	Delete a message
GET	/api/chat/stats	Get chat statistics
📥 Expected Test Response
text
WORKING 59!
📦 Expected Messages Response
json
[
  {
    "id": 1,
    "text": "Hey 59!",
    "time": "09:20",
    "type": "other",
    "user": "Alice"
  }
]
📊 Expected Stats Response
json
{
  "totalMessages": 6,
  "onlineUsers": 2,
  "activeChats": 1,
  "unread": 1
}
🧪 Frontend Testing
Test 1 - Backend Test
Open:

text
http://localhost:9199/api/chat/test
Verify:

text
WORKING 59!
Test 2 - Backend Messages
Open:

text
http://localhost:9199/api/chat/messages
Verify the messages JSON response.

Test 3 - Frontend Chat UI
Open:

text
http://localhost:3000
Verify:

Ravi's Chat header
Messages and Online stats
Active Chats list
Alice - Project Partner
Chat bubbles
Test 4 - Send Message
Enter:

text
Text: Hello
Click Send.

Verify:

Right side green bubble
Time 11:10
Double tick ✓✓
Test 5 - Auto Reply
After sending Hello, wait 1 second.

Verify:

Left side white bubble
Super! Working great!
Cool! Let's build 60 next!
Test 6 - Verify Colors
text
Self Message → Green #D9FDD3
Other Message → White #FFFFFF
Header → #F0F2F5
Send Button → #00A884
Online → #00A884
🎯 Learning Outcomes
Understanding Full Stack Chat application architecture
Understanding Single Repo / Monorepo architecture
Creating REST APIs using Spring Boot
Using @RestController
Using @RequestMapping
Using @GetMapping
Using @PostMapping
Using @DeleteMapping
Creating /api/chat/* endpoints
Configuring CORS using @CrossOrigin
Connecting React with Spring Boot
Using Axios for REST API communication
Creating Axios instance with baseURL
Using React useState
Using React useEffect
Using React useRef for auto scroll
Fetching messages from backend
Sending messages through POST requests
Deleting messages through DELETE requests
Managing chat state
Creating controlled React inputs
Creating chat sidebar
Creating chat header
Building message bubbles
Differentiating self and other messages
Implementing auto reply logic
Implementing random replies
Building Flexbox layouts
Creating WhatsApp style UI
Implementing real-time UI updates
Running React and Spring Boot simultaneously
Running frontend on port 3000
Running backend on port 9199
Handling JSON data between React and Java
Debugging Axios Network Error
Understanding CORS issues
Fixing nested Git repository issues
Building a professional full-stack monorepo
Understanding Monorepo vs Separate Repository architecture
🚀 Future Enhancements
➕ Add Edit Message functionality
🔍 Add Search Messages
📎 Add Image Sharing
😊 Add Emoji Picker
🎤 Add Voice Message
📞 Add Video Call UI
👥 Add Group Chat
✅ Add Message Seen Status
⌨ Add Typing Indicator
🌙 Add Dark / Light Theme
🔐 Add JWT Authentication
👑 Add User Authentication
🖼 Add Profile Picture Upload
🗄 Switch in-memory data to MySQL
🗄 Add Spring Data JPA
☁ Deploy Frontend to Vercel
☁ Deploy Backend to Render
🧪 Add Jest Tests
🧪 Add React Testing Library
📱 Improve Mobile Responsiveness
⏰ Add Last Seen
📈 Add Online / Offline Status
✏ Add Message Update API
🔔 Add Push Notifications
💾 Add Chat History Persistence
👨💻 Author
Ravi Teja

Java Full Stack Developer

100 Java Full Stack Projects Challenge

Project 59 / 100

Tier 6 – Frontend Mastery with React

Monorepo - Backend + Frontend

⭐ Support
If you found this project helpful, consider giving it a ⭐ Star on GitHub.

Single Repo:
https://github.com/raviteja-dev950/59-chat-ui

Backend: backend/ - Port 9199

Frontend: frontend/ - Port 3000

