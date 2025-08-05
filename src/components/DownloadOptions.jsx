import React from "react";
import { Download, FileText, FileSpreadsheet, Printer, ExternalLink } from "lucide-react";

function DownloadOptions({ journalData, trades }) {
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const exportToCSV = () => {
    try {
      const headers = [
        "Date",
        "Ticker",
        "Position",
        "Entry Price",
        "Position Size",
        "Risk/Reward",
        "Stop Loss",
        "Target",
        "P&L",
        "Strategy",
        "Market Condition",
        "Hold Time",
        "Trade Tags",
        "Notes"
      ];

      const csvData = trades.map(trade => [
        trade.date || new Date(trade.timestamp).toLocaleDateString(),
        trade.ticker,
        trade.position,
        trade.entry,
        trade.positionSize || "",
        trade.riskReward || "",
        trade.calculatedStopLoss || "",
        trade.calculatedTarget || "",
        trade.pnl || "",
        trade.strategy || "",
        trade.marketCondition || "",
        trade.holdTime || "",
        (trade.tradeTags || []).join("; "),
        trade.notes || ""
      ]);

      const csvContent = [
        headers.join(","),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trading-journal-${getTodayDate()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Error exporting CSV. Please try again.");
    }
  };

  const printToPDF = () => {
    try {
      const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Nikesh's Trading Journal - ${getTodayDate()}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body { 
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
                margin: 0; 
                padding: 40px; 
                background: #ffffff;
                color: #1f2937;
                line-height: 1.6;
            }
            
            .header {
                text-align: center;
                margin-bottom: 40px;
                padding-bottom: 20px;
                border-bottom: 3px solid #3b82f6;
            }
            
            .header h1 {
                font-size: 2.5rem;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 8px;
            }
            
            .header p {
                font-size: 1rem;
                color: #6b7280;
                font-weight: 500;
            }
            
            .section {
                margin-bottom: 40px;
                page-break-inside: avoid;
            }
            
            .section h2 {
                font-size: 1.5rem;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 20px;
                padding-bottom: 8px;
                border-bottom: 2px solid #e5e7eb;
            }
            
            .summary-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .summary-card {
                background: #f8fafc;
                padding: 20px;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
                text-align: center;
            }
            
            .summary-card h3 {
                font-size: 0.875rem;
                font-weight: 600;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
            }
            
            .summary-card .value {
                font-size: 2rem;
                font-weight: 700;
                color: #1f2937;
            }
            
            .summary-card .value.profit { color: #059669; }
            .summary-card .value.loss { color: #dc2626; }
            
            .trade {
                background: #ffffff;
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 20px;
                page-break-inside: avoid;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .trade-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .trade-ticker {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1f2937;
            }
            
            .trade-position {
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .trade-position.long {
                background: #dcfce7;
                color: #059669;
            }
            
            .trade-position.short {
                background: #fee2e2;
                color: #dc2626;
            }
            
            .trade-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 16px;
                margin-bottom: 16px;
            }
            
            .trade-detail {
                display: flex;
                flex-direction: column;
            }
            
            .trade-detail-label {
                font-size: 0.75rem;
                font-weight: 600;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
            }
            
            .trade-detail-value {
                font-size: 1rem;
                font-weight: 600;
                color: #1f2937;
            }
            
            .trade-detail-value.profit { color: #059669; }
            .trade-detail-value.loss { color: #dc2626; }
            
            .trade-notes {
                margin-top: 16px;
                padding: 16px;
                background: #f8fafc;
                border-radius: 8px;
                border-left: 4px solid #3b82f6;
            }
            
            .trade-notes-label {
                font-size: 0.875rem;
                font-weight: 600;
                color: #374151;
                margin-bottom: 8px;
            }
            
            .trade-notes-value {
                font-size: 0.875rem;
                color: #4b5563;
                line-height: 1.5;
            }
            
            .reflection {
                background: #f0f9ff;
                border: 1px solid #bae6fd;
                border-radius: 12px;
                padding: 24px;
                margin-top: 20px;
            }
            
            .reflection h3 {
                font-size: 1.125rem;
                font-weight: 600;
                color: #0369a1;
                margin-bottom: 16px;
            }
            
            .reflection-item {
                margin-bottom: 12px;
            }
            
            .reflection-label {
                font-weight: 600;
                color: #374151;
                margin-bottom: 4px;
            }
            
            .reflection-value {
                color: #4b5563;
                line-height: 1.5;
            }
            
            @media print {
                body { margin: 0; padding: 20px; }
                .trade { page-break-inside: avoid; }
                .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📊 Trading Journal</h1>
            <p>Generated on ${getTodayDate()} • ${trades.length} trades</p>
          </div>
          
          <div class="section">
            <h2>📈 Daily Summary</h2>
            <div class="summary-grid">
              <div class="summary-card">
                <h3>Total Trades</h3>
                <div class="value">${trades.length}</div>
              </div>
              <div class="summary-card">
                <h3>Total P&L</h3>
                <div class="value ${trades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0) >= 0 ? 'profit' : 'loss'}">
                  $${trades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0).toFixed(2)}
                </div>
              </div>
              <div class="summary-card">
                <h3>Win Rate</h3>
                <div class="value">
                  ${trades.length > 0 ? (trades.filter(trade => (parseFloat(trade.pnl) || 0) > 0).length / trades.length * 100).toFixed(1) : 0}%
                </div>
              </div>
              <div class="summary-card">
                <h3>Avg R/R</h3>
                <div class="value">
                  ${trades.filter(trade => trade.riskReward).length > 0 ?
          (trades.filter(trade => trade.riskReward).reduce((sum, trade) => {
            const ratio = trade.riskReward.split(':')[1];
            return sum + parseFloat(ratio);
          }, 0) / trades.filter(trade => trade.riskReward).length).toFixed(1) : 0}:1
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2>📝 Trade Details</h2>
            ${trades.map(trade => `
              <div class="trade">
                <div class="trade-header">
                  <div class="trade-ticker">${trade.ticker}</div>
                  <div class="trade-position ${trade.position}">${trade.position.toUpperCase()}</div>
                </div>
                <div class="trade-details">
                  <div class="trade-detail">
                    <div class="trade-detail-label">Entry Price</div>
                    <div class="trade-detail-value">$${trade.entry}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">Position Size</div>
                    <div class="trade-detail-value">${trade.positionSize || 'N/A'}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">Risk/Reward</div>
                    <div class="trade-detail-value">${trade.riskReward || 'N/A'}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">Stop Loss</div>
                    <div class="trade-detail-value">${trade.calculatedStopLoss ? '$' + trade.calculatedStopLoss : 'N/A'}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">Target</div>
                    <div class="trade-detail-value">${trade.calculatedTarget ? '$' + trade.calculatedTarget : 'N/A'}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">P&L</div>
                    <div class="trade-detail-value ${parseFloat(trade.pnl) >= 0 ? 'profit' : 'loss'}">$${trade.pnl || 'N/A'}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">Strategy</div>
                    <div class="trade-detail-value">${trade.strategy || 'N/A'}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">Market Condition</div>
                    <div class="trade-detail-value">${trade.marketCondition || 'N/A'}</div>
                  </div>
                  <div class="trade-detail">
                    <div class="trade-detail-label">Hold Time</div>
                    <div class="trade-detail-value">${trade.holdTime || 'N/A'}</div>
                  </div>
                </div>
                ${trade.tradeTags && trade.tradeTags.length > 0 ? `
                  <div class="trade-detail">
                    <div class="trade-detail-label">Trade Tags</div>
                    <div class="trade-detail-value">${trade.tradeTags.join(', ')}</div>
                  </div>
                ` : ''}
                ${trade.notes ? `
                  <div class="trade-notes">
                    <div class="trade-notes-label">Notes</div>
                    <div class="trade-notes-value">${trade.notes}</div>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          
          ${journalData.postTrade && Object.keys(journalData.postTrade).length > 0 ? `
            <div class="section">
              <h2>🤔 Daily Reflection</h2>
              <div class="reflection">
                ${Object.entries(journalData.postTrade).map(([key, value]) => `
                  <div class="reflection-item">
                    <div class="reflection-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                    <div class="reflection-value">${value}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </body>
      </html>
    `;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Wait for content to load, then print
      printWindow.onload = function () {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      };
    } catch (error) {
      console.error("Error printing PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="export-options">
      <div className="export-card">
        <div className="export-icon">
          <FileText size={24} />
        </div>
        <div className="export-content">
          <h3>PDF Report</h3>
          <p>Generate a professional PDF report with all your trades and insights</p>
          <button onClick={printToPDF} className="btn btn-primary">
            <Printer size={16} />
            Generate PDF
          </button>
        </div>
      </div>

      <div className="export-card">
        <div className="export-icon">
          <FileSpreadsheet size={24} />
        </div>
        <div className="export-content">
          <h3>CSV Export</h3>
          <p>Download your trading data as a CSV file for analysis</p>
          <button onClick={exportToCSV} className="btn btn-secondary">
            <Download size={16} />
            Download CSV
          </button>
        </div>
      </div>

      <div className="export-info">
        <div className="info-item">
          <strong>📄 PDF Report:</strong> Opens in new window for printing/saving
        </div>
        <div className="info-item">
          <strong>📊 CSV Data:</strong> Downloads directly to your computer
        </div>
        <div className="info-item">
          <strong>📅 File Names:</strong> trading-journal-{getTodayDate()}.csv/pdf
        </div>
      </div>
    </div>
  );
}

export default DownloadOptions; 