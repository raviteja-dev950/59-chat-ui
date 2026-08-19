import { useState, useEffect, useRef } from "react";
import api from "../api/api";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  const replies = [
    "Got it! 👍",
    "Nice! 59/100 🔥",
    "Super! Working great!",
    "Awesome Ravi! 💯",
    "Perfect! 😊",
    "Cool! Let's build 60 next!",
    "Haha true! 😂"
  ];

  useEffect(() => {
    api.get("/chat/messages").then(r=>setMessages(r.data)).catch(()=>{});
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  }, [messages]);

  const send = async () => {
    if(!text.trim()) return;
    try{
      const res = await api.post("/chat/messages", {text});
      setMessages(prev => [...prev, res.data]);
      setText("");

      // Auto reply from Alice after 1 sec - RECEIVED MESSAGE!
      setTimeout(()=>{
        const randomReply = replies[Math.floor(Math.random()*replies.length)];
        setMessages(prev => [...prev, {
          id: Date.now(),
          user: "Alice",
          text: randomReply,
          type: "other",
          time: new Date().toLocaleTimeString().slice(0,5)
        }]);
      }, 1000);

    }catch(e){ console.log(e); }
  };

  return (
    <div style={{display:"flex", height:"100vh", fontFamily:"Segoe UI, Arial", background:"#fff"}}>
      {/* Sidebar */}
      <div style={{width:280, borderRight:"1px solid #e9edef", display:"flex", flexDirection:"column", background:"#fff"}}>
        <div style={{padding:"20px 15px", borderBottom:"1px solid #e9edef"}}>
          <h2 style={{margin:0, fontSize:20}}>💬 Ravi's Chat</h2>
          <small style={{color:"#667781"}}>59/100 Project</small>
        </div>
        <div style={{display:"flex", gap:8, padding:15}}>
          <div style={{flex:1, background:"#E7F8FF", padding:12, borderRadius:12, textAlign:"center"}}><b style={{color:"#0084FF", fontSize:18}}>{messages.length}</b><br/><small style={{color:"#667781"}}>Messages</small></div>
          <div style={{flex:1, background:"#E8F9E9", padding:12, borderRadius:12, textAlign:"center"}}><b style={{color:"#00A884", fontSize:18}}>2</b><br/><small style={{color:"#667781"}}>Online</small></div>
        </div>
        <div style={{padding:"0 12px"}}>
          <small style={{color:"#008069", fontWeight:600, fontSize:13}}>Active Chats</small>
          <div style={{marginTop:8, padding:10, background:"#F0F2F5", borderRadius:8, display:"flex", gap:10, alignItems:"center"}}>
            <div style={{width:40, height:40, background:"#0084FF", borderRadius:"50%", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold"}}>A</div>
            <div><b style={{fontSize:14}}>Alice</b><br/><small style={{color:"#00A884"}}>● Online</small></div>
          </div>
        </div>
        <div style={{marginTop:"auto", padding:12, borderTop:"1px solid #e9edef", fontSize:11, color:"#aaa"}}>Backend: :9199 | Frontend: :3000</div>
      </div>

      {/* Chat Area */}
      <div style={{flex:1, display:"flex", flexDirection:"column", background:"#EFE7DD"}}>
        <div style={{padding:"12px 16px", background:"#F0F2F5", borderLeft:"1px solid #e9edef", display:"flex", alignItems:"center", gap:12}}>
          <div style={{width:40, height:40, background:"#0084FF", borderRadius:"50%", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold"}}>A</div>
          <div><b>Alice - Project Partner</b><br/><small style={{color:"#00A884"}}>● Active now</small></div>
          <div style={{marginLeft:"auto", fontSize:12, color:"#667781"}}>{messages.length} messages</div>
        </div>

        <div style={{flex:1, padding:20, overflowY:"auto", backgroundImage:"url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"}}>
          {messages.map(m=>(
            <div key={m.id} style={{display:"flex", justifyContent: m.type==="self"?"flex-end":"flex-start", marginBottom:12}}>
              <div style={{
                maxWidth:"65%", padding:"8px 12px", borderRadius: m.type==="self"? "8px 0 8px 8px" : "0 8px 8px 8px",
                background: m.type==="self"? "#D9FDD3" : "#fff",
                color:"#111b21", boxShadow:"0 1px 0.5px rgba(0,0,0,0.13)", position:"relative"
              }}>
                <span style={{fontSize:14.2}}>{m.text}</span>
                <div style={{fontSize:11, color:"#667781", marginTop:4, textAlign:"right", display:"flex", justifyContent:"flex-end", gap:4}}>
                  {m.time} {m.type==="self" && <span style={{color:"#53BDEB"}}>✓✓</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div style={{padding:"10px 15px", background:"#F0F2F5", display:"flex", gap:10, alignItems:"center"}}>
          <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..." style={{flex:1, padding:"12px 16px", borderRadius:8, border:"none", outline:"none", background:"#fff"}}/>
          <button onClick={send} style={{width:42, height:42, borderRadius:"50%", background:"#00A884", color:"#fff", border:"none", cursor:"pointer", fontSize:18}}>➤</button>
        </div>
      </div>
    </div>
  );
}