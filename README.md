# native_popup

브라우저 팝업 형태의 모듈(alert, prompt, confirm)

사용법

<pre>
var popup = new NativePopup();

popup.alert('안녕하세요.\n저는 팝업입니다.');

// @return {String} 사용자가 넣은 텍스트 
popup.prompot('1+1은 뭐야?', function(res){
  console.log(res);
});

// @return {Boolean} 확인, 취소에 대한 boolean 값
popup.confirm('오늘 날씨는 맑음이니?', function(res){
  if(res){
    console.log(res); // true

  }else{
    console.log(res); // false

  }
});

</pre>

데모확인
https://leeyoonseo.github.io/native_popup/
