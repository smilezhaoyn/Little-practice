let M = (function(){

    function move(obj){
        //默认配置
        let opt = {
            ele:null,
            attrs:{},
            duration:1000,
            fx:'linear',
            callback:function(){}
        }

        Object.assign(opt,obj);

        let j = {};
        let begin = 0;
        let time = 0;
        let re = /rem|px|re/;
        let unit = 'px';
        let timer = null;

        for(let i in opt.attrs){
            if(typeof opt.attrs[i] === 'string'){
                // console.log(getComputedStyle(opt.ele)[i])
                begin = parseFloat(getComputedStyle(opt.ele)[i]);
                // console.log(begin)
                unit = opt.attrs[i].match(re) ? opt.attrs[i].match(re)[0] : 'px';
                j[i] = {
                    begin,
                    count:parseFloat(opt.attrs[i]) -begin,
                    unit
                }
            }else if(opt.attrs[i].constructor === Object){
                unit = opt.attrs[i].count.match(re) ? opt.attrs[i].count.match(re)[0] :'px';
                j[i] = {
                    begin:parseFloat(opt.attrs[i].begin),
                    count:parseFloat(opt.attrs[i].count) -parseFloat(opt.attrs[i].begin),
                    unit
                }
            }else{
                begin = parseFloat(getComputedStyle(opt.ele)[i]);
                j[i] = {
                    begin,
                    count:attrs[i] - begin,
                    unit
                }
            }       
            
        }
        // console.log(j)


        (function animate(){
            

            timer = requestAnimationFrame(animate);
            time += 16.7;
            // console.log(time)

            if(time >= opt.duration) time = opt.duration;

            for(let m in j){
                // console.log(m)
                let v = Tween[opt.fx](time,j[m].begin,j[m].count,opt.duration);
                // console.log(v)

                opt.ele.style[m] = (m === 'opacity') ? v : v + (j[m].unit ? j[m].unit : 'px');
            }

                

            if(time === opt.duration) {
                cancelAnimationFrame(timer);
                opt.callback();
            }
        })();




    }







    return {
        move
    }

})();