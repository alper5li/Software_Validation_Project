const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const username = formData.get('username');
      const password = formData.get('password');
      

      // DATABASE CONNECTION AND CHECK
      if (username === 'admin' && password === '1234') {
        alert('Login successful');
      } else {
        alert('Invalid username or password');
      }
    });