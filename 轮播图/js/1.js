
/*
获取相关的元素
*/

let swiper = document.getElementById('swiper');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let img = swiper.getElementsByTagName('img');
let num = 0;
let lis = Array.from(document.querySelectorAll('#focus li'));
let timer = null;
let preV = lis[0];
console.log(lis)

let arr = ['img/banner1.jpg','img/banner2.jpg','img/banner3.jpg','img/banner4.jpg'];

//点击下一张
    next.onclick = function(){

        // console.log(img[0].src)
        num++;
        if(num>=arr.length){num=0;}
        // console.log(num)
        
        lunBo(num);

        //小圆点
        dian(num);
    }

    function lunBo(a){
        swiper.style.left = -1000 +'px';
        swiper.style.transition = '0.5s';
        img[1].src = arr[a];
        // console.log(img[1].src)
        setTimeout(() => {
            img[0].src = arr[a];
            swiper.style.transition = '';
            swiper.style.left = 0;
            setTimeout(() => {
                swiper.style.transition = '0.5s'
            }, 30);

        },310);
    }

    //小圆点
    function dian(num){
        lis.forEach( (e,i)=> {
            i = num;
            // console.log(i)
            preV.className = '';
            preV = lis[i];
            lis[i].className = 'select';
            
        });
    }


    //点击小圆点的时候

    lis.forEach( (e,i)=> {

        e.onclick =function(){
        preV.className = '';
        preV = lis[i];
        lis[i].className = 'select';
        lunBo(i)
        }
    });
//点击上一张

    prev.onclick = function(){
        num--;
        
        if(num < 0){num = arr.length-1}
        console.log(num)
        lunBo(num);
        //小圆点
        dian(num)
    }


timer = setInterval(next.onclick,1000);
outer.onmouseover = function(){
    clearInterval(timer);
}
outer.onmouseout = function(){
    timer = setInterval(next.onclick,1000);
   
}
