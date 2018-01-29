'use strict';

module.exports.parse = function (tag) {
  var re = /^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i;

  /*
  /
  ^
    (?:
      (
        en-GB-oed | i-ami | i-bnn | i-default | i-enochian | i-hak | i-klingon |
        i-lux | i-mingo | i-navajo | i-pwn | i-tao | i-tay | i-tsu | sgn-BE-FR |
        sgn-BE-NL | sgn-CH-DE
      ) |
      (
        art-lojban | cel-gaulish | no-bok | no-nyn | zh-guoyu | zh-hakka |
        zh-min | zh-min-nan | zh-xiang
      )
    )
  $
  |
  ^
    (
      (?:
        [a-z]{2,3}
        (?:
          (?:
            -[a-z]{3}
          ){1,3}
        )?
      ) |
      [a-z]{4} |
      [a-z]{5,8}
    )
    (?:
      -
      (
        [a-z]{4}
      )
    )?
    (?:
      -
      (
        [a-z]{2} |
        \d{3}
      )
    )?
    (
      (?:
        -
        (?:
          [\da-z]{5,8} |
          \d[\da-z]{3}
        )
      )*
    )?
    (
      (?:
        -
        [\da-wy-z]
        (?:
          -[\da-z]{2,8}
        )+
      )*
    )?
    (
      -x
      (?:
        -[\da-z]{1,8}
      )+
    )?
  $
  |
  ^
    (
      x
      (?:
        -[\da-z]{1,8}
      )+
    )
  $
  /i
  */

  var res = re.exec(tag);
  if (!res) return null;

  res.shift();
  var t;

  // langtag language
  var language = null;
  var extlang = [];
  if (res[2]) {
    t = res[2].split('-');
    language = t.shift();
    extlang = t;
  }

  // langtag variant
  var variant = [];
  if (res[5]) {
    variant = res[5].split('-');
    variant.shift();
  }

  // langtag extension
  var extension = [];
  if (res[6]) {
    t = res[6].split('-');
    t.shift();

    var singleton;
    var ext = [];

    while (t.length) {
      var e = t.shift();
      if (e.length === 1) {
        if (singleton) {
          extension.push({
            singleton: singleton,
            extension: ext
          });
          singleton = e;
          ext = [];
        } else {
          singleton = e;
        }
      } else {
        ext.push(e);
      }
    }

    extension.push({
      singleton: singleton,
      extension: ext
    });
  }

  // langtag privateuse
  var langtagPrivateuse = [];
  if (res[7]) {
    langtagPrivateuse = res[7].split('-');
    langtagPrivateuse.shift();
    langtagPrivateuse.shift();
  }

  // privateuse
  var privateuse = [];
  if (res[8]) {
    privateuse = res[8].split('-');
    privateuse.shift();
  }

  return {
    langtag: {
      language: {
        language: language,
        extlang: extlang
      },
      script: res[3] || null,
      region: res[4] || null,
      variant: variant,
      extension: extension,
      privateuse: langtagPrivateuse
    },
    privateuse: privateuse,
    grandfathered: {
      irregular: res[0] || null,
      regular: res[1] || null
    }
  };
};