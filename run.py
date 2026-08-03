with open("src.txt","rb") as fp:
    content=fp.read().decode(errors="ignore")
br=0
out=""
for c in content:
    if(c=='{'):
        if(br==0):
            out+='$'        
        br+=1
    if(c=='}'):
        br-=1
        if(br==0):
            out+='}$'
            continue
    out+=c
with open("out.txt","wb") as fp:
    fp.write(out.encode(errors="ignore"))