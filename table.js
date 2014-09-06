$(function() {
var version = "v1.1.0";
//var baseUrl = "//cdn.rawgit.com/akiraak/ingress-shaper-glyphs/" + version + "/dist/";
var baseUrl = "//rawgit.com/akiraak/ingress-shaper-glyphs/master/dist/";

var sequences = null;
var glyph_infos = null;

function sort_glyphs(val1, val2){
  if(val1.length == val2.length) {
    if(val1.join('') >= val2.join('')) {
      return 1;
    } else {
      return -1;
    }
  } else if(val1.length >= val2.length){
    return 1;    
  }
  return -1;
}

$.get(baseUrl + 'sequences.json', null, finish_load_sequences);
function finish_load_sequences(data) {
  sequences = data;
  // ソート
  sequences = sequences.sort(sort_glyphs);

  $.get(baseUrl + 'glyphs.json', null, finish_load_glyph_infos);
}

function finish_load_glyph_infos(data) {
  glyph_infos = data;
  render_sequences();
}

function render_sequences() {
  var $table = $('#table');
  var count = 0;
  for(var i = 0; i < sequences.length; i++) {
    if(count < sequences[i].length) {
      $table.append('<div class="count-header">' + sequences[i].length + '単語</div>')  
      count = sequences[i].length;
    }
    $table.append(build_sequence(sequences[i]));
  }
}

function build_sequence(sequence) {
  var tag = '<ul class="sequence">';
  for(var i = 0; i < sequence.length; i++) {
    var info = glyph_info(sequence[i]);
    var conv_word = sequence[i];
    var code = '';
    if(info) {
      conv_word = info['ja'];
      code = info['code'];

    }
    tag += '<li>';
    tag += '<div class="word">';
    tag += '<div><img src="' + baseUrl + '/images/' + code + '.png" width="64" height="64"></div>';
    tag += '<div class="string">' + conv_word + '</div>';
    tag += '</div>';
    tag += '</li>';
  }
  tag += '</ul>';
  return tag;
}

function glyph_info(word) {
  //sequences
  //console.log('==============' + word + '==============');
  for(var i = 0; i < glyph_infos.length; i++) {
    //console.log(glyph_infos[i]);
    var info = glyph_infos[i];
    if(info['en'].toLowerCase() == word.toLowerCase()) {
      return glyph_infos[i];
    }
    //var info['en_alts']
    for(var j = 0; j < info['en_alts'].length; j++) {
      var en_alt = info['en_alts'][j];
      if(en_alt.toLowerCase() == word.toLowerCase()) {
        return info;
      }
    }
  }
  return null;
}

});
