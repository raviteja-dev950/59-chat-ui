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
        m1.put("id",1); m1.put("user","Alice"); m1.put("text","Hey 59! How's chat UI? 😊");
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
        return stats;
    }

    @DeleteMapping("/messages/{id}")
    public String deleteMessage(@PathVariable int id){
        messages.removeIf(m -> (int)m.get("id") == id);
        return "Deleted";
    }
}