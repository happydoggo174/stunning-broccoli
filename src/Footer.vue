<script setup>
    import facebook from '@/assets/facebook.svg';
    import youtube from '@/assets/youtube.svg';
    import twitter from '@/assets/twitter.svg';
    import instagram from "@/assets/instagram.svg";
</script>
<style scoped>
    footer button{
        border: none;
        background-color: unset;
    }
    .social-btn{
        margin-left: 6px;
    }
    footer{
        background-color: rgb(22, 239, 239);
        color: black;
        height: 40px;
        padding: 6px;
    }
    .term-btn{
        margin-left: 8px;
        padding: 6px;
        border-radius: 12px;
    }
    .term-btn:hover{
        background-color: rgb(0, 162, 255);
    }
</style>
<template>
    <footer id="footer">
        <div class="row" style="justify-content: space-between;">
            <div class="row">
                <button class="term-btn">term of use</button>
                <button class="term-btn">privacy policy</button>
                <button class="term-btn">faq</button>
            </div>
            <div class="row" style="align-items: center;">
                <span>contact us</span>
                <button class="social-btn">
                    <img :src="facebook" alt="facebook" width="24px" height="24px">
                </button>
                <button class="social-btn">
                    <img :src="youtube" alt="youtube" width="24px" height="24px">
                </button>
                <button class="social-btn">
                    <img :src="instagram" alt="instagram" width="24px" height="24px">
                </button>
                <button class="social-btn">
                    <img :src="twitter" alt="twitter" width="24px" height="24px">
                </button>
            </div>
        </div>
    </footer>
</template>