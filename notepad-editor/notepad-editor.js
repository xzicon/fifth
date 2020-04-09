var $editor = (function() {
    var $confs = $(''
        + '<div class="notepad-editor">'
          + '<textarea spellcheck="false" auto-size="none"></textarea>'
        + '</div>');
  
    var $textArea = $confs.find('textarea');
  
    var cfg = {
      posHandler: null,
      contentHandler: null,
      wrap: false
    };
  
    var bSelect = false;
  
    function resize(isBig) {
      if(isBig) {
        $confs.css({bottom: '21px'});
      } else {
        $confs.css({bottom: '0'});
      }
    }
  
    function focus() {
      $textArea.focus();
    }
  
    $textArea.keyup(function() {
      cfg.posHandler(getRow(), getCol());
      cfg.contentHandler($textArea.val() !== '');
    });
  
    $textArea.keypress(function() {
      cfg.posHandler(getRow(), getCol());
    });
  
    $textArea.mousedown(function() { bSelect = true; });
  
    $textArea.mouseup(function() { bSelect = false; });
  
    $textArea.mousemove(function() {
      if(bSelect) cfg.posHandler(getRow(), getCol());
    });
  
    $textArea.click(function() {
      cfg.posHandler(getRow(), getCol());
    });
  
    function getCol() {
      var sub = $textArea.val().substr(0, $textArea[0].selectionStart);
      var subs = sub.split('\n');
  
      return subs[subs.length-1].length + 1;
    }
  
    function getRow() {
      var sub = $textArea.val().substr(0, $textArea[0].selectionStart);
      return sub.split('\n').length;
    }
  
    function getTotalLn() {
      return $textArea.val().split('\n').length;
    }
  
    function setWrap(bWrap) {
      if(bWrap) {
        $textArea.attr('wrap', 'soft');
        $textArea.css({'overflow-x': 'hidden'});
      } else {
        $textArea.attr('wrap', 'off');
        $textArea.css({'overflow-x': 'scroll'});
      }
    }
  
    function setFont(e) {
      $textArea.css({'font-family': e.family, 'font-size': e.size + 'pt'});
  
      if(e.style === '斜体') {
        $textArea.css({'font-style': 'italic'});
        return;
      }
  
      if(e.style === '粗体') {
        $textArea.css({'font-weight': 'bold'});
        return;
      }
  
      if(e.style === '粗偏斜体') {
        $textArea.css({'font-weight': 'bold', 'font-style': 'italic'});
        return;
      }
    }
    function show(conf) {
      $.extend(cfg, conf);
  
      $('body').append($confs);
      $textArea.trigger('focus');
      setWrap(cfg.wrap);
    }
  
    return {
      show: show,
      resize: resize,
      focus: focus,
      getTotalLn: getTotalLn,
      getRow: getRow,
      getCol: getCol,
      setWrap: setWrap,
      setFont: setFont
    };
  }());