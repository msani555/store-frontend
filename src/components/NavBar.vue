<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="bi bi-backpack2" style="color: darkblue"></i>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/"> Courses </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <router-link to="/carts">
            <i class="bi bi-cart3"></i>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script></script>

<style scoped>
.navbar {
  padding: 10px 0;
  margin-bottom: 4rem;
}

.navbar .nav-item {
  padding-left: 5px;
  font-size: 16px;
}

.navbar a {
  text-decoration: none;
  color: black !important;
}

.navbar .bi {
  font-size: 24px;
  font-weight: bolder;
}
</style>
