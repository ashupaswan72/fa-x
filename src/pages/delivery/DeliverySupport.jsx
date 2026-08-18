import React, { useState, useEffect, useRef } from 'react';
import Card from '../../components/ui/Card';
import { Send, Phone, AlertCircle, Info, MoreVertical, Paperclip, Truck, Navigation, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DeliverySupport = () => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'admin',
      text: `Hi ${currentUser?.name?.split(' ')[0] || 'Partner'}, this is FA-X Admin Support. How can we assist you with your deliveries today?`,
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);

  const quickActions = [
    { id: 'q1', label: 'Customer Unreachable', icon: Phone },
    { id: 'q2', label: 'Vehicle Breakdown', icon: AlertCircle },
    { id: 'q3', label: 'Wrong Address', icon: Navigation },
    { id: 'q4', label: 'Running Late', icon: Clock },
  ];

  const handleSend = (text = message) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setMessage('');
    setIsTyping(true);

    // Simulate Admin Reply
    setTimeout(() => {
      const adminReply = {
        id: `msg-${Date.now() + 1}`,
        sender: 'admin',
        text: 'An admin has been notified of your issue and is looking into it right now. Please stand by...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, adminReply]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-black text-dark">Live Support</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Chat directly with the FA-X Admin Team for instant dispatch assistance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        
        {/* Quick Actions Panel */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <button 
                  key={action.id}
                  onClick={() => handleSend(`I am reporting an issue: ${action.label}`)}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-dark group-hover:text-primary">{action.label}</span>
                </button>
              );
            })}
          </div>

          <Card className="p-5 border-blue-100 bg-blue-50/50 mt-6 hidden lg:block">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-dark">Emergency Line</h4>
                <p className="text-xs text-gray-500 mt-1 mb-3">If you are in an emergency situation, please call our direct hotline.</p>
                <button className="w-full bg-blue-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-md shadow-blue-500/20">Call 1-800-FAX-HELP</button>
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="lg:col-span-3 flex flex-col border border-gray-100 overflow-hidden h-[600px] shadow-sm">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white">
                  <span className="font-bold text-sm">FX</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm leading-tight">FA-X Dispatch Team</h3>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">Online Now</span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8fcf9] scroll-smooth"
          >
            <div className="text-center">
              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl p-4 ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-br-none shadow-md shadow-primary/20' 
                    : 'bg-white border border-gray-100 text-dark rounded-bl-none shadow-sm'
                }`}>
                  <p className={`text-sm ${msg.sender === 'user' ? 'font-medium' : 'font-semibold'}`}>{msg.text}</p>
                  <p className={`text-[10px] font-bold mt-2 text-right ${
                    msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-gray-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <button type="button" className="p-3 text-gray-400 hover:text-primary hover:bg-emerald-50 rounded-xl transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message to dispatch..." 
                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-primary/20 flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeliverySupport;
