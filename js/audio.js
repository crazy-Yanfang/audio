$(function(){



	var musics=[{
        name:"神木与瞳 - 为你而活",
    	author:"神木与瞳",
    	src:"神木与瞳 - 为你而活.mp3",
    	img:"img/4.jpg"
    	},{
    	name:"鹿晗 - 有点儿意思",
    	author:"鹿晗",
    	src:"鹿晗 - 有点儿意思.mp3",
    	img:"img/1.jpg"
    	},{
    	name:"Justin Bieber - Latin Girl",
    	author:"Justin Bieber",
    	src:"Justin Bieber - Latin Girl.mp3",
    	img:"img/3.jpg"
    	},{
    	name:"吴亦凡 - JULY",
    	author:"吴亦凡",
    	src:"吴亦凡 - JULY.mp3",
    	img:"img/2.jpg"
    	},{
    	name:"男才女貌 - 外滩十八号",
    	author:"男才女貌",
    	src:"男才女貌 - 外滩十八号.mp3",
    	img:"img/5.jpg"
    	}];

    var Index=1;
	function render(){
		$("#lists").empty();
		$.each(musics,function(i,v){
			var c=(i===Index) ? "playno" : "";
			$("<li  class='"+c+"'><div class='right icon'>&#xe778;</div><div class='left'><div class='top'>"+v.name+"</div><div class='bottom'>"+v.author+"</div></div><div class='delete'>&#xe672;</div></li>").appendTo("#lists")
			
		})
		$(".touxiang").empty();
		$.each(musics,function(i,v){
			var c=(i===Index)?"image":"";
			$("<img src='"+v.img+"' class='"+c+"'>").appendTo(".touxiang")
		})
		$(".geci2").empty();
				$.each(musics,function(i,v){
					var c=(i===Index)?"authorr":"";
					$("<h1 class='author "+c+"'>"+v.author+"</h1><h2 class='name "+c+"'>"+v.name+"</h2>").appendTo(".geci2")
		})
	}

	    $("#lists").on("click","li",function(){
	    	$("#lists").find("li").removeClass("playno");
	    	$(this).addClass("playno");
	    	Index=$(this).index();
	    	audio.src=musics[Index].src;
	    	audio.play();
	    })
	    render();

	    // delete
     $(".delete").on("click",function(){
    		$(this).parent().remove()
			 })

	var logo=$(".list");
	var x=Index;
	var VI=$(".long-cir");
	var vol=$(".long");
	logo.on('click',function(){
		if(logo.hasClass("menu")){
			$(".Lyrics").css("display","none");
			$("#lists").css("display","none");
			$(".body").css("display","block");
			logo.removeClass("menu");
		}else{
			$(".Lyrics").css("display","none");
			$(".body").css("display","none");
			$("#lists").css("display","block");
			
			$("#lists").find("li").removeClass("playno");
	    	$("#lists li").eq(x).addClass("playno");
			logo.addClass("menu");
		}
	})
     
    
        $(".body").on("touchstart",function(e){
         	 startpos=e.originalEvent.changedTouches[0].clientX;
         })
         $(".body").on("touchend",function(e){
         	var p=e.originalEvent.changedTouches[0].clientX;
         	if(p-startpos>=50){
         		 $(".body").css("display","none");
         		 $(".Lyrics").css("display","block");
         	}
         	
         })
         
         
         $(".Lyrics").on("touchstart",".lyri",function(e){
         	 startpos1=e.originalEvent.changedTouches[0].clientX;
         })
        $(".Lyrics").on("touchend",".lyri",function(e){
         	var p1=e.originalEvent.changedTouches[0].clientX;
         	if(p1-startpos1< -50){
         		$(".body").css("display","block");
         		$(".Lyrics").css("display","none");
         	}
         	
         })

	
	var play=$(".play");
	var audio=$("#audio").get(0);
	play.on("click",function(){
			if(audio.paused){
				audio.play();
				play.html("&#xe627;");
				
			}else{
				audio.pause();
				play.html("&#xe628;");
			}
		})
	$(audio).on("play",function(){
            play.html("&#xe627;");
    })
	$(audio).on("pause",function(){
         play.html("&#xe628;");
	})



    var progress=$(".progress");
    var current=$(".current-time");
    var circle=$(".circle");
    var duration=$(".duration");
    function format(v){
		v=Math.floor(v);
		var s=v%60;
		s=(s<10)?('0'+s):s;
		var m=Math.floor(v/60);
		return m+":"+s;
	}
	// 
	progress.on("click",function(e){
		audio.currentTime=e.offsetX / $(this).width() * audio.duration;
	})
	
	
	
	$(audio).on("canplay",function(){
		duration.html(format(audio.duration));
	})
	$(audio).on("timeupdate",function(){
		current.html(format(audio.currentTime));
		var left=progress.width() * audio.currentTime / audio.duration 
		- circle.width() / 2;
		circle.css('left',left);
	})

	// 播放进度拖拽
	circle.on("click",false)
	circle.on('mousedown',function(e){
		var r=circle.width()/2;
		var start=r-e.offsetX;
		$(document).on('mousemove',function(e){
			var left=e.clientX - progress.position().left + start;
			var c=left / progress.width() * audio.duration;
			if(c>=audio.duration||c<=0){
				return;
			}
			audio.currentTime=c;
		})
		return false;
	})

		$(document).on('mouseup',function(){
			$(document).off('mousemove');
		})



//音量
	var mute=$(".vi");
	VI.on("click",false)
	vol.on("click",function(e){
		audio.volume=e.offsetX/vol.width();
		mute.removeAttr("data-v");
	})
	
	mute.on("click",function(){
		if($(this).attr("data-v")){
			audio.volume=$(this).attr("data-v");
			$(this).removeAttr("data-v");
		}else{
			$(this).attr("data-v",audio.volume)
			audio.volume = 0;
		}
	})
	
	
	$(audio).on('volumechange',function(){
		VI.css('left',vol.width()* audio.volume-VI.width()/2);
	})
	
	
	
	//音量拖最

	VI.on('mousedown',function(e){

		var r=VI.width()/2;
		var start=r-e.offsetX;
		$(document).on('mousemove',function(e){
			var m=e.clientX;
			var left=m-vol.position().left+start;
			var v=left/vol.width();
			if(v>1||v<0){
				return;
			}
			audio.volume=v;
		})
		return false;
	})

	$(document).on('mouseup',function(){
			$(document).off('mousemove');
		})
		//切歌
	    $("#lists").on("touchend",function(){
	    	var index=$(this).index();
	    	Index=index;
	    	audio.src=musics[Index].src;
	    	render();
	    })

		// 上一首
		 function prev(){
    	Index-=1;
    	if(Index===-1){
    		Index=musics.length-1;
    	}
    	audio.src=musics[Index].src;
    	render();
    	audio.play();  
	    }
	    $(".next").on("touchend" , next);
	    $(".previous").on("touchend" , prev);
	    render();

	     //下一首
	    function next(){
	    	Index += 1;
	    	if(Index===musics.length){
	    		Index=0;
	    	}
	    	audio.src=musics[Index].src;
	    	render();
	    	audio.play(); 
   		 }
   		 	// delete
   		 	
})