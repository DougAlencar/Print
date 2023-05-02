	function print(){

	document.getElementById("img_map").innerHTML = "";

	swal("Área para imprimir", "selecione a área que deseja na impressão", "info");

	  //manter esse código antes de imprimir a busca, para deixar a base "invisível"   
	  const valueOpacity = document.getElementById('opacity-input').value
	  document.getElementById('opacity-input').value = 0.0
	  const opacityInput = document.getElementById('opacity-input');
	  const opacityOutput = document.getElementById('opacity-output');
	  setOpacidadeBase();

	 // Adiciona um evento de teclado para cancelar a seleção da área de impressão
	window.addEventListener('keydown', function(event) {
	  if (event.key === 'Escape') {
		modal.parentNode.removeChild(modal);
	  }
	}); 

 	  // print do mapa 
	  // const mapElement = document.getElementById('map'); //- Não precissa disso 
	  
	  var element = document.getElementById('map');
	  var modal = document.createElement('div');
	  modal.style.position = 'fixed';
	  modal.style.top = '0';
	  modal.style.left = '0';
	  modal.style.width = '100%';
	  modal.style.height = '100%';
	  modal.style.cursor = 'crosshair';
	  document.body.appendChild(modal);

	  var startX, startY, box;

	  modal.addEventListener('mousedown', function(event) {
		  event.preventDefault();
		  startX = event.clientX;
		  startY = event.clientY;
		  box = document.createElement('div');
		  box.style.position = 'absolute';
		  box.style.border = '1px dashed red';
		  box.style.left = startX + 'px';
		  box.style.top = startY + 'px';
		  modal.appendChild(box);

		  modal.addEventListener('mousemove', handleMouseMove);
	  });

	  modal.addEventListener('mouseup', function(event) {
		  event.preventDefault();
		  modal.removeEventListener('mousemove', handleMouseMove);
		  if (box !== null) {
			  var left = Math.min(startX, event.clientX);
			  var top = Math.min(startY, event.clientY);
			  var width = Math.abs(event.clientX - startX);
			  var height = Math.abs(event.clientY - startY);

			  html2canvas(element, {
				  x: left - element.offsetLeft,
				  y: top - element.offsetTop,
				  width: width,
				  height: height
			  }).then(function(canvas) {
				  var img = new Image();
				  img.onload = function() {
					  var canvasResized = document.createElement('canvas');
					  canvasResized.width = 700; 
					  canvasResized.height = 500;
					  var ctx = canvasResized.getContext('2d');
					  ctx.drawImage(img, 0, 0, 700, 500);
					  var imgResized = document.createElement('img');
					  imgResized.src = canvasResized.toDataURL();
					  document.getElementById('img_map').appendChild(imgResized);
			swal("Print gerado com sucesso", "Clique no botão para imprimir os dados do lote pesquisado com o print ", "success"); // ALTERAR O TAMANHO DO ICON SUCCESS
				  }
				  img.src = canvas.toDataURL();
				  
				  //visibilidade do botão de imprimir atributos 
				  document.getElementById("imprimir").style.display = "block";
			  });
		  }

		  // manter esse código após imprimir a busca, para voltar a opacidade da base que estava antes
		  document.getElementById('opacity-input').value = valueOpacity
		  setOpacidadeBase(); 
			  
		modal.parentNode.removeChild(modal);
	  });
		function handleMouseMove(event) {
			event.preventDefault();
			var left = Math.min(startX, event.clientX);
			var top = Math.min(startY, event.clientY);
			var width = Math.abs(event.clientX - startX);
			var height = Math.abs(event.clientY - startY);
			box.style.left = left + 'px';
			box.style.top = top + 'px';
			box.style.width = width + 'px';
			box.style.height = height + 'px';
		}
	}  
