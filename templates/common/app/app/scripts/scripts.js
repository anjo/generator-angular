var files = [
    "scripts/scripts.templates.js",
    "scripts/app.js",
    //END
    null
];
angular.forEach(files, function(file) {
    var script = document.createElement("script");
    if(file) {
        script.setAttribute("src", file);
        script.setAttribute("type", "text/javascript");
        //document.body.appendChild(script);
        document.writeln("<script src='"  + file + "' type='text/javascript'></script>");
    }
});
