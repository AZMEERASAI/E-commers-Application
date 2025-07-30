// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('email', res.data.user.email);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.header}>
        <h2 style={styles.logo}>Ecommerce App</h2>
        <nav>
          <ul style={styles.navList}>
            <li><a href="/" style={styles.navLink}>Home</a></li>
            <li><a href="#about" style={styles.navLink}>About</a></li>
            <li><a href="#contact" style={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Login Form */}
      <div style={styles.formWrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Login</h2>
          <input
            placeholder="Email"
            required
            type="email"
            style={styles.input}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            required
            type="password"
            style={styles.input}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <select
            style={styles.select}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>

      {/* About Section */}
      <section id="about" style={{ ...styles.section, marginTop: '160px' }}>
        <h2 style={styles.sectionTitle}>About</h2>
        <p style={styles.sectionText}>
          Our Ecommerce App makes online shopping simple and fast. You can browse products,
          add them to your cart, and place orders securely. Whether you're buying clothes,
          gadgets, or groceries – we’ve got it all!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact</h2>
        <p style={styles.sectionText}>
          📞 Phone: <a href="tel:9010854701" style={styles.contactLink}>9010854701</a><br />
          📧 Email: <a href="mailto:azmeerasai123456789@gmail.com" style={styles.contactLink}>azmeerasai123456789@gmail.com</a>
        </p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Ecommerce App. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    color: '#fff',
    fontSize: '24px',
    margin: 0,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '25px',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '80px 20px 0',
  },
  form: {
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    maxWidth: '500px', // Increased width
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '12px',
    fontSize: '17px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '12px',
    fontSize: '17px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '14px',
    fontSize: '17px',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  section: {
    padding: '60px 40px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
  },
  sectionTitle: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
  contactLink: {
    color: '#2980b9',
    textDecoration: 'none',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#2c3e50',
    color: '#fff',
  },
};

export default Login;

