<template>
    <div>
        <yt-nav></yt-nav>
        <keep-alive>
        <router-view :key="$route.params.id"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import ytNav from '@/components/ytNav';

export default {
    components:{
        ytNav
    }
}
</script>

<style>

</style>
