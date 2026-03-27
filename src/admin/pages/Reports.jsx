import React, { useMemo } from 'react';
import { IndianRupee, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { useData } from '../../data/DataContext';
import '../css/Reports.css';

const Reports = () => {
  const { jobs } = useData();

  const { revenueData, jobsData, days, totalRevenue, completedJobs } = useMemo(() => {
    const now = new Date();
    const dayLabels = [];
    const rev = [];
    const done = [];

    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dayLabels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));

      const dayJobs = jobs.filter(j => (j.createdAt || '').toString().slice(0, 10) === key);
      const dayRevenue = dayJobs.reduce((sum, j) => sum + (j.bill?.subtotal || 0), 0);
      const dayCompleted = dayJobs.filter(j => j.status === 'READY' || j.status === 'DELIVERED').length;
      rev.push(dayRevenue);
      done.push(dayCompleted);
    }

    const totalRev = jobs.reduce((sum, j) => sum + (j.bill?.subtotal || 0), 0);
    const completed = jobs.filter(j => j.status === 'READY' || j.status === 'DELIVERED').length;

    return { revenueData: rev, jobsData: done, days: dayLabels, totalRevenue: totalRev, completedJobs: completed };
  }, [jobs]);

  const stats = [
    {
      title: 'TOTAL REVENUE (WEEKLY)',
      value: `₹${Number(totalRevenue || 0).toLocaleString()}`,
      change: 'Based on all bills',
      changeColor: 'green',
      icon: <IndianRupee size={22} />,
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
    },
    {
      title: 'COMPLETED JOBS',
      value: completedJobs.toString(),
      change: 'READY or DELIVERED',
      changeColor: 'green',
      icon: <CheckCircle size={22} />,
      iconBg: '#ecfdf5',
      iconColor: '#16a34a',
    },
    {
      title: 'AVG SERVICE TIME',
      value: `${jobs.length ? '—' : '—'}`,
      change: 'Coming soon',
      changeColor: 'green',
      icon: <Calendar size={22} />,
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
    },
    {
      title: 'CUSTOMER SATISFACTION',
      value: '—',
      change: 'Coming soon',
      changeColor: 'green',
      icon: <TrendingUp size={22} />,
      iconBg: '#ecfdf5',
      iconColor: '#16a34a',
    },
  ];

  const maxRev = Math.max(...revenueData);

  const maxJobs = Math.max(...jobsData);

  // SVG chart helpers
  const chartW = 520;
  const chartH = 200;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 35;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const revenuePoints = revenueData.map((v, i) => {
    const x = padL + (i / (revenueData.length - 1)) * plotW;
    const y = padT + plotH - (v / maxRev) * plotH;
    return { x, y, v };
  });
  const linePath = revenuePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = linePath + ` L${revenuePoints[revenuePoints.length - 1].x},${padT + plotH} L${revenuePoints[0].x},${padT + plotH} Z`;

  const barChartW = 420;
  const barW = 36;
  const barGap = (plotW - barW * jobsData.length) / (jobsData.length - 1);

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <h2 className="rpt-title">Reports & Analytics</h2>
        <p className="rpt-subtitle">Key performance metrics and business insights.</p>
      </div>

      {/* Stats Cards */}
      <div className="rpt-stats-grid">
        {stats.map((s, i) => (
          <div className="rpt-stat-card card" key={i}>
            <div className="rpt-stat-icon" style={{ backgroundColor: s.iconBg, color: s.iconColor }}>
              {s.icon}
            </div>
            <div className="rpt-stat-label">{s.title}</div>
            <div className="rpt-stat-value">{s.value}</div>
            <div className="rpt-stat-change" style={{ color: s.changeColor === 'green' ? '#16a34a' : '#ef4444' }}>
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="rpt-charts-row">
        {/* Revenue Trend */}
        <div className="rpt-chart-card card">
          <h3 className="rpt-chart-title">Revenue Trend</h3>
          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="rpt-line-chart">
            {/* Y-axis labels */}
            {[0, 600, 1200, 1800, 2400].map((v) => {
              const y = padT + plotH - (v / 2400) * plotH;
              return (
                <g key={v}>
                  <line x1={padL} y1={y} x2={padL + plotW} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                  <text x={padL - 8} y={y + 4} textAnchor="end" fill="#9ca3af" fontSize="9">₹{v.toLocaleString()}</text>
                </g>
              );
            })}
            {/* Area + Line */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#areaGrad)" />
            <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {revenuePoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3" fill="#2563eb" />
            ))}
            {/* X labels */}
            {days.map((d, i) => {
              const x = padL + (i / (days.length - 1)) * plotW;
              return <text key={i} x={x} y={chartH - 8} textAnchor="middle" fill="#9ca3af" fontSize="10">{d}</text>;
            })}
          </svg>
        </div>

        {/* Jobs Completed Bar Chart */}
        <div className="rpt-chart-card card">
          <h3 className="rpt-chart-title">Jobs Completed</h3>
          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="rpt-bar-chart">
            {/* Y-axis labels */}
            {[0, 2, 4, 6, 8].map((v) => {
              const y = padT + plotH - (v / 8) * plotH;
              return (
                <g key={v}>
                  <line x1={padL} y1={y} x2={padL + plotW} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                  <text x={padL - 8} y={y + 4} textAnchor="end" fill="#9ca3af" fontSize="9">{v}</text>
                </g>
              );
            })}
            {/* Bars */}
            {jobsData.map((v, i) => {
              const barH = (v / 8) * plotH;
              const x = padL + i * (barW + (plotW - barW * jobsData.length) / (jobsData.length - 1));
              const y = padT + plotH - barH;
              const isHighlight = i === 3; // Thu highlight
              return (
                <g key={i}>
                  <rect
                    x={x} y={y} width={barW} height={barH}
                    rx="4" ry="4"
                    fill={isHighlight ? '#16a34a' : '#a7f3d0'}
                  />
                  <text x={x + barW / 2} y={chartH - 8} textAnchor="middle" fill={isHighlight ? '#16a34a' : '#9ca3af'} fontSize="10" fontWeight={isHighlight ? '700' : '400'}>{days[i]}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Reports;
