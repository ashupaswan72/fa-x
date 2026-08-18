import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const LineChart = ({ data, title, height = 240 }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: !!title,
        text: title,
        color: '#1B4332',
        font: {
          family: 'sans-serif',
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(46, 125, 50, 0.05)'
        },
        ticks: {
          color: '#1B4332',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#1B4332',
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Line data={data} options={defaultOptions} />
    </div>
  );
};

export const BarChart = ({ data, title, height = 240 }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: !!title,
        text: title,
        color: '#1B4332',
        font: {
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(46, 125, 50, 0.05)'
        },
        ticks: {
          color: '#1B4332'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#1B4332'
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={defaultOptions} />
    </div>
  );
};

export const DoughnutChart = ({ data, title, height = 200 }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          color: '#1B4332',
          font: {
            size: 11
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        color: '#1B4332',
        font: {
          weight: 'bold'
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Doughnut data={data} options={defaultOptions} />
    </div>
  );
};
