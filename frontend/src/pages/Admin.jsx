import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, MessageSquare, RefreshCw } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API}/contact`);
      // Sort by newest first
      const sorted = response.data.sort((a, b) => 
        new Date(b.submittedAt) - new Date(a.submittedAt)
      );
      setSubmissions(sorted);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07071a] via-[#0a0a20] to-[#0f0f2b] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Contact <span className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] bg-clip-text text-transparent">Submissions</span>
            </h1>
            <p className="text-gray-400">View all client inquiries and project requests</p>
          </div>
          <Button 
            onClick={fetchSubmissions}
            className="bg-gradient-to-r from-[#7b5cff] to-[#00e6ff] hover:opacity-90"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-white/10 p-6">
            <p className="text-gray-400 text-sm mb-1">Total Submissions</p>
            <p className="text-3xl font-bold text-white">{submissions.length}</p>
          </Card>
          <Card className="glass-card border-white/10 p-6">
            <p className="text-gray-400 text-sm mb-1">New (Unread)</p>
            <p className="text-3xl font-bold text-[#00e6ff]">
              {submissions.filter(s => s.status === 'new').length}
            </p>
          </Card>
          <Card className="glass-card border-white/10 p-6">
            <p className="text-gray-400 text-sm mb-1">This Month</p>
            <p className="text-3xl font-bold text-[#7b5cff]">
              {submissions.filter(s => {
                const date = new Date(s.submittedAt);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </Card>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#7b5cff]"></div>
            <p className="text-gray-400 mt-4">Loading submissions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="glass-card border-red-500/20 p-6 text-center">
            <p className="text-red-400">{error}</p>
            <Button 
              onClick={fetchSubmissions}
              className="mt-4 bg-red-500/20 hover:bg-red-500/30"
            >
              Try Again
            </Button>
          </Card>
        )}

        {/* Submissions List */}
        {!loading && !error && submissions.length === 0 && (
          <Card className="glass-card border-white/10 p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400 text-lg">No submissions yet</p>
            <p className="text-gray-500 text-sm mt-2">Contact form submissions will appear here</p>
          </Card>
        )}

        {!loading && !error && submissions.length > 0 && (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="glass-card border-white/10 p-6 hover:border-[#7b5cff]/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{submission.name}</h3>
                      {submission.status === 'new' && (
                        <Badge className="bg-[#00e6ff]/20 text-[#00e6ff] border-[#00e6ff]/30">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Mail size={14} className="text-[#7b5cff]" />
                        {submission.email}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#00e6ff]" />
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Project Type</p>
                    <p className="text-white font-medium">{submission.projectType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Message</p>
                    <p className="text-gray-300 leading-relaxed">{submission.message}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                  <a 
                    href={`mailto:${submission.email}?subject=Re: ${submission.projectType}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#7b5cff]/20 hover:bg-[#7b5cff]/30 border border-[#7b5cff]/30">
                      <Mail size={16} className="mr-2" />
                      Reply via Email
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.06);
        }
      `}</style>
    </div>
  );
};

export default Admin;
