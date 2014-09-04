$(function() {
var version = "v1.1.0";
//var baseUrl = "//cdn.rawgit.com/akiraak/ingress-shaper-glyphs/" + version + "/dist/";
var baseUrl = "//cdn.rawgit.com/akiraak/ingress-shaper-glyphs/master/dist/";

var sequences = null;
var glyph_infos = null;

$.get(baseUrl + 'sequences.json', null, finish_load_sequences);
function finish_load_sequences(data) {
  sequences = data;
  $.get(baseUrl + 'glyphs.json', null, finish_load_glyph_infos);
}

function finish_load_glyph_infos(data) {
  glyph_infos = data;
  render_sequences();
}

function render_sequences() {
  var $table = $('#table');
  for(var i = 0; i < sequences.length; i++) {
    $table.append(build_sequence(sequences[i]));
    //break;
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
    if(glyph_infos[i]['en'].toLowerCase() == word.toLowerCase()) {
      return glyph_infos[i];
    }
  }
  return null;
}

});
