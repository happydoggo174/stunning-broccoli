import { supabase } from "./supabase";
import {ref,watch} from "vue";
export const auth=ref(null);
export const isAuthenticated=ref(false);
export const isLoading=ref(true);
export const uid=ref(null);
async function load(){
    return await new Promise(r=>{
        setTimeout(()=>supabase.auth.getSession().then(s=>r(s)),0);
    });
}
export async function init_auth(){
    load().then((auth0)=>{
        auth.value=auth0;
        isLoading.value=false;
        isAuthenticated.value=auth0.data.session!=null;
        supabase.auth.onAuthStateChange((ev,s)=>{
            isAuthenticated.value=(s!=null);
            uid.value=s?.user.id;
            if(s!=null){
                auth.value.data.session=s;
            }
        });
    });
}
function nextChange(source) {
  return new Promise((resolve) => {
    const unwatch = watch(source, (newValue) => {
      unwatch() // Stop watching immediately so we don't leak memory
      resolve(newValue)
    })
  })
}
/**
 * 
 * @returns {Promise<ReturnType<useAuth0>>}
 */
export async function get_auth_object(){
    if(auth.value){
        return auth.value;
    }else{
        return await nextChange(auth);
    }
}