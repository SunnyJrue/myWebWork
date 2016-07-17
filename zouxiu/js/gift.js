$(document).ready(function(){

        // 弹出登陆界面
        $('.loginBtn').on('click',function(){
            $('.login').show();
            
        });
        // 点击输入框和button外区域关闭登陆界面
        $('.close').click(function(){
            $('.login').hide();
        })
        // 退出登录
        $('.loginoutBtn').on('click',function(){
            $('.loginoutBtn').hide();
            $('.loginBtn').show();
            // 清空输入框中的值
            $('.count').val('');
            $('.password').val('');
            $('.corret').eq(0).hide();
            $('.corret').eq(1).hide();

            sessionStorage.clear();
            localStorage.clear();

        })

        $(window).load(function(){
          
            console.log(sessionStorage.key(0));
            // 如果有localstorage则直接登陆
            if(localStorage.key(0)){
                 $('.loginoutBtn').show();
                 $('.loginBtn').hide();
            }else if(sessionStorage.key(0)){
                $('.loginoutBtn').show();
                $('.loginBtn').hide();
                
            }else{
                $('.loginoutBtn').hide();
                $('.loginBtn').show();
            }

        })
        


        // 进行抽奖
        $('.oBtn').on('click',function(){
            var num = parseInt(Math.random()*100);
            console.log(num,loginStatus);

            if( sessionStorage.key(0) || localStorage.key(0)){
                // console.log(11,uName)
                $.ajax({
                    url:'http://datainfo.duapp.com/lottery/fruitsubmit.php',
                    type:'post',
                    data:'userID='+uName+'&fruit='+num,
                    dataType:'',
                    success:function(data){
                        console.log(data)
                        if(data==0){
                            $('.mask').show();
                        }
                    },
                })
              
            }else{
                $('.mask').show().find('p').eq(0).text('请先登录后再抽奖哦');
            }
            

        })

        // 对已抽奖进行提示
        $('.regist-msg p').eq(1).click(function(){
            $('.mask').hide();
        })


            // 获取中奖信息,懒加载

            gift(0);

            function gift(number){

                $.ajax({
                    url:'http://datainfo.duapp.com/lottery/getsuerfr.php',
                    type:'GET',
                    data:'',
                    dataType: 'jsonp',
                    success:function(data){
                    // console.log(data)

                    for(var i = number ; i < number+10 ; i++){

                        var str='';
                        switch(parseInt(data[i].fruit)){
                            case 1:
                            str='一等奖';
                            break;
                            case 2:
                            str='二等奖';
                            break;
                            case 3:
                            str='三等奖';
                            break;
                            default:
                            str='未获奖';
                            break;

                        }

                        var gift = '<div class="divs"><span>'+str+'</span><span>'+data[i].userID+'</span><span>'+data[i].timer+'</span></div>';
                        $('.result').append(gift);

                    }


                }
            })
}
       

        var num = 1;
        $('.result').on('mousewheel',function(){
            var result= document.getElementsByClassName('result')[0];
            var divs = document.getElementsByClassName('divs')[$('.divs').length-1];
            // console.log($('.divs').length)
            console.log($('.result').scrollTop(),$('.result').height());
            console.log(divs.offsetTop, result.offsetTop)

            if($('.result').scrollTop() + $('.result').height()   >= divs.offsetTop - result.offsetTop){

                gift(num*10)
                num++;
            }
        })
        

        

    })