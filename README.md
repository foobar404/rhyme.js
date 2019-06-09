# Rhyme.js
moderate size javascript library for testing if 2 words rhyme (10+ rhyme schemes supported)

<a href="http://ghost-writer.ga">See live example</a>

<h1>Include</h1>
<h3>CDN</h3>
&lt;script src=&quot;https://cdn.jsdelivr.net/gh/PiethonCoder/Rhyme.js/js/rhyme.js&quot;&gt;&lt;/script&gt;
<h3>Local file</h3>
</p>download and include the /js/rhyme.js from this directory into your project.</p> 

<h1>Usage</h1>
<h3>Make a rhyme object</h3>

var r = new Rhyme();


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
  <li></li>
  <ul></ul>
</ul>
