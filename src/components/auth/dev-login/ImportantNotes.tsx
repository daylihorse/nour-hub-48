
const ImportantNotes = () => {
  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="font-medium text-blue-800 mb-2">Important Notes:</h4>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• Click "Create All Sample Users" first to ensure all accounts exist in Supabase Auth</li>
        <li>• Click "Login" to quickly sign in with any sample account</li>
        <li>• Use "Debug Current User" to see user and tenant information in the console</li>
        <li>• Sample accounts will be automatically created if they don't exist</li>
        <li>• Tenant associations are automatically ensured for all sample users</li>
      </ul>
    </div>
  );
};

export default ImportantNotes;
