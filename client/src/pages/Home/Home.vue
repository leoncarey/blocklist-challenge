<template>
  <div class="content-wrapper">
    <div class="inner-content-wrapper">
      <Header />
      <ListUserScreen />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '../../components/Header/Header.vue';
import ListUserScreen from '../../screens/ListScreen/ListScreen.vue';

export default {
  components: {
    Header,
    ListUserScreen
  }
}
</script>
