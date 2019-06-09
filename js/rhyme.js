class Rhyme {
  vowels = 'aeiouy';
  consonants = 'qwrtpsdfghjklzxcvbnm';

  getSyllables(w) {
    var r = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
    return w.match(r) || [];
  }

  assonant(w1, w2) {
    var short = (w1.length > w2.length) ? w2 : w1;
    for (var letter in short) {
      if (this.vowels.includes(short[letter])) {
        if (w1[letter] == w2[letter]) return true;
      }
    }
    return false;
  }

  consonant(w1, w2) {
    var regex = /a|e|i|o|u|y/g;
    w1 = w1.replace(regex, "");
    w2 = w2.replace(regex, "");
    if (w1 == w2) return true;
    return false;
  }

  eye(w1, w2) {
    w1 = w1.split("").reverse().join("");
    w2 = w2.split("").reverse().join("");
    var short = (w1.length > w2.length) ? w2 : w1;
    var c = (short.length > 3) ? 3 : 2;
    for (var letter = 0; letter < c; letter++) {
      if (w1[letter] != w2[letter]) return false;
    }
    return true;
  }

  feminine(w1, w2) {
    if (!this.eye(w1, w2)) return false;
    if (w1[0] != w2[0]) return true;
    return false;
  }

  head(w1, w2) {
    if (!this.consonants.includes(w1[0])) return false;
    if (!this.consonants.includes(w2[0])) return false;
    if (w1[0] == w2[0]) return true;
    return false;
  }

  identical(w1, w2) {
    if (w1 == w2) return true;
    return false;
  }

  near(w1, w2) {
    w1 = w1.split("").reverse().join("");
    w2 = w2.split("").reverse().join("");
    if (w1.slice(0, 2) != w2.slice(0, 2)) return false;
    w1 = w1.slice(2);
    w2 = w2.slice(2);
    var short = (w1.length > w2.length) ? w2 : w1;
    for (var letter in short) {
      if (w1[letter] == w2[letter]) return false;
    }
    return true;
  }

  syllabic(w1, w2) {
    var l1 = this.getSyllables(w1).reverse()[0];
    var l2 = this.getSyllables(w2).reverse()[0];
    if (l1 == l2) return true;
    return false;
  }

  masculine(w1, w2) {
    var l1 = this.getSyllables(w1).reverse();
    var l2 = this.getSyllables(w2).reverse();
    if (l1[0] != l2[0]) return false;
    if (!l1[1] || !l2[1]) return false;
    if (l1[0].length < l1[1].length) return false;
    if (l2[0].length < l2[1].length) return false;
    return true;
  }

  perfect(w1, w2) {
    while (this.consonants.includes(w1[0])) w1 = w1.slice(1);
    while (this.consonants.includes(w2[0])) w2 = w2.slice(1);
    if (w1 == w2) return true;
    w1 = w1.split("").reverse().join("").slice(0, 2);
    w2 = w2.split("").reverse().join("").slice(0, 2);
    if (w1 == w2) return true;
    return false;
  }

  rhymesWith(w1, w2, options) {
    options = options || {
      mode: "strict"
    };
    var types;
    if (options.mode == "loose") {
      types = ["assonant", "consonant", "eye", "feminine", "head", "identical", "near", "syllabic", "masculine", "perfect"];
    }
    if (options.mode == "strict") {
      types = ["feminine", "identical", "syllabic", "masculine", "perfect"];
    }
    var rhymes = {
      rhymes: false,
      types: []
    };
    for (var type in types) {
      var t = types[type];
      var b = eval(`this.${t}('${w1}','${w2}')`);
      if (b) {
        rhymes.rhymes = true;
        rhymes.types.push(t);
      }
    }
    return rhymes;
  }
}
