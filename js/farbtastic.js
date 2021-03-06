/**
 * Created by h205p3 on 3/14/17.
 */
$(function(){
    var bCanPreview = true; // can preview

    // create canvas and context objects
    var canvas = document.getElementById('picker');
    var ctx = canvas.getContext('2d');

    // drawing active image
    var image = new Image();
    image.onload = function () {
        $('.preview').css('backgroundColor','black');
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    };

    // select desired colorwheel
    var imageSrc = 'images/colorwheel1.png';
    switch ($(canvas).attr('var')) {
        case '2':
            imageSrc = 'images/colorwheel2.png';
            break;
        case '3':
            imageSrc = 'images/colorwheel3.png';
            break;
        case '4':
            imageSrc = 'images/colorwheel4.png';
            break;
        case '5':
            imageSrc = 'images/colorwheel5.png';
            break;
    }
    image.src = imageSrc;

    $('#picker').mousemove(function(e) { // mouse move handler
        if (bCanPreview) {
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;

            // update controls
            $('#rVal').val(pixel[0]);
            $('#gVal').val(pixel[1]);
            $('#bVal').val(pixel[2]);
            $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);

            dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            $('#hexVal').val('#' + ('00000' + dColor.toString(16)).substr(-6));
        }
    });
    $('#picker').click(function(e) { // click event handler
        bCanPreview = !bCanPreview;
        $('.colorpicker').fadeToggle("fast", "linear");
        bCanPreview = true;
        color('#' + ('00000' + dColor.toString(16)).substr(-6));
        // update preview color
        var pixelColor = '#' + ('00000' + dColor.toString(16)).substr(-6);
        $('.preview').css('backgroundColor', pixelColor);
    });
    $('.preview').click(function(e) { // preview click
        $('.colorpicker').fadeToggle("fast", "linear");
        bCanPreview = true;
    });
});