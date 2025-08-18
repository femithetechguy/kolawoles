// This script is intended to be injected into destination pages
// It checks if the page was opened from Kolawoles.com and adds a back button if so
(function() {
  // Check if we have a stored script from Kolawoles.com
  const backBtnScript = localStorage.getItem('kolawoles-back-btn-script');
  if (backBtnScript) {
    // Execute the script
    eval(backBtnScript);
    // Clear it so it doesn't affect other sites
    localStorage.removeItem('kolawoles-back-btn-script');
  }
})();
