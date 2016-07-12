$(function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      manipulator = {
        imageToCanvas: function(img) {
          $(img).on("load", function(img) {
            console.log(this);
            canvas.width = img.width;
            canvas.height = img.height;
            this.drawImage(img);
          }, this);
        },
        drawImage: function(img) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          $("#col1").append(canvas);
        }
      },
      preloader = {
        images: ["1.jpg", "2.jpg", "3.jpg"],
        loadedImages: [],
        path: "images/",
        getImages: function() {
          this.images.forEach(function(img_path) {
            var img = document.createElement("img");
            img.src = this.path + img_path;
            this.loadedImages.push(img);
          }, this);
        }
      };

  $(window).load(function() {
   preloader.getImages();
   manipulator.imageToCanvas(preloader.loadedImages[0]);
  });
});