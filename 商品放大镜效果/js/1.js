(function(){

    function $(ele){
        return document.querySelector(ele);
    }

    //获取元素

    let con = $('#con');
    let Lview = $('.Lview');
    let mask = $('.mask');
    let smallImage = $('.small');
    let Rview = $('.Rview');
    let bigImage = $('.big');

    //鼠标放上去显示块和要放大的容器
    Lview.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        Rview.style.display = 'block';
    });

    Lview.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        Rview.style.display = 'none';
    });

    //移动mask放大效果

    Lview.addEventListener('mousemove',function(ev){

        ev = window.event || ev ;

        let maskL = ev.pageX || ev.clientX + document.documentElement.scrollLeft;
        //ev.pageX  （页面到鼠标的距离）
        //ev.clientX + document.documentElement.scrollLeft;  鼠标移动（可视区的范围） + 滚动条的距离

        let maskT = ev.pageY || ev.clientY + document.documentElement.scrollTop;

        //获取con到左侧或者顶部的距离

        let conL = con.offsetLeft;
        let conT = con.offsetTop;

        //获取mask自身的大小

        let  maskW = mask.offsetWidth;
        let  maskH = mask.offsetHeight;

        //计算小盒子要移动的距离；

        let mobileL = maskL - conL - maskW/2;
        let mobileT = maskT - conT - maskH/2;
        // console.log(mobileL,mobileT)

        //判断

        if(mobileL <=0){
            mobileL =0;
        }
        if(mobileL >= Lview.offsetWidth - mask.offsetWidth){
            mobileL =  Lview.offsetWidth - mask.offsetWidth;
        }

        if(mobileT <=0){
            mobileT =0;
        }
        // console.log(Lview.offsetHeight - mask.offsetHeight)
        if(mobileT >= Lview.offsetHeight - mask.offsetHeight){
            mobileT = Lview.offsetHeight - mask.offsetHeight;
        }

        mask.style.left =  mobileL  + 'px';
        // console.log(mask.style.top)
        mask.style.top = mobileT + 'px';


        bigX =  Rview.offsetWidth *  (Lview.offsetWidth / mask.offsetWidth);
        bigY =  Rview.offsetHeight *  (Lview.offsetHeight / mask.offsetHeight);

        bigImage.style.width = bigX + 'px';
        bigImage.style.height = bigY + 'px';

        // let fangD = (bigImage.offsetWidth -Rview.offsetWidth) / (smallImage.offsetWidth - mask.offsetWidth);
        // bigImage.style.left = -fangD * maskL + 'px';
        // bigImage.style.top = -fangD * maskT + 'px';

        // let fangD = (mobileL / Lview.offsetWidth) *  bigImage.offsetWidth;

        // let fangD = mobileL *4;
        // let fangT = mobileT *4;
        console.log(bigImage.offsetWidth)
        let fangD = (mobileL / Lview.offsetWidth) *  bigImage.offsetWidth;
        let fangT = (mobileT / Lview.offsetHeight) *  bigImage.offsetHeight;


        bigImage.style.left = -fangD + 'px';
        bigImage.style.top = -fangT + 'px';


    });

})();