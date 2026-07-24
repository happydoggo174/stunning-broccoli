const BASE_ADDR=window.location.href.includes("localhost")?"http://localhost:3000":`https://probable-giggle-k0p1.onrender.com`;
import { get_auth_object,isAuthenticated } from "./auth";
async function make_auth_header(required=false){
    const auth0=await get_auth_object();
    if(!auth0 || !isAuthenticated.value || auth0.data.session==null){
        if(required){throw new Error("missing auth");}
        return {};
    }
    try{
        const token=auth0.data.session.access_token;
        return {"Authorization":`Bearer ${token}`}; 
    }catch(e){
        console.log(e);
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
    const url=new URL(`${BASE_ADDR}/problem/home`);
    if(page!==undefined){
        url.searchParams.set("page",page);
    }
    const resp=await fetch(url,{headers:headers});
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
export async function make_problem(title,description,difficulty,expr,parameter,test_case,display_name,hint,plain_desc) {
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
    data.set("plain_desc",plain_desc);
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
export async function get_knowledge_home(last_id) {
    const url=new URL(`${BASE_ADDR}/knowledge/home`);
    if(last_id!==undefined){
        url.searchParams.set("last_id",last_id);
    }
    return json_or_err(await fetch(url));
}
export async function get_knowledge_detail(knowledge_id) {
    const header=await make_auth_header();
    const url=new URL(`${BASE_ADDR}/knowledge/detail`);
    url.searchParams.set("knowledge_id",knowledge_id);
    return json_or_err(await fetch(url,{headers:header}));
}
export async function make_knowledge(title,content,category,difficulty,plain_content,related) {
    try{
        const header=await make_auth_header(true);
        const table={
            "beginner":"easy",
            "intermediate":"medium",
            "advanced":"hard"
        };
        const data=new FormData();
        data.append("title",title);
        data.append("content",content);
        data.append("category",JSON.stringify(category));
        data.append("difficulty",table[difficulty]);
        data.append("plain_content",plain_content);
        if(related.length){
            data.append("related_problem",JSON.stringify(related));
        }
        const resp=await fetch(`${BASE_ADDR}/knowledge/make`,{method:"POST",headers:header,body:data});
        if(!resp.ok){
            throw 0;
        }
    }catch(e){
        console.log(e);
        return;
    }
}
export async function get_user_profile(uid) {
    const url=new URL(`${BASE_ADDR}/account/detail`);
    url.searchParams.set("uid",uid);
    return await json_or_err(await fetch(url));
}
export async function like_knowledge(kid) {
    const header=await make_auth_header(true);
    const resp=await fetch(`${BASE_ADDR}/knowledge/react?reaction=liked&knowledge_id=${kid}`,
    {method:"POST","headers":header});
    if(!resp.ok){
        throw 0;
    }
}
export async function dislike_knowledge(kid) {
    const header=await make_auth_header(true);
    const resp=await fetch(`${BASE_ADDR}/knowledge/react?reaction=disliked&knowledge_id=${kid}`,
    {method:"POST","headers":header});
    if(!resp.ok){
        throw 0;
    }
}
export async function register(email,name,password,profile) {
    const body=new FormData();
    body.set("email",email);
    body.set("username",name);
    body.set("password",password);
    if(profile){
        body.set("profile",profile);
    }
    const resp=await fetch(`${BASE_ADDR}/account/register`,{method:"POST",body:body});
    if(!resp.ok){
        throw 0;
    }
}
export async function get_self_detail(auth){
    const uid=auth?.data.session?.user.id;
    if(uid==undefined){
        return {};
    }
    try{
        const cache=JSON.parse(localStorage.getItem("user_cache"));
        if(cache==null || cache["uid"]!=uid){
            throw 0;
        }
        return cache["account"]["account"];
    }catch{
        const data=await get_user_profile(uid);
        localStorage.setItem("user_cache",JSON.stringify({uid:uid,account:data}));
        return data["account"];
    }
}