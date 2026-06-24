import { reactive,watch } from "vue";
export const event_bridge=reactive({});
export const output_bridge=reactive({});
let idx=0;
export function show_dialog(title,msg,is_err=true){
    Object.assign(event_bridge,{"title":title,"msg":msg,"is_err":is_err,"type":"alert"});
}
export function show_custom(widget,data){
    Object.assign(event_bridge,{"type":custom,"object":widget,"data":data});
}
export function poll_output(handle,fn){
    const hd=watch(output_bridge,()=>{
        if(output_bridge.id==handle){
            console.log('returning');
            hd.stop();
            fn(output_bridge.value);
        }
    });
}
export function push_response(handle,resp){
    output_bridge.id=handle;
    output_bridge.value=resp;
    console.log('pushed response');
}
export function show_confirm(title,msg,fn){
    Object.assign(event_bridge,{"title":title,"msg":msg,"type":"confirm","id":++idx});
    poll_output(idx,fn);
}