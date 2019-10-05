# native_popup
브라우저 팝업 형태의 모듈(alert, prompt, confirm)
<br><br>
사용법
<br><br>
var popup = new NativePopup();
<br>
popup.alert('안녕하세요.\n저는 팝업입니다.');
<br>
// @return {String} 사용자가 넣은 텍스트 <br>
popup.prompot('1+1은 뭐야?', function(res){<br>
  console.log(res);<br>
});
<br><br>
// @return {Boolean} 확인, 취소에 대한 boolean 값 <br>
popup.confirm('오늘 날씨는 맑음이니?', function(res){<br>
  if(res){<br>
    console.log(res); // true<br>
<br>
  }else{<br>
    console.log(res); // false<br>
<br>
  }<br>
});<br>
