<%*
  s = tp.file.content;
  p = s.split("\n")
        .filter(x => x.match(/^#+\s/))
        .map(x => {
            d = x.split(" ")[0].length;
            s = x.substr(d+1);
            link = "[" + s + "](#" + s +")";
            return ">" + "  ".repeat(d-1) + link;
        }).join("  \n");
  return ">[!info]- 目次\n" + p;
%>