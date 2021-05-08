<template>
    <div>
        <div id="navigation-links">
            <span class="nav-link">
                <router-link v-bind:to="{ name: 'StateList' }">Home</router-link>
            </span>

            <span class="nav-link">
                <router-link v-bind:to="{ name: 'AboutSite'}">About this site</router-link>
            </span>
            <span class="nav-link">
                <router-link v-bind:to="{ name: 'StatesVisited'}">States visited list</router-link>
            </span>
        </div>
        <p>Header image by <a href="https://www.pexels.com/photo/map-of-the-world-book-laid-open-on-brown-wooden-surface-32307/">John-Mark Smith on Pexels</a></p>
        <p>US Map icon by Crystal Gordon from the Noun Project</p>
    </div>
</template>

<script>
export default {
    name: 'PageFooter'

}
</script>

<style scoped>

.nav-link {
    margin: 1rem; 
}

</style>