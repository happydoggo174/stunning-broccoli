import { createAuth0 } from "@auth0/auth0-vue";
import {ref,watch} from "vue";
export const auth=ref(null);
export const isAuthenticated=ref(false);
export const isLoading=ref(true);
export const uid=ref(null);
async function load_auth0(){
    return await new Promise((resolve)=>{
        setTimeout(resolve(createAuth0({
            domain: import.meta.env.VITE_AUTH0_DOMAIN,
            clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
            authorizationParams: {
                redirect_uri: window.location.origin+`/${import.meta.env.VITE_BASE}/`,
                audience:"mathapi"
            },
            cacheLocation:'localstorage'
        })),0);
    });
}
export async function init_auth(app){
    load_auth0().then((auth0)=>{
        auth.value=auth0;
        watch(()=>auth0.isAuthenticated.value,(val)=>{
            isAuthenticated.value=val;
            watch(auth0.isLoading,v=>{
                if(v){return};
                uid.value=(val?auth0.user.value.sub:null);
            },{immediate:true});
        });
        watch(()=>auth0.isLoading.value,(val)=>{isLoading.value=val});
        app.use(auth0);
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