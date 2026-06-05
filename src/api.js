const BASE_ADDR=window.location.href.includes("localhost")?"http://localhost:3000":`https://probable-giggle-k0p1.onrender.com`;
import { useAuth0 } from "@auth0/auth0-vue";
/**
 * @type {null|ReturnType<useAuth0>}
 */
let auth0=null;
export function init_auth0(auth_obj){
    auth0=auth_obj;
}
async function make_auth_header(){
    if(!auth0 || !auth0.isAuthenticated){return {};}
    try{
        const token=await auth0.getAccessTokenSilently();
        return {"Authorization":`Bearer ${token}`}; 
    }catch{
        return {};
    }
}
export async function get_problem_detail(problem_id){
    const headers=await make_auth_header();
    const resp=await fetch(`${BASE_ADDR}/problem/detail?problem_id=${problem_id}`,{headers:headers});
    if(!resp.ok){throw 0;}
    return resp.json();
}
export async function get_problems(page){
    const headers=await make_auth_header();
    const resp=await fetch(`${BASE_ADDR}/problem/home`,{headers:headers});
    if(!resp.ok){throw 0;}
    return resp.json();
}
async function react_problem(problem_id,reaction){
    const headers=await make_auth_header();
    if(!Object.hasOwn(headers,"Authorization")){
        throw 0;
    }
    const resp=await fetch(`${BASE_ADDR}/problem/${reaction}?problem_id=${problem_id}`,{method:"post",headers:headers});
    if(!resp.ok){throw 0;}
}
export async function like_problem(problem_id){
    return await react_problem(problem_id,"like");
}
export async function dislike_problem(problem_id){
    return await react_problem(problem_id,"dislike");
}
export async function get_problem_status(problem_id){
    const headers=await make_auth_header();
    if(!Object.hasOwn(headers,"Authorization")){
        throw 0;
    }
    const resp=await fetch(`${BASE_ADDR}/problem/status?problem_id=${problem_id}`,{headers:headers});
    if(!resp.ok){throw 0;}
    return resp.json();
}