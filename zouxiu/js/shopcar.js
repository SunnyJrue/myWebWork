
    // 更新账户购物车的数据
        var username = localStorage.key(0)?localStorage.key(0):sessionStorage.key(0);
        if(username){

            $.ajax({
                url:'http://datainfo.duapp.com/shopdata/getCar.php',
                type:'get',
                data:'userID='+username,
                dataType:'jsonp',
                success:function(data){
                    console.log(data)
                    console.log(data.length)
                    for(var i= 0 ; i < data.length ; i++){
                        var price = (data[i].discount*data[i].price/10).toFixed(2)
                        // var _html = '<div class="items"><div><img src="'+data[i].goodsListImg+'" alt="" class="pic"> <span class="details"><p class="style"><span >'+data[i].goodsName+'</span> <img src="../img/delete.gif" alt="" class="deletePic"></p><p>单价：<span class="sPrice">￥'+price+'</span></p><p>数量：<button class="plus">-</button><input type="text" class="num" value="'+data[i].number+'"><button class="minus">+</button></p></span></div></div>';


                        var _html = '<div class="items" data-id="'+data[i].goodsID+'"><div><img src="'+data[i].goodsListImg+'" alt="" class="pic"> <span class="details"><p class="style"><span>'+data[i].goodsName+'</span> <img src="../img/delete.gif" alt="" class="deletePic"></p><p>单价：<span class="sPrice">￥'+parseInt(price)+'</span></p><p>数量：<button class="plus">-</button><input type="text" class="num" value="'+parseInt(data[i].number)+'"><button class="minus">+</button></p></span></div></div>'

                        // var _html='<button class="test">test</button>'        
                        
                        $('.selected').append(_html);

                        caculate();





                    }
                }
            })

            
        }else{
            $('.mask').show();
        }







    function caculate(){
            // 数量的加减
            
            // 载入页面时候算出总价和数量
            getPrice()



            // 点击减少商品数量
            $('.plus').click(function(){

                var num = $(this).next().val();

                num--;

                if(num <= 1){
                    num=1;

                }
                $(this).next().val(num);
                getPrice();



                var that = $(this);
                
                var goodId = $(this).closest('.items').attr('data-id');
                // 保存商品数量更新
                $.ajax({
                    url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                    type:'post',
                    data:'userID='+username+'&goodsID='+goodId+'&number='+num,
                    dataType:'',
                    success:function(data){
                        console.log(data)
                        if(data == 1){
                           
                        }
                    }
                });



            });
            // 点击增加商品数量
            $('.minus').click(function(){

                var that=$(this);
                var num = $(this).prev().val();

                num++;
                if(num >=99){
                    num=99;
                }
                $(this).prev().val(num);
                getPrice();

                console.log($('.sPrice').eq(1).text().replace(/[^0-9]/ig,""))



                var that = $(this);
                
                var goodId = $(this).closest('.items').attr('data-id');

                // 保存商品数量更新
                $.ajax({
                    url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                    type:'post',
                    data:'userID='+username+'&goodsID='+goodId+'&number='+num,
                    dataType:'',
                    success:function(data){
                        console.log(data)
                        if(data == 1){
                           
                        }
                    }
                });

            })

            // 输入框输入数字时自动计算价格

            $('.num').blur(function(){
                getPrice();
            })


            // 计算总价的函数
            function getPrice(){

                var tPrice =0;
                var tNum=0;

                var len = $('.items').length
                for(var i = 0 ; i < len ; i++ ){
                   tPrice += $('.num').eq(i).val()*$('.sPrice').eq(i).text().replace(/[^0-9]/ig,"") ;
                   tNum += parseInt($('.num').eq(i).val());
               }

               $('.total').text(tNum);
               $('.totalM').text(tPrice);
 

           }



            // 删除购物车的商品
            $('.deletePic').click(function(){
                var that = $(this);
        
                var goodId = $(this).closest('.items').attr('data-id');
                getPrice();
                $.ajax({
                    url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                    type:'post',
                    data:'userID='+username+'&goodsID='+goodId+'&number=0',
                    dataType:'',
                    success:function(data){
                        console.log(data)
                        if(data == 1){
                            that.closest('.items').remove();
                        }
                    }
                });

            })






    }


   




    // $.ajax({
    //     url:'http://datainfo.duapp.com/shopdata/getGoods.php',
    //     type:'get',
    //     data:'',
    //     dataType:'jsonp',
    //     success:function(data){
    //         console.log(data)
    //     }
    // })

    
// <div class="items">
    // <div>
        // <img src="http://img13.360buyimg.com/n8/jfs/t1705/49/1279540754/390079/4aa81978/55ebe778Nc711e466.jpg" alt="" class="pic">
        // <span class="details">
        // <p class="style">
        //     <span>茵曼 2015秋装新款文艺长袖格子衬衫百搭长袖衬衣女</span><img src="../img/delete.gif" alt="" class="deletePic">
        // </p>
        // <p>
        //     单价：<span class="sPrice">￥118.30</span>
        // </p>
        // <p>
        //     数量：<button class="plus">-</button><input type="text" class="num" value="1"><button class="minus">+</button>
        // </p>
        // </span>
    // </div>
// </div>


// <div class='items' >
    // <div>
        // <img src="../img/shop_1.gif" alt="" class='pic'>

        // <span class='details'>
        //     <p class='style'><span >ESPRIT气质V领玫红T恤</span> <img src="../img/delete.gif" alt="" class='deletePic'></p>
           
        //     <p >单价：<span class='sPrice'>￥199</span></p>
        //     <p >数量：<button class='plus'>-</button><input type="text" class='num' value='4'><button class='minus'>+</button></p>
            
        // </span>
    // </div>


// </div>







