<script setup>
    import { ref} from 'vue';
    const prop=defineProps({
        name:String,
        is_out:Boolean
    });
    const emit=defineEmits(["value",]);
    const content=ref("");
    function save_value(){
        return {name:prop.name,value:parseFloat(content.value)};
    }
    defineExpose({"save":save_value});
</script>
<template>
    <div class="row" style="margin-top: 14px;">
        <span>{{ prop.name }}</span>
        <input type="number" style="margin-left: 12px;" v-model="content">
    </div>
</template>