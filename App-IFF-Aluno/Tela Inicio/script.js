function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  }
  
  function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
  }