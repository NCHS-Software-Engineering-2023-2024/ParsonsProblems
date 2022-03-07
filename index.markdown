<div id="websiteName-sortableTrash" class="sortable-code"></div> 
<div id="websiteName-sortable" class="sortable-code"></div> 
<div style="clear:both;"></div> 
<p> 
    <input id="websiteName-feedbackLink" value="Get Feedback" type="button" /> 
    <input id="websiteName-newInstanceLink" value="Reset Problem" type="button" /> 
</p> 
<script type="text/javascript"> 
(function(){
  var initial = "site = &quot;https://replit.com/&quot;\n" +
    "doubleSlash = site.index(&quot;//&quot;)\n" +
    "firstSlash = site.index(&quot;/&quot;,doubleSlash+2)\n" +
    "siteName = site[doubleSlash+2:firstSlash]\n" +
    "print(&quot;The website name is &quot;+siteName)";
  var parsonsPuzzle = new ParsonsWidget({
    "sortableId": "websiteName-sortable",
    "max_wrong_lines": 10,
    "grader": ParsonsWidget._graders.LineBasedGrader,
    "exec_limit": 2500,
    "can_indent": false,
    "x_indent": 50,
    "lang": "en",
    "show_feedback": true
  });
  parsonsPuzzle.init(initial);
  parsonsPuzzle.shuffleLines();
  $("#websiteName-newInstanceLink").click(function(event){ 
      event.preventDefault(); 
      parsonsPuzzle.shuffleLines(); 
  }); 
  $("#websiteName-feedbackLink").click(function(event){ 
      event.preventDefault(); 
      parsonsPuzzle.getFeedback(); 
  }); 
})(); 
</script>
