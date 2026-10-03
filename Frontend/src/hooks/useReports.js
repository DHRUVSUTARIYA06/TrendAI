import { useState, useEffect, useCallback } from 'react';
import { reportRepository } from '../repositories/reportRepository';

export function useReports() {
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [selectedRange, setSelectedRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await reportRepository.getAvailableReports();
      setReports(res);
    } catch (err) {
      console.error('Failed to load reports list:', err);
      setError('Unable to load report categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const viewReport = useCallback(async (reportType, dateRange = '30d', filters = {}) => {
    try {
      setGenerating(true);
      setSelectedRange(dateRange);
      const reportData = await reportRepository.generateReport({
        reportType,
        dateRange,
        filters
      });
      setActiveReport(reportData);
    } catch (err) {
      console.error('Failed to generate report:', err);
      throw err;
    } finally {
      setGenerating(false);
    }
  }, []);

  const changeReportRange = useCallback(async (range) => {
    if (!activeReport) return;
    await viewReport(activeReport.reportType, range);
  }, [activeReport, viewReport]);

  const closeReport = useCallback(() => {
    setActiveReport(null);
  }, []);

  const refresh = useCallback(async () => {
    await reportRepository.refreshReports();
    await fetchReports();
    if (activeReport) {
      await viewReport(activeReport.reportType, selectedRange);
    }
  }, [fetchReports, activeReport, selectedRange, viewReport]);

  return {
    reports,
    activeReport,
    selectedRange,
    loading,
    generating,
    error,
    viewReport,
    changeReportRange,
    closeReport,
    refresh
  };
}
