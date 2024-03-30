<script>
import { inject } from 'vue'

const securedAxiosInstance = inject('securedAxiosInstance')
const plainAxiosInstance = inject('plainAxiosInstance')

// // Function to get data using the secured Axios instance
// const getListWithMyHttp = (): void => {
//   securedAxiosInstance
//     .get(api)
//     .then((response: { data: any }) => {
//       console.log(response.data)
//     });
// };

// // Function to get data using the plain Axios instance
// const getListWithAxios2 = (): void => {
//   plainAxiosInstance
//     .get(api)
//     .then((response: { data: any }) => {
//       console.log(response.data)
//     });
// };
</script>

<template>
  <div class="flex-col">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <nav>
          <RouterLink to="/signin">Sign In</RouterLink>
          <RouterLink to="/signup">Sign Up</RouterLink>
          <RouterLink to="/signout">Sign OUT</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>
