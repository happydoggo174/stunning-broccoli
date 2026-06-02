const BASE_ADDR="https://probable-giggle-414mxcf8l-hai-thanhs-projects.vercel.app";
export async function get_problem_detail(problem_id){
    const resp=await fetch(`${BASE_ADDR}/problem/detail?problem_id=${problem_id}`);
    if(!resp.ok){throw 0;}
    return resp.json();
}
export async function get_problems(page){
    const resp=await fetch(`${BASE_ADDR}/problem/home`);
    if(!resp.ok){throw 0;}
    return resp.json();
}