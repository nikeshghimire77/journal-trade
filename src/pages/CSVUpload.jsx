import React, { useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

function CSVUpload() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadStatus('uploading');

        files.forEach(file => {
            if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const csvContent = e.target.result;
                        const lines = csvContent.split('\n');
                        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

                        // Parse CSV and convert to trades format
                        const trades = lines.slice(1).filter(line => line.trim()).map(line => {
                            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
                            const trade = {};
                            headers.forEach((header, index) => {
                                trade[header.toLowerCase().replace(/\s+/g, '')] = values[index] || '';
                            });
                            return {
                                ...trade,
                                id: Date.now() + Math.random(),
                                timestamp: new Date().toISOString()
                            };
                        });

                        // Save to localStorage
                        const existingTrades = JSON.parse(localStorage.getItem('trades') || '[]');
                        const updatedTrades = [...existingTrades, ...trades];
                        localStorage.setItem('trades', JSON.stringify(updatedTrades));

                        setUploadedFiles(prev => [...prev, {
                            name: file.name,
                            size: file.size,
                            status: 'success',
                            tradesCount: trades.length
                        }]);

                        setUploadStatus('success');
                    } catch (error) {
                        console.error('Error parsing CSV:', error);
                        setUploadedFiles(prev => [...prev, {
                            name: file.name,
                            size: file.size,
                            status: 'error',
                            error: 'Failed to parse CSV file'
                        }]);
                        setUploadStatus('error');
                    }
                };
                reader.readAsText(file);
            } else {
                setUploadedFiles(prev => [...prev, {
                    name: file.name,
                    size: file.size,
                    status: 'error',
                    error: 'Invalid file type. Please upload a CSV file.'
                }]);
                setUploadStatus('error');
            }
        });
    };

    return (
        <div className="container">
            <div className="header">
                <div className="header-top">
                    <div className="custom-logo">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Gradients */}
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>

                            {/* Outer ring with gradient */}
                            <circle cx="25" cy="25" r="23" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />

                            {/* Inner circle */}
                            <circle cx="25" cy="25" r="15" fill="url(#innerGradient)" />

                            {/* Chart line going up */}
                            <path d="M10 30 L15 25 L20 28 L25 20 L30 22 L35 18 L40 21"
                                stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />

                            {/* NG Text */}
                            <text x="25" y="22" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" filter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))">NG</text>

                            {/* Small trading indicator dots */}
                            <circle cx="15" cy="25" r="1.5" fill="#10b981" />
                            <circle cx="25" cy="20" r="1.5" fill="#f59e0b" />
                            <circle cx="35" cy="18" r="1.5" fill="#ef4444" />
                        </svg>
                    </div>
                    <div className="header-title">
                        <h1>Journal Backup & Restore</h1>
                        <p>Import your journal data from CSV exports</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>📁 Import Trading Data</h2>
                    <Upload className="collapse-icon" size={20} />
                </div>
                <div className="card-content">
                    <div className="upload-section">
                        <h3>Import Your Journal Data</h3>

                        {/* Step-by-step guide */}
                        <div className="upload-guide">
                            <div className="guide-step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Export from Your Journal</h4>
                                    <p>Go to the Journal page and use the "Download CSV" option to export your trading journal data as a CSV file.</p>
                                </div>
                            </div>

                            <div className="guide-step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Upload Your CSV File</h4>
                                    <p>Upload the CSV file you downloaded from your journal. This will restore your trading data and analysis.</p>
                                </div>
                            </div>

                            <div className="guide-step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Restore Your Data</h4>
                                    <p>Once imported, all your trades, analysis, and journal entries will be restored to your journal.</p>
                                </div>
                            </div>
                        </div>

                        {/* CSV Format Example */}
                        <div className="csv-example">
                            <h4>📋 Journal CSV Export Format</h4>
                            <p className="format-note">This is the format of CSV files exported from your trading journal:</p>
                            <div className="example-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Ticker</th>
                                            <th>Position</th>
                                            <th>Entry Price</th>
                                            <th>Exit Price</th>
                                            <th>Quantity</th>
                                            <th>P&L</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2024-01-15</td>
                                            <td>AAPL</td>
                                            <td>Long</td>
                                            <td>150.25</td>
                                            <td>155.50</td>
                                            <td>100</td>
                                            <td>525.00</td>
                                            <td>Strong earnings beat</td>
                                        </tr>
                                        <tr>
                                            <td>2024-01-16</td>
                                            <td>TSLA</td>
                                            <td>Short</td>
                                            <td>200.00</td>
                                            <td>195.75</td>
                                            <td>50</td>
                                            <td>212.50</td>
                                            <td>Technical breakdown</td>
                                        </tr>
                                        <tr>
                                            <td>2024-01-17</td>
                                            <td>NVDA</td>
                                            <td>Long</td>
                                            <td>450.00</td>
                                            <td>465.25</td>
                                            <td>25</td>
                                            <td>381.25</td>
                                            <td>AI momentum play</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="upload-area" onClick={() => document.getElementById('csv-upload').click()}>
                            <Upload size={48} color="#4f46e5" />
                            <p>Click to upload your CSV files or drag and drop</p>
                            <label htmlFor="csv-upload" className="btn btn-primary">
                                <Upload size={16} />
                                Choose CSV Files
                            </label>
                            <input
                                id="csv-upload"
                                type="file"
                                multiple
                                accept=".csv"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {uploadStatus && (
                            <div className="upload-status">
                                {uploadStatus === 'uploading' && (
                                    <>
                                        <AlertCircle size={16} />
                                        Processing files...
                                    </>
                                )}
                                {uploadStatus === 'success' && (
                                    <>
                                        <CheckCircle size={16} />
                                        Files uploaded successfully!
                                    </>
                                )}
                                {uploadStatus === 'error' && (
                                    <>
                                        <XCircle size={16} />
                                        Some files failed to upload
                                    </>
                                )}
                            </div>
                        )}

                        {uploadedFiles.length > 0 && (
                            <div className="uploaded-files">
                                <h4>Uploaded Files</h4>
                                {uploadedFiles.map((file, index) => (
                                    <div key={index} className="file-item">
                                        <div className="file-info">
                                            <FileText size={16} />
                                            <div>
                                                <div className="file-name">{file.name}</div>
                                                <div className="file-size">{(file.size / 1024).toFixed(1)} KB</div>
                                            </div>
                                        </div>
                                        <div className={`file-status ${file.status}`}>
                                            {file.status === 'success' && (
                                                <>
                                                    <CheckCircle size={12} />
                                                    {file.tradesCount} trades imported
                                                </>
                                            )}
                                            {file.status === 'error' && (
                                                <>
                                                    <XCircle size={12} />
                                                    {file.error}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="export-info">
                            <div className="info-item">
                                <strong>📋 Supported Format:</strong> CSV files exported from your trading journal
                            </div>
                            <div className="info-item">
                                <strong>📊 Data Restoration:</strong> All trades, notes, and analysis will be restored
                            </div>
                            <div className="info-item">
                                <strong>💾 Data Storage:</strong> Imported data is automatically saved to your journal
                            </div>
                            <div className="info-item">
                                <strong>🔄 Backup & Restore:</strong> Use this feature to backup and restore your journal data
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CSVUpload; 