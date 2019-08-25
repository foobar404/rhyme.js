var c = ["#4e4e6a", "#62374e", "#8e1d41", "#dbbf0d"]
var f = `'Comfortaa', cursive`;
var current_index = 0;
const rnn = ml5.charRNN('./mv2', () => {});
var g_hint,compute;
var rhymeObj = new Rhyme();

$("#pad").keydown(function (e) {
  var time = new Date().getTime();
  compute = time;
  if (e.which == 9) { //tab
    e.preventDefault();
    e.stopPropagation();
    var cur = document.getElementById("pad").children[current_index];
    for(var word in g_hint.split(" ")){
      var w = g_hint.split(" ")[word];
      var s = document.createElement("span");
      s.textContent = " " + w;
      insertAfter(s,cur);
      cur = s;
    }
    moveCaret(cur.childNodes[cur.childNodes.length - 1]);
  }
  $(".hint").remove();
  if (e.which == 32) { //space
    e.preventDefault();
    e.stopPropagation();
    replaceTextNodes();
    next();
    paint();
    setTimeout(()=>{
        predictAI(time);
    },1000)
  }
  if (e.which == 13) { //enter
    e.preventDefault();
    e.stopPropagation();
    paint();
    var c = document.getElementById("pad").children[current_index];
    var br = document.createElement("br");
    insertAfter(br, c);
  }
  document.getElementById("pad").focus();
})

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function predictAI(time) {
  var elm = window.getSelection().anchorNode;
  if (elm.parentElement.id != "pad") return;
  var s = document.getElementById("pad").textContent + " ";
  rnn.generate({
    seed: s,
    temperture: .1,
    length: 20
  }, function (err, results) {
    var r = results.sample.trim().split(" ").reverse().slice(1).reverse().join(" ").toLowerCase();
    var hint = document.createElement("b");
    hint.textContent = r;
    hint.classList.add("hint");
    g_hint = r;
    if (document.getElementsByClassName("hint").length == 0 && compute == time) {
      insertAfter(hint, elm);
      moveCaret(elm);
    }
  });
}

function moveCaret(elm, collapse = false) {
  var range, selection;
  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(elm);
    range.collapse(collapse);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }
  range = document.body.createTextRange(); //ie
  range.moveToElementText(elm);
  range.collapse(false);
  range.select();
}

function insertAfter(el, referenceNode) {
  var pad = document.getElementById("pad");
  var ref = pad.lastChild.nextSibling;
  if (referenceNode.parentElement == pad) ref = referenceNode.nextSibling;
  pad.insertBefore(el, ref);
}

function next() {
  var c = window.getSelection().anchorNode.parentNode;
  current_index = Array.prototype.indexOf.call(c.parentNode.children, c);
  var s = document.createElement("span");
  s.innerHTML = "&nbsp;";
  insertAfter(s, c);
  moveCaret(s)
}

function replaceTextNodes() {
  var pad = document.getElementById("pad");
  for (var node in pad.childNodes) {
    var n = pad.childNodes[node];
    var type = n.nodeName;
    if (type == "#text") {
      var newNode = document.createElement("span");
      newNode.textContent = n.nodeValue;
      n.parentElement.replaceChild(newNode, n);
    } else {
      return;
    }
  }
}

function paint() {
  var children = document.getElementById("pad").children;
  for (var child = current_index - 1; child >= 0; child--) {
    var c1 = children[current_index];
    var t1 = encodeURIComponent(c1.innerText.trim().split("&nbsp;").join("")).replace(/([\"\'])/g, "");
    var c2 = children[child];
    var t2 = encodeURIComponent(c2.innerText.trim().split("&nbsp;").join("")).replace(/([\"\'])/g, "");
    var b;
    if (t1 && t2) {
      b = rhymeObj.rhymesWith(t1, t2, {
        mode: "strict"
      });
    } else {
      b = {
        rhymes: false
      };
    }
    if (b.rhymes) {
      var r = randomColor({
        luminosity: 'light',
        format: 'rgba',
        alpha: 1
      });
      if (!c2.style.background && !c1.style.background) {
        c1.style.background = r;
        c2.style.background = r;
      } else if (!c2.style.background) {
        c2.style.background = c1.style.background;
      } else if (!c1.style.background) {
        c1.style.background = c2.style.background;
      }
      c1.style.color = "#444";
      c2.style.color = "#444";
    }
  }
}

function save() {
  var text = $("#pad").text();
  var uri = `data:text/plain;charset=utf-8,` + encodeURIComponent(text);
  var a = document.createElement("a");
  a.href = uri;
  a.download = "lyircs.txt";
  a.click();
  a.remove();
}
