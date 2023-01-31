# Rhyme.js
moderate size javascript library for testing if 2 words rhyme (10+ rhyme schemes supported)

<h1>Include</h1>
<h3>CDN</h3>

```html
<script src="https://cdn.jsdelivr.net/gh/foobar404/Rhyme.js/js/rhyme.js"></script>
```

<h3>Local file</h3>
</p>download and include the /js/rhyme.js file from this directory into your project.</p> 

<h1>Usage</h1>
<h3>Make a rhyme object</h3>

```javascript
var r = new Rhyme();
```

<h3>Use one of the rhyme functions</h3>
<ul>
  <li>rhymesWith(word1, word2, options(optional))</li>
  <ul>
    <li>word1 & word2 are the strings you want to compare</li>
    <li>options is a object with optinal properties</li>
    <ul>
      <li>mode</li>
      <ul>
        <li>strict : only match rhyme schemes with obvious rhymes(default)</li>
        <li>loose : match all known rhyming patterns</li>
      </ul>
    </ul>
    <li>return value is a object with two properties</li>
    <ul>
      <li>types : an array of the types of rhymes that matched</li>
      <li>rhymes : a boolean value thats true if a rhyme was found</li>
    </ul>
  </ul>
  <li>assonant(word1,word2)</li>
  <ul>
    <li>this is the rhyming of vowels in words but with different consonants</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>consonant(word1,word2)</li>
  <ul>
    <li>this is the rhyming of consonants but not vowels</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>eye(word1,word2)</li>
  <ul>
    <li>the rhyming in this type is based on spelling and not sound</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>feminine(word1,word2)</li>
  <ul>
    <li>also referred to as double, triple, multiple, extra-syllable, extended, this has different beginnings of the words, but rhymes latter syllables</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>head(word1,word2)</li>
  <ul>
    <li>also called alliteration or initial rhyme, this has the same initial consonant at the beginning of the words</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>identical(word1,word2)</li>
  <ul>
    <li>this is rhyming a word with itself, but often refers to a different meaning</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>near(word1,word2)</li>
  <ul>
    <li>also referred to as half, slant, approximate, off, and oblique, this rhymes the final consonants but not the vowels or initial consonants</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>syllabic(word1,word2)</li>
  <ul>
    <li>rhyming the last syllable, this is also called tail or end rhyme</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>masculine(word1,word2)</li>
  <ul>
    <li>in this rhyme, the stress in on the final syllable in both words</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
  <li>perfect(word1,word2)</li>
  <ul>
    <li>sometimes called exact, full or true, this rhyme is the typical rhyme where the ending sounds match</li>
    <li>return value is a boolean, retuns true if match was found</li>
  </ul>
</ul>

<h3>Utility functions</h3>
<ul>
  <li>getSyllables(word)</li>
  <ul>return value is an array of the word seperated into syllables (90% accuracy)</ul>
</ul>

<h1>Examples</h1>

```javascript
var r = new Rhyme();

var result = r.rhymesWith("can","man");

if(result.rhymes){
  alert("these words rhyme");
}
```
