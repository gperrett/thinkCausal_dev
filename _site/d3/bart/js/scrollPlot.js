// scrollytell
bart.scrollytellState1 = function(){
    let container = bart.config.container
    console.log('bartState1')

    // resets
    container.selectAll('.bart-lines').style('display', 'none');
    container.selectAll('.bart-observations').style('opacity', null)
    bart.verticalLine.style('display', 'none')
    container.select('.bart-hoverRect').attr('pointer-events', 'none')

    // clearTimeout(bart.timeoutStudyText)

    // adjust data for vertical line (remove line)
    d3.map(bart.data.fits, x => { x.scroll0 = 100000 } )
    d3.map(bart.data.fits, x => { x.scroll1 = 100000 } )

    // adjust subtitle
    container.select('.bart-subtitle').text(null)

    bart.emphasizeText("#bart-trigger-1, #bart-trigger-1 + p")
}

bart.scrollytellState2 = function(){
    let container = bart.config.container
    console.log('bartState2')

    // de-emphasize points
    container.selectAll('.bart-observations').style('opacity', 0.2)

    // emphasize lines
    container.selectAll('.bart-lines').style('display', 'none');
    container.selectAll('.bart-lines-diffFit0, .bart-lines-diffFit1')
        .style('display', null);
    container.select('.bart-hoverRect').attr('pointer-events', 'all')

    // adjust data for vertical line
    d3.map(bart.data.fits, x => { x.scroll0 = x.diffFit0 } )
    d3.map(bart.data.fits, x => { x.scroll1 = x.diffFit1 } )

    // adjust subtitle
    container.select('.bart-subtitle').text('Difference in means')

    bart.emphasizeText("#bart-trigger-2, #bart-trigger-2 + p")
}

bart.scrollytellState3 = function(){
    let container = bart.config.container
    console.log('bartState3')

    // resets
    container.selectAll('.bart-lines').style('display', 'none');
    container.selectAll('.bart-lines-lmFit0, .bart-lines-lmFit1')
        .style('display', null);

    // de-emphasize points
    container.selectAll('.bart-observations').style('opacity', 0.2)

    // adjust data for vertical line
    d3.map(bart.data.fits, x => { x.scroll0 = x.lmFit0 } )
    d3.map(bart.data.fits, x => { x.scroll1 = x.lmFit1 } )

    // adjust subtitle
    container.select('.bart-subtitle').text('Linear regression')
        
    bart.emphasizeText("#bart-trigger-3, #bart-trigger-3 + p, #bart-trigger-3 + p + p")
}

bart.scrollytellState4 = function(){
    let container = bart.config.container
    console.log('bartState4')

    // resets
    container.selectAll('.bart-lines').style('display', 'none');
    container.selectAll('.bart-lines-bartFit0, .bart-lines-bartFit1')
        .style('display', null);

    // de-emphasize points
    container.selectAll('.bart-observations').style('opacity', 0.2)

    // adjust data for vertical line
    d3.map(bart.data.fits, x => { x.scroll0 = x.bartFit0 } )
    d3.map(bart.data.fits, x => { x.scroll1 = x.bartFit1 } )

    // adjust subtitle
    container.select('.bart-subtitle').text('Bayesian Additive Regression Trees (BART)')
        
    bart.emphasizeText("#bart-trigger-4, #bart-trigger-4 + p")
}

bart.plotState = 1
bart.triggerScrollytellAnimation = function(){
    // trigger the closest animation

    // get the positions of divs relative to the top of the viewport
    let trigger1Pos = $('#bart-trigger-1')[0].getBoundingClientRect().top
    let trigger2Pos = $('#bart-trigger-2')[0].getBoundingClientRect().top
    let trigger3Pos = $('#bart-trigger-3')[0].getBoundingClientRect().top
    let trigger4Pos = $('#bart-trigger-4')[0].getBoundingClientRect().top
    let positions = [trigger1Pos, trigger2Pos, trigger3Pos, trigger4Pos]
    let scrollyFns = [bart.scrollytellState1, bart.scrollytellState2, bart.scrollytellState3, bart.scrollytellState4]

    // make off page elements positive
    positions = positions.map(Math.abs)

    // get smallest value
    const minVal = Math.min(...positions)
    const index = positions.indexOf(minVal)

    // update plot if state changed
    if (index != bart.plotState){
        scrollyFns[index]()
        bart.plotState = index
    }
}

// add listener
document.addEventListener('scroll', bart.triggerScrollytellAnimation);
