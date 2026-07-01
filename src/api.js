const BASE_ADDR=window.location.href.includes("localhost")?"http://localhost:3000":`https://probable-giggle-k0p1.onrender.com`;
import { get_auth_object } from "./auth";
async function make_auth_header(required=false){
    const auth0=await get_auth_object();
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
export async function make_problem(title,description,difficulty,expr,parameter,test_case,display_name,hint) {
    const headers=await make_auth_header(true);
    const data=new FormData();
    const send_case=[];
    const send_name=[];
    test_case.forEach((test)=>{
        const r=[];
        for(let name of parameter){
            r.push(test[name]);
        }
        send_case.push(r);
    });
    display_name.forEach(display=>{
        const r=[];
        for(let name of parameter){
            r.push(display[name]);
        }
        send_name.push(r);
    });
    data.set("title",title);
    data.set("description",description);
    data.set("difficulty",difficulty);
    data.set("function",expr);
    data.set("parameter",JSON.stringify(parameter));
    data.set("test_case",JSON.stringify(send_case));
    data.set("display_name",JSON.stringify(send_name));
    data.set("hint",JSON.stringify(hint));
    const resp=await fetch(`${BASE_ADDR}/problem/make`,{method:"POST",headers:headers,body:data});
    if(!resp.ok){throw await resp.text();}
}
export async function remove_problem(problem_id){
    const header=await make_auth_header(true);
    const resp=await fetch(`${BASE_ADDR}/problem/remove?problem_id=${problem_id}`,{headers:header,method:"DELETE"});
    if(!resp.ok){
        throw 0;
    }
}
export async function get_favorite_problem(last_id) {
    const url=new URL(`${BASE_ADDR}/problem/favorite`);
    const header=await make_auth_header(true);
    if(last_id!=undefined){
        url.searchParams.set('last_id',last_id);
    }
    const resp=await fetch(url,{headers:header});
    return json_or_err(resp);
}
export async function remove_comment(problem_id){
    const header=await make_auth_header(true);
    const resp=await fetch(`${BASE_ADDR}/comment/remove?problem_id=${problem_id}`,{method:"DELETE",headers:header});
    if(!resp.ok){
        throw 0;
    }
}
export async function get_search(term,last_id){
    return await get_problems();
}
export async function get_completed(last_id) {
    const url=new URL(`${BASE_ADDR}/problem/completed`);
    const header=await make_auth_header(true);
    if(last_id!=undefined){
        url.searchParams.set('last_id',last_id);
    }
    const resp=await fetch(url,{headers:header});
    return json_or_err(resp);
}