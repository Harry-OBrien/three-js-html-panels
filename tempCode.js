
function createCSS3DObject(content) {
    // convert the string to dome elements
    var wrapper = document.createElement('div');
    wrapper.innerHTML = content;
    var div = wrapper.firstChild;

    // set some values on the div to style it.
    // normally you do this directly in HTML and 
    // CSS files.
    div.style.width = '370px';
    div.style.height = '370px';
    div.style.opacity = 0.7;
    div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();

    // create a CSS3Dobject and return it.
    var object = new CSS3DObject(div);
    return object;
}
