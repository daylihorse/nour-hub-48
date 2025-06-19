import RedesignedHorseForm from "./redesigned-form/RedesignedHorseForm";
import { HorseFormData } from "@/types/horse-unified";

/**
 * Component: EnglishAddHorseForm
 * 
 * PURPOSE:
 * Wrapper component that provides English language support for horse registration.
 * This component acts as a language-specific entry point to the horse registration
 * system, allowing for internationalization and localization support.
 * 
 * ARCHITECTURAL PATTERN:
 * - Wrapper/Adapter pattern for language-specific implementations
 * - Delegation pattern - forwards all functionality to RedesignedHorseForm
 * - Interface consistency - maintains same props structure across languages
 * 
 * DESIGN RATIONALE:
 * This separation allows the application to support multiple languages
 * (English, Arabic, etc.) while maintaining a consistent underlying form system.
 * Each language wrapper can handle language-specific requirements like RTL text,
 * field validation messages, and cultural date/number formats.
 * 
 * INTEGRATION POINTS:
 * - Integrates with RedesignedHorseForm for actual form implementation
 * - Receives standardized HorseFormData type for data consistency
 * - Supports same callback pattern as other language variants
 * 
 * PROPS EXPLANATION:
 * @param {Function} onSave - Callback fired when form is successfully submitted
 * @param {Function} onCancel - Callback fired when user cancels form submission
 * @param {HorseFormData} editData - Optional horse data for edit mode
 */

interface EnglishAddHorseFormProps {
  /** 
   * Callback function executed when the horse registration form is successfully submitted.
   * Receives the complete form data that should be saved to the backend.
   * 
   * IMPLEMENTATION NOTE:
   * This callback should handle data persistence, validation, and user feedback.
   */
  onSave: (data: HorseFormData) => void;
  
  /** 
   * Callback function executed when the user decides to cancel the horse registration.
   * Typically used to close modals, navigate away, or reset application state.
   * 
   * IMPLEMENTATION NOTE:
   * Should handle cleanup of any temporary data or navigation state.
   */
  onCancel: () => void;

  /** 
   * Optional horse data for edit mode. When provided, the form will be pre-populated
   * with this data, allowing users to modify existing horse information.
   * 
   * IMPLEMENTATION NOTE:
   * When editData is provided, the form operates in edit mode rather than add mode.
   */
  editData?: HorseFormData;
}

/**
 * English Language Horse Registration Form
 * 
 * COMPONENT HIERARCHY:
 * EnglishAddHorseForm (this component)
 *   └── RedesignedHorseForm (actual form implementation)
 *       └── Various form stages and validation logic
 * 
 * LANGUAGE SUPPORT ARCHITECTURE:
 * - EnglishAddHorseForm (English version)
 * - ArabicAddHorseForm (Arabic/RTL version) 
 * - Could extend to other languages as needed
 * 
 * Each language wrapper provides:
 * - Language-specific text direction (LTR/RTL)
 * - Localized validation messages
 * - Cultural formatting for dates/numbers
 * - Language-appropriate field layouts
 */
const EnglishAddHorseForm = ({ onSave, onCancel, editData }: EnglishAddHorseFormProps) => {
  return <RedesignedHorseForm onSave={onSave} onCancel={onCancel} editData={editData} />;
};

export default EnglishAddHorseForm;
