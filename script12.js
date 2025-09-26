const users = {
      "user1": { password: "pass123", balance: 1000, email: "user1@example.com" },
      "admin": { password: "admin", balance: 5000, email: "admin@example.com" }
    };
    let currentUser = null;

    function login() {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const errorMsg = document.getElementById('error-msg');

      if (!username || !password) {
        errorMsg.textContent = "Please enter username and password.";
        errorMsg.classList.remove("d-none");
        return;
      }

      if (users[username] && users[username].password === password) {
        errorMsg.classList.add("d-none");
        currentUser = username;
        showDashboard(username);
        showToast("Login Successful!");
      } else {
        errorMsg.textContent = "Invalid username or password.";
        errorMsg.classList.remove("d-none");
      }
    }

    function showDashboard(username) {
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('nav-logout').classList.remove("d-none");
      document.getElementById('nav-profile').classList.remove("d-none");

      document.getElementById('user-name').textContent = username;
      document.getElementById('balance').textContent =
        users[username].balance.toFixed(2);

      const percentage = Math.min(100, (users[username].balance / 10000) * 100);
      document.getElementById('balance-bar').style.width = percentage + "%";
      document.getElementById('balance-bar').textContent = Math.round(percentage) + "%";

      document.getElementById('profile-username').textContent = username;
      document.getElementById('profile-email').textContent = users[username].email;
    }

    function tradeCoin(coin) {
      let pic = "";
      if (coin === "BTC") pic = "image/abc.png";
      else if (coin === "ETH") pic = "image/pqr.png";
      else if (coin === "XRP") pic = "image/xyz.png";
      document.getElementById('bigpic').src = pic;
      showToast("You selected " + coin);
    }

    function logout() {
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('login-container').style.display = 'block';
      document.getElementById('nav-logout').classList.add("d-none");
      document.getElementById('nav-profile').classList.add("d-none");
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('bigpic').src = '';
      currentUser = null;
      showToast("Logged out!");
    }

    function saveProfile() {
      if (!currentUser) return;
      const newUsername = document.getElementById('edit-username').value.trim();
      const newEmail = document.getElementById('edit-email').value.trim();

      if (newUsername) {
        users[currentUser].username = newUsername;
        document.getElementById('profile-username').textContent = newUsername;
      }
      if (newEmail) {
        users[currentUser].email = newEmail;
        document.getElementById('profile-email').textContent = newEmail;
      }
      showToast("Profile updated!");
      const modal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
      modal.hide();
    }

    function showToast(message) {
      document.getElementById('toast-msg').textContent = message;
      const toast = new bootstrap.Toast(document.getElementById('liveToast'));
      toast.show();
    }