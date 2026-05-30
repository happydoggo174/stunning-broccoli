export async function get_problem_detail(problem_id){
    return {
        title:"some problem",
        description:"some really long description here",
        author:"phuc",
        parameter:['x','y'],
        output:[{"x":9,"y":3,"output":12},{"x":4,"y":5,"output":9}]
    };
}
export async function login(username,password){
    return true;
}
export async function get_problems(page){
    return [
        {title:"easy problem",difficulty:"easy",reaction:3,id:0},
        {title:"medium problem",difficulty:"medium",reaction:-13,id:1},
        {title:"hard problem",difficulty:"hard",reaction:26,id:2}
    ];
}