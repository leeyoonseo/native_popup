/**
 * @author Lee Yoon Seo (2019.09)
 * @version 1.0.0
 * @return {Object} alert, confirm [TODO] prompt
 * @usage 
 * <pre>
 *  사용법
 * </pre>
 * @support 
 */
window.NativePopup = function(){
    this.name = "Browser JS Native Popup";
    this.version = "1.0.0";

    this.state = false;

    this.type = {
        '0' : 'alert',
        '1' : 'prompt',
        '2' : 'confirm'
    };
};

window.NativePopup.prototype = {
    constructor : NativePopup,


    createLayer : function(message){
        // [TODO] create 메서드로 빼도록
        this.wrap = $('<div></div>', {'class' : 'np_wrap'});
        this.title = $('<div></div>', {'class' : 'np_title'}).html('이 페이지 내용:<br>');
        this.msg = $('<div></div>', {'class' : 'np_message'}).text(message);
        this.wrap.append(this.title)
                 .append(this.msg);

        this.btnArea = $('<div></div>', {'class' : 'np_btn_area'});

        // [TODO] 문구도 custom 할 수 있게 끔 create랑 set이랑 메서드 나누기 
        this.done = $('<button></button>', {
            'type' : 'button', 
            'class' : 'np_done'
        }).text('확인');
        
        this.btnArea.append(this.done);

        if(this.type === '1'){
            this.textField = $('<input></input>', {
                'type' : 'text', 
                'class' : 'np_text', 
                'title' : '텍스트를 입력하세요.', 
                'autofocus' : 'autofocus'
            }); 

            this.wrap.append(this.textField);

        }
        
        if(this.type !== '0') {
            this.cancel = $('<button></button>', {
                'type' : 'button', 
                'class' : 'np_cancel'
            }).text('취소');

            this.btnArea.append(this.cancel);

        }
        
        this.wrap.append(this.btnArea);
        $('body').append(this.wrap);

        // 생성 시 true
        this.state = true;
    },

    toggleLayer : function(){
        console.log('toggleLayer');

    },

    alert : function(message){
        // [TODO] 중복 삭제 말고 같은 타입일 경우 재 사용하도록
        if(this.wrap) this.destroy();

        this.type = '0';

        // html
        !this.state ? this.createLayer(message) : this.toggleLayer(message);
        
        this.attachEvent();
    },

    prompt : function(message, callback){
        console.log('prompt', callback);
        // [TODO] 중복 삭제 말고 같은 타입일 경우 재 사용하도록
        if(this.wrap) this.destroy();

        this.type = '1';
        this.callback = callback;

        // html
        !this.state ? this.createLayer(message) : this.toggleLayer(message);

        this.attachEvent();
        
    },

    attachEvent : function(){
        var Manager = this;

        this.done.on('click', function(){
            Manager.onHide(function(){
                if(!Manager.callback) return false;

                var result = (Manager.type === '1') ? Manager.textField.val() : true;
                Manager.callback(result);

            });

        });

        this.cancel.on('click', function(){
            Manager.onHide();

        });

    },

    dettachEvent : function(){

    },

    onDone : function(){

    },
    onHide : function(callback){
        this.wrap.hide(50, function(){
            if(callback) callback();
            
        });
    },

    confirm : function(message, callback){
        this.type = '3';
        // this.callback = callback;
    },

    

    

    destroy : function(){
        console.log('destroy=============');
        $('body').find(this.wrap).remove();

    },

    // addClass : function(){

    // },

    // customCSS : function(){


    // }


};

// window.LayerMessageBox = (function($){

//     var name = "LayerMessageBox";
//     var wrap = $('.rec_layer_wrap');

//     var callbackFunc;
    
//     function _attachEvent(){

//         // 확인 버튼 클릭 
//         wrap.find('.submit').on('click', function(){
//             if(callbackFunc) callbackFunc(true); // callback 함수가 있을 경우(confirm) true를 리턴

//             _setUI(false);

//         }).end()        
//         .find('.btn_layer_close, .close').on('click', function(){
            
//             // 취소 버튼 클릭
//             _setUI(false);

//         });
//     }

//     /**
//      * _uiShow, _uiHide 호출 함수
//      * state가 undefinde면 재귀 함수로 사용하므로 if문에 true, false를 명시해 줘야합니다.
//      * @param {Boolean} state true = show, false = hide, undefind = hide, show
//      */
//     function _setUI(state){
//         if(state === true){
//             _uiShow();

//         }else if(state === false){
//             _uiHide();

//         }else{
//             _uiHide();
//             _uiShow();

//         }
//     }

//     function _uiHide(){
//         wrap.hide()
//             .find('.submit, .btn_layer_close, .close').hide();
//     }

//     function _uiShow(){
//         if(callbackFunc) wrap.find('.close').show();

//         wrap.hide()
//             .find('.submit, .btn_layer_close').show();
//     }

//     /**
//      * 메세지 삽입
//      * state가 undefinde면 재귀 함수로 사용하므로 if문에 true, false를 명시해 줘야합니다.
//      * @param {String} message 메세지
//      */
//     function _setMessage(message){
//         var output = _replaceAll(message, '\n', '<br>');

//         wrap.show()
//         .find('.rec_layer_message').empty().append(output);
//     }

//     /**
//      * 메세지 줄 바꿈 (브라우저 \n을 대체하기 위함)
//      * state가 undefinde면 재귀 함수로 사용하므로 if문에 true, false를 명시해 줘야합니다.
//      * @param {String} message 수정할 메세지
//      * @param {String} org 수정되어야 할 문자열 (\n)
//      * @param {String} dest 수정되는 문자열 (<br>)
//      */
//     function _replaceAll(message, org, dest){
//         return message.split(org).join(dest);
//     }

//     // ------------------- public ↓

//     /**
//      * 레이어 팝업 alert
//      * @see .html에서 호출
//      * @param {String} message 메세지
//      */
//     function _alert(message){
//         _setUI();
//         _setMessage(message);

//     }

//     /**
//      * 레이어 팝업 confirm
//      * @see .html에서 호출
//      * @param {String} message 메세지
//      * @param {Object} callback 콜백 함수
//      */
//     function _confirm(message, callback){
        
//         // callback함수가 없으면 _alert로 호출
//         if(!callback) {
//             _alert(message);
//             return false;

//         }
        
//         callbackFunc = callback;

//         _setUI();
//         _setMessage(message);
//     }

//     _attachEvent();

//     return { 
//         alert : _alert,
//         confirm : _confirm
//     }

// }(jQuery)); // RecordLayerPopup
