function lt() {
  let y = document.getElementsByClassName('entry').length;

for(let i=0; i<y;i++){
    var bar = new ProgressBar.Circle('#table'+i, {
        strokeWidth: 10,
        color: '#6FB1FC',
        trailColor: 'white',
        trailWidth: 5,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
          value: '',
          alignToBottom: false
        },
        from: {color: '#4364F7'},
        to: {color: '#0052D4'},
        // Set default step function for all animate calls
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
          var value = Math.round(bar.value() * 365);
          if (value === 0) {
            bar.setText('');
          } else {
            bar.setText(value);
          }
      
          bar.text.style.color = state.color;
        }
      });
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '1rem';
      bar.text.style.fontWeight = '800'
      
      bar.animate(0.90);
}
}

