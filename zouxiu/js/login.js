

        var uName;
        var sessionName;
        var loginStatus;
        // 123zy123   pass 123456
        $(document).ready(function(){
        // 跳转注册
        $('.btn2').on('click',function(){
            window.location.href = 'register.html';
        })



        // 账户验证
        $('.count').on('blur',function(){
            var username = $('.count').val();
            if(username){
                $('.corret').eq(0).show().text('√').css('color','green');
                $('.errMsg').eq(0).hide()
            }else{
                $('.corret').eq(0).hide();
                $('.errMsg').eq(0).show().text('用户名不能为空');

            }

        })

        // 验证密码格式
        $('.password').on('blur',function(){
            var password = $('.password').val();
            if(password == ''){
                $('.errMsg').eq(1).show().text('密码不能为空');
                $('.corret').eq(1).hide();
            }else if(/^[0-9a-zA-z]{0,5}$/.test(password)){
                $('.corret').eq(1).hide();
                $('.errMsg').eq(1).show().text('密码不能少于6位');

            }else if(/^[0-9a-zA-z]{6,28}$/.test(password)){
                $('.corret').eq(1).show().text('√').css('color','green');
                $('.errMsg').eq(1).hide();
            }else if(!/^[0-9a-zA-z]{6,28}$/.test(password)){
                $('.corret').eq(1).hide();
                $('.errMsg').eq(1).show().text('密码只能为数字和字母组合');
                return;
            }

        })

                // 显示密码
                $('#check_1').on('click',function(){
                    if($('#check_1').prop('checked')){
                        $('.password').attr('type','text');
                    }else{
                        $('.password').attr('type','password');
                    }
                })

                // 记住密码自动登录
                // 登录
                $('.btn1').on('click',function(){
                    var username = $('.count').val();
                    var password = $('.password').val();
                    if($('.corret').eq(0).css('display')=='block' && $('.corret').eq(1).css('display')=='block' ){
                        $.ajax({
                            url:'http://datainfo.duapp.com/shopdata/userinfo.php',
                            type:'post',
                            data:'status=login&userID='+username+'&password='+password,
                            dataType:'json',
                            success:function(data){

                                console.log(data);
                                if(data==2){
                                    $('.errMsg').eq(1).show().text('账户和密码不一致');
                                    $('.corret').eq(1).show().text('X').css('color','red');
                                }else if(data == 0){
                                    $('.errMsg').eq(0).show().text('该账户不存在');
                                    $('.corret').eq(0).show().text('X').css('color','red');
                                }else {
                                    console.log('登陆成功')
                                    
                                     // loginStatus = data;
                                    $('.login').hide();
                                    $('.loginoutBtn').show();
                                    $('.loginBtn').hide();


                                     // 记录密码自动登录
                                    sessionStorage.clear();
                                    sessionStorage.setItem(username,password);
                                   
                                    uName = username;
                                }
                                
                            }


                        })

    }


    })

    });


    
