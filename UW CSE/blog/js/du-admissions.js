$(document).ready(function() {
  $('select').material_select();
});

$(document).ready(function(){
  $('.collapsible').collapsible();
});

function deleteInvalidParams() {
  window.history.pushState({} , '', '');
}

function setYearAndStreamInForm(year, stream) {
  $('select[name="stream"]').val(stream);
  $('select[name="year"]').val(year);
  $('select[name="stream"]').material_select();
  $('select[name="year"]').material_select();
}

function setMarksInForm(marks) {
  for (var mark in marks) {
     $('input[name="' + mark + '"]')[0].value = marks[mark];
     $('input[name="' + mark + '"]').next().addClass('active');
  }
}

$(document).ready(function(){
  var getparams = window.location.search;
  if (getparams.length == 0) {
    setMarksInForm({eng: "90", math: "100", phy: "97", chem: "95", comp: "95"});
    deleteInvalidParams();
    return;
  }
  getparams = getparams.substr(1);
  var params_map = {};
  getparams.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
      params_map[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  if (Object.keys(params_map).length == 0) {
    deleteInvalidParams();
    return;
  }
  if (!('year' in params_map)) {
    alert('No year supplied!');
    deleteInvalidParams();
    return;
  }
  if (!('stream' in params_map)) {
    alert('No stream supplied!');
    deleteInvalidParams();
    return;
  }
  var year = params_map['year']
  var stream = params_map['stream']
  delete params_map['stream']
  delete params_map['year']
  var marks = params_map;
  setMarksInForm(marks);
  setYearAndStreamInForm(year, stream);
  computeCutoffTableAndDisplay(year, stream, marks);
});

$('#add-subject').click(function() {
  var additional_subjects = {
    'socio': 'Sociology',
    'elec_eng': 'Elective English',
    'home': 'Home Science',
    'philo': 'Philosophy',
    'biotech': 'Biotechnology',
    'elec_lang': 'Elective Language',
    'psych': 'Psychology',
    'botany': 'Botany',
    'art': 'Art',
    'music': 'Music',
    'other': 'Other',
  };

  var options = [];
  var add_subs = Object.keys(additional_subjects);
  for (var i = 0; i < add_subs.length; i++) {
    options.push('<option value="' + add_subs[i] + '">' + additional_subjects[add_subs[i]] + '</option>');
  }
  $('#additional-subjects').append(`<div class="input-field col s6">
        <select name='sub_name'>` + options +
        `</select>
        <label>Subject Name</label>
      </div>
      <div class="input-field col s6">
        <input id="marks" type="number" size="6" name="new_sub" min="0" max="100">
        <label>Marks</label>
      </div>`);
  $('select').material_select();
});


// http://www.motachashma.com/entranceexam/200490/du-admission-best-of-four-percentage-calculation
var list_a = {
  'acc' : 'Accounts', // Add a warning that acc is only allowed if comm not offered
  'arab' :'Arabic',
  'bengali' :'Bengali',
  'second_land': 'Second Language',
  'bio': 'Biology',
  'botany' :'Botany',
  'chem' :'Chemistry',
  'comm' :'Commerce',
  'comp' :'Computer Science',
  'econ' :'Economics',
  'eng' :'English',
  'french' :'French',
  'geog' :'Geography',
  'geology' :'Geology',
  'german' :'German',
  'hindi' :'Hindi',
  'hist' :'History',
  'home' :'Home Science',
  'italian' :'Italian',
  'math' :'Mathematics',
  // 'music' :'Music', only for Music honors
  'persian' :'Persian',
  'philo' :'Philosophy',
  // 'pe' :'Physical Education',  only for PE honors
  'phy' :'Physics',
  'polisci' :'Political Science',
  'psych' :'Psychology',
  'punjabi' :'Punjabi',
  'sanskrit' :'Sanskrit',
  'socio' :'Sociology',
  'span' :'Spanish',
  'stat' :'Statistics',
  'urdu' : 'Urdu',
  'zool' :'Zoology',
  'legal' :'Legal Studies',
}

var languages = {
  'eng': 'English',
  'elec_eng': 'Elective English',
  'hindi': 'Hindi',
  'bengali': 'Bengali',
  'nepali': 'Nepali',
  'french' :'French',
  'urdu': 'Urdu',
  'italian': 'Italian',
  'german' :'German',
  'sanskrit' :'Sanskrit',
  'punjabi' :'Punjabi',
  'span' :'Spanish',
  'arab' :'Arabic',
  'tamil' :'Tamil',
  'telugu' :'Telugu',
  'kannada' :'Kannada',
  'second_lang' : 'Generic Second Language',
  'elec_lang': 'Elective Language',
}

var science_subjects = {
  'Botany': ['phy', 'chem', 'bio/biotech'],
  'Zoology': ['phy', 'chem', 'bio/biotech'],
  'Microbiology': ['phy', 'chem', 'bio/biotech'],
  'Anthropology': ['phy', 'chem', 'bio'],
  'Biological Science': ['phy', 'chem', 'bio/biotech'],
  'Physics': ['phy', 'chem', 'math'],
  'Chemistry': ['phy', 'chem', 'math'],
  'Electronics': ['phy', 'chem', 'math'],
  'Instrumentation': ['phy', 'chem', 'math'],
  'Polymer Science': ['phy', 'chem', 'math'],
  'Geology': ['phy', 'chem', 'math/geology/geog/bio/biotech'],
  'Food Technology': ['phy', 'chem', 'math/bio/biotech'],
  'Biochemistry': ['chem', 'bio/biotech', 'phy/math'],
  'Physical Science': ['phy', 'chem/comp', 'math'],
  'Applied Physical Sciences': ['phy', 'chem/comp', 'math'],
  'Life Sciences': ['phy', 'chem', 'bio/biotech'],
  'Applied Life Sciences': ['phy', 'chem', 'bio/biotech'],
  'Home Science (H)': ['phy/chem', 'bio/biotech']
}

var streams = {
  // English, Hindi, Hindi Patrakarita, Other Languages
  // Journalism == English
  // BCom H, Economics

  //TODO:
  // Other Arts
  'English': 1,
  'Journalism': 1,
  'BCom Honors': 1,
  'BA Economics': 1,
}

// TODO
// CBSE: pass mark is 33, not 40.
// CBSE: Take into account accountancy instead of commerce, and functional english
// CBSE: B.COM(H)/B.COM - Business math == Math.
// Inform about 2.5-5 deduction for change in stream. (mostly for BA BCom)
// Inform about 70%theory 30%practical
// Inform about no-Quota (OBC, SC, ST) calculation as well as Sports, ECA, and KM (Kashmiri Migrant)
// Inform about no application of girls 1% cutoff boost

function pickBestLanguage(marks) {
  var lang_marks = [];

  var items = Object.keys(marks).map(function(key) {
      return [key, marks[key]];
  });
  for (var i = 0; i < items.length; i++) {
    if (items[i][0] in languages) {
      lang_marks.push([items[i][0], marks[items[i][0]]]);
    }
  }

  if (lang_marks.length == 0) {
    throw 'No Best Language'
  }

  lang_marks.sort(function(first, second) {
      return second[1] - first[1];
  });

  return lang_marks[0];
}

// bestFour({eng: 88, entre: 92, acc: 81, econ: 83, web_design: 96}), comp avg, 89.75 (-2.5 - 2.5)
// always_include:
// list of subjects to include.
// If you supply of the form chem/phy, will use the best one.
// If you supply special string 'best_lang', it will pick the best language. Supply this as first arg.
function bestX(marks, always_include, x) {
  var items = Object.keys(marks).map(function(key) {
      return [key, marks[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
      // first if block redundant. here for readability.
      if (!(first[0] in list_a) && !(second[0] in list_a)) {
        return (second[1] - 10) - (first[1] - 10);
      }
      if (!(first[0] in list_a)) {
        return second[1] - (first[1] - 10);
      }
      if (!(second[0] in list_a)) {
        return (second[1] - 10) - first[1];
      }
      return second[1] - first[1];
  });

  var best_x = items.slice(0, x);

  if (!(always_include === undefined)) {
    var new_best_x = [];
    var mutable_marks = JSON.parse(JSON.stringify(marks)); // deep copy
    for (var i = 0; i < always_include.length; i++) {
      var subject_used;
      // "chem/phy/math"
      if (always_include[i].indexOf('/') != -1) {
        var subs = always_include[i].split('/');
        var best_sub = [];
        for (var j = 0; j < subs.length; j++) {
          if (subs[j] in mutable_marks) {
            best_sub.push([subs[j], mutable_marks[subs[j]]]);
          }
        }
        if (best_sub.length == 0) {
          throw 'None of ' + always_include[i] + ' in marks';
        }
        best_sub.sort(function(first, second) {
            return second[1] - first[1];
        });
        subject_used = best_sub[0][0];
      } else if (always_include[i] == 'best_lang') {
        var best_lang = pickBestLanguage(mutable_marks);
        subject_used = best_lang[0];
      } else {
        if (!(always_include[i] in mutable_marks)) {
          throw always_include[i] + ' not in marks'
        }
        subject_used = always_include[i];
      }
      new_best_x.push([subject_used, mutable_marks[subject_used]]);
      delete mutable_marks[subject_used];
    }
    var best_rest = bestFour(mutable_marks);
    new_best_x = new_best_x.concat(best_rest.slice(0, x - always_include.length));
    best_x = new_best_x;
  }

  return best_x;
}

function bestFour(marks, always_include) {
  return bestX(marks, always_include, 4);
}

function bestFourToAggregate(best_four, score_boost) {
  if (score_boost === undefined) {
    score_boost = 0;
  }

  console.log(best_four);
  var average = best_four.reduce(function(obj, item) {
    obj += item[1];
    return obj;
  }, 0) / 4.0;

  for (var i = 0; i < best_four.length; i++) {
    if (!(best_four[i][0] in list_a)) {
      console.log(best_four[i][0] + "not in list a");
      score_boost += -2.5;
    }
  }

  return [average, score_boost];
}

// *************
// *** ARTS (LANGUAGES)
// *************

// {eng: 90, math: 100, phy: 97, chem: 95, comp: 95} - 95.5
function calculateEnglishCutoff(marks) {
  // 1. English must be in top 4, and you must pass.
  // 2. Other 3 subjects. If not in list A. -2.5
  // 3. If you took elective english (despite not being best 4), +2

  var score_boost = 0;
  if (!('eng' in marks)) {
    throw 'English must be taken';
  }
  if (marks['eng'] < 40) {
    throw 'You must have passed English';
  }
  if ('elec_eng' in marks) {
    score_boost += 2;
  }

  var best_four = bestFour(marks, ['eng']);
  return bestFourToAggregate(best_four, score_boost);
}


function calculateHindiCutoff(marks) {
  // Equivalent to English calculation

  var score_boost = 0;
  if (!('hindi' in marks)) {
    throw 'Hindi must be taken';
  }
  if (marks['hindi'] < 40) {
    throw 'You must have passed Hindi';
  }
  if ('elec_hindi' in marks) {
    score_boost += 2;
  }

  var best_four = bestFour(marks, ['hindi']);
  return bestFourToAggregate(best_four, score_boost);
}

function calculateOtherLanguageCutoff(language_code, marks) {
  // If Elective of the language has been taken, +2
  // If not studied the language then -5
  // Note: Language in best 4 does not have to be the language intended to study.

  // Not considering the case where elective is taken and language is not.
  var score_boost = 0;
  if (!(language_code in marks)) {
    score_boost -= 5;
  }
  if (('elec_'+language_code) in marks) {
    score_boost += 2;
  }

  var best_four = bestFour(marks, ['best_lang']);
  return bestFourToAggregate(best_four, score_boost);
}

// *************
// *** ARTS (OTHERS)
// *************


function calculateArtsOthersCutoff(art_code, marks) {
  var score_boost = 0;
  var best_four;
  var agg;
  if (!(art_code in marks)) {
    best_four = bestFour(marks, ['best_lang']);
    score_boost += -2.5;
    agg = bestFourToAggregate(best_four, score_boost);
  } else {
    best_four = bestFour(marks, ['best_lang', art_code]);
    var non_econ_best_four = bestFour(marks, ['best_lang']);
    var agg_best_four = bestFourToAggregate(best_four);
    var agg_non_best_four = bestFourToAggregate(non_econ_best_four);
    agg_non_best_four[1] -= 2.5;
    if ((agg_non_best_four[0] + agg_non_best_four[1]) > (agg_best_four[0] + agg_best_four[1])) {
      agg = agg_non_best_four;
    } else {
      agg = agg_best_four;
    }
  }

  var average = agg[0];
  var score_boost = agg[1];
  return [average, score_boost];
}

// *************
// *** SCIENCE
// *************


function calculateBScComputerScienceCutoff(marks) {
  // One language, Math, Physics, Chemistry/Computer Science/Informatics.

  var best_four = bestFour(marks, ['best_lang', 'math', 'phy', 'chem/comp/info']);
  return bestFourToAggregate(best_four);
}

function calculateBScMathSciencesCutoff(marks) {
  // One language, Math, two others

  var best_four = bestFour(marks, ['best_lang', 'math']);
  return bestFourToAggregate(best_four);
}

function calculateBScHomeSciencePassCutoff(marks) {
  var best_four = bestFour(marks, ['eng']);
  return bestFourToAggregate(best_four);
}

function calculateBScBiomedicalSciencesCutoff(marks) {
  if (!('eng' in marks)) {
    throw 'English must be taken';
  }
  if (marks['eng'] < 50) {
    throw 'You must have above 50 in English';
  }

  var agg = bestX(marks, ['phy', 'chem', 'bio/biotech'], 3);
  var average = agg.reduce(function(obj, item) {
    obj += item[1];
    return obj;
  }, 0) / 3.0;

  if (('math' in marks) && (marks['math'] >= 60)) {
    score_boost += 3;
  }
  return [average, score_boost];
}


function calculateBScOtherSciencesCutoff(science_code, marks) {
  // One language, Math, two others

  var essential_subs = [];
  if (!(science_code in science_subjects)) {
    throw science_code + ' not supported yet';
  }
  var agg = bestX(marks, science_subjects[science_code], 3);
  var average = agg.reduce(function(obj, item) {
    obj += item[1];
    return obj;
  }, 0) / 3.0;
  return [average, 0];
}


// *************
// *** COMMERCE
// *************

function calculateBABComCutoff(marks) {
  // One language and 3 list A subjects.
  // Disadvantage upto 5% if change in stream

  return bestFourToAggregate(bestFour(marks, ['best_lang']));
}

// {eng: 90, comm: 90, acc: 97, math: 100, econ: 94} = 94.25
// {eng: 90, comm: 90, acc: 97, math: 20, econ: 94}  -> math fail
// {eng: 90, comm: 90, acc: 97, econ: 94} -> take math
// {eng: 90, comm: 90, acc: 97, math: 40, econ: 94} -> 92.75 (math not in best4)
// {comm: 90, acc: 97, math: 100, econ: 94} -> take english
// {eng: 90, acc: 97, math: 100, econ: 94} -> comm not in marks
function calculateBComHCutoff(marks) {
  // Must include Commerce (or Accountancy if Commerce isn't offered)
  // Candidate must have studied and passed Math (or Business Math)
  // Must include one language.
  // Other 2 subjects. If not in list A. -2.5
  if (!('math' in marks)) {
    throw 'Math must be taken';
  }
  if (marks['math'] < 40) {
    throw 'You must have passed Math';
  }

  var best_four = bestFour(marks, ['best_lang', 'comm']);
  return bestFourToAggregate(best_four);
}


// {eng: 93, econ: 75, chem: 91, phy: 88, math: 90} -> 88 (econ not counted in best4, -2.5 applied)
// {eng: 93, chem: 91, phy: 88, math: 90} -> 88 (econ not needed to be taken, -2.5 applied)
function calculateBAEconCutoff(marks) {
  // Candidate must have studied and passed Math (or Business Math)
  // Need not include Econ in best 4 or study it, -2.5 penalty.
  // Must include one language.
  // Other 2 subjects. If not in list A. -2.5
  var score_boost = 0;
  if (!('math' in marks)) {
    throw 'Math must be taken';
  }
  if (marks['math'] < 40) {
    throw 'You must have passed Math';
  }

  var best_four;
  var agg;
  if (!('econ' in marks)) {
    best_four = bestFour(marks, ['best_lang']);
    score_boost += -2.5;
    agg = bestFourToAggregate(best_four, score_boost);
  } else {
    best_four = bestFour(marks, ['best_lang', 'econ']);
    var non_econ_best_four = bestFour(marks, ['best_lang']);
    var agg_best_four = bestFourToAggregate(best_four);
    var agg_non_best_four = bestFourToAggregate(non_econ_best_four);
    agg_non_best_four[1] -= 2.5;
    if ((agg_non_best_four[0] + agg_non_best_four[1]) > (agg_best_four[0] + agg_best_four[1])) {
      agg = agg_non_best_four;
    } else {
      agg = agg_best_four;
    }
  }

  var average = agg[0];
  var score_boost = agg[1];
  return [average, score_boost];
}


var calculation_map = {
  // Arts(Languages)
  'English': calculateEnglishCutoff,
  'Journalism': calculateEnglishCutoff,
  'Hindi': calculateHindiCutoff,
  'Hindi Patrakarita': calculateHindiCutoff,
  'Arabic': calculateOtherLanguageCutoff.bind(null, 'arab'),
  'Bengali': calculateOtherLanguageCutoff.bind(null, 'bengali'),
  'Persian': calculateOtherLanguageCutoff.bind(null, 'persian'),
  'Punjabi': calculateOtherLanguageCutoff.bind(null, 'punjabi'),
  'Sanskrit': calculateOtherLanguageCutoff.bind(null, 'sanskrit'),
  'Urdu': calculateOtherLanguageCutoff.bind(null, 'urdu'),
  // Arts(Others)
  'BA': calculateBABComCutoff,
  'BA (Voc)': calculateBABComCutoff,
  'Philosophy': calculateBABComCutoff,
  'Social Work': calculateBABComCutoff,
  'Applied Psychology': calculateBABComCutoff,
  'Psychology': calculateBABComCutoff, // unsure if psych needed
  'Geography': calculateArtsOthersCutoff.bind(null, 'geog'),
  'History': calculateArtsOthersCutoff.bind(null, 'hist'),
  'Political Science': calculateArtsOthersCutoff.bind(null, 'polisci'),
  'Sociology': calculateArtsOthersCutoff.bind(null, 'socio'),
  // Commerce
  'BCom': calculateBABComCutoff,
  'BCom (H)': calculateBComHCutoff,
  'Economics': calculateBAEconCutoff,
  // Science
  'Computer Science': calculateBScComputerScienceCutoff,
  'Mathematical Sciences': calculateBScMathSciencesCutoff,
  'Mathematics': calculateBScMathSciencesCutoff,
  'Statistics': calculateBScMathSciencesCutoff,
  'Home Science (P)': calculateBScHomeSciencePassCutoff,
  'Biomedical Sciences': calculateBScBiomedicalSciencesCutoff,
  'Botany': calculateBScOtherSciencesCutoff.bind(null, 'Botany'),
  'Zoology': calculateBScOtherSciencesCutoff.bind(null, 'Zoology'),
  'Microbiology': calculateBScOtherSciencesCutoff.bind(null, 'Microbiology'),
  'Anthropology': calculateBScOtherSciencesCutoff.bind(null, 'Anthropology'),
  'Biological Science': calculateBScOtherSciencesCutoff.bind(null, 'Biological Science'),
  'Physics': calculateBScOtherSciencesCutoff.bind(null, 'Physics'),
  'Chemistry': calculateBScOtherSciencesCutoff.bind(null, 'Chemistry'),
  'Electronics': calculateBScOtherSciencesCutoff.bind(null, 'Electronics'),
  'Instrumentation': calculateBScOtherSciencesCutoff.bind(null, 'Instrumentation'),
  'Polymer Science': calculateBScOtherSciencesCutoff.bind(null, 'Polymer Science'),
  'Geology': calculateBScOtherSciencesCutoff.bind(null, 'Geology'),
  'Food Technology': calculateBScOtherSciencesCutoff.bind(null, 'Food Technology'),
  'Biochemistry': calculateBScOtherSciencesCutoff.bind(null, 'Biochemistry'),
  'Physical Science': calculateBScOtherSciencesCutoff.bind(null, 'Physical Science'),
  'Applied Physical Sciences': calculateBScOtherSciencesCutoff.bind(null, 'Applied Physical Sciences'),
  'Life Sciences': calculateBScOtherSciencesCutoff.bind(null, 'Life Sciences'),
  'Applied Life Sciences': calculateBScOtherSciencesCutoff.bind(null, 'Applied Life Sciences'),
  'Home Science (H)': calculateBScOtherSciencesCutoff.bind(null, 'Home Science (H)'),
}

var cut_off_index_map_arts = {
  'English': 0,
  'Hindi': 1,
  'BA': 2,
  'Political Science': 3,
  'History': 4,
  'BCom (H)': 7,
  'Economics': 5,
  'BCom': 6,
  'Psychology': 8,
}
// "St Stephens": ["96","89","96","96.5","95.5","96.5",null,"96.5",null],
var cut_off_index_map_science = {
  'Mathematics': 0,
  'Physics': 1,
  'Chemistry': 2,
  'Computer Science': 3,
  'Life Sciences': 4,
}

var cutoffs_2016_science = {"Lady Shri Ram": ["95.75",null,null,null,null],
"Miranda House": ["95.25","95","95",null,"95"],
"Hans Raj": ["95","95.66","95.33","95.25","93.66"],
"Kirori Mal": ["95","95.33","94.66",null,"92"],
"Indraprastha": ["92.25",null,null,"93.75",null],
"Shaheed Bhagat Singh": ["93",null,null,null,null],
"Ramjas": ["94.5","95","94",null,"88"],
"Sri Guru Tegh Bahadur Khalsa": ["94","94.33","93.33",null,"89"],
"Gargi": ["93.5","93.66","94.66",null,"87.66"],
"Daulat Ram": ["94.5",null,"92",null,"90"],
"Shaheed Sukhdev College of Business Studies": [null,null,null,"91.75",null],
"Sri Venkateswara": ["93","95","93",null,"86"],
"Deen Dayal Upadhayaya": ["93","93.66","92","92.5","87"],
"Acharya Narendra Dev": ["93.5","94","92.66","93.5","84"],
"Kamala Nehru": ["91.5",null,null,null,null],
"Sri Guru Gobind Singh College of Commerce": [null,null,null,"91.5",null],
"Moti Lal Nehru": ["92","92","90",null,null],
"Atma Ram Sanatan Dharma": ["90","91","90.66","90",null],
"Ram Lal Anand": [null,null,null,"90",null],
"Vivekananda": ["90",null,null,null,null],
"Deshbandhu": ["90","93","91",null,"83.33"],
"Maitreyi": ["90","91.66","90",null,"85.33"],
"Zakir Husain": ["91",null,"92",null,"84.5"],
"Bhaskaracharya College of Applied Sciences": [null,"89",null,"89",null],
"Ramanujan": ["90",null,null,"88",null],
"Keshav Mahavidyalaya": ["87.75","91",null,"88",null],
"Rajdhani": ["87","89","89",null,null],
"Mata Sundri": ["88",null,null,null,null],
"Shaheed Rajguru College of Applied Sciences for Women": ["88","90","87","87",null],
"Shyama Prasad Mujherjee": ["89",null,null,"87",null],
"Shivaji": ["90.5","88.33","88.66",null,"84"],
"Dyal Singh": ["86.5","90.66","88",null,"86"],
"Aryabhatta": ["87.5",null,null,"88",null],
"Pannalal Girdharlal Dayanand Anglo Vedic": ["88",null,null,"87.5",null],
"College of Vocational Studies": [null,null,null,"87",null],
"Lakshmi Bai": ["87",null,null,null,null],
"Satyawati": ["87",null,null,null,null],
"Swami Shraddhanand": [null,"88.66","90",null,"81"],
"Kalindi": ["91","90",null,"83","82"],
"Janki Devi Memorial": ["85",null,null,null,null],
"Pannalal Girdharlal Dayanand Anglo Vedic (Evening)": ["85",null,null,null,null],
"Sri Aurobindo": [null,null,null,null,"82"],
"Bhagini Nivedita": [null,"79",null,null,null],
"Hindu": ["95.5","95.66","0",null,null],
"Institute of Home Economics": [null,null,null,null,null],
"Lady Irwin": [null,null,null,null,null],
"Maharaja Agrasen": [null,null,null,null,null],
"Shyam Lal": [null,null,null,null,null]}

var cutoffs_2016_arts = {"Shri Ram College of Commerce": [null,null,null,null,null,"97.25",null,"97.25",null],
"Hindu": ["96","89","96","96.5","95.5","96.5",null,"96.5",null],
"Sri Guru Gobind Singh College of Commerce": [null,null,null,null,null,"95.25","94.75","95.25",null],
"Keshav Mahavidyalaya": [null,null,null,null,null,null,null,"95","94"],
"Lady Shri Ram": ["96.25","84","96.25","96.5","96","96.75",null,"96.75","97.5"],
"Hans Raj": ["95.75","86.75","94.75",null,"95","96.25",null,"96.25",null],
"Kirori Mal": ["94","86","92.5","95.25","93.5","96","95.75","96",null],
"Ramjas": ["93.5","83","93.25","96","94","95.75","95.5","95.75",null],
"Acharya Narendra Dev": [null,null,null,null,null,null,null,"93.25",null],
"Miranda House": ["95.5","83.5","93.75","95.75","94.5","96",null,null,null],
"Sri Venkateswara": ["95","78","89.25","94.75","93.75","96","95.25","95.75",null],
"Indraprastha": ["94","78","90","93.75","92.5","95.75",null,"95.5","95.5"],
"Daulat Ram": ["92","78.5","88.5","92","92.75","95.5","94","95","95.75"],
"Sri Guru Tegh Bahadur Khalsa": ["93","73","88.25","92.75","90.5","95.25","95","95.25",null],
"Delhi College of Arts and Commerce": ["91.5",null,"79.25","92.25","85.75","95","92.75","95.5",null],
"College of Vocational Studies": [null,null,null,null,"81.5","94.5",null,"94.75",null],
"Kamala Nehru": ["92.75","74","86.5","92","91.25","95.25","91","95","95"],
"Deen Dayal Upadhayaya": ["91",null,"82",null,null,null,null,"94",null],
"Gargi": ["93.5","78","84.5","90","88.5",null,"92.25","94.25",null],
"Dyal Singh": ["88.5","77","85.25","86","84","95","93.75","94.25",null],
"Atma Ram Sanatan Dharma": ["89.5","79.5","81","89","85","93.5","92.5","93",null],
"Shaheed Bhagat Singh": ["91","73","83.5","89","83","95.5","93","95",null],
"Moti Lal Nehru": ["92.5","75","81","91","85","94.5","89.75","93",null],
"Maitreyi": ["91.25","80","82","87","84","94.75","90","92",null],
"Maharaja Agrasen": ["87",null,"80","90",null,null,null,"91.5",null],
"Shivaji": ["88.75","75","82","87","84","94","90","93.75",null],
"Satyawati": ["87","77.5","81.5","87.75","83","93","90.25","92",null],
"Pannalal Girdharlal Dayanand Anglo Vedic": ["85","77","80","90","87","93.5","87","92",null],
"Zakir Husain": ["86","76.5","80","85","86","94.5","89.5","93","94"],
"Deshbandhu": ["89.5","73","82","86","85","92.5",null,"94.25",null],
"Shyam Lal": ["85","78.75","82","85.5","83","93.5","87","89.5",null],
"Janki Devi Memorial": ["89","72","79","85","83","94","88.75","91.5",null],
"Rajdhani": ["89","79","79","83","81","94",null,"90",null],
"Ram Lal Anand": ["90","75","77","88","84",null,"88.5","92",null],
"Vivekananda": ["89.5","76.75","80","87","79.5",null,"87.5","94",null],
"Aryabhatta": ["90.5","75","78","83.5","80","94","87","91","91.75"],
"Lakshmi Bai": ["89","76","74","86.75","80","93","87.5","92.5",null],
"Ramanujan": ["86","75","80","87",null,null,"88.5","92",null],
"Shaheed Bhagat Singh (Evening)": [null,null,"75","84",null,null,"86","94",null],
"Kalindi": ["86","73","77","83","80","90","90.5","92.75",null],
"Shyama Prasad Mujherjee": ["85","75.75","77","84","79.5","91","88","91.5",null],
"Zakir Husain (Evening)": ["86.5","77","80","84.25","81",null,"89","90",null],
"Sri Aurobindo": ["85","73","77","85",null,null,"87.75","94",null],
"Bharti": ["85",null,"80.05","86","77",null,"83.75","89.5",null],
"Sri Guru Nanak Dev Khalsa": ["83","80","76","84","82",null,"86","90",null],
"Dyal Singh (Evening)": ["81",null,"75","76",null,null,"91.5","89.5",null],
"Mata Sundri": ["90","71","80","84","78",null,"89","85","90"],
"Bhim Rao Ambedkar": [null,null,"77",null,"78",null,"85","88.5",null],
"Shyam Lal (Evening)": [null,"74.5","77","80",null,"91","83","86",null],
"Satyawati (Evening)": ["82","72","74.5","81","79.75","92","84","88",null],
"Moti Lal Nehru (Evening)": ["84","73","75","83","80.5",null,"85","87",null],
"Sri Aurobindo (Evening)": [null,"70","70",null,null,null,"90","92.5",null],
"Pannalal Girdharlal Dayanand Anglo Vedic (Evening)": [null,"71","76","85",null,null,"84","86",null],
"Aditi Mahavidyalaya": [null,null,"68",null,null,null,"84.5","87",null],
"Swami Shraddhanand": ["83.5","75","74",null,"80",null,"75","85",null],
"Bhagini Nivedita": [null,"66","65",null,"71",null,"78.5",null,null],
"Department of Germanic and Romance Studies": [null,null,null,null,null,null,null,null,null],}

var cutoffs_2015_arts = {"Shri Ram College of Commerce": [null,null,null,null,null,"97.375",null,"97.375",null],
"Sri Guru Gobind Singh College of Commerce": [null,null,null,null,null,"95.5","95","96",null],
"Hindu": ["96.25","92","93.5","96","95.5","96.75",null,"96.75",null],
"Keshav Mahavidyalaya": [null,null,null,null,null,null,null,"95.25","92.75"],
"Lady Shri Ram": ["96","82","92","96.25","95.25","97",null,"97.25","97.75"],
"Ramjas": ["94.25","84.5","89.25","97","93.25","95.75","95.5","96",null],
"Acharya Narendra Dev": [null,null,null,null,null,null,null,"93",null],
"Kirori Mal": ["94.75","82","91","94.25","93","96","95.5","96.25",null],
"Miranda House": ["95.25","84.5","90.25","95.5","95","96.25",null,null,null],
"Hans Raj": ["95.5","85","88",null,"94.25","96.5",null,"96.75",null],
"Daulat Ram": ["94","80","93.5","93","92","95.5","95","95.5","95"],
"Sri Venkateswara": ["95","77","89","94.75","92","95.75","95.75","96.25",null],
"Sri Guru Tegh Bahadur Khalsa": ["93","82","88","93","89.5","95.75","95.5","95.75",null],
"College of Vocational Studies": [null,null,null,null,"84","95",null,"95",null],
"Delhi College of Arts and Commerce": ["92.5",null,"77","92","89","95.25","94.25","94.75",null],
"Indraprastha": ["94.25","81.5","82","92.5","92","95.5",null,"95.5","96"],
"Kamala Nehru": ["93.5","78","85.5","90","90","95.25","93.25","95.25","94.5"],
"Deen Dayal Upadhayaya": ["92.25",null,"81",null,null,null,null,"97",null],
"Atma Ram Sanatan Dharma": ["93","76","84.25","91","88","96","93","95.25",null],
"Shaheed Bhagat Singh": ["92","74","82.25","90","85","95","94.25","95.25",null],
"Zakir Husain": ["91.5","77.5",null,"87.5","85","94","91","92.5","90.5"],
"Gargi": ["93.75","70","84.5","91","90",null,"94.25","95.25",null],
"Shivaji": ["91","78","80.5","89","84","95.5","93.25","95.75",null],
"Moti Lal Nehru": ["91","73","78","90","85","93","92","95",null],
"Satyawati": ["90","77","76","88.25","82","95","91","94.75",null],
"Aryabhatta": ["89","75","76","88",null,"94.25","91","93",null],
"Dyal Singh": ["93","73","70","89.5","80","95","94","96",null],
"Shaheed Bhagat Singh (Evening)": [null,null,"75.5","85",null,null,"90.75","94",null],
"Maharaja Agrasen": ["89.5","80","80","87.5",null,null,null,"94",null],
"Dyal Singh (Evening)": ["89",null,"74.25","83",null,null,"91","93.5",null],
"Maitreyi": ["92","76","70.75","84","82","95","94","95",null],
"Shyam Lal": ["89.5","78","77","87","82.5","93","90","91.5",null],
"Bhim Rao Ambedkar": [null,null,"75",null,null,null,"90","93",null],
"Pannalal Girdharlal Dayanand Anglo Vedic": ["90","70","79","86","83","95","91.5","93.5",null],
"Janki Devi Memorial": ["91","71.5","78","86","82","95","90","93.5",null],
"Ram Lal Anand": ["90","77","83","85","77",null,"91.5","94.5",null],
"Rajdhani": ["90","75","81","85","85","94",null,null,null],
"Lakshmi Bai": ["88","75","74","83","78","94","89","92",null],
"Vivekananda": ["89","77","72.75","87.25","79.75",null,"89.5","92.5",null],
"Ramanujan": ["88","72","76.5","84",null,null,"90","92.25",null],
"Kalindi": ["89","73.5","71","81.5","80","93","89.5","92.5",null],
"Shyama Prasad Mujherjee": ["91","75","72","84.25","70","93.5","90.5","92.75",null],
"Deshbandhu": ["89","72","71","86","82","92",null,"93",null],
"Sri Aurobindo": ["89.5","71","74.5","83",null,null,"90.25","92.5",null],
"Shyam Lal (Evening)": [null,"75","71.5","82.75",null,"91","88.25","90.75",null],
"Sri Guru Nanak Dev Khalsa": ["87.5","73","72","82","77",null,"91","93.75",null],
"Mata Sundri": ["91","67","74","82","79",null,"90","92","92"],
"Moti Lal Nehru (Evening)": ["88","69.25","74","83","77.5",null,"90","92.25",null],
"Bharti": ["87.5","70","76","85","75",null,"89","91",null],
"Satyawati (Evening)": ["87","68","74","75","78","91.5","89","91",null],
"Zakir Husain (Evening)": ["89","70","76","79.5","77",null,"89","90.5",null],
"Swami Shraddhanand": ["86","70","73",null,"79",null,"88","91.75",null],
"Pannalal Girdharlal Dayanand Anglo Vedic (Evening)": [null,"69","75","80",null,null,"88.5","90.5",null],
"Sri Aurobindo (Evening)": [null,"70","72.5",null,null,null,"88.5","91",null],
"Aditi Mahavidyalaya": [null,null,"56",null,null,null,"81","88",null],
"Bhagini Nivedita": [null,"71.5","59.5",null,null,null,"84.75",null,null],
}

var cutoffs_2016_list_arts = { "Acharya Narendra Dev": [null,null,null,null,null,null,null,"5",null],
"Aditi Mahavidyalaya": [null,null,"4",null,null,null,"1","7",null],
"Aryabhatta": ["5","3","8","8","8","5","6","8","5"],
"Atma Ram Sanatan Dharma": ["7","3","8","6","8","6","8","7",null],
"Bhagini Nivedita": [null,"6","4",null,"7",null,"8",null,null],
"Bharti": ["8",null,"3","1","1",null,"8","8",null],
"Bhim Rao Ambedkar": [null,null,"8",null,"6",null,"7","6",null],
"College of Vocational Studies": [null,null,null,null,"8","5",null,"5",null],
"Daulat Ram": ["8","5","2","6","5","3","8","8","4"],
"Deen Dayal Upadhayaya": ["5",null,"6",null,null,null,null,"4",null],
"Delhi College of Arts and Commerce": ["7",null,"8","5","8","6","6","5",null],
"Department of Germanic and Romance Studies": [null,null,null,null,null,null,null,null,null],
"Deshbandhu": ["8","2","2","5","4","8",null,"5",null],
"Dyal Singh": ["7","4","5","8","7","4","8","5",null],
"Dyal Singh (Evening)": ["8",null,"6","6",null,null,"3","8",null],
"Gargi": ["3","3","7","6","7",null,"8","6",null],
"Hans Raj": ["5","2","5",null,"5","5",null,"4",null],
"Hindu": ["5","5","1","5","7","5",null,"5",null],
"Indraprastha": ["3","8","5","5","8","5",null,"4","6"],
"Janki Devi Memorial": ["8","3","7","8","8","7","8","7",null],
"Kalindi": ["8","3","3","2","7","7","8","8",null],
"Kamala Nehru": ["4","5","3","5","5","3","8","4","5"],
"Keshav Mahavidyalaya": [null,null,null,null,null,null,null,"5","4"],
"Kirori Mal": ["6","4","4","6","5","5","5","4",null],
"Lady Shri Ram": ["5","1","5","4","5","4",null,"5","5"],
"Lakshmi Bai": ["4","4","8","4","1","5","8","5",null],
"Maharaja Agrasen": ["8",null,"8","1",null,null,null,"8",null],
"Maitreyi": ["5","4","1","7","1","4","6","6",null],
"Mata Sundri": ["2","2","3","2","6",null,"8","7","6"],
"Miranda House": ["5","4","4","5","7","4",null,null,null],
"Moti Lal Nehru": ["5","1","5","2","1","4","8","8",null],
"Moti Lal Nehru (Evening)": ["6","5","8","8","8",null,"6","8",null],
"Pannalal Girdharlal Dayanand Anglo Vedic": ["8","2","7","5","5","5","8","7",null],
"Pannalal Girdharlal Dayanand Anglo Vedic (Evening)": [null,"2","8","3",null,null,"7","8",null],
"Rajdhani": ["4","3","6","8","6","4",null,"6",null],
"Ram Lal Anand": ["5","4","7","2","8",null,"8","8",null],
"Ramanujan": ["6","4","8","4",null,null,"6","6",null],
"Ramjas": ["7","5","5","5","5","5","3","5",null],
"Satyawati": ["8","4","8","8","1","5","7","5",null],
"Satyawati (Evening)": ["7","5","3","1","2","1","7","6",null],
"Shaheed Bhagat Singh": ["8","7","8","7","7","5","7","5",null],
"Shaheed Bhagat Singh (Evening)": [null,null,"8","7",null,null,"8","5",null],
"Shivaji": ["8","7","8","8","8","5","8","6",null],
"Shri Ram College of Commerce": [null,null,null,null,null,"5",null,"3",null],
"Shyam Lal": ["8","5","8","8","5","5","8","7",null],
"Shyam Lal (Evening)": [null,"5","8","7",null,"8","6","6",null],
"Shyama Prasad Mujherjee": ["8","2","2","7","8","8","8","8",null],
"Sri Aurobindo": ["7","2","7","1",null,null,"7","5",null],
"Sri Aurobindo (Evening)": [null,"3","8",null,null,null,"2","5",null],
"Sri Guru Gobind Singh College of Commerce": [null,null,null,null,null,"4","4","4",null],
"Sri Guru Nanak Dev Khalsa": ["8","5","8","5","5",null,"8","8",null],
"Sri Guru Tegh Bahadur Khalsa": ["8","8","6","4","4","5","8","5",null],
"Sri Venkateswara": ["3","8","6","4","5","5","5","5",null],
"Swami Shraddhanand": ["6","4","8",null,"2",null,"8","8",null],
"Vivekananda": ["8","3","4","4","2",null,"8","5",null],
"Zakir Husain": ["8","3","8","8","6","5","8","5","1"],
"Zakir Husain (Evening)": ["5","8","5","8","1",null,"5","5",null],
}

var cutoffs_2016_list_science = {
  "Acharya Narendra Dev": ["6","4","6","5","1"],
"Aryabhatta": ["6",null,null,"6",null],
"Atma Ram Sanatan Dharma": ["7","6","5","5",null],
"Bhagini Nivedita": [null,"8",null,null,null],
"Bhaskaracharya College of Applied Sciences": [null,"8",null,"7",null],
"College of Vocational Studies": [null,null,null,"8",null],
"Daulat Ram": ["5",null,"7",null,"3"],
"Deen Dayal Upadhayaya": ["5","5","5","5","2"],
"Deshbandhu": ["8","2","7",null,"3"],
"Dyal Singh": ["7","5","8",null,"8"],
"Gargi": ["5","6","2",null,"2"],
"Hans Raj": ["6","8","5","5","3"],
"Hindu": ["5","8","5",null,null],
"Indraprastha": ["6",null,null,"4",null],
"Institute of Home Economics": [null,null,null,null,null],
"Janki Devi Memorial": ["8",null,null,null,null],
"Kalindi": ["1","5",null,"7","1"],
"Kamala Nehru": ["5",null,null,null,null],
"Keshav Mahavidyalaya": ["8","6",null,"6",null],
"Kirori Mal": ["5","5","3",null,"2"],
"Lady Irwin": [null,null,null,null,null],
"Lady Shri Ram": ["5",null,null,null,null],
"Lakshmi Bai": ["7",null,null,null,null],
"Maharaja Agrasen": [null,null,null,null,null],
"Maitreyi": ["6","8","6",null,"2"],
"Mata Sundri": ["5",null,null,null,null],
"Miranda House": ["4","3","3",null,"1"],
"Moti Lal Nehru": ["5","4","5",null,null],
"Pannalal Girdharlal Dayanand Anglo Vedic": ["6",null,null,"8",null],
"Pannalal Girdharlal Dayanand Anglo Vedic (Evening)": ["8",null,null,null,null],
"Rajdhani": ["7","6","6",null,null],
"Ram Lal Anand": [null,null,null,"5",null],
"Ramanujan": ["5",null,null,"8",null],
"Ramjas": ["5","3","4",null,"1"],
"Satyawati": ["8",null,null,null,null],
"Shaheed Bhagat Singh": ["5",null,null,null,null],
"Shaheed Rajguru College of Applied Sciences for Women": ["8","4","7","7",null],
"Shaheed Sukhdev College of Business Studies": [null,null,null,"5",null],
"Shivaji": ["5","7","8",null,"2"],
"Shyam Lal": [null,null,null,null,null],
"Shyama Prasad Mujherjee": ["1",null,null,"3",null],
"Sri Aurobindo": [null,null,null,null,"1"],
"Sri Guru Gobind Singh College of Commerce": [null,null,null,"5",null],
"Sri Guru Tegh Bahadur Khalsa": ["4","4","5",null,"3"],
"Sri Venkateswara": ["6","6","7",null,"6"],
"Swami Shraddhanand": [null,"8","1",null,"5"],
"Vivekananda": ["2",null,null,null,null],
"Zakir Husain": ["4",null,"2",null,"5"],
}

var cutoffs;
var cut_off_index_map;

function makeHTMLfromData(res, all_subjects, year, stream) {
  var colleges = Object.keys(res);
  var header = ['<tr>', '<th>College</th>'];
  for (var i = 0; i < all_subjects.length; i++) {
    header.push('<th>');
    header.push(all_subjects[i]);
    header.push('</th>');
  }
  header.push('</tr>');

  var table = header.join('\n');

  var cutoff_sub = res[colleges[0]];
  var row = ['<tr>'];
  row.push(['<td>', ' Best Four ', '</td>'].join('\n'));
  for (var j = 0; j < cutoff_sub.length; j++) {
    var val_metadata = cutoff_sub[j];
    var message;
    if (val_metadata['status'] == 'INELIGIBLE') {
      message = 'Ineligible';
    } else {
      var average = val_metadata['average'];
      var score_boost = val_metadata['score_boost'];
      var total = average + score_boost;
      if (score_boost != 0) {
        message = [
          '<div class="best-four-before">' + average.toFixed(2)  + ' ' + score_boost + ' = </div>',
          '<div class="best-four">' + total.toFixed(2) + '</div>'].join('\n');
      } else {
        message = '<div class="best-four">' + total.toFixed(2)  + '</div>';
      }
    }
    row.push([
      '<td>', message ,'</td>',
    ].join('\n'));
  }
  row.push('</tr>');
  table += row.join('\n');

  // Sort by descending Econ + English cutoff average.
  // colleges.sort(function(first, second) {
  //     var first_num = 0;
  //     var first_den = 0;
  //     if (!(cutoffs[first][0] == null)) {
  //       first_num += parseInt(cutoffs[first][0]);
  //       first_den += 1.0;
  //     }
  //     if (!(cutoffs[first][1] == null)) {
  //       first_num += parseInt(cutoffs[first][1]);
  //       first_den += 1.0;
  //     }
  //     if (first_den == 0) {
  //       first_num = 0;
  //     } else {
  //       first_num /= first_den;
  //     }
  //     var second_num = 0;
  //     var second_den = 0;
  //     if (!(cutoffs[second][0] == null)) {
  //       second_num += parseInt(cutoffs[second][0]);
  //       second_den += 1.0;
  //     }
  //     if (!(cutoffs[second][1] == null)) {
  //       second_num += parseInt(cutoffs[second][1]);
  //       second_den += 1.0;
  //     }
  //     if (second_den == 0) {
  //       second_num = 0;
  //     } else {
  //       second_num /= second_den;
  //     }
  //     return second_num - first_num;
  // });

  for (var i = 0; i < colleges.length; i++) {
    var cutoff_sub = res[colleges[i]];
    var row = ['<tr>'];
    row.push(['<td>', colleges[i], '</td>'].join('\n'));
    for (var j = 0; j < cutoff_sub.length; j++) {
      var val_metadata = cutoff_sub[j];
      var class_name;
      var val = val_metadata['status'];
      if (val == 'ADMIT') {
        class_name = 'admit';
      } else if (val == 'DENY') {
        class_name = 'deny';
      } else if (val == 'NOT OFFERED') {
        class_name = 'notoffered';
      } else if (val == 'INELIGIBLE') {
        class_name = 'ineligible';
      } else if (val == 'TBD') {
        class_name = 'tobedecided';
      }
      if (val_metadata['cutofflist'] != null) {
        var cutofflist_link = '../assets/' + year +  '/' + stream + '/' + val_metadata['cutofflist'] + '.pdf';
        row.push([
          '<td class="' + class_name + '">',
          '<div class="status-text">', val, '</div>',
          '<div class="cutoff-text">', val_metadata['cutoff'], '</div>',
          '<div class="cutoff-list-text"><a target="_blank" href="' + cutofflist_link + '"> List ', val_metadata['cutofflist'], '</a></div>',
          '</td>',
        ].join('\n'));
      } else {
        row.push([
          '<td class="' + class_name + '">',
          '<div class="status-text">', val, '</div>',
          '<div class="cutoff-text">', val_metadata['cutoff'], '</div>',
          '</td>',
        ].join('\n'));
      }
    }
    row.push('</tr>');
    table += row.join('\n');
  }

  $('#result-table').html($(table));
}

function computeCutoffTableAndDisplay(year, stream, rawmarks) {
  var validate_mark = function(mark, name) {
    var val;
    if (isNaN(mark)) {
      var err = name + ' mark ' + mark + ' is not a number'
      alert(err);
      throw err;
    } else {
      val = parseInt(mark);
    }
    if (val < 0 || val > 100) {
      var err = name + ' input is not in the 0 to 100 range: ' + val;
      alert(err);
      throw err;
    }
    return val;
  };

  var marks = {}
  for (var sub in rawmarks) {
    marks[sub] = validate_mark(rawmarks[sub], sub);
  }


  var cutoffs_list_map = null;
  if (year == '2016') {
    if (stream == 'artscomm') {
      cutoffs = cutoffs_2016_arts;
      cutoffs_list_map = cutoffs_2016_list_arts;
      cut_off_index_map = cut_off_index_map_arts;
    } else if (stream == 'science') {
      cutoffs = cutoffs_2016_science;
      cutoffs_list_map = cutoffs_2016_list_science;
      cut_off_index_map = cut_off_index_map_science;
    } else {
      alert('We do not support the stream ' + stream);
    }
  } else if (year == '2015') {
    if (stream == 'artscomm') {
      cutoffs = cutoffs_2015_arts;
      cut_off_index_map = cut_off_index_map_arts;
    } else if (stream == 'science') {
      console.log('what');
      alert('Sorry we do not have the data for 2015 science yet.');
      return;
    } else {
      alert('We do not support the stream ' + stream);
    }
  } else {
    alert('We do not support the year ' + year);
  }

  console.log(marks);
  var num_subjects = Object.keys(marks).length;
  if (num_subjects < 4) {
    alert('Only ' + num_subjects + ' entered. Need at least 4.');
  }

  // var sub = 'English';
  // var res_eng = {};
  // try {
  //   var agg = calculation_map[sub](marks);
  //   var average = agg[0];
  //   var score_boost = agg[1];
  //   console.log(sub + ': True');
  //   var colleges = Object.keys(english_cutoff);
  //   for (var j = 0; j < colleges.length; j++) {
  //     var cutoff = english_cutoff[colleges[j]];
  //     if (cutoff == null) {
  //       res_eng[colleges[j]] = 'NOT_OFFERED';
  //     } else if ((average + score_boost) >= cutoff) {
  //       res_eng[colleges[j]] = 'ADMIT';
  //     } else {
  //       res_eng[colleges[j]] = 'DENY';
  //     }
  //   }
  // } catch(e) {
  //   console.log(all_subjects[i] + ': False');
  //   // console.log('Not eligible');
  //   // console.log(e);
  // }
  // console.log(res_eng);


  // var all_subjects = Object.keys(calculation_map);
  var all_subjects = Object.keys(cut_off_index_map);
  var colleges = Object.keys(cutoffs);
  var res = {};
  for (var i = 0; i < all_subjects.length; i++) {
    try {
      var sub = all_subjects[i];
      var agg = calculation_map[all_subjects[i]](marks);
      var average = agg[0];
      var score_boost = agg[1];

      console.log(sub + ': True');
      for (var j = 0; j < colleges.length; j++) {
        var cutoff_all = cutoffs[colleges[j]];
        if (!(colleges[j] in res)) {
          res[colleges[j]] = [];
        }
        var cutoff = cutoff_all[cut_off_index_map[all_subjects[i]]];
        var cutofflist = null;
        if (cutoffs_list_map !== null) {
          cutofflist = cutoffs_list_map[colleges[j]][cut_off_index_map[all_subjects[i]]];
        }
        var metadata = {};
        var status;

        if (cutoff == 'TBD') {
          status = 'TBD';
        } else if (cutoff == null) {
          status = 'NOT OFFERED';
        } else if (cutoff.endsWith("_")) {
          // handle open list flow
          cutoff = cutoff.slice(0,-1);
          if ((average + score_boost) >= cutoff) {
            status = 'ADMIT';
          } else {
            status = 'TBD';
          }
        } else if ((average + score_boost) >= cutoff) {
          status = 'ADMIT';
        } else {
          status = 'DENY';
        }
        metadata['status'] = status;
        metadata['average'] = average;
        metadata['score_boost'] = score_boost;
        if (cutoff != 'TBD') {
          metadata['cutoff'] = cutoff;
        }
        metadata['cutofflist'] = cutofflist;
        res[colleges[j]].push(metadata);
      }
    } catch(e) {
      console.log(all_subjects[i] + ': False');
      // console.log('Not eligible');
      console.log(e);

      for (var j = 0; j < colleges.length; j++) {
        var cutoff_all = cutoffs[colleges[j]];
        if (!(colleges[j] in res)) {
          res[colleges[j]] = [];
        }
        var cutoff = cutoff_all[cut_off_index_map[all_subjects[i]]];
        var cutofflist = null;
        if (cutoffs_list_map != null) {
          cutofflist = cutoffs_list_map[colleges[j]][cut_off_index_map[all_subjects[i]]];
        }
        res[colleges[j]].push({
          'status': 'INELIGIBLE',
          'cutoff': cutoff,
          'cutofflist': cutofflist,
        });
      }
    }
  }

  console.log(res);
  makeHTMLfromData(res, all_subjects, year, stream);
}

$('#du-admission-button').click(function() {
  var validate_mark = function(mark, name) {
    var val;
    if (isNaN(mark)) {
      var err = name + ' mark ' + mark + ' is not a number'
      alert(err);
      throw err;
    } else {
      val = parseInt(mark);
    }
    if (val < 0 || val > 100) {
      var err = name + ' input is not in the 0 to 100 range: ' + val;
      alert(err);
      throw err;
    }
    return val;
  };
  var inputs = $('#du-admission').serializeArray();
  console.log(inputs);
  var marks = {};
  var year;
  var stream;
  for (var i = 0; i < inputs.length; i++) {
    var item = inputs[i];
    if (item.name == 'year') {
      year = item.value;
      continue;
    }
    if (item.name == 'stream') {
      stream = item.value;
      continue;
    }
    if (item.value == "") {
      continue;
    }
    if (item.name == 'sub_name') {
      if (inputs[i+1].value == "") {
        i++;
        continue;
      }
      marks[item.value] = inputs[i+1].value;
      // validate_mark(inputs[i+1].value, item.value);
      // extra increment to get skip mark input field
      i++;
      continue;
    }
    marks[item.name] = item.value;
    // validate_mark(item.value, item.name);
  }
  console.log(marks);
  var all_params = $.extend({'year': year, 'stream': stream}, marks)
  window.history.pushState( {} , '', '?' + $.param(all_params));
  computeCutoffTableAndDisplay(year, stream, marks);


});
