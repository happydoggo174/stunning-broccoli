const BASE_ADDR=window.location.href.includes("localhost")?"http://localhost:3000":`https://probable-giggle-k0p1.onrender.com`;
import { useAuth0 } from "@auth0/auth0-vue";
/**
 * @type {null|ReturnType<useAuth0>}
 */
let auth0=null;
export function init_auth0(auth_obj){
    auth0=auth_obj;
}
async function make_auth_header(required=false){
    if(!auth0 || !auth0.isAuthenticated){
        if(required){throw new Error("missing auth");}
        return {};
    }
    try{
        const token=await auth0.getAccessTokenSilently();
        return {"Authorization":`Bearer ${token}`}; 
    }catch{
        if(required){throw new Error("missing auth");}
        return {};
    }
}
function json_or_err(resp){
    if(resp.ok){return resp.json();}
    throw new Error("status error");
}
export async function get_problem_detail(problem_id){
    const headers=await make_auth_header();
    const resp=await fetch(`${BASE_ADDR}/problem/detail?problem_id=${problem_id}`,{headers:headers});
    return json_or_err(resp);
}
export async function get_problems(page){
    const headers=await make_auth_header();
    const resp=await fetch(`${BASE_ADDR}/problem/home`,{headers:headers});
    return json_or_err(resp);
}
async function react_problem(problem_id,reaction){
    const headers=await make_auth_header(true);
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
    const headers=await make_auth_header(true);
    const resp=await fetch(`${BASE_ADDR}/problem/status?problem_id=${problem_id}`,{headers:headers});
    return json_or_err(resp);
}
export async function mark_problem_status(problem_id,result){
    const headers=await make_auth_header(true);
    const url=new URL(`${BASE_ADDR}/problem/complete`);
    url.searchParams.set("problem_id",problem_id);
    url.searchParams.set("result",result);
    let resp=null;
    try{
        resp=await fetch(url,{method:"POST",headers:headers});
    }catch{
        throw 0;
    }
    if(!resp.ok){
        throw resp.status;
    }
}
export async function get_comment(problem_id,last_uid){
    const url=new URL(`${BASE_ADDR}/comment`);
    url.searchParams.set("problem_id",problem_id);
    if(last_uid){
        url.searchParams.set("first_uid",last_uid);
    }
    const resp=await fetch(url);
    return json_or_err(resp);
}
export async function make_comment(problem_id,content) {
    const header=await make_auth_header(true);
    const data=new FormData();
    data.append("problem_id",problem_id);
    data.append("content",content);
    const resp=await fetch(`${BASE_ADDR}/comment/make`,{method:"POST",headers:header,body:data});
    if(!resp.ok){throw 0;}
}