function genRandomText()
{
  this.numWordsParagraph = localStorage["numWordsParagraphs"]; //Numbers of words per paragraph 
  this.numParagraphs = localStorage["numParagraphs"]; //Number of paragraphs
  
  this.dummyWords = ["integer","vut","nunc","risus","a","sagittis","turpis", "nunc","eu","urna","urna", "pellentesque","porttitor","est","ut","augue","cursus","scelerisque", "in","hac","habitasse","platea","dictumst", "sed","ut","odio","a","dolor","ultricies","dapibus", "cum","sociis","natoque","penatibus","et","magnis","dis","parturient","montes","nascetur","ridiculus","mus", "etiam","vel","lacus","magna","nec","aliquam","augue", "lundium", "integer","porttitor","porta","porta", "in","rhoncus","adipiscing","diam","sit","amet","ultrices","turpis","auctor","sit","amet", "aenean","pulvinar","egestas","lorem","ac","placerat", "sed","lectus","mauris","rhoncus","mid","tincidunt","dignissim","elementum","in","odio", "duis","vel","magna","elit", "phasellus","tincidunt","nisi","pid","pulvinar","placerat","purus","augue","aliquet","tortor","et","tristique","turpis","enim","nec","nisi", "proin","facilisis","adipiscing","enim","ac","mattis","arcu","elementum","et", "cras","massa","non","velit","tempor","scelerisque","ac","quis","eros"];
  this.punctuation = ["!","?","."];
  
//-------------------
  
  this.getRandomWord = function (x)
  {
    return x[this.getRandomNumber(x.length)];
  }
  
  this.getRandomNumber = function (x)
  {
    return Math.floor(Math.random()*parseInt(x));
  }

  this.upperFirst = function(x)
  {
    var er = /[<p>|\?|\!|\.]\W([a-z])/g;
    var ex = x.replace(er,function (s) { return s.toUpperCase(); });
    return ex;
  }

  this.getRandomPunctuation = function (x)
  {
    if (x > 0)
    {
      if (x % this.getRandomNumber(30) == 0)
      {
        return this.getRandomWord(this.punctuation) + ' ';
      }
      else if (x % this.getRandomNumber(20) == 0)
      {
        return ', ';
      }
      else
      {
        return ' ';
      }
    }
    return ' ';
  }
  
  this.compileText = function ()
  {
    html = '<p>';
    
    for (var x=0,y=this.numWordsParagraph*this.numParagraphs;x<=y;x++) 
    {
      if ((x > 0) && (x % this.numWordsParagraph == 0))
      {
        html += '.</p>\n\n<p>';
      }
      else
      {
        if (html.substring(html.length - 3, html.length) != "<p>")
        {
          html += this.getRandomPunctuation(x);        
        }
        
        html += this.getRandomWord(this.dummyWords);
      }
    }
    return this.upperFirst(html.substring(0, html.length - 3));
  }
}