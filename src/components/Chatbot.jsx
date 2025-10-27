import React, { useState, useRef, useEffect } from "react";
import "../styles/chatbot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";


export default function ChatbotAdvanced({ products = [] }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatbotHistory");
    return saved ? JSON.parse(saved) : [{ sender: "bot", text: "Hi! I can help you find products. Ask me anything." }];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(null); // برای راهنمایی چند مرحله‌ای
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    localStorage.setItem("chatbotHistory", JSON.stringify(messages));
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const userMsg = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const productSummary =
      products && products.length > 0
        ? `Available products: ${products.slice(0, 8).map(p => `${p.title} (${p.category})`).join("; ")}`
        : "";

    const systemPrompt = `
You are a helpful assistant for an online shopping site.
Give short helpful answers in English.
Prefer to suggest relevant products from the provided list if possible.
`;

    const messagesForApi = [
      { role: "system", content: systemPrompt },
      ...(productSummary ? [{ role: "system", content: productSummary }] : []),
      { role: "user", content: text }
    ];

    try {
      const controller = new AbortController();
      const TIMEOUT = 20000;
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      // ⚡ درخواست به بک‌اند امن
      const resp = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesForApi }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!resp.ok) {
        const textErr = await resp.text();
        throw new Error(`OpenAI error: ${resp.status} ${textErr}`);
      }

      const data = await resp.json();
      let reply = data.choices?.[0]?.message?.content?.trim() || "I have no answer.";

      // اضافه کردن پیشنهاد محصولات به صورت کارت
      if (products && reply.toLowerCase().includes("suggest")) {
        const suggested = products.slice(0, 4).map(p => ({
          title: p.title,
          category: p.category,
          price: p.price,
          image: p.image,
          href: p.href
        }));
        reply = (
          <div>
            <div>{reply}</div>
            <div className="d-flex flex-wrap mt-2">
              {suggested.map((p, idx) => (
                <div key={idx} className="card m-1" style={{ width: 100 }}>
                  <img src={p.image} className="card-img-top" alt={p.title} />
                  <div className="card-body p-1">
                    <p className="small mb-1">{p.title}</p>
                    <p className="small mb-1">${p.price}</p>
                    <a href={p.href} className="small btn btn-sm btn-primary w-100">View</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { sender: "bot", text: "Error connecting to AI service." }]);
    } finally {
      setLoading(false);
    }
  }

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faComment} />
        </button>
      )}

      {open && (
        <div className="chatbot-panel p-3 rounded shadow">
          <div className="chatbot-header d-flex justify-content-between align-items-center mb-2">
            <span>Online Support</span>
            <button className="btn-close custom-close-btn />" onClick={() => setOpen(false)}>
               <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div ref={listRef} className="chatbot-messages mb-2" style={{ maxHeight: 300, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.sender === "user" ? "text-end" : "text-start"}`}>
                <div className={`d-inline-block p-2 rounded ${m.sender === "user" ? "user-message" : "bot-message"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="input-group">
            <textarea
              className="form-control"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask: product or gift ideas"
            />
            <button className="btn btn-primary" onClick={sendMessage} disabled={loading}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
