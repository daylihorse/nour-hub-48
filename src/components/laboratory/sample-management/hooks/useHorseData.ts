
import { useState, useEffect } from "react";
import { getHorseName, getPreviousSamples } from "../utils/mockData";

export const useHorseData = () => {
  const [selectedHorse, setSelectedHorse] = useState("");
  const [sampleType, setSampleType] = useState("new");
  const [selectedPreviousSample, setSelectedPreviousSample] = useState("");

  const horseName = getHorseName(selectedHorse);
  const previousSamples = getPreviousSamples(selectedHorse);

  // Reset previous sample selection when horse changes
  useEffect(() => {
    console.log("Horse changed, resetting previous sample selection");
    setSelectedPreviousSample("");
  }, [selectedHorse]);

  // Reset sample type when horse changes
  useEffect(() => {
    console.log("Horse changed, resetting sample type to new");
    setSampleType("new");
  }, [selectedHorse]);

  const handleHorseSelect = (value: string) => {
    console.log("Horse selected:", value);
    setSelectedHorse(value);
  };

  const handleSampleTypeChange = (value: string) => {
    console.log("Sample type changed to:", value);
    setSampleType(value);
    if (value === "new") {
      setSelectedPreviousSample("");
    }
  };

  return {
    selectedHorse,
    sampleType,
    selectedPreviousSample,
    horseName,
    previousSamples,
    setSelectedPreviousSample,
    handleHorseSelect,
    handleSampleTypeChange
  };
};
