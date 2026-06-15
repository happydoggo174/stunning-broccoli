import { mark_problem_status } from "./api";
import { show_dialog } from "./notificationdaemon";
export function save_completion_local(problem_id,status){
    const completions=localStorage.getItem("completions");
    if(!completions){
        localStorage.setItem("completions",JSON.stringify([{problem_id:problem_id,status:status}]));
        return;
    } 
    const comp=JSON.parse(completions);
    comp.push({problem_id:problem_id,status:status});
    localStorage.setItem("completions",JSON.stringify(comp));
}
export async function sync_completion(){
    const completions=localStorage.getItem("completions");
    if(!completions || !navigator.onLine){return 0;}
    const comp=JSON.parse(completions);
    const left=[];
    comp.forEach(async completed => {
        try{
            await mark_problem_status(completed.problem_id,completed.status);
        }catch(e){
            if(e===0){
                //catch network error
                left.push(completed);
            }
            show_dialog("error","error marking completion");
        }
    });
    if(!left.length){
        localStorage.removeItem("completions");
    }else{
        localStorage.setItem("completions",JSON.stringify(left));
    }
    return comp.length-left.length;
}
export function is_problem_completed(problem_id){
    const data=localStorage.getItem("completions");
    if(!data){return false;}
    const arr=JSON.parse(data);
    for(let comp of arr){
        if(comp.problem_id==problem_id){
            return true;
        }
    }
    return false;
}