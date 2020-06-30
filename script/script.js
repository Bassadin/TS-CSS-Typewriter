"use strict";
var TsCssTypewriter;
(function (TsCssTypewriter) {
    //JS Code in part stolen and modified from: https://codepen.io/hi-im-si/pen/DHoup
    class TsTyper {
        constructor(element, elementType, typewriterWords, preTypeDelay, postTypeDelay, letterTypeDelay) {
            this.currentTypewriterWordsIndex = 0;
            //Internal vars
            this.typedText = "";
            this.isDeleting = false;
            this.element = element;
            this.elementType = elementType;
            this.typewriterWords = typewriterWords;
            this.preTypeDelay = parseInt(preTypeDelay, 10) || 500;
            this.postTypeDelay = parseInt(postTypeDelay, 10) || 2000;
            this.letterTypeDelay = parseInt(letterTypeDelay, 10) || 170;
            this.tick();
        }
        tick() {
            if (this.elementType == "array-basic") {
                var fullTxt = this.typewriterWords[this.currentTypewriterWordsIndex];
                //Add / remove characters
                if (this.isDeleting) {
                    this.typedText = fullTxt.substring(0, this.typedText.length - 1);
                }
                else {
                    this.typedText = fullTxt.substring(0, this.typedText.length + 1);
                }
                //Set the currently typed text as innerHTML
                this.element.innerHTML =
                    this.typedText + '<span class="caret"><span>';
                //Add some randomization to the writing animation (don't randomize when deleting)
                var delta = this.letterTypeDelay;
                delta -= Math.random() * delta * (this.isDeleting ? 0 : 0.4);
                //Double speed if deleting
                if (this.isDeleting) {
                    delta *= 0.37;
                }
                //Set the deletion state
                if (!this.isDeleting && this.typedText === fullTxt) {
                    delta = this.postTypeDelay;
                    this.isDeleting = true;
                }
                else if (this.isDeleting && this.typedText === "") {
                    this.isDeleting = false;
                    this.currentTypewriterWordsIndex++;
                    //Loop back to the first index
                    if (this.currentTypewriterWordsIndex >=
                        this.typewriterWords.length) {
                        this.currentTypewriterWordsIndex = 0;
                    }
                    delta = this.preTypeDelay;
                }
                let typer = this;
                setTimeout(function () {
                    typer.tick();
                }, delta);
            }
            else {
                Error("Invalid typewriter type '" + this.elementType + "'.");
            }
        }
    }
    window.onload = () => {
        //Search all dom elements with typewriter class to instatiate
        var elements = document.getElementsByClassName("typewriter");
        Array.from(elements).forEach(function (element) {
            //Split string via semicolons
            var typewriterWords = element
                ?.getAttribute("data-typewriter-words")
                ?.split(";");
            //Read the post type delay
            var postTypeDelay = element.getAttribute("data-post-type-delay");
            //Read the pre type delay
            var preTypeDelay = element.getAttribute("data-pre-type-delay");
            //Read the letter type delay
            var letterTypeDelay = element.getAttribute("data-letter-type-delay");
            //Read the letter type delay
            var elementType = element.getAttribute("data-element-type");
            //Initialize typewriter object if typewriterWords aren't empty
            if (typewriterWords) {
                new TsTyper(element, elementType, typewriterWords, preTypeDelay, postTypeDelay, letterTypeDelay);
            }
        });
    };
})(TsCssTypewriter || (TsCssTypewriter = {}));
//# sourceMappingURL=script.js.map