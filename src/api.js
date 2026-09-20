const BASE_ADDR=window.location.href.includes("localhost")?"http://localhost:3000":`https://probable-giggle-k0p1.onrender.com`;
import { get_auth_object,isAuthenticated } from "./auth";
async function make_auth_header(required=false){
    const auth0=await get_auth_object();
    if(!auth0 || !isAuthenticated.value){
        if(required)throw new Error("missing auth");
        return {};
    }
    try{
        const token=auth0.data.session.access_token;
        return {"Authorization":`Bearer ${token}`}; 
    }catch(e){
        if(required)throw new Error("missing auth");
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
export async function get_problems(last_id){
    const headers=await make_auth_header();
    const url=new URL(`${BASE_ADDR}/problem/home`);
    if(last_id!==undefined){
        console.log("setting last id");
        url.searchParams.set("last_id",last_id);
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
    const data=JSON.stringify({"problem_id":problem_id,"content":content});
    const resp=await fetch(`${BASE_ADDR}/comment/make`,{method:"POST",headers:header,body:data});
    if(!resp.ok){throw 0;}
}
export async function make_problem(title,description,difficulty,expr,parameter,test_case,display_name,hint,plain_desc,
doc_id,used_img) {
    const headers=await make_auth_header(true);
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
    const data=JSON.stringify({
        "title":title,
        "description":description,
        "difficulty":difficulty,
        "function":expr,
        "parameter":parameter,
        "test_case":send_case,
        "display_name":send_name,
        "hint":hint,
        "plain_desc":plain_desc
    });
    await commit(doc_id,used_img);
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
export async function make_knowledge(title,content,category,difficulty,plain_content,related,doc_id,used_img) {
    const header=await make_auth_header(true);
    const table={
        "beginner":"easy",
        "intermediate":"medium",
        "advanced":"hard"
    };
    const data={
        "title":title,
        "content":content,
        "category":category,
        "difficulty":table[difficulty],
        "plain_content":plain_content
    };
    if(related.length){
        data.related_problem=related;
    }
    await commit(doc_id,used_img);//make sure to commit first to avoid partial failure
    const resp=await fetch(`${BASE_ADDR}/knowledge/make`,{method:"POST",headers:header,body:JSON.stringify(data)});
    if(!resp.ok){
        throw 0;
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
export async function upload_image(fp,doc_id) {
    const header=await make_auth_header(true);
    const body=new FormData();
    body.set("data",fp);
    body.set("doc_id",doc_id);
    const res=await fetch(`${BASE_ADDR}/file/upload`,{method:"POST",headers:header,body:body});
    if(!res.ok){
        throw 0;
    }
    return await res.text();
}
export async function get_solution(sid) {
    return await json_or_err(await fetch(`${BASE_ADDR}/solution/detail?solution_id=${sid}`));
}
export async function list_solution(problem_id,last_id) {
    const url=new URL(`${BASE_ADDR}/solution/list`);
    url.searchParams.set("problem_id",problem_id);
    if(last_id!==undefined){
        url.searchParams.set("last_id",last_id);
    }
    return await json_or_err(await fetch(url));
}
export async function post_solution(pid,title,description,equation) {
    const header=await make_auth_header(true)
    const body=JSON.stringify({
        "problem_id":pid,
        "title":title,
        "description":description,
        "equation":equation
    });
    const resp=await fetch(`${BASE_ADDR}/solution/make`,{method:"POST",headers:header,body:body});
    if(!resp.ok){throw 0;}
}
export async function commit(doc_id,used_img) {
    const header=await make_auth_header(true);
    const url=new URL(`${BASE_ADDR}/file/commit`);
    url.searchParams.set("doc_id",doc_id);
    const body =JSON.stringify({"used_img":used_img});
    const resp=await fetch(url,{headers:header,method:"POST",body:body});
    if(!resp.ok){throw 0;}
}
export async function remove_knowledge(kid) {
    const header=await make_auth_header(true);
    const resp=await fetch(`${BASE_ADDR}/knowledge/drop?knowledge_id=${kid}`,{method:"DELETE",headers:header});
    if(!resp.ok){throw 0;}
}
export async function update_problem(pid,title,description,difficulty,plain_desc) {
    const header=await make_auth_header(true);
    const body={problem_id:pid};
    if(description!=undefined){
        body.description=description;
    }
    if(difficulty!=undefined){
        body.difficulty=difficulty;
    }
    if(title!=undefined){
        body.title=title;
    }
    if(plain_desc!=undefined){
        body.plain_desc=plain_desc;
    }
    const resp=await fetch(`${BASE_ADDR}/problem/update`,{body:JSON.stringify(body),headers:header,method:"POST"});
    if(!resp.ok){throw 0;}
}