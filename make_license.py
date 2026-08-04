import os
import json
from pathlib import Path
licenses={}
with os.scandir("./node_modules/") as entries:
    for entry in entries:
        fullname=f"./node_modules/{entry.name}/core/LICENSE"
        if(not Path(fullname).exists()):
            fullname=f"./node_modules/{entry.name}/LICENSE"
        try:
            with open(fullname)  as fp:
                licenses[entry.name]=fp.read()
        except:
            continue
        if(entry.name.startswith("@")):
            with os.scandir(f"./node_modules/{entry.name}") as sub:
                for subpkg in sub:
                    pkgname=f"./node_modules/{entry.name}/{subpkg.name}/LICENSE"
                    if(Path(pkgname).exists()):
                        with open(pkgname) as fp:
                            licenses[f"{entry.name}/{subpkg.name}"]=fp.read()
with open("license_text.txt","w+") as fp:
    fp.write(json.dumps(licenses))