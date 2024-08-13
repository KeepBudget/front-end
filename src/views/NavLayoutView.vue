<template>
  <div id="navLayout-view">
    <RouterView />
    <div id="bottom-navigation">
      <div class="navigation-button" @click="clickNavBtn('sentiment')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            :fill="color('sentiment')"
            d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16.001A8 8 0 0 0 10 18Zm-4-7h8a4 4 0 1 1-8 0Zm0-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
          />
        </svg>
        <div :style="fontColor('sentiment')">Sentiment</div>
      </div>
      <div class="navigation-button" @click="clickNavBtn('real-price')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="22"
          fill="none"
          viewBox="0 0 26 22"
        >
          <path
            :fill="color('real-price')"
            d="M21.125 7.508V2.062h-4.063v2.512L13 1.375 0 11.688h3.25v8.937h7.313V13.75h4.874v6.875h7.313v-8.938H26l-4.875-4.179Z"
          />
        </svg>
        <div :style="fontColor('real-price')">Real Price</div>
      </div>
      <div class="navigation-button" @click="clickNavBtn('accident')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 22 22"
        >
          <path
            :fill="color('accident')"
            fill-rule="evenodd"
            d="M20.167 1.222H1.833a.611.611 0 0 0-.61.611v18.334a.611.611 0 0 0 .61.61h18.334a.611.611 0 0 0 .61-.61V1.833a.611.611 0 0 0-.61-.61ZM1.833 0A1.833 1.833 0 0 0 0 1.833v18.334A1.833 1.833 0 0 0 1.833 22h18.334A1.833 1.833 0 0 0 22 20.167V1.833A1.833 1.833 0 0 0 20.167 0H1.833Z"
            clip-rule="evenodd"
          />
          <path
            :fill="color('accident')"
            fill-rule="evenodd"
            d="M8.854 6.313C7.85 6.486 7.12 7.337 7 8.349l-.888 7.54h9.778L15 8.339c-.119-1.008-.843-1.856-1.842-2.031-1.497-.262-2.745-.265-4.303.005Zm.759 2.639A.611.611 0 0 0 8.4 8.8l-.553 4.423a.611.611 0 1 0 1.213.152l.553-4.423Z"
            clip-rule="evenodd"
          />
          <path
            :fill="color('accident')"
            fill-rule="evenodd"
            d="M10.067 7.38a1.833 1.833 0 0 1 .758 1.723l-.552 4.423a1.823 1.823 0 0 1-.6 1.14h4.84l-.728-6.184c-.062-.532-.43-.899-.838-.97-1.021-.179-1.9-.224-2.88-.132ZM15 8.34c-.118-1.008-.843-1.856-1.842-2.031-1.497-.262-2.745-.265-4.303.005C7.85 6.486 7.12 7.337 7 8.349l-.888 7.54h9.778L15 8.339Zm-5.386.613-.553 4.423a.612.612 0 1 1-1.213-.152L8.4 8.8a.611.611 0 1 1 1.213.152Zm6.887 9.381h-11v-1.222h11v1.222Z"
            clip-rule="evenodd"
          />
          <path
            :fill="color('accident')"
            d="M4.278 11c0 .206.009.41.027.611h-1.86V10.39h1.86a6.746 6.746 0 0 0-.027.611Zm1.23-3.877a6.682 6.682 0 0 0-.612 1.059l-1.61-.93.61-1.059 1.611.93Zm2.674-2.228a6.814 6.814 0 0 0-1.059.612l-.93-1.61 1.058-.612.93 1.61ZM11 4.278c-.206 0-.41.009-.611.027v-1.86h1.222v1.86A6.725 6.725 0 0 0 11 4.278Zm3.877 1.23a6.724 6.724 0 0 0-1.059-.612l.93-1.61 1.059.61-.93 1.611Zm2.228 2.674a6.722 6.722 0 0 0-.612-1.059l1.61-.93.612 1.059-1.61.93ZM17.722 11c0-.206-.009-.41-.027-.611h1.86v1.222h-1.86c.018-.202.027-.405.027-.61Z"
          />
        </svg>
        <div :style="fontColor('accident')">Accident</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const currentUrl = ref(route.path);

    const color = url => {
      return currentUrl.value.startsWith(`/${url}`) ? '#60584C' : '#D5D5D5';
    };

    const fontColor = url => {
      return {
        color: currentUrl.value.startsWith(`/${url}`) ? '#60584C' : '#D5D5D5',
      };
    };

    const clickNavBtn = url => {
      router.push({
        name: url,
      });
      currentUrl.value = `/${url}`;
    };

    return {
      color,
      fontColor,
      clickNavBtn,
    };
  },
};
</script>

<style scoped>
#navLayout-view {
  width: 100vw;
  height: 100vh;
}

#bottom-navigation {
  height: 7vh;
  width: 100vw;
  background-color: #f5f5f5;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.navigation-button {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: small;
  font-weight: bold;
}
</style>
