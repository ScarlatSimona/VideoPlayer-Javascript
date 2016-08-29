//prima functie care se apeleaza la deschiderea documentului
document.addEventListener("DOMContentLoaded", function() { 
initialiseMediaPlayer(); 


var mediaPlayer;
var progressBar;
var PlayCanvas;
mediaPlayer = document.getElementById('media-video');

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*                               FUNCTIE PRIN INTERMEDIUL CAREIA ARE LOC CAPTURA DE ECRAN                                                   /*
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

(function()
{
	//preluarea videoclipului care ruleaza in momentul curent si a sursei acestuia
  var v = document.querySelector('video'),
      n = document.querySelector('source').src.replace(/.*\/|\..*$/g,''),
      c = document.querySelector('canvas'),
      ctx = c.getContext('2d');

  v.addEventListener('loadedmetadata',function(ev)
  {
    
    var ratio = v.videoWidth/v.videoHeight,
        w = 400,
        h = ~~(280/ratio),
        time = 0,
        img = null,
        li = null;
    c.width = w;
    c.height = h + 40;
  
    
 //de fiecare data se schimba bara de progres 
    v.addEventListener('timeupdate',function(ev)
	{
		//daca butonul Pause este apasat, se face screenshot
      if(v.paused)
	  {
		  //culoarea pt background
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, w,h);
		//video object, se deseneaza o imagine care va contine screenshot-ul
        ctx.drawImage(v,0,40,w,h);
		//timpul curent la care s-a facut screenshot-ul
        time = format(v.currentTime);
		//culoarea pentru timpul la care s-a facut screenshot-ul
        ctx.fillStyle = 'white';
        ctx.fillText(time, 395 - ctx.measureText(time).width, 20);
        ctx.fill();
      }
    },false);

  },false);
//timpul la care se face screenshot-ul 
  function format(time){
    var hours = parseInt((time / 60 / 60) % 60, 10),
        mins = parseInt((time / 60) % 60, 10),
        secs = parseInt(time, 10) % 60,
        hourss = (hours < 10 ? '0' : '') + parseInt(hours, 10) + ':',
        minss = (mins < 10 ? '0' : '') + parseInt(mins, 10) + ':',
        secss  = (secs < 10 ? '0' : '') +(secs % 60),
        timestring = ( hourss !== '00:' ? hourss : '' ) + minss + secss;
    return timestring;
  };
})();

}, false);

/*-----------------------------------------------------------------------------------------------------------/*
/*                 DESENARE BUTOANE CANVAS SI EVENIMENTE DE TRATARE LA APASAREA ACESTORA                     /*

/*-----------------------------------------------------------------------------------------------------------*/
function draw(){	
	//constructor cu proprietati multiple, instanta a unui obiect canvas
	var ctx = document.getElementById('play-canvas').getContext('2d');
	var ctx2 = document.getElementById('pause-canvas').getContext('2d');
    var ctx3 = document.getElementById('previous-canvas').getContext('2d');
	var ctx4 = document.getElementById('next-canvas').getContext('2d');
	
	//functie de tratare la apasarea butonului Play => porneste rularea videoclipului
	ctx.canvas.addEventListener('mousedown',function(event){
		//determina coordonatele mouse-ului
		var mouseX = event.clientX - ctx.canvas.offsetLeft;
		var mouseY = event.clientY - ctx.canvas.offsetTop;
		mediaPlayer.play();
	
	});
	
	//functie de tratare la apasarea butonului Pause => videoclipul se opreste
	ctx2.canvas.addEventListener('mousedown',function(event){
		//determina coordonatele mouse-ului
		var mouseX = event.clientX - ctx2.canvas.offsetLeft;
		var mouseY = event.clientY - ctx2.canvas.offsetTop;
		mediaPlayer.pause();
	
	});
	
	//desenarea butonului Play in canvas
	var dim=ctx.width;
	ctx.beginPath();
	ctx.fillStyle ='black';
	ctx.moveTo(4,3);
	ctx.lineTo(18,10);
	ctx.lineTo(4,17);
	ctx.lineTo(4,3);
	//pentru a executa comenzile de desenare
	ctx.stroke();
	//pentru a umple forma desenata
	ctx.fill();
	ctx.closePath();	
	
	
	//desenarea butonului Pause in canvas
	var dim2=ctx2.width;
	ctx2.beginPath();
	ctx2.fillStyle ='black';
	ctx2.moveTo(5,4);
	ctx2.lineTo(5,16);
	ctx2.lineTo(8,16);
	ctx2.lineTo(8,4);
	ctx2.lineTo(5,4);
	ctx2.stroke();
	ctx2.fill();
	ctx2.moveTo(12,4);
	ctx2.lineTo(12,16);
	ctx2.lineTo(15,16);
	ctx2.lineTo(15,4);
	ctx2.lineTo(12,4);
	ctx2.stroke();
	ctx2.fill();
	ctx2.closePath();	
	
	//desenarea butonului Previous in canvas
	var dim3=ctx3.width;
	ctx3.beginPath();
	ctx3.fillStyle ='black';
	ctx3.moveTo(15,4);
	ctx3.lineTo(4,10);
	ctx3.lineTo(15,14)
	ctx3.stroke();
	ctx3.closePath();
	
	//desenarea butonului Previous in canvas
	var dim4=ctx4.width;
	ctx4.beginPath();
	ctx4.fillStyle ='black';
	ctx4.moveTo(5,5);
	ctx4.lineTo(16,10);
	ctx4.lineTo(5,16)
	ctx4.stroke();
	ctx4.closePath();

}

window.addEventListener('load', function(event)
{
	//se apeleaza functia pentru ca in momentul incarcarii paginii sa apara controalele video-player-ului desenate in canvas
	draw();
});

function initialiseMediaPlayer() {
	// asocierea variabilei cu player-ul video
	mediaPlayer = document.getElementById('media-video');
	progressBar = document.getElementById('progress-bar');
	// Hide the browser's default controls
	mediaPlayer.controls = false;
	
	//Listener pentru ca bara de progres sa fie updatata 
	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	
	// listener pentru schimbarea volumului
	mediaPlayer.addEventListener('volumechange', function(e) 
	{ 
		
		if (mediaPlayer.muted) changeButtonType(muteBtn, 'unmute');
		else changeButtonType(muteBtn, 'mute');
	}, false);	
	mediaPlayer.addEventListener('ended', function() { this.pause(); }, false);	
		
}




/*------------------------------------------------------------------------------------*/
/*                       STOP THE PLAYER                                               */
/*------------------------------------------------------------------------------------*/

//Functie prin care videoclipul care ruleaza in momentul curent poate fi oprit
function stopPlayer() 
{
	//videoclipul este oprit
	mediaPlayer.pause();
	//se reseteaza pozitia videoclipului la momentul de inceput
	mediaPlayer.currentTime = 0;
}

/*----------------------------------------------------------------------------*/
/*            MODIFICARE VOLUM (+/-)
/*----------------------------------------------------------------------------*/
// Functie prin care se poate modifica volumul player-ului media
function changeVolume(direction)
 {
	if (direction === '+') 
		mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
	else 
		mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
	mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}


/*-------------------------------------------------------------------------------/*
/*                    UPDATE BARA DE PROGRES                                      /*
/*-------------------------------------------------------------------------------*/
// Functie pentru Modificarea barei de progres
function updateProgressBar()
 {
	// Work out how much of the media has played via the duration and currentTime parameters
	var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
	// Update the progress bar's value
	progressBar.value = percentage;
	// Update the progress bar's text (for browsers that don't support the progress element)
	progressBar.innerHTML = percentage + '% played';
}


/*-------------------------------------------------------------------------------/*
/*                   PLAY ITEM FROM PLAYLIST                                    /*
/*-------------------------------------------------------------------------------*/
// functie prin care incarca item-ul din Playlist in video player
function loadVideo() 
{
	//se parcurge lista de videoclipuri
	for (var i = 0; i < arguments.length; i++) 
	{
		var file = arguments[i].split('.');
		var ext = file[file.length - 1];
		// verifica daca videoclipul poate fi rulat
		if (canPlayVideo(ext))
			{
			// se reseteaza player-ul, se schimba sursa si se incarca in player-ul media
			resetPlayer();
			//se schimba sursa
			mediaPlayer.src = arguments[i];
			//videoclipul ruleaza automat fara sa mai fie nevoie apasarea butonului Play
			mediaPlayer.autoplay=true;
			break;
		}
	}
}


/*-------------------------------------------------------------------------------/*
/*                   VERIFICARE RULARE VIDEO                                  /*
/*-------------------------------------------------------------------------------*/
// Verifica daca browser-ul poate rula sau nu tipul particular de fisier
function canPlayVideo(ext) 
{
	var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
	if (ableToPlay == '')
		return false;
	else
		return true;
}



/*-------------------------------------------------------------------------------/*
/*                   RESETARE MEDIA PLAYER                                    /*
/*-------------------------------------------------------------------------------*/
// Functie pentru resetarea player-ului
function resetPlayer() 
{
	// Resetarea barei de progres la 0
	progressBar.value = 0;
	// Muta player-ul la punctul de inceput 
	mediaPlayer.currentTime = 0;	
}





