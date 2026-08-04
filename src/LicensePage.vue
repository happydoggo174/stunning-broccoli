<script setup>
    import { ref,onMounted } from "vue";
    import Menu from "./Menu.vue";
    import license from "@/assets/license_text.txt";
    const license_text=ref("");
    onMounted(async()=>{
        license_text.value=await (await fetch(license)).json();
    });
</script>
<style scoped>
    .name{
        display: block;
        text-align: center;
        font-size: 18px;
        margin-top: 12px;
        margin-bottom: 12px;
    }
</style>
<template>
    <Menu>  
        <div style="color: black"> 
            <span style="display: block;text-align: center;font-size: 24px;margin-bottom: 28px;">
                thanks to all of these awesome packages for the existent of this page 
            </span>
            <div v-for="content,name in license_text">
                <span class="name">{{ name }}</span>
                <p class="content">{{ content }}</p>
            </div>
        </div>
    </Menu>
</template>