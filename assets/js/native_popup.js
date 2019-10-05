/**
 * @author Lee Yoon Seo (2019.09~)
 * @version 1.0.0
 * @usage 
 *  var popup = new NativePopup();
 *  popup.alert('메세지\n입력중');
 *  
 *  popup.prompt('1+1은?', function(res){
 *    console.log(res); // 사용자 입력 값 
 *  });
 * 
 *  popup.confirm('일요일입니까?', function(res){
 *    console.log(res); // 확인 취소에 따른 boolean 값
 *  });
 */

window.NativePopup = function(){
    this.name = "Browser JS Native Popup";
    this.version = "1.0.0";
    this.initState = false;

    // 0 : alert , 1 : prompt, 2 : confirm
    this.type;
    this.message;
};

/*
    [TODO]
    1. 열고 닫고 애니메이션
    2. ESC 누르면 닫기
    3. 프로토타입 말고 바로 실행 함수로 수정하자
*/

window.NativePopup.prototype = {
    constructor : NativePopup,

    /**
     * alert 팝업
     * @param {String} message 노출할 메세지
     */
    alert : function(message){
        this.message = this.setMessage(message);

        if(this.type !== null && this.type === '0'){
            this.showPopup();

        }else{
            this.type = '0';
            this.setNewPopup();
        }
    },    

    /**
     * prompt 팝업
     * @param {String} message 노출할 메세지
     * @param {Object} callback 입력한 값에 대한 리턴 값을 받을 콜백함수
     */
    prompt : function(message, callback){
        this.message = this.setMessage(message);

        if(this.type !== null && this.type === '1'){
            this.showPopup();

        }else{
            this.type = '1';
            this.setNewPopup(callback);
        }
    },

    /**
     * confirm 팝업
     * @param {String} message 노출할 메세지
     * @param {Object} callback 입력한 값에 대한 리턴 값을 받을 콜백함수
     */
    confirm : function(message, callback){
        this.message = this.setMessage(message);

        if(this.type !== null && this.type === '2'){
            this.showPopup();

        }else{
            this.type = '2';
            this.setNewPopup(callback);
        }
    },

    /**
     * 팝업 레이아웃 생성
     */
    createPopup : function(){
        this.wrap = $('<div></div>', {'class' : 'np_wrap'});
        this.title = $('<div></div>', {'class' : 'np_title'}).html('이 페이지 내용:<br>');
        this.msg = $('<div></div>', {'class' : 'np_message'}).append(this.message);
        this.wrap.append(this.title)
                .append(this.msg);

        this.btnArea = $('<div></div>', {'class' : 'np_btn_area'});

        this.done = $('<button></button>', {
            'type' : 'button', 
            'class' : 'np_done'
        }).text('확인');
        
        this.btnArea.append(this.done);

        // prompt
        if(this.type === '1'){
            this.textField = $('<input></input>', {
                'type' : 'text', 
                'class' : 'np_text', 
                'title' : '텍스트를 입력하세요.', 
                'autofocus' : 'autofocus'
            }); 

            this.wrap.append(this.textField);
        }

        // prompt, confirm
        if(this.type !== '0') {
            this.cancel = $('<button></button>', {
                'type' : 'button', 
                'class' : 'np_cancel'
            }).text('취소');

            this.btnArea.append(this.cancel);
        }
        
        this.wrap.append(this.btnArea);
        $('body').append(this.wrap);     

        // append 후 작업 ----------------------------- ↓
        if(this.type === '1') $(this.textField).focus();
    },

    /**
     * 팝업 새로 셋팅
     * @param {Object} callback 입력한 값에 대한 리턴 값을 받을 콜백함수
     */
    setNewPopup : function(callback){
        if(this.wrap) this.destroy();
        if(callback) this.callback = callback;

        this.createPopup();
        this.attachEvent();
    },

    /**
     * 팝업 Show
     * @param {String} message 노출할 메세지
     * @param {Object} callback 입력한 값에 대한 리턴 값을 받을 콜백함수
     */
    showPopup : function(){
        this.wrap.show();

        if(this.type === '1') $(this.textField).val('').focus();
    },

    /**
     * 팝업 Hide
     * @param {String} message 노출할 메세지
     * @param {Object} callback 입력한 값에 대한 리턴 값을 받을 콜백함수
     */
    hidePopup : function(callback){
        this.wrap.hide(50, function(){
            if(callback) callback();
            
        });
    },

    /**
     * 버튼 이벤트 설정
     */
    attachEvent : function(){
        var Manager = this;          

        // 최초에만 실행
        if(!this.initState) this.onESC();
        
        this.done.on('click', function(){
            Manager.onDone();

        });

        if(this.type !== '0'){
            this.cancel.on('click', function(){
                Manager.onCancel();

            });
        }
    },

    /**
     * 버튼 이벤트 해제
     */
    dettachEvent : function(){
        if(this.done) this.done.off();
        if(this.cancel) this.cancel.off();
    },

    /**
     * 확인 버튼 클릭 시
     */
    onDone : function(){
        var Manager = this;

        this.hidePopup(function(){
            if(!Manager.callback) return false;
            var result = (Manager.type === '1') ? Manager.textField.val() : true;
        
            Manager.callback(result);
        });
    },

    /**
     * 취소 버튼 클릭 시
     */
    onCancel : function(){
        var Manager = this;

        this.hidePopup(function(){
            if(!Manager.callback) return false;
            
            Manager.callback(false);
        });
    },

    /**
     * ESC 버튼 누를 시
     */
    onESC : function(){
        var Manager = this;

        $(document).on('keydown', function(e){
            if(e.keyCode == 27){
                Manager.wrap.hide();
            } 
        });
    },
    
    /**
     * 팝업 삭제
     */
    destroy : function(){
        if(this.callback) this.callback = null;

        this.dettachEvent();
        this.type == null;

        $('body').find(this.wrap).remove();        
    },

    /**
     * 메세지 줄 바꿈 (\n 사용)
     * @param {String} message 수정할 메세지
     */
    setMessage(message){
        return message.split('\n').join('<br>');
    }
};