$(document).ready(function(){
      
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/getBanner.php",
            type:"get",
            data:"",
            dataType:'jsonp',
            success:function(data){
                var dataList = document.getElementById('list1')
                console.log(data);


                var oImagUrl = JSON.parse(data[0].goodsBenUrl);
                console.log(oImagUrl[0])

                
                for(var i = 0 ; i < data.length ; i++){
                    var oImagUrl = JSON.parse(data[i].goodsBenUrl);
                    var oImagName = data[i].goodsName;
                    var _html = '<li><img src ='+oImagUrl[0]+'></li>';
                    var _title = '<p>'+oImagName+'</p>'
                    $('#list1').append(_html);
                    $('#list1').children().eq(i).append(_title)

                }
                $('.topList a').on('click',function(){
                // console.log(1)
                var index = $(this).index()%2;
                console.log(index)
                $('#list1 li').remove();
                
                
                for(var i = 0 ; i < data.length ; i++){
                    var oImagUrl = JSON.parse(data[i].goodsBenUrl);
                    var oImagName = data[i].goodsName;
                    var _html = '<li><img src ='+oImagUrl[index]+'></li>';
                    var _title = '<p>'+oImagName+'</p>'
                    $('#list1').append(_html);
                    $('#list1').children().eq(i).append(_title)

                }
            });


            // 懒加载
            $(window).on('mousewheel',function(){
                var wHeight = $(window).height();
                var top = $(window).scrollTop();
                var hgt = $(document).height();
                console.log(top,hgt,wHeight)
                if(top+wHeight+50 >= hgt){
                   
                    for(var i = 0 ; i < data.length ; i++){
                        var oImagUrl = JSON.parse(data[i].goodsBenUrl);
                        var oImagName = data[i].goodsName;
                        var _html = '<li><img src ='+oImagUrl[0]+'><p>'+oImagName+'</p></li>';
                        
                        $('#list1').append(_html);
                        

                    }

                    
                    
                    
                }
            })




        }
        
    })



})