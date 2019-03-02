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

            function addStartIntervalToSlide(params) {
                
            }

            $(slides).each( (i ,slide) =>{
                makeDivContiner(i, slide)
                makeSlideControler(i, slide)
                setupSlideCards(i, slide)
                setupSlideAtributes(i, slide)
            })


    // --------------------------
            
            //setup slide transition behavior
            $(slides).each( (i ,slide) =>{
    
                slide.setupInterval = (slide, waitTime = 3000, fadeoutSpeed = 500, fadeinnSpeed = 500, indexDirection = 1, newIndex = null) => {
                slide.interval = () => setTimeout( ()=> {
                    $(slide.children[slide.currentIndex])
                        
                        //fadeout first images and fadein the next 
                        .fadeOut(fadeoutSpeed, () =>{
                            
                            if(newIndex === null){
                                slide.currentIndex += indexDirection
                            }else{
                                slide.currentIndex = newIndex
                            }
                            
                            //when index increments higher then image list
                            if(slide.currentIndex > slide.cardList.length -1){
                                slide.currentIndex = 0
                            }
                            if(slide.currentIndex < 0){
                                slide.currentIndex = slide.cardList.length -1
                            }

                            //fade in next image 
                            $(slide.children[slide.currentIndex]).fadeIn()
                            
                            //start next setTimout
                            slide.interval()
                        }
                    )
                }, waitTime)
                
                slide.interval()
            }


                
                slide.currentIndex = 0
                if(slide.cardList.length == 1){return}
                
                slide.setupInterval(slide)
            })






        }
    } 
    
    $.fn.ejs.setupSlides()

})