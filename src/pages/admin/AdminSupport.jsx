import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { MessageSquare, CheckCircle, Clock, User, Reply } from 'lucide-react';

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('open'); // 'open' or 'resolved'
  
  const [replyText, setReplyText] = useState({});
  const [submittingReply, setSubmittingReply] = useState(null); // ticket ID

  const fetchTickets = async () => {
    try {
      const data = await dbService.getAllSupportTickets();
      setTickets(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleReplyChange = (id, text) => {
    setReplyText(prev => ({ ...prev, [id]: text }));
  };

  const submitReply = async (ticketId) => {
    const text = replyText[ticketId];
    if (!text?.trim()) return;

    setSubmittingReply(ticketId);
    try {
      await dbService.replySupportTicket(ticketId, text);
      showToast("Reply sent successfully. Ticket marked as resolved.", "success");
      fetchTickets();
    } catch (e) {
      console.error(e);
      showToast("Failed to send reply", "error");
    } finally {
      setSubmittingReply(null);
    }
  };

  const filteredTickets = tickets.filter(t => t.status === activeTab);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-dark flex items-center space-x-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          <span>Support Desk</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Respond to help requests from farmers and customers.
        </p>
      </div>

      <div className="flex border-b border-gray-100 space-x-8">
        <button 
          onClick={() => setActiveTab('open')}
          className={`pb-4 text-sm font-bold transition-all ${
            activeTab === 'open' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-400 hover:text-dark'
          }`}
        >
          Open Tickets ({tickets.filter(t => t.status === 'open').length})
        </button>
        <button 
          onClick={() => setActiveTab('resolved')}
          className={`pb-4 text-sm font-bold transition-all ${
            activeTab === 'resolved' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-400 hover:text-dark'
          }`}
        >
          Resolved Tickets ({tickets.filter(t => t.status === 'resolved').length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading support tickets...</div>
      ) : filteredTickets.length > 0 ? (
        <div className="space-y-6">
          {filteredTickets.map(ticket => (
            <Card key={ticket.id} className="space-y-4">
              <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ticket.role === 'farmer' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                    <User className={`w-5 h-5 ${ticket.role === 'farmer' ? 'text-amber-700' : 'text-blue-700'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-sm">{ticket.userName}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-gray-400 font-semibold">{formatDate(ticket.createdAt)}</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        ticket.role === 'farmer' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {ticket.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center space-x-1 ${
                  ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {ticket.status === 'resolved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  <span>{ticket.status}</span>
                </span>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject: {ticket.subject}</div>
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <p className="text-sm text-dark leading-relaxed font-medium">"{ticket.message}"</p>
                </div>
              </div>

              {ticket.status === 'open' ? (
                <div className="pt-4 border-t border-gray-50 space-y-3">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center space-x-1">
                    <Reply className="w-3 h-3" />
                    <span>Admin Reply</span>
                  </label>
                  <textarea 
                    value={replyText[ticket.id] || ''}
                    onChange={(e) => handleReplyChange(ticket.id, e.target.value)}
                    placeholder="Type your response here. This will be sent directly to the user and mark the ticket as resolved."
                    className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-dark resize-none h-24"
                  />
                  <div className="flex justify-end">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => submitReply(ticket.id)}
                      loading={submittingReply === ticket.id}
                    >
                      Send Reply & Resolve
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-50 space-y-2">
                  <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Your Reply</span>
                  </label>
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <p className="text-sm text-dark leading-relaxed font-medium">"{ticket.adminReply}"</p>
                  </div>
                </div>
              )}

            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-50 max-w-md mx-auto space-y-4">
          <CheckCircle className="w-12 h-12 text-emerald-600/30 mx-auto" />
          <h3 className="font-bold text-dark text-sm">Inbox Zero</h3>
          <p className="text-[11px] text-gray-400">There are no {activeTab} tickets right now.</p>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
