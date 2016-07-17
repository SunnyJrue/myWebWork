    $(window).ready(function(){
        
        var mySwiper = new Swiper ('.swiper-container', {
            autoplay:3000,
            loop: true,
            pagination: '.swiper-pagination',


        })      
        var username = localStorage.key(0);
        console.log(username)
        
        $('.headPic').click(function(){
            if(!username){
                window.location.href = 'login.html'

            }
        })

        //获取网页的数据图片价格等

        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/getGoods.php',
            type:'get',
            data:'goodsID='+goodId,
            dataType:'jsonp',
            success:function(data){
                console.log(data)
               
                var arr = JSON.parse(data[0].imgsUrl.split(','));
                goodId = data[0].goodsID;
                console.log(arr[0])
                for(var i = 0 ; i < arr.length ; i++){
                    console.log(arr[2])
                    $('.sImg').eq(i).attr({src:arr[i]});
                    $('.sImg').eq(i+3).attr({src:arr[i]});
              
                    
                }

                $('.details-msg').text(data[0].goodsName);
                if(data[0].discount >0 ){
                    $('.final-price').text('￥'+(data[0].discount*data[0].price/10).toFixed(2));
                }else{
                    $('.final-price').text('￥'+parseInt(data[0].price).toFixed(2));
                }
                $('.price').text('￥'+parseInt(data[0].price).toFixed(2));


            }
        }) 


       // 更新购物车的数据
       $('.oBtn').click(function(){
        var username = localStorage.key(0);
        console.log(username)
        if(username){
            $.ajax({
                url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                type:'post',
                data:'userID='+username+'&goodsID='+goodId+'&number=1',
                dataType:'',
                success:function(data){
                    console.log(data)
                    if(data == 1 ){
                        $('.mask').show();
                    }
                }
            });
        }
                // console.log(goodId);

            })

       // 关闭购物车提示
       $('.closeBtn').click(function(){

            $('.mask').hide();
       })
       





})