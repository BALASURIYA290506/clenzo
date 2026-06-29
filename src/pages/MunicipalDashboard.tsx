import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShieldAlert, CheckCircle, XCircle, Clock,
  ArrowUpRight, MapPin, AlertTriangle, Filter, Eye, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useApp } from '@/contexts/AppContext';
import PageTransition from '@/components/layout/PageTransition';
import { REPORT_STATUSES, SEVERITY_LEVELS } from '@/lib/constants';
import { reportsOverTimeData, wasteTypeDistribution } from '@/lib/mock-data';
import { cn, formatDate } from '@/lib/utils';
import type { ReportStatus, SeverityLevel } from '@/lib/constants';

export default function MunicipalDashboard() {
  const { reports, updateReportStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  // Compute status counts
  const pendingCount = reports.filter(r => r.status === 'submitted' || r.status === 'verified').length;
  const verifiedCount = reports.filter(r => r.status === 'verified').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;
  const rejectedCount = reports.filter(r => r.status === 'rejected').length;

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.wasteType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : r.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' ? true : r.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleStatusChange = (id: string, newStatus: ReportStatus) => {
    updateReportStatus(id, newStatus);
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport((prev: any) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <PageTransition className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Municipal Operations Control</h1>
          <p className="text-sm text-gray-500">Real-time waste monitoring, verification, and department assignment</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border-l-4 border-amber-500 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase block">Pending Verify</span>
            <span className="text-2xl font-bold text-gray-900 mt-1">{pendingCount}</span>
          </div>
          <Clock className="w-8 h-8 text-amber-500 opacity-80" />
        </div>

        <div className="glass-card rounded-2xl p-5 border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase block">Verified</span>
            <span className="text-2xl font-bold text-gray-900 mt-1">{verifiedCount}</span>
          </div>
          <ShieldAlert className="w-8 h-8 text-blue-500 opacity-80" />
        </div>

        <div className="glass-card rounded-2xl p-5 border-l-4 border-green-500 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase block">Resolved</span>
            <span className="text-2xl font-bold text-gray-900 mt-1">{resolvedCount}</span>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500 opacity-80" />
        </div>

        <div className="glass-card rounded-2xl p-5 border-l-4 border-red-500 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase block">Rejected</span>
            <span className="text-2xl font-bold text-gray-900 mt-1">{rejectedCount}</span>
          </div>
          <XCircle className="w-8 h-8 text-red-500 opacity-80" />
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports Timeline */}
        <div className="lg:col-span-2 glass-strong rounded-3xl p-5 space-y-4">
          <span className="text-sm font-bold text-gray-800">Monthly Reports & Resolution Rate</span>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reportsOverTimeData}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" stroke="#a3a3a3" fontSize={11} />
                <YAxis stroke="#a3a3a3" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="reports" stroke="#10b981" fillOpacity={1} fill="url(#colorReports)" />
                <Area type="monotone" dataKey="resolved" stroke="#3b82f6" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Distribution */}
        <div className="glass-strong rounded-3xl p-5 flex flex-col justify-between">
          <span className="text-sm font-bold text-gray-800">Waste Type Distribution</span>
          <div className="w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            {wasteTypeDistribution.slice(0, 6).map((w) => (
              <div key={w.name} className="flex items-center gap-1.5 font-medium text-gray-600">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: w.fill }} />
                {w.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Control Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports Table & Actions */}
        <div className="lg:col-span-2 glass-strong rounded-3xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Noida locations or waste type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-xs focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
              />
            </div>
            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 bg-white/80 rounded-xl text-xs font-semibold text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="verified">Verified</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 bg-white/80 rounded-xl text-xs font-semibold text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                <option value="all">All Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] uppercase text-gray-400 font-bold">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Waste</th>
                  <th className="pb-3">Severity</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {filteredReports.map((rpt) => {
                  const statusInfo = REPORT_STATUSES[rpt.status] || REPORT_STATUSES.submitted;
                  const severityInfo = SEVERITY_LEVELS[rpt.severity];
                  return (
                    <tr key={rpt.id} className="table-row-hover">
                      <td className="py-3 font-semibold text-gray-700">{rpt.id}</td>
                      <td className="py-3 font-medium capitalize text-gray-900">{rpt.wasteType}</td>
                      <td className="py-3">
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold border', severityInfo.color)}>
                          {rpt.severity}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500 max-w-[120px] truncate">{rpt.location}</td>
                      <td className="py-3">
                        <span className="text-[10px] font-bold">{statusInfo.label}</span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedReport(rpt)}
                          className="p-1.5 hover:bg-green-50 text-green-700 rounded-lg transition-colors inline-flex items-center"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Panel / Report Details Map preview */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedReport ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-strong rounded-3xl p-5 border border-green-200/50 shadow-soft-lg space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase">
                      Selected Report
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-1">{selectedReport.id}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-xs text-gray-400 hover:text-gray-600 font-bold"
                  >
                    Close
                  </button>
                </div>

                <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img src={selectedReport.imageUrl} alt="Waste" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1.5 text-xs text-gray-600">
                  <p><strong>Reporter:</strong> {selectedReport.userName}</p>
                  <p><strong>Department:</strong> {selectedReport.department}</p>
                  <p><strong>Location:</strong> {selectedReport.address}</p>
                  {selectedReport.description && <p><strong>Description:</strong> "{selectedReport.description}"</p>}
                </div>

                {/* Operations triggers */}
                {selectedReport.status !== 'resolved' && selectedReport.status !== 'rejected' ? (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => handleStatusChange(selectedReport.id, 'resolved')}
                      className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Resolve Report
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedReport.id, 'rejected')}
                      className="w-full py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject Report
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl text-xs font-semibold text-center text-gray-500">
                    This report status is permanently {selectedReport.status}.
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="glass-card rounded-3xl p-6 text-center text-gray-400 flex flex-col items-center justify-center min-h-[300px]">
                <AlertTriangle className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-sm font-semibold">Verification Queue</p>
                <p className="text-xs text-gray-300 max-w-xs mt-1">Select any row from control panel table to view details, check department assignment, and resolve issue.</p>
              </div>
            )}
          </AnimatePresence>

          {/* Interactive Controller Map preview */}
          <div className="glass-strong rounded-3xl p-4 space-y-3">
            <span className="text-xs font-bold text-gray-800 block">Noida Waste Distribution Map</span>
            <div className="w-full h-40 rounded-2xl map-placeholder border border-green-200/50 relative overflow-hidden">
              {/* Map Dots */}
              {reports.map((rpt, i) => {
                const colors = { low: 'bg-green-500', medium: 'bg-yellow-500', high: 'bg-orange-500', critical: 'bg-red-500' };
                return (
                  <div
                    key={rpt.id}
                    className={cn(
                      'absolute w-3.5 h-3.5 rounded-full border-2 border-white cursor-pointer shadow-soft hover:scale-125 transition-transform flex items-center justify-center',
                      colors[rpt.severity]
                    )}
                    style={{
                      left: `${15 + (i * 7) % 70}%`,
                      top: `${20 + (i * 11) % 60}%`,
                    }}
                    title={`${rpt.id} - ${rpt.wasteType}`}
                    onClick={() => setSelectedReport(rpt)}
                  />
                );
              })}
            </div>
            <div className="flex gap-4 justify-center text-[9px] text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Low</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Med</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> High</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
