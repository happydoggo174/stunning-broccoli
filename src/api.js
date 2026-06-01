const BASE_ADDR="https://probable-giggle-414mxcf8l-hai-thanhs-projects.vercel.app";
export async function get_problem_detail(problem_id){
    return (await fetch(`${BASE_ADDR}/problem/detail?problem_id=${problem_id}`)).json();
}
export async function login(username,password){
    return true;
}
export async function get_problems(page){
    return (await fetch(`${BASE_ADDR}/problem/home`)).json();
}