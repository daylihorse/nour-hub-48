
import { useState } from "react";

export const useAnalysisManagement = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string[]>([]);
  const [tubeStatus, setTubeStatus] = useState<{[key: string]: string}>({});
  const [rejectionReasons, setRejectionReasons] = useState<{[key: string]: string}>({});

  const handleAnalysisChange = (analysisId: string, checked: boolean) => {
    if (checked) {
      setSelectedAnalysis(prev => [...prev, analysisId]);
    } else {
      setSelectedAnalysis(prev => prev.filter(id => id !== analysisId));
      // Remove tube status for unselected analysis
      const newTubeStatus = { ...tubeStatus };
      delete newTubeStatus[analysisId];
      setTubeStatus(newTubeStatus);
      const newRejectionReasons = { ...rejectionReasons };
      delete newRejectionReasons[analysisId];
      setRejectionReasons(newRejectionReasons);
    }
  };

  const handleTubeStatusChange = (analysisId: string, status: string) => {
    setTubeStatus(prev => ({ ...prev, [analysisId]: status }));
    if (status === "yes") {
      // Remove rejection reason if tube is appropriate
      const newRejectionReasons = { ...rejectionReasons };
      delete newRejectionReasons[analysisId];
      setRejectionReasons(newRejectionReasons);
    }
  };

  const handleRejectionReasonChange = (analysisId: string, reason: string) => {
    setRejectionReasons(prev => ({ ...prev, [analysisId]: reason }));
  };

  return {
    selectedAnalysis,
    tubeStatus,
    rejectionReasons,
    handleAnalysisChange,
    handleTubeStatusChange,
    handleRejectionReasonChange
  };
};
