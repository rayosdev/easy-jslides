$(document).ready(function(){

    $.fn.ejs = {
        slides: $('slide'),

        setupSlides: function () {
            let slides = $.fn.ejs.slides
            

            function makeDivContiner(i, slide){
                let slideParent = slide.parentElement
                let storeSlideForMove = $(slide).remove()
                let divContainer = $(
                                    `<div class="ejs--slide-container">`
                                    ).appendTo(slideParent)
                $(storeSlideForMove).appendTo(divContainer)
            }

            function makeSlideControler(i, slide) {
                    //make controls HTML
                $(
                    `<div id="${'ejsSlideControls' + i}" class="ejs--slide-controls" >
                    <div class="ejs--slide-controls--right ejs--slide-controls--arrow"><a href=""></a></div>
                    
                    <div class="ejs--slide-controls--left ejs--slide-controls--arrow"><a href=""></a></div>
                    
                    <ul class="ejs--slide-controls--circle-container">
                            
                    </ul>
                    </div>`
                ).appendTo(slide.parentElement)
                       
                    //make control circles
                let circleContiner = $('#ejsSlideControls' + i + " .ejs--slide-controls--circle-container")
                let liElemnts = ""
                for (let i = 0; i < slide.childElementCount; i++) {
                    if(i == 0){
                        liElemnts += '<li class="ejs--active-circle"><a href=""></a></li>'
                    }
                    else{
                        liElemnts += '<li><a href=""></a></li>'
                    } 
                }
                $(liElemnts).appendTo(circleContiner) 


                    //if there is only one element hide controls
                if(slide.childElementCount == 1){
                    $('#ejsSlideControls' + i).hide()
                }
            
            }


            function setupSlideCards(i, slide) {
                let cardID = 0
                slide.cardList = []

                $(slide).children().each( (i, elm) => {

                    elm.ID = cardID
                    slide.cardList.push(elm)
                    $(elm).addClass('ejs--slide-card-container')
                    elm.ID != 0 && $(elm).hide()

                    cardID++

                })
            }

            
            function setupSlideAtributes(i, slide) {
                let slideHeight = $(slide).attr('height')
                
                    //if no width atribute is given set the standard 
                        //  heigt to be 100px
                if(slideHeight == false || slideHeight == undefined){slideHeight = "200px"}
                
                    //gets rid of ; if there is any in the value given
                if(slideHeight.indexOf(';') != -1){
                    let result = slideHeight.split('');
                    result = result.filter(i => i != ';')
                    slideHeight = result.join('');
                }

                $(slide).parent().css("height", slideHeight)
            }

            function setupSlideIntervals(i, slide) {
                slide.fadeInTime = 500
                slide.fadeOutTime = 500
                slide.waitTime = 10000
                slide.index = 0
                slide.currentCard = slide.children[slide.index] 

                if(slide.children.length > 1){
                    standardShuffle(slide)
                }
                
            }


            function fadeCardOutIn(slide,cardOut,cardIn, nextFunction = () => {}) {
                $(cardOut).fadeOut(slide.fadeOutTime, () => {
                    $(cardIn).fadeIn(slide.fadeInTime, nextFunction())
                    
                    updateCircles(slide)
                }) 
            }

            function standardShuffle(slide) {
                clearTimeout(slide.interval)
                slide.interval = setTimeout(() => {
                    slide.index += 1
                    if(slide.index >= slide.children.length){slide.index = 0} 
                    
                    fadeCardOutIn(slide, slide.currentCard, slide.children[slide.index], standardShuffle(slide))
                    slide.currentCard = slide.children[slide.index]
                }, slide.waitTime)
            }


            function shuffleRightLeft(slide, direction) {

                clearTimeout(slide.interval)
                slide.index += direction
                if(slide.index > slide.children.length -1){slide.index = 0}
                if(slide.index < 0){slide.index = slide.children.length -1}
                
                fadeCardOutIn(slide, slide.currentCard, slide.children[slide.index])
                slide.currentCard = slide.children[slide.index]
                
                standardShuffle(slide)
                
            }

            function updateCircles(slide) {
                let circleContainer = slide.parentElement.children[1].children[2]
                $(circleContainer.children).each( (i, li) =>{
                    li.classList.remove('ejs--active-circle')
                })
                circleContainer.children[slide.index].classList.add('ejs--active-circle')
            }


            function setupSlideCotrntols(i, slide) {
                slide.controls = slide.parentElement.children[1]
                slide.arrowLeft  = slide.controls.children[0].children[0]
                slide.arrowRight = slide.controls.children[1].children[0]
                
                
                slide.arrowRight.addEventListener('click', e => {
                    e.preventDefault()
                    shuffleRightLeft(slide, +1)
                }) 
                slide.arrowLeft.addEventListener('click', e => {
                    e.preventDefault()
                    shuffleRightLeft(slide, -1)
                })

                slide.circles = slide.controls.children[2].children
                $(slide.circles).each( (j, circle) =>{
                    circle.addEventListener('click', e => {
                        e.preventDefault()
                        changeCard(slide, j)
                    })
                })
            }


            function changeCard(slide, index) {
                clearTimeout(slide.interval)
                
                slide.index = index
                fadeCardOutIn(slide, slide.currentCard, slide.children[slide.index])
                slide.currentCard = slide.children[slide.index]
                
                standardShuffle(slide)
            }


            $(slides).each( (i ,slide) =>{
                makeDivContiner(i, slide)
                makeSlideControler(i, slide)
                setupSlideCards(i, slide)
                setupSlideAtributes(i, slide)
                setupSlideIntervals(i, slide)
                setupSlideCotrntols(i, slide)
            })



        }
    } 
    
    $.fn.ejs.setupSlides()

})