//create k with " `data` "
j=k.split("\n").map(x=>x.trim()).filter(x=>x!=="").map(line=>line.split("\t")).map(line=>line.join(" ")).join("\n")