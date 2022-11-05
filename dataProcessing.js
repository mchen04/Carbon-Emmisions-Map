//create k with " `data` "
j = k.split("\n").map(x => x.trim()).filter(x => x !== "").map(line => line.split("\t")).map(line => line.join(" ")).join("\n")


j = k.split("\n").map(x => x.trim()).filter(x => x !== "").map(line => line.split("\t")).map(line => { var i = line[6].split(" ").findIndex(x => x.startsWith("http")); var url = line[6].split(" ")[i]; console.log(url); line[6] = url; return line }).map(line => line.join(",")).join("\n")


