$(function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),

  preloader = {
    images: ["1.jpg", "2.jpg", "3.jpg"],
    path: "images/",
    getImages: function() {
      this.images.forEach(function(img_path) {
        var img = document.createElement("img");
        img.src = this.path + img_path;
        $(img).on("load", manipulator.process.bind(manipulator));
      }, this);
    }
  };   

  manipulator = {
    process: function(e) {
      var img = e.target,
          dom_img;
      canvas.width = img.width;
      canvas.height = img.height;
      this.drawImage(img);
      this.grayscaleConversion();
      dom_img = this.imageConversion();
      this.appendImage(dom_img);
      $("#col2").append(e.target);
    },
    drawImage: function(img) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    },
    grayscaleConversion: function() {
      var image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for ( i = 0; i < image_data.data.length; i += 4 ) {
        var grey = image_data.data[i] * 0.3086 + image_data.data[i + 1] * 0.6094 + image_data.data[i + 2] * 0.0820;
        image_data.data[i] = grey;
        image_data.data[i + 1] = grey;
        image_data.data[i + 2] = grey;
        image_data.data[i + 3] = 255;
      }
      ctx.putImageData(image_data, 0, 0);
    },
    imageConversion: function() {
      var src = canvas.toDataURL(),
          img = document.createElement("img");

      img.src = src;
      return img;
    },
    appendImage: function(img) {
      $("#col1").append(img);
    }
  };


  $(window).load(function() {
   preloader.getImages();
  });
});