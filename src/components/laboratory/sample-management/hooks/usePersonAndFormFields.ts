
import { useState } from "react";

export const usePersonAndFormFields = () => {
  const [priority, setPriority] = useState("");
  const [personWhoBrought, setPersonWhoBrought] = useState("");
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [sampleReceiptDate, setSampleReceiptDate] = useState<Date>();
  const [notes, setNotes] = useState("");

  const handlePersonSelect = (value: string) => {
    console.log("Person select handler called with:", value);
    if (value === "__add_new__") {
      setShowAddPerson(true);
    } else {
      setPersonWhoBrought(value);
    }
  };

  const handlePersonAdded = (person: { name: string; phone: string }) => {
    console.log("Person added:", person);
    setPersonWhoBrought(person.name);
    setShowAddPerson(false);
  };

  return {
    priority,
    personWhoBrought,
    showAddPerson,
    sampleReceiptDate,
    notes,
    setPriority,
    setSampleReceiptDate,
    setNotes,
    setShowAddPerson,
    handlePersonSelect,
    handlePersonAdded
  };
};
