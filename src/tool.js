export function html(s,...v){
    let o="";
    let n=document.createElement("a");
    for(let i=0;i<v.length;i++){
        n.innerText=v[i];
        o+=s[i]+n.innerHTML;
    }
    return o+(s.length>v.length?s[s.length-1]:"");
}
export function parse_percentage(n){
    if(n===null || n===undefined){return undefined;}
    return n.endsWith('%')?parseFloat(n.slice(0,n.length-1))+'%':parseFloat(n);
}
export function serialize_percentage(n){
    if(n===null || n===undefined){return undefined;}
    if(n==""){return 0;}
    return n.endsWith('%')?parseFloat(n.slice(0,n.length-1))/100:parseFloat(n);
}
export function serialize_display_row(output){
    return output.map(n=>{
        if(n.indexOf('|')==-1){
            return n;
        }
        let pr=n.split('|').map(n=>parse_percentage(n));
        if(pr.length==2 || (pr.length==3 && !pr[0])){
            if(pr.length==3){
                pr=pr.slice(1,pr.length);
            }
            return html`<div class="column" style="align-items:center">
                <span style="border-bottom:1px solid black">${pr[0]}</span>
                <span>${pr[1]}</span>
            </div>`;
        }
        return html`<div class="row" style="align-items: center;">
            <span style="margin-right: 4px;">${pr[0]}</span>
            <div class="column" style="align-items:center"><span style="border-bottom:1px solid black">${pr[1]}</span>
                <span>${pr[2]}</span>
            </div>
        </div>`;
    });
}
export function serialize_display(output){
    return output.map(row=>serialize_display_row(row));
}