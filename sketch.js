
// sketchpad starts with 50 x 50 grid
window.onload = () => {
  fillContainer(current_grid_size)
  showGridSize(current_grid_size)
}

const container = document.getElementById('container')
let all_cells 

info_display = document.getElementById('info')

let currentMode = 'color-picker'

const grid_size_display = document.getElementById('grid-size-display')
const grid_adjustment_slider = document.getElementById('grid-size-slider')
let current_grid_size = grid_adjustment_slider.value 

grid_adjustment_slider.addEventListener('mousemove', (event) => {
  showGridSize(event.target.value)
})

grid_adjustment_slider.addEventListener('change', (event) => {
  resetGrid(event.target.value)
  current_grid_size = event.target.value 

  //  for eraseColumns to get updated current_grid_size
})

grid_adjustment_slider.addEventListener('mouseover', () => {
  info_display.textContent = "Use this to adjust the canvas to your liking. You're the boss here. "
})

function resetGrid(current_grid_size) {

  container.innerHTML='';

  fillContainer(current_grid_size);
}

function showGridSize(current_grid_size) {
  grid_size_display.innerHTML = `${current_grid_size} squares x ${current_grid_size} squares`
}

function fillContainer(current_grid_size) {

  container.style.gridTemplateColumns = `repeat(${current_grid_size}, minmax(0, 1fr))`
  
  for (let i= 0 ; i < current_grid_size * current_grid_size; i++) {

    const cell_create = document.createElement('div')

    cell_create.style.backgroundColor= '#ffffff'
  
    cell_create.classList.add('blank-cell')
  
    container.appendChild(cell_create)
      
    
  }

  all_cells = container.querySelectorAll(':scope > div')
  
  eraser_slider_columns.setAttribute('max', current_grid_size)

  drawWithCurrentMode()
}



const eraser_slider_columns = document.getElementById('eraser-slider-columns')
let eraser_slider_columns_position = eraser_slider_columns.value

eraser_slider_columns.addEventListener('change', (event) => {
  
  eraseColumns(event.target.value) ;
  
})

eraser_slider_columns.addEventListener('mouseover', () => {
  info_display.textContent = "Drag to erase canvas. Be careful, it only erases from left to right!"
})

function eraseColumns(eraser_slider_columns_position) {


  for (let column_number = 0 ; column_number < eraser_slider_columns_position ; column_number ++) {

    let n = column_number

      for (let i=0 ; i < current_grid_size; i++) {

        all_cells[0+n].style.backgroundColor = '#ffffff'
    
        n = Number(n) + Number(current_grid_size)
        
      }
  }

  document.getElementById('eraser-slider-form').reset()
  
  
}

const start_over_btn = document.getElementById('start-over-btn')

const color_picker_btn = document.getElementById('color-picker-btn')
let current_color = color_picker_btn.value

const random_colors_btn = document.getElementById('random-colors-btn')

const eraser_btn = document.getElementById('eraser-btn')

const shading_btn = document.getElementById('shading-btn')

const brighten_btn = document.getElementById('brighten-btn')
  
start_over_btn.addEventListener('click', () => {
  resetGrid(current_grid_size)
})
start_over_btn.addEventListener('mouseover', () => {
  info_display.textContent = "WOAH THERE! ... You sure about this?"
})


color_picker_btn.addEventListener('input', (event) => {
  current_color = event.target.value
  chooseMode('color-picker')
})
color_picker_btn.addEventListener('mouseover', () => {
  info_display.textContent = "Pick a color yourself. It's written there!"
})

random_colors_btn.addEventListener('click', () => {
  random_colors_btn.classList.toggle('clicked')
  chooseMode('random-colors')
})
random_colors_btn.addEventListener("mouseover", () => {
  info_display.textContent = "Feeling lucky? The greatest artists play with the colors they're dealt with. -No one ever"
})

eraser_btn.addEventListener('click', () => {
  eraser_btn.classList.toggle('clicked')
  chooseMode('eraser')
})
eraser_btn.addEventListener('mouseover', () => {
  info_display.textContent = "Your typical eraser."
})

shading_btn.addEventListener('click', () => {
  shading_btn.classList.toggle('clicked')
  chooseMode('shading')
})
shading_btn.addEventListener('mouseover', () => {
  info_display.textContent = "Thinking of adding shading? I knew you were different from the others the moment you clicked on this project."
})

brighten_btn.addEventListener('click', () => {
  brighten_btn.classList.toggle('clicked')
  chooseMode('brighten')
})
brighten_btn.addEventListener('mouseover', () => {
  info_display.textContent = "Let there be light! ... Only if you want, totally not forcing you or anything..."
})


function chooseMode(selectedMode) {

  checkButtonClicked(selectedMode)
  drawWithCurrentMode()
}

function checkButtonClicked(selectedMode) {

  const all_modes_container = document.getElementById('mode-options')
  

  let all_modes_array = Array.from(all_modes_container.children)
  
  if (!event.target.classList.contains('clicked')) {
    selectedMode = 'color-picker'
  }

  if (selectedMode === 'eraser') {
    
    all_modes_array.splice(2, 1)
    all_modes_array.forEach((mode => {
      mode.classList.remove('clicked')
    }))

  } else if (selectedMode === 'random-colors') {
    
    all_modes_array.splice(3, 1)
    all_modes_array.forEach((mode => {
      mode.classList.remove('clicked')
    }))

  } else if (selectedMode === 'shading') {

    all_modes_array.splice(4, 1)
    all_modes_array.forEach((mode => {
      mode.classList.remove('clicked')
    }))

  } else if (selectedMode === 'brighten') {

    all_modes_array.splice(5, 1)
    all_modes_array.forEach((mode => {
      mode.classList.remove('clicked')
    }))
  } else {
    
    all_modes_array.forEach((mode => {
      mode.classList.remove('clicked')
  }))
}

  currentMode = selectedMode
}

function drawWithCurrentMode() {

  all_cells.forEach((cell) => {
    
    cell.addEventListener('mousemove', () => {
        if (event.buttons == 1) {
        event.preventDefault();

          if (currentMode === 'color-picker') {
            event.target.style.backgroundColor = current_color
          
          } else if (currentMode === 'random-colors') {
              event.target.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
          
          } else if (currentMode === 'eraser') {
              event.target.style.backgroundColor = '#ffffff'
          
          } else if (currentMode === 'shading') {
              let colorToShade = event.target.style.backgroundColor
              event.target.style.backgroundColor =  shadeOrBrightenColor(colorToShade, -1)
          
          } else if (currentMode === 'brighten') {
              let colorToBrighten = event.target.style.backgroundColor
              event.target.style.backgroundColor =  shadeOrBrightenColor(colorToBrighten, 1)
          }
    
        }
    
    })
  })     
}


function shadeOrBrightenColor(color, shade_amount) {

  rgbArray = color.match(/\d+/g).join(", ").split(",")

  

  let R = Number(rgbArray[0])

  let G = Number(rgbArray[1])

  let B = Number(rgbArray[2])

  R = Math.round(R + Number(shade_amount))
  G = Math.round(G + Number(shade_amount))
  B = Math.round(B + Number(shade_amount))
  
  if (R > 255) {
    R=255
  } else if (R < 0) {
    R=0
  }



  if (G > 255) {
    G=255
  } else if (G < 0) {
    G=0
  }

  if (B > 255) {
    B=255
  } else if (B < 0) {
    B=0
  }

  let RR = R.toString(16)
    if (RR.length == 1){
      RR = '0' + RR
    }
  

  let GG = G.toString(16)
    if (GG.length == 1) {
      GG= '0' + GG
    }

  let BB = B.toString(16)
    if (BB.length == 1) {
      BB = '0' + BB
    }
  
  return `#${RR}${GG}${BB}`
  
}



