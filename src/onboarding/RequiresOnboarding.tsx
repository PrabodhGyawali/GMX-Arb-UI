const checkOnboardingStatus = async () => {
    try {
      const response = await fetch('/api/settings/find');
      return response.ok; // Returns true if status is in the range 200-299
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return true; // Assume no onboarding needed in case of network errors
    }
};