document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const registrationData = {};
    formData.forEach((value, key) => { // Convert FormData to JSON object
      registrationData[key] = value;
    });

    try {
      const response = await fetch('https://bvc-sports-club-backend-1.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)  // Convert registration data to JSON string
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      const confirmationMessage = `ID: ${data.id}<br>Full Name: ${data.fullName}<br>Address: ${data.address}<br>Status: ${data.status}<br>Fee: ${data.fee}`;

      confirmation.innerHTML = `<h2 style="color: green;">Confirmation</h2>${confirmationMessage}`; // Display confirmation message
      confirmation.classList.remove('hidden');// Show confirmation message container
      form.classList.add('hidden'); // Hide registration form
    } catch (error) {
      console.error('Error registering:', error);
    }
  });
});
