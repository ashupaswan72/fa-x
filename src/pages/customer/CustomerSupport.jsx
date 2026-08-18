import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { HelpCircle, MessageSquare, Mail, PhoneCall, Send, Clock, CheckCircle } from 'lucide-react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/helpers';

const CustomerSupport = () => {
  const { currentUser } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (currentUser) {
        const data = await dbService.getUserSupportTickets(currentUser.uid);
        setTickets(data);
      }
    };
    fetchTickets();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      showToast("Please provide both a subject and a message.", "warning");
      return;
    }

    setSubmitting(true);
    
    try {
      await dbService.createSupportTicket({
        userId: currentUser.uid,
        userName: currentUser.name,
        role: 'customer',
        subject: subject,
        message: message
      });

      showToast("Your support ticket has been submitted! We will get back to you shortly.", "success");
      setSubject("");
      setMessage("");
      
      // Refresh tickets
      const data = await dbService.getUserSupportTickets(currentUser.uid);
      setTickets(data);
    } catch (e) {
      console.error(e);
      showToast("Failed to submit ticket. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-dark flex items-center space-x-2">
          <HelpCircle className="w-8 h-8 text-primary" />
          <span>Help & Support</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Have a doubt or issue with your order? Our support team is here to help you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Support Ticket Form */}
        <div className="lg:col-span-2">
          <Card className="space-y-6">
            <div className="border-b border-gray-50 pb-4">
              <h2 className="text-lg font-bold text-dark flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Submit a Query</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">We typically reply within 2-4 hours during business days.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Subject / Issue Type</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-dark"
                >
                  <option value="" disabled>Select your issue...</option>
                  <option value="order_status">Where is my order?</option>
                  <option value="payment_issue">Payment / Wallet Issue</option>
                  <option value="quality">Product Quality Concern</option>
                  <option value="refund">Request a Refund / Return</option>
                  <option value="other">Other Doubt</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Describe your doubt</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please provide details about your issue or question..."
                  rows="5"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-dark resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  loading={submitting}
                  className="py-3.5 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ticket</span>
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Quick Contact Info */}
        <div className="space-y-6">
          <Card className="space-y-4 bg-emerald-600 border-none text-white shadow-xl shadow-emerald-500/20">
            <h3 className="font-black text-lg">Instant Support</h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Need immediate assistance? Reach out directly via our dedicated support channels.
            </p>
            
            <div className="space-y-3 pt-4 border-t border-emerald-500/30">
              <a href="mailto:support@fa-x.com" className="flex items-center space-x-3 hover:text-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Email Us</p>
                  <p className="text-[10px] text-emerald-100/70">support@fa-x.com</p>
                </div>
              </a>
              
              <a href="tel:+18001234567" className="flex items-center space-x-3 hover:text-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Call Toll-Free</p>
                  <p className="text-[10px] text-emerald-100/70">1800-FARM-X</p>
                </div>
              </a>
            </div>
          </Card>

          <Card className="space-y-3 border border-emerald-100 bg-emerald-50/30 text-center py-8">
            <h3 className="font-bold text-dark text-sm">Have general questions?</h3>
            <p className="text-xs text-gray-500 px-4">Browse our frequently asked questions to find quick answers about payments, pre-orders, and shipping.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.href='/faq'}>
              Read our FAQ
            </Button>
          </Card>
        </div>

      </div>

      {/* Ticket History */}
      {tickets.length > 0 && (
        <div className="pt-6 border-t border-gray-100">
          <h2 className="text-lg font-bold text-dark mb-4">Your Past Support Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map(ticket => (
              <Card key={ticket.id} className="space-y-4">
                <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                  <div>
                    <h3 className="font-bold text-dark text-sm">{ticket.subject}</h3>
                    <p className="text-[10px] text-gray-400 font-semibold">{formatDate(ticket.createdAt)}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center space-x-1 ${
                    ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {ticket.status === 'resolved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{ticket.status}</span>
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-dark leading-relaxed font-medium">"{ticket.message}"</p>
                  </div>
                </div>

                {ticket.adminReply && (
                  <div className="pt-4 border-t border-emerald-500/10 space-y-2">
                    <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Admin Response</span>
                    </label>
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                      <p className="text-sm text-dark leading-relaxed font-medium">"{ticket.adminReply}"</p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerSupport;
